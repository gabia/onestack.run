import { File, Loader2 } from "lucide-react";
import { CodeEditor } from "@/components/shared/code-editor";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { UpdateTraefikConfig } from "./update-traefik-config";

interface Props {
	applicationId: string;
}

export const ShowTraefikConfig = ({ applicationId }: Props) => {
	const { data: permissions } = api.user.getPermissions.useQuery();
	const canRead = permissions?.traefikFiles.read ?? false;
	const { data, isPending } = api.application.readTraefikConfig.useQuery(
		{
			applicationId,
		},
		{ enabled: !!applicationId && canRead },
	);

	if (!canRead) return null;

	return (
		<Card className="bg-background">
			<CardHeader className="flex flex-row justify-between">
				<div>
					<CardTitle className="text-xl">Traefik</CardTitle>
					<CardDescription>
						Traefik 설정을 수정합니다. 드물지만 특정 설정을 추가해야 할 수 있습니다.
						잘못 수정하면 Traefik과 애플리케이션이 작동하지 않을 수 있으니 주의하세요
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{isPending ? (
					<span className="text-base text-muted-foreground flex flex-row gap-3 items-center justify-center min-h-[10vh]">
						Loading...
						<Loader2 className="animate-spin" />
					</span>
				) : !data ? (
					<div className="flex w-full flex-col items-center justify-center gap-3 pt-10">
						<File className="size-8 text-muted-foreground" />
						<span className="text-base text-muted-foreground">
							No traefik config detected
						</span>
					</div>
				) : (
					<div className="flex flex-col pt-2 relative">
						<div className="flex flex-col gap-6 max-h-[35rem] min-h-[10rem] overflow-y-auto">
							<CodeEditor
								lineWrapping
								value={data || "Empty"}
								disabled
								className="font-mono"
							/>
							<div className="flex justify-end absolute z-50 right-6 top-6">
								<UpdateTraefikConfig applicationId={applicationId} />
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
