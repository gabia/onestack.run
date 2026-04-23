import copy from "copy-to-clipboard";
import {
	ChevronDown,
	ChevronUp,
	Clock,
	Copy,
	Loader2,
	RefreshCcw,
	RocketIcon,
	Settings,
	Trash2,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertBlock } from "@/components/shared/alert-block";
import { DateTooltip } from "@/components/shared/date-tooltip";
import { DialogAction } from "@/components/shared/dialog-action";
import { StatusTooltip } from "@/components/shared/status-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api, type RouterOutputs } from "@/utils/api";
import { ShowRollbackSettings } from "../rollbacks/show-rollback-settings";
import { CancelQueues } from "./cancel-queues";
import { ClearDeployments } from "./clear-deployments";
import { KillBuild } from "./kill-build";
import { RefreshToken } from "./refresh-token";
import { ShowDeployment } from "./show-deployment";

interface Props {
	id: string;
	type:
		| "application"
		| "compose"
		| "schedule"
		| "server"
		| "backup"
		| "previewDeployment"
		| "volumeBackup";
	refreshToken?: string;
	serverId?: string;
}

export const formatDuration = (seconds: number) => {
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};

export const ShowDeployments = ({
	id,
	type,
	refreshToken,
	serverId,
}: Props) => {
	const [activeLog, setActiveLog] = useState<
		RouterOutputs["deployment"]["all"][number] | null
	>(null);
	const { data: deployments, isPending: isLoadingDeployments } =
		api.deployment.allByType.useQuery(
			{
				id,
				type,
			},
			{
				enabled: !!id,
				refetchInterval: 1000,
			},
		);

	const { data: isCloud } = api.settings.isCloud.useQuery();

	const { mutateAsync: rollback, isPending: isRollingBack } =
		api.rollback.rollback.useMutation();
	const { mutateAsync: killProcess, isPending: isKillingProcess } =
		api.deployment.killProcess.useMutation();
	const { mutateAsync: removeDeployment, isPending: isRemovingDeployment } =
		api.deployment.removeDeployment.useMutation();

	// Cancel deployment mutations
	const {
		mutateAsync: cancelApplicationDeployment,
		isPending: isCancellingApp,
	} = api.application.cancelDeployment.useMutation();
	const {
		mutateAsync: cancelComposeDeployment,
		isPending: isCancellingCompose,
	} = api.compose.cancelDeployment.useMutation();

	const [url, setUrl] = React.useState("");
	const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
		new Set(),
	);

	const webhookUrl = useMemo(
		() =>
			`${url}/api/deploy${type === "compose" ? "/compose" : ""}/${refreshToken}`,
		[url, refreshToken, type],
	);

	const MAX_DESCRIPTION_LENGTH = 200;

	const truncateDescription = (description: string): string => {
		if (description.length <= MAX_DESCRIPTION_LENGTH) {
			return description;
		}
		const truncated = description.slice(0, MAX_DESCRIPTION_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		if (lastSpace > MAX_DESCRIPTION_LENGTH - 20 && lastSpace > 0) {
			return `${truncated.slice(0, lastSpace)}...`;
		}
		return `${truncated}...`;
	};

	// Check for stuck deployment (more than 9 minutes) - only for the most recent deployment
	const stuckDeployment = useMemo(() => {
		if (!isCloud || !deployments || deployments.length === 0) return null;

		const now = Date.now();
		const NINE_MINUTES = 10 * 60 * 1000; // 9 minutes in milliseconds

		// Get the most recent deployment (first in the list since they're sorted by date)
		const mostRecentDeployment = deployments[0];

		if (
			!mostRecentDeployment ||
			mostRecentDeployment.status !== "running" ||
			!mostRecentDeployment.startedAt
		) {
			return null;
		}

		const startTime = new Date(mostRecentDeployment.startedAt).getTime();
		const elapsed = now - startTime;

		return elapsed > NINE_MINUTES ? mostRecentDeployment : null;
	}, [isCloud, deployments]);
	useEffect(() => {
		setUrl(document.location.origin);
	}, []);

	return (
		<Card className="h-full bg-sidebar rounded-lg w-full border-none shadow-none">
			<div className="rounded-xl bg-background shadow-md p-6">
				<CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4 px-0 pt-0 pb-6">
					<div className="flex flex-col gap-1">
						<CardTitle className="text-xl flex flex-row gap-2">
							<RocketIcon className="size-6 text-muted-foreground self-center" />
							배포 내역
						</CardTitle>
						<CardDescription>
							최근 10개의 배포 내역을 확인합니다.
						</CardDescription>
					</div>
					<div className="flex flex-row items-center flex-wrap gap-2">
						{(type === "application" || type === "compose") && (
							<ClearDeployments id={id} type={type} />
						)}
						{(type === "application" || type === "compose") && (
							<KillBuild id={id} type={type} />
						)}
						{(type === "application" || type === "compose") && (
							<CancelQueues id={id} type={type} />
						)}
						{type === "application" && (
							<ShowRollbackSettings applicationId={id}>
								<Button variant="outline">
									롤백 설정 <Settings className="size-4" />
								</Button>
							</ShowRollbackSettings>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
					{stuckDeployment && (type === "application" || type === "compose") && (
						<AlertBlock
							type="warning"
							className="flex-col items-start w-full p-4"
						>
							<div className="flex flex-col gap-3">
								<div>
									<div className="font-medium text-sm mb-1">
										빌드가 중단된 것으로 보입니다
									</div>
									<p className="text-sm">
										빌드가 10분 이상 실행 중입니다. 이 배포를 취소하시겠습니까?
									</p>
								</div>
								<Button
									variant="destructive"
									size="sm"
									className="w-fit"
									isLoading={
										type === "application"
											? isCancellingApp
											: isCancellingCompose
									}
									onClick={async () => {
										try {
											if (type === "application") {
												await cancelApplicationDeployment({
													applicationId: id,
												});
											} else if (type === "compose") {
												await cancelComposeDeployment({
													composeId: id,
												});
											}
											toast.success("배포 취소가 요청되었습니다");
										} catch (error) {
											toast.error(
												error instanceof Error
													? error.message
													: "배포 취소에 실패했습니다",
											);
										}
									}}
								>
									배포 취소
								</Button>
							</div>
						</AlertBlock>
					)}
					{refreshToken && (
						<div className="flex flex-col gap-2 text-sm p-4 rounded-lg bg-sidebar/40 border shadow-sm">
							<span className="font-medium">웹훅 재배포</span>
							<p className="text-muted-foreground">
								애플리케이션을 재배포하려면 Git 제공자나 Docker 설정에 이 URL을 사용하세요.
							</p>
							<div className="flex flex-row items-center gap-2 flex-wrap mt-1">
								<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Webhook URL: </span>
								<div className="flex flex-row items-center gap-2">
									<Badge
										role="button"
										tabIndex={0}
										aria-label="Copy webhook URL to clipboard"
										className="p-2 rounded-md hover:border-primary hover:text-primary-foreground hover:bg-primary hover:cursor-pointer whitespace-normal break-all"
										variant="outline"
										onKeyDown={(event) => {
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												copy(webhookUrl);
												toast.success("클립보드에 복사되었습니다");
											}
										}}
										onClick={() => {
											copy(webhookUrl);
											toast.success("클립보드에 복사되었습니다");
										}}
									>
										{webhookUrl}
										<Copy className="h-4 w-4 ml-2" />
									</Badge>
									{(type === "application" || type === "compose") && (
										<RefreshToken id={id} type={type} />
									)}
								</div>
							</div>
						</div>
					)}

					{isLoadingDeployments ? (
						<div className="flex w-full flex-row items-center justify-center gap-3 pt-10 min-h-[25vh]">
							<Loader2 className="size-6 text-muted-foreground animate-spin" />
							<span className="text-base text-muted-foreground">
								배포 내역 로딩 중...
							</span>
						</div>
					) : deployments?.length === 0 ? (
						<div className="flex w-full flex-col items-center justify-center gap-3 pt-10 min-h-[25vh]">
							<RocketIcon className="size-8 text-muted-foreground" />
							<span className="text-base text-muted-foreground">
								배포 내역이 없습니다
							</span>
						</div>
					) : (
						<div className="flex flex-col gap-4">
							{deployments?.map((deployment, index) => {
								const titleText = deployment?.title?.trim() || "";
								const needsTruncation = titleText.length > MAX_DESCRIPTION_LENGTH;
								const isExpanded = expandedDescriptions.has(
									deployment.deploymentId,
								);
								const canDelete =
									deployment.status === "done" || deployment.status === "error";

								return (
									<div
										key={deployment.deploymentId}
										className="flex flex-col gap-4 rounded-lg border bg-sidebar/30 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-sidebar/50 transition-colors shadow-sm"
									>
										<div className="flex flex-1 flex-col min-w-0">
											<span className="flex items-center gap-4 font-medium capitalize text-foreground">
												{index + 1}. {deployment.status}
												<StatusTooltip
													status={deployment?.status}
													className="size-2.5"
												/>
											</span>

											<div className="flex flex-col gap-1">
												<span className="break-words text-sm text-muted-foreground whitespace-pre-wrap">
													{isExpanded || !needsTruncation
														? titleText
														: truncateDescription(titleText)}
												</span>
												{needsTruncation && (
													<button
														type="button"
														onClick={() => {
															const next = new Set(expandedDescriptions);
															if (next.has(deployment.deploymentId)) {
																next.delete(deployment.deploymentId);
															} else {
																next.add(deployment.deploymentId);
															}
															setExpandedDescriptions(next);
														}}
														className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit mt-1 cursor-pointer"
													>
														{isExpanded ? (
															<>
																<ChevronUp className="size-3" />
																접기
															</>
														) : (
															<>
																<ChevronDown className="size-3" />
																더 보기
															</>
														)}
													</button>
												)}
												{/* Hash (from description) - shown in compact form */}
												{deployment.description?.trim() && (
													<span className="text-xs text-muted-foreground font-mono mt-1">
														{deployment.description}
													</span>
												)}
											</div>
										</div>
										<div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:max-w-[300px] sm:items-end sm:justify-start">
											<div className="text-sm capitalize text-muted-foreground flex flex-wrap items-center gap-2">
												<DateTooltip date={deployment.createdAt} />
												{deployment.startedAt && deployment.finishedAt && (
													<Badge
														variant="outline"
														className="text-[10px] gap-1 flex items-center bg-background/50"
													>
														<Clock className="size-3" />
														{formatDuration(
															Math.floor(
																(new Date(deployment.finishedAt).getTime() -
																	new Date(deployment.startedAt).getTime()) /
																1000,
														),
													)}
												</Badge>
											)}
										</div>

										<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
											{deployment.pid && deployment.status === "running" && (
												<DialogAction
													title="프로세스 중단"
													description="정말로 프로세스를 중단하시겠습니까?"
													type="default"
													onClick={async () => {
														await killProcess({
															deploymentId: deployment.deploymentId,
														})
															.then(() => {
																toast.success("프로세스가 중단되었습니다");
															})
															.catch(() => {
																toast.error("프로세스 중단 중 오류가 발생했습니다");
															});
													}}
												>
													<Button
														variant="destructive"
														size="sm"
														isLoading={isKillingProcess}
														className="w-full sm:w-auto"
													>
														중단
													</Button>
												</DialogAction>
											)}
											<Button
												onClick={() => {
													setActiveLog(deployment);
												}}
												className="w-full sm:w-auto"
												size="sm"
											>
												로그 보기
											</Button>

											{canDelete && (
												<DialogAction
													title="배포 삭제"
													description="정말로 이 배포 내역을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
													type="default"
													onClick={async () => {
														try {
															await removeDeployment({
																deploymentId: deployment.deploymentId,
															});
															toast.success("배포 내역이 삭제되었습니다");
														} catch (error) {
															toast.error("배포 내역 삭제 중 오류가 발생했습니다");
														}
													}}
												>
													<Button
														variant="destructive"
														size="sm"
														isLoading={isRemovingDeployment}
													>
														삭제
														<Trash2 className="size-4" />
													</Button>
												</DialogAction>
											)}

											{deployment?.rollback &&
												deployment.status === "done" &&
												type === "application" && (
													<DialogAction
														title="이 시점으로 롤백"
														description={
															<div className="flex flex-col gap-3">
																<p>
																	정말로 이 배포 시점으로 롤백하시겠습니까?
																</p>
																<AlertBlock type="info" className="text-sm">
																	이미지를 레지스트리에서 가져오는 동안 몇 초간
																	기다려 주세요. 곧 애플리케이션이 실행됩니다.
																</AlertBlock>
															</div>
														}
														type="default"
														onClick={async () => {
															await rollback({
																rollbackId: deployment.rollback.rollbackId,
															})
																.then(() => {
																	toast.success(
																		"롤백이 시작되었습니다",
																	);
																})
																.catch(() => {
																	toast.error("롤백 시작 중 오류가 발생했습니다");
																});
														}}
													>
														<Button
															variant="secondary"
															size="sm"
															isLoading={isRollingBack}
															className="w-full sm:w-auto"
														>
															<RefreshCcw className="size-4 text-primary group-hover:text-red-500" />
															롤백
														</Button>
													</DialogAction>
												)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
				<ShowDeployment
					serverId={activeLog?.buildServerId || serverId}
					open={Boolean(activeLog && activeLog.logPath !== null)}
					onClose={() => setActiveLog(null)}
					logPath={activeLog?.logPath || ""}
					errorMessage={activeLog?.errorMessage || ""}
				/>
			</CardContent>
		</div>
	</Card>
	);
};
