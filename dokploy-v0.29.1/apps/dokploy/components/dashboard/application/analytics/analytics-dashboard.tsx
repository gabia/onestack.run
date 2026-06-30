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
