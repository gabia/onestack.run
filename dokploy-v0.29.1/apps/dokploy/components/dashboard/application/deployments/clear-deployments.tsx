import { Paintbrush } from "lucide-react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

interface Props {
	id: string;
	type: "application" | "compose";
}

export const ClearDeployments = ({ id, type }: Props) => {
	const utils = api.useUtils();
	const { mutateAsync, isPending } =
		type === "application"
			? api.application.clearDeployments.useMutation()
			: api.compose.clearDeployments.useMutation();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" className="w-fit" isLoading={isPending}>
					배포 기록 삭제
					<Paintbrush className="size-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						이전 배포 기록을 삭제하시겠습니까?
					</AlertDialogTitle>
					<AlertDialogDescription>
						현재 활성 배포(가장 최근 성공한 배포)를 제외한 모든 이전 배포 기록과 로그가 삭제됩니다.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							await mutateAsync({
								applicationId: id || "",
								composeId: id || "",
							})
								.then(async () => {
									toast.success("이전 배포 기록이 삭제되었습니다.");
									await utils.deployment.allByType.invalidate({
										id,
										type: type as "application" | "compose",
									});
								})
								.catch((err) => {
									toast.error(err.message);
								});
						}}
					>
						확인
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
