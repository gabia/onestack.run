import { ServerIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { ShowDokployActions } from "./servers/actions/show-dokploy-actions";
import { ShowStorageActions } from "./servers/actions/show-storage-actions";
import { ShowTraefikActions } from "./servers/actions/show-traefik-actions";
import { ToggleDockerCleanup } from "./servers/actions/toggle-docker-cleanup";
import { UpdateServer } from "./web-server/update-server";

export const WebServer = () => {
	const { data: webServerSettings } =
		api.settings.getWebServerSettings.useQuery();

	const { data: dokployVersion } = api.settings.getDokployVersion.useQuery();

	return (
		<div className="w-full">
			{/* <Card className={cn("rounded-lg w-full bg-transparent p-0", className)}></Card> */}
			<Card className="h-full bg-sidebar rounded-lg max-w-5xl mx-auto">
				<div className="rounded-xl bg-background shadow-md p-6">
					<CardHeader className="px-0 pt-0 pb-6">
						<CardTitle className="text-xl flex flex-row gap-2">
							<ServerIcon className="size-6 text-muted-foreground self-center" />
							웹 서버
						</CardTitle>
						<CardDescription>웹 서버를 재시작하거나 정리합니다.</CardDescription>
					</CardHeader>
					{/* <CardHeader>
						<CardTitle className="text-xl">
							Web Server
						</CardTitle>
						<CardDescription>
							Reload or clean the web server.
						</CardDescription>
					</CardHeader> */}
					<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
						<div className="grid md:grid-cols-2 gap-4">
							<ShowDokployActions />
							<ShowTraefikActions />
							<ShowStorageActions />

							<UpdateServer />
						</div>

						<div className="flex items-center flex-wrap justify-between gap-4">
							<span className="text-sm text-muted-foreground">
								서버 IP: {webServerSettings?.serverIp}
							</span>
							<span className="text-sm text-muted-foreground">
								버전: {dokployVersion}
							</span>

							<ToggleDockerCleanup />
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
};
