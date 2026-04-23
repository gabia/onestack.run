"use client";

import { Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";

interface EnterpriseFeatureLockedProps {
	/** Optional title override */
	title?: string;
	/** Optional description override */
	description?: string;
	/** Optional custom CTA label */
	ctaLabel?: string;
	/** Optional CTA href (default: /dashboard/settings/license) */
	ctaHref?: string;
	/** Compact variant (less padding, smaller icon) */
	compact?: boolean;
}

/**
 * Displays a locked state for enterprise features when the user has no valid license.
 * Use standalone or via EnterpriseFeatureGate.
 */
export function EnterpriseFeatureLocked({
	title = "엔터프라이즈 기능",
	description = "이 기능은 Dokploy 엔터프라이즈의 일부입니다. 기능을 사용하려면 유효한 라이선스를 추가하세요.",
	ctaLabel = "라이선스로 이동",
	ctaHref = "/dashboard/settings/license",
	compact = false,
}: EnterpriseFeatureLockedProps) {
	return (
		<Card className="border-dashed bg-transparent shadow-none">
			<CardHeader className={compact ? "pb-2" : "pb-6"}>
				<div className="flex flex-col items-center gap-3 text-center">
					<div
						className={
							compact
								? "rounded-full bg-muted p-3"
								: "rounded-full bg-muted p-4"
						}
					>
						<Lock
							className={
								compact
									? "size-6 text-muted-foreground"
									: "size-8 text-muted-foreground"
							}
						/>
					</div>
					<div className="space-y-1">
						<CardTitle className="text-lg">{title}</CardTitle>
						<CardDescription className="max-w-sm mx-auto">
							{description}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className={compact ? "pt-0" : "pt-0"}>
				<div className="flex justify-center">
					<Button asChild variant="secondary" size={compact ? "sm" : "default"}>
						<Link href={ctaHref}>{ctaLabel}</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

interface EnterpriseFeatureGateProps {
	children: React.ReactNode;
	/** Props for the locked state when license is invalid */
	lockedProps?: Omit<EnterpriseFeatureLockedProps, "compact">;
	/** Show loading spinner while checking license */
	fallback?: React.ReactNode;
}

/**
 * Renders children only when the instance has a valid enterprise license.
 * Otherwise shows EnterpriseFeatureLocked.
 */
export function EnterpriseFeatureGate({
	children,
	lockedProps,
	fallback,
}: EnterpriseFeatureGateProps) {
	const { data: haveValidLicense, isPending } =
		api.licenseKey.haveValidLicenseKey.useQuery();

	if (isPending) {
		if (fallback) return <>{fallback}</>;
		return (
			<div className="flex items-center gap-2 justify-center min-h-[25vh]">
				<Loader2 className="size-6 text-muted-foreground animate-spin" />
				<span className="text-sm text-muted-foreground">
					라이선스 확인 중...
				</span>
			</div>
		);
	}

	if (!haveValidLicense) {
		return <EnterpriseFeatureLocked {...lockedProps} />;
	}

	return <>{children}</>;
}
