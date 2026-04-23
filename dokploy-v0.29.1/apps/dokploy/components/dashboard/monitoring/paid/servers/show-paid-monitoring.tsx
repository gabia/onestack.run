import { Activity, Clock, Cpu, HardDrive, Loader2, MemoryStick } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import { CPUChart } from "./cpu-chart";
import { DiskChart } from "./disk-chart";
import { MemoryChart } from "./memory-chart";
import { NetworkChart } from "./network-chart";

const REFRESH_INTERVALS = {
	"5000": "5초",
	"10000": "10초",
	"20000": "20초",
	"30000": "30초",
} as const;

const DATA_POINTS_OPTIONS = {
	"50": "50개 포인트",
	"200": "200개 포인트",
	"500": "500개 포인트",
	"800": "800개 포인트",
	"1200": "1200개 포인트",
	"1600": "1600개 포인트",
	"2000": "2000개 포인트",
	all: "전체 포인트",
} as const;

interface SystemMetrics {
	cpu: string;
	cpuModel: string;
	cpuCores: number;
	cpuPhysicalCores: number;
	cpuSpeed: number;
	os: string;
	distro: string;
	kernel: string;
	arch: string;
	memUsed: string;
	memUsedGB: string;
	memTotal: string;
	uptime: number;
	diskUsed: string;
	totalDisk: string;
	networkIn: string;
	networkOut: string;
	timestamp: string;
}

interface Props {
	BASE_URL?: string;
	token?: string;
}

