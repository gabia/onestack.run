import { GitBranch, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { SaveDockerProvider } from "@/components/dashboard/application/general/generic/save-docker-provider";
import { SaveGitProvider } from "@/components/dashboard/application/general/generic/save-git-provider";
import { SaveGiteaProvider } from "@/components/dashboard/application/general/generic/save-gitea-provider";
import { SaveGithubProvider } from "@/components/dashboard/application/general/generic/save-github-provider";
import {
	BitbucketIcon,
	DockerIcon,
	GiteaIcon,
	GithubIcon,
	GitIcon,
	GitlabIcon,
} from "@/components/icons/data-tools-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import { SaveBitbucketProvider } from "./save-bitbucket-provider";
import { SaveDragNDrop } from "./save-drag-n-drop";
import { SaveGitlabProvider } from "./save-gitlab-provider";
import { UnauthorizedGitProvider } from "./unauthorized-git-provider";

type TabState =
	| "github"
	| "docker"
	| "git"
	| "drop"
	| "gitlab"
	| "bitbucket"
	| "gitea";

interface Props {
	applicationId: string;
}

export const ShowProviderForm = ({ applicationId }: Props) => {
	const { data: githubProviders, isPending: isLoadingGithub } =
		api.github.githubProviders.useQuery();
	const { data: gitlabProviders, isPending: isLoadingGitlab } =
		api.gitlab.gitlabProviders.useQuery();
	const { data: bitbucketProviders, isPending: isLoadingBitbucket } =
		api.bitbucket.bitbucketProviders.useQuery();
	const { data: giteaProviders, isPending: isLoadingGitea } =
		api.gitea.giteaProviders.useQuery();

	const { data: application, refetch } = api.application.one.useQuery({
		applicationId,
	});
	const { mutateAsync: disconnectGitProvider } =
		api.application.disconnectGitProvider.useMutation();

	const [tab, setSab] = useState<TabState>(application?.sourceType || "github");

	const isLoading =
		isLoadingGithub || isLoadingGitlab || isLoadingBitbucket || isLoadingGitea;

	const handleDisconnect = async () => {
		try {
			await disconnectGitProvider({ applicationId });
			toast.success("Repository disconnected successfully");
			await refetch();
		} catch (error) {
			toast.error(
				`Failed to disconnect repository: ${
					error instanceof Error ? error.message : "Unknown error"
				}`,
			);
		}
	};

	if (isLoading) {
		return (
			<Card className="group relative w-full bg-transparent">
				<CardHeader>
					<CardTitle className="flex items-start justify-between">
						<div className="flex flex-col gap-2">
							<span className="flex flex-col space-y-0.5">프로바이더</span>
							<p className="flex items-center text-sm font-normal text-muted-foreground">
								코드 소스를 선택하세요
							</p>
						</div>
						<div className="hidden space-y-1 text-sm font-normal md:block">
							<GitBranch className="size-6 text-muted-foreground" />
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex min-h-[25vh] items-center justify-center">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Loader2 className="size-4 animate-spin" />
							<span>Loading providers...</span>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Check if user doesn't have access to the current git provider
	if (
		application &&
		!application.hasGitProviderAccess &&
		application.sourceType !== "docker" &&
		application.sourceType !== "drop"
	) {
		return (
			<Card className="group relative w-full bg-transparent">
				<CardHeader>
					<CardTitle className="flex items-start justify-between">
						<div className="flex flex-col gap-2">
							<span className="flex flex-col space-y-0.5">프로바이더</span>
							<p className="flex items-center text-sm font-normal text-muted-foreground">
								인증되지 않은 프로바이더를 통한 저장소 연결
							</p>
						</div>
						<div className="hidden space-y-1 text-sm font-normal md:block">
							<GitBranch className="size-6 text-muted-foreground" />
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<UnauthorizedGitProvider
						service={application}
						onDisconnect={handleDisconnect}
					/>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="group relative w-full bg-transparent">
			<CardHeader>
				<CardTitle className="flex items-start justify-between">
					<div className="flex flex-col gap-2">
						<span className="flex flex-col space-y-0.5">프로바이더</span>
						<p className="flex items-center text-sm font-normal text-muted-foreground">
							코드 소스를 선택하세요
						</p>
					</div>
					<div className="hidden space-y-1 text-sm font-normal md:block">
						<GitBranch className="size-6 text-muted-foreground" />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs
					value={tab}
					className="w-full"
					onValueChange={(e) => {
						setSab(e as TabState);
					}}
				>
					<div className="w-full overflow-x-auto">
						<TabsList className="flex gap-0 justify-start bg-transparent w-full border-b border-border rounded-none p-0 h-auto">
							<TabsTrigger
								value="github"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<GithubIcon className="size-4 text-current fill-current" />
								Github
							</TabsTrigger>
							<TabsTrigger
								value="gitlab"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<GitlabIcon className="size-4 text-current fill-current" />
								Gitlab
							</TabsTrigger>
							<TabsTrigger
								value="bitbucket"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<BitbucketIcon className="size-4 text-current fill-current" />
								Bitbucket
							</TabsTrigger>
							<TabsTrigger
								value="gitea"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<GiteaIcon className="size-4 text-current fill-current" />
								Gitea
							</TabsTrigger>
							<TabsTrigger
								value="docker"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<DockerIcon className="size-5 text-current" />
								Docker
							</TabsTrigger>
							<TabsTrigger
								value="git"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<GitIcon />
								Git
							</TabsTrigger>
							<TabsTrigger
								value="drop"
								className="rounded-none border-b-2 border-b-transparent -mb-px gap-2 px-3.5 py-2 text-sm text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-medium"
							>
								<UploadCloud className="size-5 text-current" />
								Drop
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="github" className="w-full p-2">
						{githubProviders && githubProviders?.length > 0 ? (
							<SaveGithubProvider applicationId={applicationId} />
						) : (
							<div className="flex flex-col items-center gap-3 min-h-[25vh] justify-center">
								<GithubIcon className="size-8 text-muted-foreground" />
								<span className="text-base text-muted-foreground">
									GitHub를 사용하여 배포하려면 먼저 계정을 설정해야 합니다.{" "}
									<Link
										href="/dashboard/settings/git-providers"
										className="text-primary"
									>
										설정
									</Link>
									에서 설정해 주세요.
								</span>
							</div>
						)}
					</TabsContent>
					<TabsContent value="gitlab" className="w-full p-2">
						{gitlabProviders && gitlabProviders?.length > 0 ? (
							<SaveGitlabProvider applicationId={applicationId} />
						) : (
							<div className="flex flex-col items-center gap-3 min-h-[25vh] justify-center">
								<GitlabIcon className="size-8 text-muted-foreground" />
								<span className="text-base text-muted-foreground">
									GitLab을 사용하여 배포하려면 먼저 계정을 설정해야 합니다.{" "}
									<Link
										href="/dashboard/settings/git-providers"
										className="text-primary"
									>
										설정
									</Link>
									에서 설정해 주세요.
								</span>
							</div>
						)}
					</TabsContent>
					<TabsContent value="bitbucket" className="w-full p-2">
						{bitbucketProviders && bitbucketProviders?.length > 0 ? (
							<SaveBitbucketProvider applicationId={applicationId} />
						) : (
							<div className="flex flex-col items-center gap-3 min-h-[25vh] justify-center">
								<BitbucketIcon className="size-8 text-muted-foreground" />
								<span className="text-base text-muted-foreground">
									Bitbucket을 사용하여 배포하려면 먼저 계정을 설정해야 합니다.{" "}
									<Link
										href="/dashboard/settings/git-providers"
										className="text-primary"
									>
										설정
									</Link>
									에서 설정해 주세요.
								</span>
							</div>
						)}
					</TabsContent>
					<TabsContent value="gitea" className="w-full p-2">
						{giteaProviders && giteaProviders?.length > 0 ? (
							<SaveGiteaProvider applicationId={applicationId} />
						) : (
							<div className="flex flex-col items-center gap-3 min-h-[25vh] justify-center">
								<GiteaIcon className="size-8 text-muted-foreground" />
								<span className="text-base text-muted-foreground">
									Gitea를 사용하여 배포하려면 먼저 계정을 설정해야 합니다.{" "}
									<Link
										href="/dashboard/settings/git-providers"
										className="text-primary"
									>
										설정
									</Link>
									에서 설정해 주세요.
								</span>
							</div>
						)}
					</TabsContent>
					<TabsContent value="docker" className="w-full p-2">
						<SaveDockerProvider applicationId={applicationId} />
					</TabsContent>

					<TabsContent value="git" className="w-full p-2">
						<SaveGitProvider applicationId={applicationId} />
					</TabsContent>
					<TabsContent value="drop" className="w-full p-2">
						<SaveDragNDrop applicationId={applicationId} />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};
