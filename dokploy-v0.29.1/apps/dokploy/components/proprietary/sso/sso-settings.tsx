"use client";

import {
	Eye,
	Loader2,
	LogIn,
	Pencil,
	Plus,
	Shield,
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useUrl } from "@/utils/hooks/use-url";
import { RegisterOidcDialog } from "./register-oidc-dialog";
import { RegisterSamlDialog } from "./register-saml-dialog";

type ProviderForDetails = {
	id: string | null;
	providerId: string;
	issuer: string;
	domain: string;
	oidcConfig: string | null;
	samlConfig: string | null;
	organizationId: string | null;
};

function parseOidcConfig(config: string | null): {
	clientId?: string;
	scopes?: string[];
} | null {
	if (!config) return null;
	try {
		const parsed = JSON.parse(config) as {
			clientId?: string;
			scopes?: string[];
		};
		return { clientId: parsed.clientId, scopes: parsed.scopes };
	} catch {
		return null;
	}
}

function parseSamlConfig(
	config: string | null,
): { entryPoint?: string } | null {
	if (!config) return null;
	try {
		const parsed = JSON.parse(config) as { entryPoint?: string };
		return { entryPoint: parsed.entryPoint };
	} catch {
		return null;
	}
}

export const SSOSettings = () => {
	const utils = api.useUtils();
	const [detailsProvider, setDetailsProvider] =
		useState<ProviderForDetails | null>(null);
	const baseURL = useUrl();
	const [manageOriginsOpen, setManageOriginsOpen] = useState(false);
	const [editingOrigin, setEditingOrigin] = useState<string | null>(null);
	const [editingValue, setEditingValue] = useState("");
	const [newOriginInput, setNewOriginInput] = useState("");

	const { data: providers, isPending } = api.sso.listProviders.useQuery();
	const { data: trustedOrigins = [] } = api.sso.getTrustedOrigins.useQuery(
		undefined,
		{ enabled: manageOriginsOpen },
	);
	const { mutateAsync: deleteProvider, isPending: isDeleting } =
		api.sso.deleteProvider.useMutation();
	const { mutateAsync: addTrustedOrigin, isPending: isAddingOrigin } =
		api.sso.addTrustedOrigin.useMutation();
	const { mutateAsync: removeTrustedOrigin, isPending: isRemovingOrigin } =
		api.sso.removeTrustedOrigin.useMutation();
	const { mutateAsync: updateTrustedOrigin, isPending: isUpdatingOrigin } =
		api.sso.updateTrustedOrigin.useMutation();

	const handleAddOrigin = async () => {
		const value = newOriginInput.trim();
		if (!value) return;
		try {
			await addTrustedOrigin({ origin: value });
			toast.success("신뢰할 수 있는 오리진이 추가되었습니다");
			setNewOriginInput("");
			await utils.sso.getTrustedOrigins.invalidate();
		} catch (err) {
			toast.error(
				err instanceof Error
					? err.message
					: "신뢰할 수 있는 오리진 추가에 실패했습니다",
			);
		}
	};

	const handleRemoveOrigin = async (origin: string) => {
		try {
			await removeTrustedOrigin({ origin });
			toast.success("신뢰할 수 있는 오리진이 제거되었습니다");
			if (editingOrigin === origin) setEditingOrigin(null);
			await utils.sso.getTrustedOrigins.invalidate();
		} catch (err) {
			toast.error(
				err instanceof Error
					? err.message
					: "신뢰할 수 있는 오리진 제거에 실패했습니다",
			);
		}
	};

	const handleStartEdit = (origin: string) => {
		setEditingOrigin(origin);
		setEditingValue(origin);
	};

	const handleSaveEdit = async () => {
		if (editingOrigin == null || !editingValue.trim()) {
			setEditingOrigin(null);
			return;
		}
		try {
			await updateTrustedOrigin({
				oldOrigin: editingOrigin,
				newOrigin: editingValue.trim(),
			});
			toast.success("신뢰할 수 있는 오리진이 업데이트되었습니다");
			setEditingOrigin(null);
			setEditingValue("");
			await utils.sso.getTrustedOrigins.invalidate();
		} catch (err) {
			toast.error(
				err instanceof Error
					? err.message
					: "신뢰할 수 있는 오리진 업데이트에 실패했습니다",
			);
		}
	};

	const handleCancelEdit = () => {
		setEditingOrigin(null);
		setEditingValue("");
	};

	return (
		<Card className="h-full bg-sidebar rounded-lg max-w-5xl mx-auto w-full">
			<div className="rounded-xl bg-background shadow-md p-6">
				<CardHeader className="flex flex-row justify-between gap-4 flex-wrap px-0 pt-0 pb-6">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<LogIn className="size-6 text-muted-foreground self-center" />
							<CardTitle className="text-xl">SSO (단일 로그인)</CardTitle>
						</div>
						<CardDescription>
							엔터프라이즈 로그인을 위해 OIDC 또는 SAML 인증 제공자를 구성합니다.
							사용자는 조직의 IdP를 통해 로그인할 수 있습니다.
						</CardDescription>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setManageOriginsOpen(true)}
						className="shrink-0"
					>
						<Shield className="mr-2 size-4" />
						오리진 관리
					</Button>
				</CardHeader>

				<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
					{isPending ? (
						<div className="flex items-center gap-2 justify-center min-h-[25vh]">
							<Loader2 className="size-6 text-muted-foreground animate-spin" />
							<span className="text-sm text-muted-foreground">
								제공자 로딩 중...
							</span>
						</div>
					) : (
						<>
							{providers && providers.length > 0 && (
								<div className="flex flex-wrap items-center gap-2">
									<RegisterOidcDialog>
										<Button variant="secondary" size="sm">
											<LogIn className="mr-2 size-4" />
											OIDC 제공자 추가
										</Button>
									</RegisterOidcDialog>
									<RegisterSamlDialog>
										<Button variant="secondary" size="sm">
											<LogIn className="mr-2 size-4" />
											SAML 제공자 추가
										</Button>
									</RegisterSamlDialog>
								</div>
							)}

							{providers && providers.length > 0 ? (
								<div className="space-y-3">
									<span className="text-sm font-medium">등록된 제공자</span>
									<div className="grid gap-3 sm:grid-cols-2">
										{providers.map((provider) => {
											const isOidc = !!provider.oidcConfig;
											const isSaml = !!provider.samlConfig;

											return (
												<Card
													key={provider.id}
													className="overflow-hidden bg-sidebar/40 border shadow-sm"
												>
													<CardHeader className="pb-2">
														<div className="flex items-start justify-between gap-2">
															<div className="flex flex-col gap-1">
																<CardTitle className="text-base font-medium">
																	{provider.providerId}
																</CardTitle>
																<CardDescription className="text-xs">
																	{provider.issuer}
																</CardDescription>
																<div className="flex flex-wrap gap-1 mt-1">
																	<Badge variant="secondary" className="text-xs">
																		{provider.domain}
																	</Badge>
																	{isOidc && (
																		<Badge variant="outline" className="text-xs">
																			OIDC
																		</Badge>
																	)}
																	{isSaml && (
																		<Badge variant="outline" className="text-xs">
																			SAML
																		</Badge>
																	)}
																</div>
															</div>
														</div>
													</CardHeader>
													<CardContent className="flex flex-wrap gap-2 pt-0 pb-4">
														<Button
															variant="ghost"
															size="sm"
															onClick={() =>
																setDetailsProvider({
																	id: provider.id,
																	providerId: provider.providerId,
																	issuer: provider.issuer,
																	domain: provider.domain,
																	oidcConfig: provider.oidcConfig,
																	samlConfig: provider.samlConfig,
																	organizationId: provider.organizationId,
																})
															}
														>
															<Eye className="mr-1 size-3" />
															상세 보기
														</Button>
														{isOidc && (
															<RegisterOidcDialog
																providerId={provider.providerId}
															>
																<Button variant="ghost" size="sm">
																	<Pencil className="mr-1 size-3" />
																	수정
																</Button>
															</RegisterOidcDialog>
														)}
														{isSaml && (
															<RegisterSamlDialog
																providerId={provider.providerId}
															>
																<Button variant="ghost" size="sm">
																	<Pencil className="mr-1 size-3" />
																	수정
																</Button>
															</RegisterSamlDialog>
														)}
														<DialogAction
															title="SSO 제공자 삭제"
															description={`"${provider.providerId}" 제공자를 삭제하시겠습니까? 사용자는 더 이상 이 IdP로 로그인할 수 없습니다.`}
															type="destructive"
															onClick={async () => {
																try {
																	await deleteProvider({
																		providerId: provider.providerId,
																	});
																	toast.success("제공자가 삭제되었습니다");
																	await utils.sso.listProviders.invalidate();
																} catch (err) {
																	toast.error(
																		err instanceof Error
																			? err.message
																			: "제공자 삭제에 실패했습니다",
																	);
																}
															}}
														>
															<Button
																variant="ghost"
																size="sm"
																className="text-destructive hover:text-destructive"
																disabled={isDeleting}
															>
																<Trash2 className="mr-1 size-3" />
																삭제
															</Button>
														</DialogAction>
													</CardContent>
												</Card>
											);
										})}
									</div>
								</div>
							) : (
								<div className="flex flex-col items-center gap-4 justify-center min-h-[35vh] text-center">
									<div className="flex flex-col items-center gap-2 max-w-[400px]">
										<div className="rounded-full bg-muted p-4">
											<LogIn className="size-8 text-muted-foreground" />
										</div>
										<div className="space-y-1">
											<h3 className="text-lg font-semibold">
												SSO 제공자가 없습니다
											</h3>
											<p className="text-sm text-muted-foreground">
												OIDC 또는 SAML 제공자를 추가하여 사용자가 조직의 IdP(예:
												Okta, Azure AD)로 로그인할 수 있게 하세요.
											</p>
										</div>
									</div>
									<div className="flex flex-wrap gap-2 justify-center">
										<RegisterOidcDialog>
											<Button variant="secondary">
												<LogIn className="mr-2 size-4" />
												OIDC 제공자 추가
											</Button>
										</RegisterOidcDialog>
										<RegisterSamlDialog>
											<Button variant="outline">
												<LogIn className="mr-2 size-4" />
												SAML 제공자 추가
											</Button>
										</RegisterSamlDialog>
									</div>
								</div>
							)}
						</>
					)}
				</CardContent>
			</div>

			<Dialog
				open={!!detailsProvider}
				onOpenChange={(open) => !open && setDetailsProvider(null)}
			>
				<DialogContent className="sm:max-w-[480px]">
					{detailsProvider && (
						<>
							<DialogHeader>
								<DialogTitle>SSO 제공자 상세 정보</DialogTitle>
								<DialogDescription>
									설정을 변경하려면 수정을 클릭하세요.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-3 py-2">
								<div className="grid gap-1">
									<span className="text-xs font-medium text-muted-foreground">
										제공자 ID
									</span>
									<p className="rounded-md bg-muted px-2 py-1.5 font-mono text-sm">
										{detailsProvider.providerId}
									</p>
								</div>
								<div className="grid gap-1">
									<span className="text-xs font-medium text-muted-foreground">
										Issuer URL
									</span>
									<p className="break-all rounded-md bg-muted px-2 py-1.5 text-sm">
										{detailsProvider.issuer}
									</p>
								</div>
								<div className="grid gap-1">
									<span className="text-xs font-medium text-muted-foreground">
										도메인
									</span>
									<p className="rounded-md bg-muted px-2 py-1.5 text-sm">
										{detailsProvider.domain}
									</p>
								</div>
								{detailsProvider.oidcConfig && (
									<>
										{(() => {
											const oidc = parseOidcConfig(detailsProvider.oidcConfig);
											if (!oidc) return null;
											return (
												<>
													{oidc.clientId && (
														<div className="grid gap-1">
															<span className="text-xs font-medium text-muted-foreground">
																클라이언트 ID
															</span>
															<p className="rounded-md bg-muted px-2 py-1.5 font-mono text-sm">
																{oidc.clientId}
															</p>
														</div>
													)}
													{oidc.scopes && oidc.scopes.length > 0 && (
														<div className="grid gap-1">
															<span className="text-xs font-medium text-muted-foreground">
																Scopes
															</span>
															<p className="rounded-md bg-muted px-2 py-1.5 text-sm">
																{oidc.scopes.join(" ")}
															</p>
														</div>
													)}
												</>
											);
										})()}
									</>
								)}
								{detailsProvider.samlConfig && (
									<>
										{(() => {
											const saml = parseSamlConfig(detailsProvider.samlConfig);
											if (!saml?.entryPoint) return null;
											return (
												<div className="grid gap-1">
													<span className="text-xs font-medium text-muted-foreground">
														Entry point
													</span>
													<p className="break-all rounded-md bg-muted px-2 py-1.5 text-sm">
														{saml.entryPoint}
													</p>
												</div>
											);
										})()}
									</>
								)}
								<div className="grid gap-1">
									<span className="text-xs font-medium text-muted-foreground">
										콜백 URL (IdP에서 설정)
									</span>
									<p className="break-all rounded-md bg-muted px-2 py-1.5 font-mono text-xs">
										{baseURL || "{baseURL}"}
										{detailsProvider.samlConfig
											? "/api/auth/sso/saml2/callback/"
											: "/api/auth/sso/callback/"}
										{detailsProvider.providerId}
									</p>
									{!baseURL && (
										<p className="text-xs text-muted-foreground">
											{"{baseURL}"}을 실제 Dokploy URL(예:
											https://your-domain.com)로 바꾸세요.
										</p>
									)}
								</div>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setDetailsProvider(null)}
								>
									닫기
								</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={manageOriginsOpen} onOpenChange={setManageOriginsOpen}>
				<DialogContent className="sm:max-w-[480px]">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<Shield className="size-5" />
							신뢰할 수 있는 오리진
						</DialogTitle>
						<DialogDescription>
							SSO 콜백을 위해 허용된 오리진을 관리합니다.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-2">
						<div className="space-y-2">
							<span className="text-sm font-medium">현재 오리진</span>
							{trustedOrigins.length === 0 ? (
								<p className="rounded-md border border-dashed bg-muted/30 px-3 py-4 text-center text-sm text-muted-foreground">
									등록된 오리진이 없습니다. 아래에서 추가하세요.
								</p>
							) : (
								<ul className="flex flex-col gap-2">
									{trustedOrigins.map((origin) => (
										<li
											key={origin}
											className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2"
										>
											{editingOrigin === origin ? (
												<>
													<Input
														value={editingValue}
														onChange={(e) => setEditingValue(e.target.value)}
														placeholder="https://..."
														className="flex-1 font-mono text-sm"
														autoFocus
													/>
													<Button
														size="sm"
														onClick={handleSaveEdit}
														disabled={!editingValue.trim() || isUpdatingOrigin}
													>
														저장
													</Button>
													<Button
														size="sm"
														variant="ghost"
														onClick={handleCancelEdit}
													>
														취소
													</Button>
												</>
											) : (
												<>
													<span className="flex-1 break-all font-mono text-sm">
														{origin}
													</span>
													<Button
														variant="ghost"
														size="icon"
														className="size-8 shrink-0"
														onClick={() => handleStartEdit(origin)}
													>
														<Pencil className="size-3.5" />
													</Button>
													<DialogAction
														title="신뢰할 수 있는 오리진 제거"
														description={`"${origin}" 오리진을 제거하시겠습니까?`}
														type="destructive"
														onClick={async () => handleRemoveOrigin(origin)}
													>
														<Button
															variant="ghost"
															size="icon"
															className="size-8 shrink-0 text-destructive hover:text-destructive"
															disabled={isRemovingOrigin}
														>
															<Trash2 className="size-3.5" />
														</Button>
													</DialogAction>
												</>
											)}
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="space-y-2">
							<span className="text-sm font-medium">오리진 추가</span>
							<div className="flex gap-2">
								<Input
									value={newOriginInput}
									onChange={(e) => setNewOriginInput(e.target.value)}
									placeholder="https://example.com"
									className="font-mono text-sm"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											void handleAddOrigin();
										}
									}}
								/>
								<Button
									size="sm"
									onClick={handleAddOrigin}
									disabled={!newOriginInput.trim() || isAddingOrigin}
								>
									<Plus className="mr-1 size-4" />
									추가
								</Button>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setManageOriginsOpen(false)}
						>
							닫기
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Card>
	);
};