export const ShowPaidMonitoring = ({
	BASE_URL = process.env.NEXT_PUBLIC_METRICS_URL ||
		"http://localhost:3001/metrics",
	token = process.env.NEXT_PUBLIC_METRICS_TOKEN || "my-token",
}: Props) => {
	const [historicalData, setHistoricalData] = useState<SystemMetrics[]>([]);
	const [metrics, setMetrics] = useState<SystemMetrics>({} as SystemMetrics);
	const [dataPoints, setDataPoints] =
		useState<keyof typeof DATA_POINTS_OPTIONS>("50");
	const [refreshInterval, setRefreshInterval] = useState<string>("5000");

	const {
		data,
		isLoading,
		error: queryError,
	} = api.server.getServerMetrics.useQuery(
		{
			url: BASE_URL,
			token,
			dataPoints,
		},
		{
			refetchInterval:
				dataPoints === "all" ? undefined : Number.parseInt(refreshInterval),
			enabled: true,
		},
	);

	useEffect(() => {
		if (!data) return;

		const formattedData = data.map((metric: SystemMetrics) => ({
			timestamp: metric.timestamp,
			cpu: Number.parseFloat(metric.cpu),
			cpuModel: metric.cpuModel,
			cpuCores: metric.cpuCores,
			cpuPhysicalCores: metric.cpuPhysicalCores,
			cpuSpeed: metric.cpuSpeed,
			os: metric.os,
			distro: metric.distro,
			kernel: metric.kernel,
			arch: metric.arch,
			memUsed: Number.parseFloat(metric.memUsed),
			memUsedGB: Number.parseFloat(metric.memUsedGB),
			memTotal: Number.parseFloat(metric.memTotal),
			networkIn: Number.parseFloat(metric.networkIn),
			networkOut: Number.parseFloat(metric.networkOut),
			diskUsed: Number.parseFloat(metric.diskUsed),
			totalDisk: Number.parseFloat(metric.totalDisk),
			uptime: metric.uptime,
		}));

		// @ts-ignore
		setHistoricalData(formattedData);
		// @ts-ignore
		setMetrics(formattedData[formattedData.length - 1] || {});
	}, [data]);

	const formatUptime = (seconds: number): string => {
		const days = Math.floor(seconds / (24 * 60 * 60));
		const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((seconds % (60 * 60)) / 60);

		return `${days}일 ${hours}시간 ${minutes}분`;
	};

	if (isLoading) {
		return (
			<div className="flex h-[400px] w-full items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (queryError) {
		return (
			<div className="flex min-h-[55vh] w-full items-center justify-center p-4">
				<div className="max-w-xl text-center">
					<p className="mb-2 text-base font-medium leading-none text-muted-foreground">
						메트릭을 가져오는 중 오류가 발생했습니다
					</p>
					<p className="whitespace-pre-line text-sm text-destructive">
						{queryError instanceof Error
							? queryError.message
							: "메트릭을 가져오지 못했습니다. 모니터링 인스턴스가 올바르게 구성되었는지 확인하십시오."}
					</p>
					<p className="text-sm text-muted-foreground">URL: {BASE_URL}</p>
				</div>
			</div>
		);
	}

	return (
		<Card className="h-full bg-sidebar rounded-lg w-full">
			<div className="rounded-xl bg-background shadow-md p-6">
				<CardHeader className="flex flex-row justify-between gap-4 flex-wrap px-0 pt-0 pb-6">
					<div className="flex flex-col gap-1">
						<CardTitle className="text-xl flex flex-row gap-2">
							<Activity className="size-6 text-muted-foreground self-center" />
							시스템 모니터링
						</CardTitle>
						<CardDescription>서버의 리소스 사용량과 시스템 정보를 실시간으로 확인합니다.</CardDescription>
					</div>
					<div className="flex items-center gap-4 flex-wrap">
						<div className="flex flex-col gap-1">
							<span className="text-xs text-muted-foreground font-medium">데이터 포인트</span>
							<Select
								value={dataPoints}
								onValueChange={(value: keyof typeof DATA_POINTS_OPTIONS) =>
									setDataPoints(value)
								}
							>
								<SelectTrigger className="w-[140px] h-9">
									<SelectValue placeholder="포인트 선택" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(DATA_POINTS_OPTIONS).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-xs text-muted-foreground font-medium">새로고침 간격</span>
							<Select
								value={refreshInterval}
								onValueChange={(value: keyof typeof REFRESH_INTERVALS) =>
									setRefreshInterval(value)
								}
							>
								<SelectTrigger className="w-[140px] h-9">
									<SelectValue placeholder="간격 선택" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(REFRESH_INTERVALS).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
					{/* Stats Cards */}
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
						<Card className="rounded-xl border bg-sidebar/40 shadow-sm p-4">
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">업타임</h3>
							</div>
							<p className="mt-2 text-xl font-bold tracking-tight">
								{formatUptime(metrics.uptime || 0)}
							</p>
						</Card>

						<Card className="rounded-xl border bg-sidebar/40 shadow-sm p-4">
							<div className="flex items-center gap-2">
								<Cpu className="h-4 w-4 text-muted-foreground" />
								<h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">CPU 사용률</h3>
							</div>
							<p className="mt-2 text-xl font-bold tracking-tight">{metrics.cpu}%</p>
						</Card>

						<Card className="rounded-xl border bg-sidebar/40 shadow-sm p-4">
							<div className="flex items-center gap-2">
								<MemoryStick className="h-4 w-4 text-muted-foreground" />
								<h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">메모리 사용률</h3>
							</div>
							<p className="mt-2 text-xl font-bold tracking-tight">
								{metrics.memUsedGB} GB / {metrics.memTotal} GB
							</p>
						</Card>

						<Card className="rounded-xl border bg-sidebar/40 shadow-sm p-4">
							<div className="flex items-center gap-2">
								<HardDrive className="h-4 w-4 text-muted-foreground" />
								<h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">디스크 사용률</h3>
							</div>
							<p className="mt-2 text-xl font-bold tracking-tight">{metrics.diskUsed}%</p>
						</Card>
					</div>

					{/* System Information */}
					<Card className="rounded-xl border bg-sidebar/40 shadow-sm p-5">
						<h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
							<Activity className="size-4 text-primary" />
							시스템 정보
						</h3>
						<div className="grid gap-6 md:grid-cols-2">
							<div className="space-y-1">
								<h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">프로세서 (CPU)</h4>
								<p className="text-sm font-medium">{metrics.cpuModel}</p>
								<p className="text-xs text-muted-foreground">
									{metrics.cpuPhysicalCores} 물리 코어 ({metrics.cpuCores}{" "}
									스레드) @ {metrics.cpuSpeed}GHz
								</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">운영체제</h4>
								<p className="text-sm font-medium">{metrics.distro}</p>
								<p className="text-xs text-muted-foreground">
									커널: {metrics.kernel} ({metrics.arch})
								</p>
							</div>
						</div>
					</Card>

					{/* Charts Grid */}
					<div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
						<CPUChart data={historicalData} />
						<MemoryChart data={historicalData} />
						<DiskChart data={metrics} />
						<NetworkChart data={historicalData} />
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
