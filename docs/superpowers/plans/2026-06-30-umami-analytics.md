# Umami Web Analytics Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate self-hosted Umami analytics into the Dokploy dashboard so users can enable per-project web analytics via an "분석" tab.

**Architecture:** Umami runs as a Docker Compose service (`analytics.onestack.run`). Dokploy's tRPC API manages Umami websites/shares via Umami's REST API. The Dokploy UI embeds Umami's share page in an iframe inside a new Analytics tab on the application detail page.

**Tech Stack:** Umami (Docker), PostgreSQL, tRPC, Drizzle ORM, React, Radix UI Tabs, sonner (toast)

**Spec:** `docs/superpowers/specs/2026-06-30-umami-analytics-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `packages/server/src/utils/analytics/umami-client.ts` | Umami REST API client (auth, website CRUD, share CRUD) |
| Modify | `packages/server/src/db/schema/application.ts` | Add 3 analytics fields to `applications` table |
| Modify | `packages/server/src/services/application.ts` | Add `updateApplicationAnalytics` helper |
| Modify | `apps/dokploy/server/api/routers/application.ts` | Add 3 tRPC procedures: `enableAnalytics`, `disableAnalytics`, `getAnalytics` |
| Create | `apps/dokploy/components/dashboard/application/analytics/show-analytics.tsx` | Main analytics tab container |
| Create | `apps/dokploy/components/dashboard/application/analytics/analytics-placeholder.tsx` | Empty state UI |
| Create | `apps/dokploy/components/dashboard/application/analytics/analytics-dashboard.tsx` | Active state: tracking code + iframe |
| Create | `apps/dokploy/components/dashboard/application/analytics/tracking-code-snippet.tsx` | Copy-able tracking script |
| Modify | `apps/dokploy/pages/dashboard/project/[projectId]/environment/[environmentId]/services/application/[applicationId].tsx` | Add "분석" tab trigger + content |

---

## Task 1: Add Analytics Fields to Application Schema

**Files:**
- Modify: `packages/server/src/db/schema/application.ts:229` (before closing `});` of table)

- [ ] **Step 1: Add three analytics columns to the `applications` pgTable**

In `packages/server/src/db/schema/application.ts`, add three fields just before the closing `});` of the `applications` table definition (before line 230):

```typescript
	// Analytics (Umami)
	analyticsEnabled: boolean("analyticsEnabled").notNull().default(false),
	umamiWebsiteId: text("umamiWebsiteId"),
	umamiShareId: text("umamiShareId"),
```

The insertion point is after the `buildRegistryId` field (line 224-229) and before `});` on line 230.

- [ ] **Step 2: Generate the Drizzle migration**

Run from the `apps/dokploy` directory:

```bash
cd /Users/david/Documents/work/onestack.run/dokploy-v0.29.1/apps/dokploy && npx drizzle-kit generate --config ./server/db/drizzle.config.ts
```

Expected: A new SQL migration file in `drizzle/` like `0166_xxx.sql` containing:

```sql
ALTER TABLE "application" ADD COLUMN "analyticsEnabled" boolean DEFAULT false NOT NULL;
ALTER TABLE "application" ADD COLUMN "umamiWebsiteId" text;
ALTER TABLE "application" ADD COLUMN "umamiShareId" text;
```

- [ ] **Step 3: Verify the migration file looks correct**

Read the generated migration file and confirm it contains only the three `ALTER TABLE` statements above. No other tables should be modified.

- [ ] **Step 4: Commit**

```bash
git add packages/server/src/db/schema/application.ts apps/dokploy/drizzle/
git commit -m "feat(schema): add analytics fields to application table"
```

---

## Task 2: Create Umami API Client

**Files:**
- Create: `packages/server/src/utils/analytics/umami-client.ts`

- [ ] **Step 1: Create the Umami client file**

Create `packages/server/src/utils/analytics/umami-client.ts`:

```typescript
interface UmamiWebsite {
	id: string;
	name: string;
	domain: string;
}

interface UmamiShare {
	id: string;
	websiteId: string;
	name: string;
}

export class UmamiClient {
	private baseUrl: string;
	private username: string;
	private password: string;
	private token: string | null = null;
	private tokenExpiresAt = 0;

