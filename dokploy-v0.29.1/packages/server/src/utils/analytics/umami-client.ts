import { UMAMI_BASE_URL, UMAMI_ADMIN_USERNAME, UMAMI_ADMIN_PASSWORD } from "../../constants";

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
		this.baseUrl = UMAMI_BASE_URL;
		this.username = UMAMI_ADMIN_USERNAME;
		this.password = UMAMI_ADMIN_PASSWORD;
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
