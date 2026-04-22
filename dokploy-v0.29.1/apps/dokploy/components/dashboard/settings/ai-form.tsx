"use client";

import { BotIcon, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DialogAction } from "@/components/shared/dialog-action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { HandleAi } from "./handle-ai";

export const AiForm = () => {
	const { data: aiConfigs, refetch, isPending } = api.ai.getAll.useQuery();
	const { mutateAsync, isPending: isRemoving } = api.ai.delete.useMutation();

	return (
		<div className="w-full">
			<Card className="h-full bg-sidebar rounded-lg max-w-5xl mx-auto">
				<div className="rounded-xl bg-background shadow-md p-6">
					<CardHeader className="flex flex-row gap-2 justify-between px-0 pt-0 pb-6">
						<div>
							<CardTitle className="text-xl flex flex-row gap-2">
								<BotIcon className="size-6 text-muted-foreground self-center" />
								AI 설정
							</CardTitle>
							<CardDescription>AI 구성을 관리합니다.</CardDescription>
						</div>
						{aiConfigs && aiConfigs?.length > 0 && <HandleAi />}
					</CardHeader>
					<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
						{isPending ? (
							<div className="flex flex-row gap-2 items-center justify-center text-sm text-muted-foreground min-h-[25vh]">
								<span>로딩 중...</span>
								<Loader2 className="animate-spin size-4" />
							</div>
						) : (
							<>
								{aiConfigs?.length === 0 ? (
									<div className="flex flex-col items-center gap-3  min-h-[25vh] justify-center">
										<BotIcon className="size-8 self-center text-muted-foreground" />
										<span className="text-base text-muted-foreground text-center">
											AI 구성이 없습니다
										</span>
										<HandleAi />
									</div>
								) : (
									<div className="flex flex-col gap-4 rounded-lg min-h-[25vh]">
										{aiConfigs?.map((config) => (
											<div
												key={config.aiId}
												className="flex items-center justify-between bg-sidebar p-1 w-full rounded-lg"
											>
												<div className="flex items-center justify-between p-3.5 rounded-lg bg-background border  w-full">
													<div>
														<span className="text-sm font-medium">
															{config.name}
														</span>
														<CardDescription>{config.model}</CardDescription>
													</div>
													<div className="flex justify-between items-center">
														<HandleAi aiId={config.aiId} />
														<DialogAction
															title="AI 삭제"
															description="이 AI 구성을 정말로 삭제하시겠습니까?"
															type="destructive"
															onClick={async () => {
																await mutateAsync({
																	aiId: config.aiId,
																})
																	.then(() => {
																		toast.success("AI가 성공적으로 삭제되었습니다");
																		refetch();
																	})
																	.catch(() => {
																		toast.error("AI 삭제 중 오류가 발생했습니다");
																	});
															}}
														>
															<Button
																variant="ghost"
																size="icon"
																className="group hover:bg-red-500/10 "
																isLoading={isRemoving}
															>
																<Trash2 className="size-4 text-primary group-hover:text-red-500" />
															</Button>
														</DialogAction>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</>
						)}
					</CardContent>
				</div>
			</Card>
		</div>
	);
};
