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