	constructor() {
		this.baseUrl = process.env.UMAMI_BASE_URL || "";
		this.username = process.env.UMAMI_ADMIN_USERNAME || "admin";
		this.password = process.env.UMAMI_ADMIN_PASSWORD || "umami";
	}

	private isConfigured(): boolean {
		return this.baseUrl.length > 0;
	}

	private assertConfigured(): void {
		if (!this.isConfigured()) {
			throw new Error(
				"Umami is not configured. Set UMAMI_BASE_URL environment variable.",
			);
		}
	}

	private async getToken(): Promise<string> {
		if (this.token && Date.now() < this.tokenExpiresAt) {
			return this.token;
		}

		const res = await fetch(`${this.baseUrl}/api/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.username,
				password: this.password,
			}),
		});

		if (!res.ok) {
			throw new Error(`Umami auth failed: ${res.status} ${res.statusText}`);
		}

		const data = (await res.json()) as { token: string };
		this.token = data.token;
		// Refresh 1 hour before assumed 24h expiry
		this.tokenExpiresAt = Date.now() + 23 * 60 * 60 * 1000;
		return this.token;
	}

	private async request<T>(
		method: string,
		path: string,
		body?: Record<string, unknown>,
	): Promise<T> {
		this.assertConfigured();
		const token = await this.getToken();
		const res = await fetch(`${this.baseUrl}${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			...(body ? { body: JSON.stringify(body) } : {}),
		});

		if (res.status === 401) {
			// Token expired — retry once with fresh token
			this.token = null;
			this.tokenExpiresAt = 0;
			const freshToken = await this.getToken();
			const retry = await fetch(`${this.baseUrl}${path}`, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${freshToken}`,
				},
				...(body ? { body: JSON.stringify(body) } : {}),
			});
			if (!retry.ok) {
				throw new Error(
					`Umami API error: ${retry.status} ${retry.statusText}`,
				);
			}
			if (retry.status === 204) return {} as T;
			return (await retry.json()) as T;
		}

		if (!res.ok) {
			throw new Error(`Umami API error: ${res.status} ${res.statusText}`);
		}

		if (res.status === 204) return {} as T;
		return (await res.json()) as T;
	}

	async createWebsite(name: string, domain: string): Promise<UmamiWebsite> {
		return this.request<UmamiWebsite>("POST", "/api/websites", {
			name,
			domain,
		});
	}

	async deleteWebsite(websiteId: string): Promise<void> {
		await this.request("DELETE", `/api/websites/${websiteId}`);
	}

	async createShare(
		websiteId: string,
		name: string,
	): Promise<UmamiShare> {
		return this.request<UmamiShare>("POST", "/api/share", {
			entityId: websiteId,
			shareType: 1,
			name,
		});
	}

	async deleteShare(shareId: string): Promise<void> {
		await this.request("DELETE", `/api/share/id/${shareId}`);
	}
}

// Singleton instance
let umamiClientInstance: UmamiClient | null = null;

export function getUmamiClient(): UmamiClient {
	if (!umamiClientInstance) {
		umamiClientInstance = new UmamiClient();
	}
	return umamiClientInstance;
}
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd /Users/david/Documents/work/onestack.run/dokploy-v0.29.1 && npx tsc --noEmit packages/server/src/utils/analytics/umami-client.ts 2>&1 || echo "Check for type errors"
```

If tsc is not directly available, just verify the file has no syntax issues by reviewing it.

- [ ] **Step 3: Commit**

```bash
git add packages/server/src/utils/analytics/umami-client.ts
git commit -m "feat(analytics): add Umami REST API client"
```

---

## Task 3: Add Application Analytics Service Functions

**Files:**
- Modify: `packages/server/src/services/application.ts`

- [ ] **Step 1: Add the `updateApplicationAnalytics` function**

At the end of `packages/server/src/services/application.ts`, add:

```typescript
export const updateApplicationAnalytics = async (
	applicationId: string,
	analyticsData: {
		analyticsEnabled: boolean;
		umamiWebsiteId: string | null;
		umamiShareId: string | null;
	},
) => {
	const result = await db
		.update(applications)
		.set(analyticsData)
		.where(eq(applications.applicationId, applicationId))
		.returning();

	return result[0];
};
```

Ensure the file already imports `eq` from `drizzle-orm` and `applications` from the schema — it should, since the existing `updateApplication` function uses them.

- [ ] **Step 2: Commit**

```bash
git add packages/server/src/services/application.ts
git commit -m "feat(analytics): add updateApplicationAnalytics service function"
```

---

## Task 4: Add tRPC Analytics Procedures

**Files:**
- Modify: `apps/dokploy/server/api/routers/application.ts`

- [ ] **Step 1: Add imports at the top of the router file**

In `apps/dokploy/server/api/routers/application.ts`, add this import near the other `@dokploy/server` imports:

```typescript
import { getUmamiClient } from "@dokploy/server/utils/analytics/umami-client";
```

Also verify that `updateApplicationAnalytics` can be imported. If the package re-exports from `packages/server/src/index.ts`, add:

```typescript
export * from "./utils/analytics/umami-client";
```

to `packages/server/src/index.ts` (near line 11 where other exports are).

And add to the existing `@dokploy/server` import block in the router file:

```typescript
import {
	// ... existing imports ...
	updateApplicationAnalytics,
} from "@dokploy/server";
```

- [ ] **Step 2: Add the three analytics procedures to the router**

Add these three procedures inside the `createTRPCRouter({})` object in `apps/dokploy/server/api/routers/application.ts`, after the last existing procedure:

```typescript
	getAnalytics: protectedProcedure
		.input(apiFindOneApplication)
		.query(async ({ input, ctx }) => {
			await checkServiceAccess(ctx, input.applicationId, "read");
			const application = await findApplicationById(input.applicationId);

			if (
				application.environment.project.organizationId !==
				ctx.session.activeOrganizationId
			) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to access this application",
				});
			}

			const umamiBaseUrl = process.env.UMAMI_BASE_URL || "";
			const shareUrl = application.umamiShareId
				? `${umamiBaseUrl}/share/${application.umamiShareId}`
				: null;

			const trackingScript = application.umamiWebsiteId
				? `<script defer src="${umamiBaseUrl}/script.js" data-website-id="${application.umamiWebsiteId}"></script>`
				: null;

			return {
				enabled: application.analyticsEnabled,
				umamiWebsiteId: application.umamiWebsiteId,
				shareUrl,
				trackingScript,
			};
		}),

	enableAnalytics: protectedProcedure
		.input(apiFindOneApplication)
		.mutation(async ({ input, ctx }) => {
			await checkServiceAccess(ctx, input.applicationId, "create");
			const application = await findApplicationById(input.applicationId);

			if (
				application.environment.project.organizationId !==
				ctx.session.activeOrganizationId
			) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to access this application",
				});
			}

			if (application.analyticsEnabled) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Analytics is already enabled for this application",
				});
			}

			// Determine the domain to track
			const domain = application.domains?.[0]?.host;
			if (!domain) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message:
						"도메인을 먼저 설정해주세요. 분석 기능은 도메인이 있는 애플리케이션에서만 사용할 수 있습니다.",
				});
			}

			try {
				const umami = getUmamiClient();
				const website = await umami.createWebsite(application.name, domain);
				const share = await umami.createShare(website.id, application.name);

				await updateApplicationAnalytics(input.applicationId, {
					analyticsEnabled: true,
					umamiWebsiteId: website.id,
					umamiShareId: share.id,
				});

				return { success: true };
			} catch (error) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "분석 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
					cause: error,
				});
			}
		}),

	disableAnalytics: protectedProcedure
		.input(apiFindOneApplication)
		.mutation(async ({ input, ctx }) => {
			await checkServiceAccess(ctx, input.applicationId, "create");
			const application = await findApplicationById(input.applicationId);

			if (
				application.environment.project.organizationId !==
				ctx.session.activeOrganizationId
			) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to access this application",
				});
			}

			try {
				const umami = getUmamiClient();
				if (application.umamiShareId) {
					await umami.deleteShare(application.umamiShareId);
				}
				if (application.umamiWebsiteId) {
					await umami.deleteWebsite(application.umamiWebsiteId);
				}
			} catch (_) {
				// Umami cleanup is best-effort
			}

			await updateApplicationAnalytics(input.applicationId, {
				analyticsEnabled: false,
				umamiWebsiteId: null,
				umamiShareId: null,
			});

			return { success: true };
		}),
```

- [ ] **Step 3: Commit**

```bash
git add packages/server/src/index.ts apps/dokploy/server/api/routers/application.ts
git commit -m "feat(analytics): add tRPC procedures for enable/disable/get analytics"
```

---

## Task 5: Create Analytics UI Components

**Files:**
- Create: `apps/dokploy/components/dashboard/application/analytics/tracking-code-snippet.tsx`
- Create: `apps/dokploy/components/dashboard/application/analytics/analytics-placeholder.tsx`
- Create: `apps/dokploy/components/dashboard/application/analytics/analytics-dashboard.tsx`
- Create: `apps/dokploy/components/dashboard/application/analytics/show-analytics.tsx`

- [ ] **Step 1: Create the tracking code snippet component**

Create `apps/dokploy/components/dashboard/application/analytics/tracking-code-snippet.tsx`:

```tsx
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Props {
	trackingScript: string;
}

export const TrackingCodeSnippet = ({ trackingScript }: Props) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		copy(trackingScript);
		setCopied(true);
		toast.success("트래킹 코드가 복사되었습니다");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">트래킹 코드</CardTitle>
				<CardDescription>
					아래 코드를 사이트의 {"<head>"} 태그에 추가하세요.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="relative">
					<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto font-mono">
						{trackingScript}
					</pre>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-2 right-2"
						onClick={handleCopy}
					>
						{copied ? (
							<Check className="size-4" />
						) : (
							<Copy className="size-4" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
```

- [ ] **Step 2: Create the placeholder (empty state) component**

Create `apps/dokploy/components/dashboard/application/analytics/analytics-placeholder.tsx`:

```tsx
import { BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

interface Props {
	applicationId: string;
	hasDomain: boolean;
}

export const AnalyticsPlaceholder = ({ applicationId, hasDomain }: Props) => {
	const utils = api.useUtils();

	const { mutateAsync: enableAnalytics, isPending } =
		api.application.enableAnalytics.useMutation();

	const handleEnable = async () => {
		try {
			await enableAnalytics({ applicationId });
			await utils.application.getAnalytics.invalidate({ applicationId });
			toast.success("분석 기능이 활성화되었습니다");
		} catch (error: unknown) {
			const message =
				error instanceof Error
					? error.message
					: "분석 기능 활성화에 실패했습니다";
			toast.error(message);
		}
	};

	return (
		<div className="flex h-[55vh] border-2 rounded-xl border-dashed p-4">
			<div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4">
				<BarChart3 className="size-12 text-muted-foreground" />
				<h3 className="text-lg font-medium">웹 분석</h3>
				<p className="text-sm text-muted-foreground text-center">
					{hasDomain
						? "이 애플리케이션의 방문자 통계를 확인하려면 분석 기능을 활성화하세요."
						: "분석 기능을 사용하려면 먼저 도메인을 설정해주세요."}
				</p>
				<Button onClick={handleEnable} disabled={isPending || !hasDomain}>
					{isPending ? "활성화 중..." : "분석 활성화"}
				</Button>
			</div>
		</div>
	);
};
```

- [ ] **Step 3: Create the analytics dashboard (active state) component**

Create `apps/dokploy/components/dashboard/application/analytics/analytics-dashboard.tsx`:

```tsx
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { TrackingCodeSnippet } from "./tracking-code-snippet";

interface Props {
	applicationId: string;
	shareUrl: string;
	trackingScript: string;
}

export const AnalyticsDashboard = ({
	applicationId,
	shareUrl,
	trackingScript,
}: Props) => {
	const utils = api.useUtils();

	const { mutateAsync: disableAnalytics, isPending } =
		api.application.disableAnalytics.useMutation();

	const handleDisable = async () => {
		try {
			await disableAnalytics({ applicationId });
			await utils.application.getAnalytics.invalidate({ applicationId });
			toast.success("분석 기능이 비활성화되었습니다");
		} catch {
			toast.error("분석 기능 비활성화에 실패했습니다");
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">웹 분석</h3>
				<Button
					variant="destructive"
					size="sm"
					onClick={handleDisable}
					disabled={isPending}
				>
					{isPending ? "비활성화 중..." : "분석 비활성화"}
				</Button>
			</div>

			<TrackingCodeSnippet trackingScript={trackingScript} />

			<div className="rounded-lg border overflow-hidden">
				<iframe
					src={shareUrl}
					className="w-full border-0"
					style={{ height: "800px" }}
					title="Analytics Dashboard"
				/>
			</div>
		</div>
	);
};
```

- [ ] **Step 4: Create the main show-analytics container component**

Create `apps/dokploy/components/dashboard/application/analytics/show-analytics.tsx`:

```tsx
import { api } from "@/utils/api";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { AnalyticsPlaceholder } from "./analytics-placeholder";

interface Props {
	applicationId: string;
}

export const ShowAnalytics = ({ applicationId }: Props) => {
	const { data: analytics, isLoading } =
		api.application.getAnalytics.useQuery(
			{ applicationId },
			{ enabled: !!applicationId },
		);

	const { data: application } = api.application.one.useQuery(
		{ applicationId },
		{ enabled: !!applicationId },
	);

	if (isLoading) {
		return (
			<div className="flex h-[55vh] items-center justify-center">
				<p className="text-sm text-muted-foreground">로딩 중...</p>
			</div>
		);
	}

	const hasDomain = (application?.domains?.length ?? 0) > 0;

	if (!analytics?.enabled) {
		return (
			<AnalyticsPlaceholder
				applicationId={applicationId}
				hasDomain={hasDomain}
			/>
		);
	}

	if (!analytics.shareUrl || !analytics.trackingScript) {
		return (
			<div className="flex h-[55vh] items-center justify-center">
				<p className="text-sm text-muted-foreground">
					분석 서버에 연결할 수 없습니다.
				</p>
			</div>
		);
	}

	return (
		<AnalyticsDashboard
			applicationId={applicationId}
			shareUrl={analytics.shareUrl}
			trackingScript={analytics.trackingScript}
		/>
	);
};
```

- [ ] **Step 5: Commit**

```bash
git add apps/dokploy/components/dashboard/application/analytics/
git commit -m "feat(analytics): add analytics tab UI components"
```

---

## Task 6: Wire Analytics Tab into Application Page

**Files:**
- Modify: `apps/dokploy/pages/dashboard/project/[projectId]/environment/[environmentId]/services/application/[applicationId].tsx`

- [ ] **Step 1: Add "analytics" to the TabState type**

In `[applicationId].tsx`, update the `TabState` type (lines 62-71) to include `"analytics"`:

```typescript
type TabState =
	| "projects"
	| "settings"
	| "advanced"
	| "deployments"
	| "domains"
	| "monitoring"
	| "preview-deployments"
	| "volume-backups"
	| "icon"
	| "analytics";
```

- [ ] **Step 2: Add the import for ShowAnalytics**

Add this import near the other component imports (around line 27):

```typescript
import { ShowAnalytics } from "@/components/dashboard/application/analytics/show-analytics";
```

- [ ] **Step 3: Add the "분석" tab trigger**

Insert the analytics tab trigger after the monitoring tab trigger (after line 272) and before the advanced tab trigger (line 273):

```tsx
{permissions?.monitoring.read && (
	<TabsTrigger value="analytics">분석</TabsTrigger>
)}
```

The exact insertion point is after:
```tsx
{permissions?.monitoring.read &&
	((data?.serverId && isCloud) || !data?.server) && (
		<TabsTrigger value="monitoring">
			모니터링
		</TabsTrigger>
	)}
```

And before:
```tsx
{permissions?.service.create && (
	<TabsTrigger value="advanced">고급</TabsTrigger>
)}
```

- [ ] **Step 4: Add the tab content panel**

Insert the analytics tab content after the monitoring TabsContent block (after line 310) and before the logs TabsContent block (line 312):

```tsx
{permissions?.monitoring.read && (
	<TabsContent value="analytics">
		<div className="flex flex-col gap-4 pt-2.5">
			<ShowAnalytics applicationId={applicationId} />
		</div>
	</TabsContent>
)}
```

- [ ] **Step 5: Verify the page renders without errors**

Start the dev server if not already running:

```bash
cd /Users/david/Documents/work/onestack.run/dokploy-v0.29.1 && pnpm dev
```

Navigate to any application detail page and confirm:
- The "분석" tab appears in the tab list (after "모니터링", before "고급")
- Clicking it shows the placeholder with "분석 활성화" button
- No console errors

- [ ] **Step 6: Commit**

```bash
git add apps/dokploy/pages/dashboard/project/[projectId]/environment/[environmentId]/services/application/[applicationId].tsx
git commit -m "feat(analytics): wire analytics tab into application detail page"
```

---

## Task 7: Add Umami Cleanup on Application Delete

**Files:**
- Modify: `apps/dokploy/server/api/routers/application.ts` (delete procedure, ~lines 220-279)

- [ ] **Step 1: Add Umami cleanup to the delete procedure's cleanup operations array**

In the `delete` mutation handler in `apps/dokploy/server/api/routers/application.ts`, find the `cleanupOperations` array (approximately lines 250-265). Add the Umami cleanup as the first operation in the array:

```typescript
const cleanupOperations = [
	async () => {
		if (application.analyticsEnabled) {
			try {
				const umami = getUmamiClient();
				if (application.umamiShareId) {
					await umami.deleteShare(application.umamiShareId);
				}
				if (application.umamiWebsiteId) {
					await umami.deleteWebsite(application.umamiWebsiteId);
				}
			} catch (_) {
				// Umami cleanup is best-effort
			}
		}
	},
	async () => await deleteAllMiddlewares(application),
	async () => await removeDeployments(application),
	// ... rest of existing cleanup operations ...
```

- [ ] **Step 2: Commit**

```bash
git add apps/dokploy/server/api/routers/application.ts
git commit -m "feat(analytics): clean up Umami website on application delete"
```

---

## Task 8: Umami Docker Compose Deployment File

**Files:**
- Create: `docker/umami/docker-compose.yml`

- [ ] **Step 1: Create the Umami Docker Compose file**

Create `docker/umami/docker-compose.yml`:

```yaml
version: "3"
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3001:3000"
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_DB_PASSWORD}@umami-db:5432/umami
      APP_SECRET: ${UMAMI_APP_SECRET}
    depends_on:
      umami-db:
        condition: service_healthy
    restart: always

  umami-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${UMAMI_DB_PASSWORD}
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  umami-db-data:
```

- [ ] **Step 2: Create an example .env file for Umami**

Create `docker/umami/.env.example`:

```env
UMAMI_DB_PASSWORD=change-me-to-a-secure-password
UMAMI_APP_SECRET=change-me-to-a-random-string
```

- [ ] **Step 3: Commit**

```bash
git add docker/umami/
git commit -m "feat(analytics): add Umami docker-compose deployment config"
```

---

## Task 9: Add Umami Environment Variables to Dokploy Config

**Files:**
- Modify: `packages/server/src/constants/index.ts`

- [ ] **Step 1: Add Umami env var exports to the constants file**

In `packages/server/src/constants/index.ts`, add near the other environment variable exports (around line 10):

```typescript
export const UMAMI_BASE_URL = process.env.UMAMI_BASE_URL || "";
export const UMAMI_ADMIN_USERNAME = process.env.UMAMI_ADMIN_USERNAME || "admin";
export const UMAMI_ADMIN_PASSWORD = process.env.UMAMI_ADMIN_PASSWORD || "";
```

- [ ] **Step 2: Update the `.env.example` to include Umami variables**

Find the main `.env.example` file (likely at `dokploy-v0.29.1/.env.example` or `apps/dokploy/.env.example`) and add:

```env
# Umami Analytics
UMAMI_BASE_URL=https://analytics.onestack.run
UMAMI_ADMIN_USERNAME=admin
UMAMI_ADMIN_PASSWORD=
```

- [ ] **Step 3: Commit**

```bash
git add packages/server/src/constants/index.ts
git commit -m "feat(analytics): add Umami environment variable configuration"
```

Note: Only stage files that exist and were modified. If `.env.example` doesn't exist, skip it.

---

## Deferred to v2

- **도메인 변경 시 Umami website domain 업데이트**: 사용자가 앱 도메인을 변경하면 Umami API (`POST /api/websites/:id`)로 domain 필드를 업데이트해야 함. 도메인 변경 flow에 hook을 추가하는 작업이 필요.
- **테스트**: UmamiClient 단위 테스트 (API 호출 mock), tRPC 프로시저 통합 테스트, UI 컴포넌트 렌더링 테스트. 현재 코드베이스의 테스트 인프라가 제한적이므로 v2에서 추가.
