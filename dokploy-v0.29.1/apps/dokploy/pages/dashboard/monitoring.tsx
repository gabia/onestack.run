import { IS_CLOUD } from "@dokploy/server/constants";
import { validateRequest } from "@dokploy/server/lib/auth";
import { hasPermission } from "@dokploy/server/services/permission";
import { Loader2 } from "lucide-react";
import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";
import { ContainerFreeMonitoring } from "@/components/dashboard/monitoring/free/container/show-free-container-monitoring";
import { ShowPaidMonitoring } from "@/components/dashboard/monitoring/paid/servers/show-paid-monitoring";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { api } from "@/utils/api";

const BASE_URL = "http://localhost:3001/metrics";

const DEFAULT_TOKEN = "metrics";

const Dashboard = () => {
	const [toggleMonitoring, _setToggleMonitoring] = useLocalStorage(
		"monitoring-enabled",
		false,
	);

	const { data: monitoring, isPending } = api.user.getMetricsToken.useQuery();
	return (
		<div className="space-y-4 pb-10">
			{isPending ? (
				<Card className="h-full bg-sidebar rounded-lg w-full">
					<div className="rounded-xl bg-background shadow-md p-6 min-h-[50vh] flex justify-center items-center text-muted-foreground">
						<span>로딩 중...</span>
						<Loader2 className="h-4 w-4 animate-spin ml-2" />
					</div>
				</Card>
			) : (
				<div className="h-full w-full">
					{toggleMonitoring ? (
						<ShowPaidMonitoring
							BASE_URL={
								process.env.NODE_ENV === "production"
									? `http://${monitoring?.serverIp}:${monitoring?.metricsConfig?.server?.port}/metrics`
									: BASE_URL
							}
							token={
								process.env.NODE_ENV === "production"
									? monitoring?.metricsConfig?.server?.token
									: DEFAULT_TOKEN
							}
						/>
					) : (
						<ContainerFreeMonitoring appName="dokploy" />
					)}
				</div>
			)}
		</div>
	);
};

export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => {
	return <DashboardLayout metaName="모니터링">{page}</DashboardLayout>;
};
export async function getServerSideProps(
	ctx: GetServerSidePropsContext<{ serviceId: string }>,
) {
	if (IS_CLOUD) {
		return {
			redirect: {
				permanent: true,
				destination: "/dashboard/home",
			},
		};
	}
	const { user, session } = await validateRequest(ctx.req);
	if (!user) {
		return {
			redirect: {
				permanent: true,
				destination: "/",
			},
		};
	}

	const canView = await hasPermission(
		{
			user: { id: user.id },
			session: { activeOrganizationId: session?.activeOrganizationId || "" },
		},
		{ monitoring: ["read"] },
	);

	if (!canView) {
		return {
			redirect: {
				permanent: false,
				destination: "/dashboard/home",
			},
		};
	}

	return {
		props: {},
	};
}
