import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
	AlertCircle,
	ArrowDownUp,
	Calendar as CalendarIcon,
	InfoIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertBlock } from "@/components/shared/alert-block";
import { DialogAction } from "@/components/shared/dialog-action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api, type RouterOutputs } from "@/utils/api";
import { RequestDistributionChart } from "./request-distribution-chart";
import { RequestsTable } from "./requests-table";

export type LogEntry = NonNullable<
	RouterOutputs["settings"]["readStatsLogs"]["data"]
>[0];

export const ShowRequests = () => {
	const { data: isActive, refetch } =
		api.settings.haveActivateRequests.useQuery();
	const { mutateAsync: toggleRequests } =
		api.settings.toggleRequests.useMutation();

	const { data: logCleanupStatus } =
		api.settings.getLogCleanupStatus.useQuery();
	const { mutateAsync: updateLogCleanup } =
		api.settings.updateLogCleanup.useMutation();
	const [cronExpression, setCronExpression] = useState<string | null>(null);

	// Set default date range to last 3 days
	const getDefaultDateRange = () => {
		const to = new Date();
		const from = new Date();
		from.setDate(from.getDate() - 3);
		return { from, to };
	};

	const [dateRange, setDateRange] = useState<{
		from: Date | undefined;
		to: Date | undefined;
	}>(getDefaultDateRange());

	// Check if logs exist to determine if traefik has been reloaded
	// Only fetch when active to minimize network calls
	const { data: statsLogsCheck } = api.settings.readStatsLogs.useQuery(
		{
			page: {
				pageIndex: 0,
				pageSize: 1,
			},
		},
		{
			enabled: !!isActive,
			refetchInterval: 5000, // Check every 5 seconds when active
		},
	);

	// Determine if warning should be shown
	// Show warning only if active but no logs exist yet
	const shouldShowWarning = isActive && (statsLogsCheck?.totalCount ?? 0) === 0;

	useEffect(() => {
		if (logCleanupStatus) {
			setCronExpression(logCleanupStatus.cronExpression || "0 0 * * *");
		}
	}, [logCleanupStatus]);

	return (
		<Card className="h-full bg-sidebar rounded-lg w-full">
			<div className="rounded-xl bg-background shadow-md p-6">
				<CardHeader className="px-0 pt-0 pb-6">
					<div className="flex flex-row justify-between items-center gap-4 flex-wrap">
						<div className="flex flex-col gap-1">
							<CardTitle className="text-xl flex flex-row gap-2">
								<ArrowDownUp className="size-6 text-muted-foreground self-center" />
								요청 (Requests)
							</CardTitle>
							<CardDescription>
								Traefik을 통과하는 모든 인입 요청을 확인합니다.
							</CardDescription>
						</div>
						<DialogAction
							title={isActive ? "요청 비활성화" : "요청 활성화"}
							description="변경 사항을 적용하려면 Traefik을 재시작해야 합니다."
							type={isActive ? "destructive" : "default"}
							onClick={async () => {
								await toggleRequests({ enable: !isActive })
									.then(() => {
										refetch();
										toast.success(
											`요청 통계가 ${isActive ? "비활성화" : "활성화"}되었습니다`,
										);
									})
									.catch((err) => {
										toast.error(err.message);
									});
							}}
						>
							<Button variant={isActive ? "destructive" : "default"}>
								{isActive ? "비활성화" : "활성화"}
							</Button>
						</DialogAction>
					</div>

					{shouldShowWarning && (
						<AlertBlock type="warning" className="mt-4">
							활성화 후에는 변경 사항을 적용하기 위해 Traefik을 다시 로드해야 합니다.{" "}
							<Link
								href="/dashboard/settings/server"
								className="text-primary underline underline-offset-4"
							>
								서버 설정
							</Link>{" "}
							페이지에서 Traefik을 재시작할 수 있습니다.
						</AlertBlock>
					)}
				</CardHeader>
				<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
					<div className="flex flex-col gap-4 p-4 rounded-lg bg-sidebar/40 border shadow-sm">
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<Label htmlFor="cron" className="font-medium shrink-0">
									로그 정리 스케줄
								</Label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<InfoIcon className="size-4 text-muted-foreground cursor-help" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="max-w-80">
												예약된 시간에 로그 정리 작업이 실행되어 액세스 로그 파일의 최신 1000개 항목만 유지하고 Traefik이 로그 파일을 다시 열도록 신호를 보냅니다. 기본 설정은 매일 자정(0 0 * * *)입니다.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="flex flex-1 gap-2 max-w-md">
								<Input
									id="cron"
									placeholder="0 0 * * *"
									value={cronExpression || ""}
									onChange={(e) => setCronExpression(e.target.value)}
									className="font-mono"
									required
								/>
								<Button
									variant="outline"
									onClick={async () => {
										if (!cronExpression?.trim()) {
											toast.error("유효한 크론 표현식을 입력하세요");
											return;
										}
										try {
											await updateLogCleanup({
												cronExpression: cronExpression,
											});
											toast.success("로그 정리 스케줄이 업데이트되었습니다");
										} catch (error) {
											toast.error(
												`스케줄 업데이트 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
											);
										}
									}}
								>
									업데이트
								</Button>
							</div>
						</div>
					</div>

					{isActive ? (
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
								<span className="text-sm font-medium">통계 및 기록</span>
								<div className="flex items-center gap-2 w-full sm:w-auto">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setDateRange(getDefaultDateRange())}
										className="shrink-0"
									>
										최근 3일
									</Button>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="w-full sm:w-[280px] justify-start text-left font-normal"
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{dateRange.from ? (
													dateRange.to ? (
														<>
															{format(dateRange.from, "yyyy년 MM월 dd일", { locale: ko })} -{" "}
															{format(dateRange.to, "yyyy년 MM월 dd일", { locale: ko })}
														</>
													) : (
														format(dateRange.from, "yyyy년 MM월 dd일", { locale: ko })
													)
												) : (
													<span>날짜 범위 선택</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="end">
											<Calendar
												initialFocus
												mode="range"
												defaultMonth={dateRange.from}
												selected={{
													from: dateRange.from,
													to: dateRange.to,
												}}
												onSelect={(range) => {
													setDateRange({
														from: range?.from,
														to: range?.to,
													});
												}}
												numberOfMonths={2}
												locale={ko}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							<RequestDistributionChart dateRange={dateRange} />
							<RequestsTable dateRange={dateRange} />
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-20 gap-4 bg-sidebar/5 rounded-lg border border-dashed text-muted-foreground">
							<AlertCircle className="size-12 text-muted-foreground/30" />
							<div className="text-center space-y-2">
								<h3 className="text-lg font-medium">요청 통계가 활성화되지 않았습니다</h3>
								<p className="text-sm max-w-md mx-auto">
									요청 활성화를 통해 인입 트래픽 통계를 확인하고 애플리케이션 사용량을 모니터링할 수 있습니다. 활성화 후에는 Traefik을 재시작해야 변경 사항이 적용됩니다.
								</p>
							</div>
							<Button 
								variant="secondary" 
								className="mt-2"
								onClick={async () => {
									await toggleRequests({ enable: true })
										.then(() => {
											refetch();
											toast.success("요청 통계가 활성화되었습니다");
										});
								}}
							>
								지금 활성화하기
							</Button>
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
};
