import { IS_CLOUD } from "@dokploy/server/constants";
import { validateRequest } from "@dokploy/server/lib/auth";
import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";
import { ShowSchedules } from "@/components/dashboard/application/schedules/show-schedules";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { api } from "@/utils/api";

function SchedulesPage() {
	const { data: user } = api.user.get.useQuery();
	return (
		<div className="w-full">
			<div className="h-full rounded-xl max-w-5xl mx-auto flex flex-col gap-4">
				<ShowSchedules
					scheduleType="dokploy-server"
					id={user?.user.id || ""}
				/>
			</div>
		</div>
	);
}
export default SchedulesPage;

SchedulesPage.getLayout = (page: ReactElement) => {
	return <DashboardLayout metaName="스케줄">{page}</DashboardLayout>;
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
	const { user } = await validateRequest(ctx.req);
	if (!user || (user.role !== "owner" && user.role !== "admin")) {
		return {
			redirect: {
				permanent: true,
				destination: "/",
			},
		};
	}

	return {
		props: {},
	};
}
