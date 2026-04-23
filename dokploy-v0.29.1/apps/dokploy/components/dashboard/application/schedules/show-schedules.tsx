import {
	ClipboardList,
	Clock,
	Loader2,
	Play,
	Terminal,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DialogAction } from "@/components/shared/dialog-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/utils/api";
import { ShowDeploymentsModal } from "../deployments/show-deployments-modal";
import { HandleSchedules } from "./handle-schedules";

interface Props {
	id: string;
	scheduleType?: "application" | "compose" | "server" | "dokploy-server";
}

export const ShowSchedules = ({ id, scheduleType = "application" }: Props) => {
	const [runningSchedules, setRunningSchedules] = useState<Set<string>>(
		new Set(),
	);
	const {
		data: schedules,
		isLoading: isLoadingSchedules,
		refetch: refetchSchedules,
	} = api.schedule.list.useQuery(
		{
			id: id || "",
			scheduleType,
		},
		{
			enabled: !!id,
		},
	);
	const utils = api.useUtils();
	const { mutateAsync: deleteSchedule, isPending: isDeleting } =
		api.schedule.delete.useMutation();
	const { mutateAsync: runManually } = api.schedule.runManually.useMutation();

	const handleRunManually = async (scheduleId: string) => {
		setRunningSchedules((prev) => new Set(prev).add(scheduleId));
		try {
			await runManually({ scheduleId });
			toast.success("스케줄이 성공적으로 실행되었습니다");
			await refetchSchedules();
		} catch {
			toast.error("스케줄 실행 중 오류가 발생했습니다");
		} finally {
			setRunningSchedules((prev) => {
				const newSet = new Set(prev);
				newSet.delete(scheduleId);
				return newSet;
			});
		}
	};

	return (
		<Card className="h-full bg-sidebar rounded-lg w-full border-none shadow-none">
			<div className="border rounded-xl bg-background shadow-sm p-6">
				<CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4 px-0 pt-0 pb-6">
					<div className="flex flex-col gap-1">
						<CardTitle className="text-xl flex flex-row gap-2">
							<Clock className="size-6 text-muted-foreground self-center" />
							스케줄 작업
						</CardTitle>
						<CardDescription>
							지정된 간격으로 자동으로 실행될 작업을 예약합니다.
						</CardDescription>
					</div>
					{schedules && schedules.length > 0 && (
						<HandleSchedules id={id} scheduleType={scheduleType} />
					)}
				</CardHeader>
				<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
					{isLoadingSchedules ? (
						<div className="flex gap-4 w-full items-center justify-center text-center mx-auto min-h-[45vh]">
							<Loader2 className="size-6 text-muted-foreground animate-spin" />
							<span className="text-sm text-muted-foreground">
								스케줄 작업을 불러오는 중...
							</span>
						</div>
					) : schedules && schedules.length > 0 ? (
						<div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
							{schedules.map((schedule) => {
								const serverId =
									schedule.serverId ||
									schedule.application?.serverId ||
									schedule.compose?.serverId;
								return (
									<div
										key={schedule.scheduleId}
										className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border bg-sidebar/10 p-5 transition-colors hover:bg-sidebar/20 gap-4"
									>
										<div className="flex items-start gap-3 w-full sm:w-auto">
											<div className="flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-full bg-primary/5">
												<Clock className="size-4 text-primary/70" />
											</div>
											<div className="space-y-1.5 w-full">
												<div className="flex items-center gap-2 flex-wrap">
													<h3 className="text-sm font-medium leading-none">
														{schedule.name}
													</h3>
													<Badge
														variant={schedule.enabled ? "default" : "secondary"}
														className="text-[10px] px-1.5 py-0"
													>
														{schedule.enabled ? "활성" : "비활성"}
													</Badge>
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
													<Badge
														variant="outline"
														className="font-mono text-[10px] bg-background/50"
													>
														Cron: {schedule.cronExpression}
													</Badge>
													{schedule.scheduleType !== "server" &&
														schedule.scheduleType !== "dokploy-server" && (
															<>
																<span className="text-xs text-muted-foreground/50">
																	•
																</span>
																<Badge
																	variant="outline"
																	className="font-mono text-[10px] bg-background/50"
																>
																	{schedule.shellType}
																</Badge>
															</>
														)}
												</div>
												{schedule.command && (
													<div className="flex items-start gap-2 max-w-full">
														<Terminal className="size-3.5 text-muted-foreground/70 flex-shrink-0 mt-0.5" />
														<code className="font-mono text-[10px] text-muted-foreground/70 break-all">
															{schedule.command}
														</code>
													</div>
												)}
											</div>
										</div>
										<div className="flex items-center gap-1.5 self-end sm:self-center">
											<ShowDeploymentsModal
												id={schedule.scheduleId}
												type="schedule"
												serverId={serverId || undefined}
											>
												<TooltipProvider delayDuration={0}>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button variant="ghost" size="icon" className="size-8">
																<ClipboardList className="size-4" />
															</Button>
														</TooltipTrigger>
														<TooltipContent>로그 기록 보기</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</ShowDeploymentsModal>
											<TooltipProvider delayDuration={0}>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="size-8"
															disabled={runningSchedules.has(schedule.scheduleId)}
															onClick={() =>
																handleRunManually(schedule.scheduleId)
															}
														>
															{runningSchedules.has(schedule.scheduleId) ? (
																<Loader2 className="size-4 animate-spin" />
															) : (
																<Play className="size-4" />
															)}
														</Button>
													</TooltipTrigger>
													<TooltipContent>수동 실행</TooltipContent>
												</Tooltip>
											</TooltipProvider>
											<HandleSchedules
												scheduleId={schedule.scheduleId}
												id={id}
												scheduleType={scheduleType}
											/>
											<DialogAction
												title="스케줄 삭제"
												description="정말로 이 스케줄을 삭제하시겠습니까?"
												type="destructive"
												onClick={async () => {
													await deleteSchedule({
														scheduleId: schedule.scheduleId,
													})
														.then(() => {
															utils.schedule.list.invalidate({
																id,
																scheduleType,
															});
															toast.success("스케줄이 삭제되었습니다");
														})
														.catch(() => {
															toast.error("스케줄 삭제 중 오류가 발생했습니다");
														});
												}}
											>
												<Button
													variant="ghost"
													size="icon"
													className="group hover:bg-red-500/10 size-8"
													disabled={isDeleting}
												>
													<Trash2 className="size-4 text-primary group-hover:text-red-500" />
												</Button>
											</DialogAction>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex flex-col gap-2 items-center justify-center py-16 bg-sidebar/5 rounded-lg border border-dashed">
							<Clock className="size-10 mb-2 text-muted-foreground/50" />
							<p className="text-lg font-medium text-muted-foreground">
								예약된 작업이 없습니다
							</p>
							<p className="text-sm text-muted-foreground mt-1 mb-6">
								워크플로우 자동화를 위해 첫 번째 스케줄 작업을 만들어보세요.
							</p>
							<HandleSchedules id={id} scheduleType={scheduleType} />
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
};
