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
