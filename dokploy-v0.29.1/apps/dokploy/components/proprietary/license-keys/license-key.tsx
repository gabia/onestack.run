import { Key, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { api } from "@/utils/api";

export function LicenseKeySettings() {
	const utils = api.useUtils();
	const { data, isPending } = api.licenseKey.getEnterpriseSettings.useQuery();
	const { mutateAsync: updateEnterpriseSettings, isPending: isSaving } =
		api.licenseKey.updateEnterpriseSettings.useMutation();
	const { mutateAsync: activateLicenseKey, isPending: isActivating } =
		api.licenseKey.activate.useMutation();
	const { mutateAsync: validateLicenseKey, isPending: isValidating } =
		api.licenseKey.validate.useMutation();
	const { mutateAsync: deactivateLicenseKey, isPending: isDeactivating } =
		api.licenseKey.deactivate.useMutation();
	const { data: haveValidLicenseKey, isPending: isCheckingLicenseKey } =
		api.licenseKey.haveValidLicenseKey.useQuery();
	const [licenseKey, setLicenseKey] = useState("");

	useEffect(() => {
		if (data?.licenseKey) {
			setLicenseKey(data.licenseKey);
		}
	}, [data?.licenseKey]);

	const enabled = !!data?.enableEnterpriseFeatures;

	return (
		<Card className="h-full bg-sidebar rounded-lg max-w-5xl mx-auto w-full">
			<div className="rounded-xl bg-background shadow-md p-6">
				{isCheckingLicenseKey ? (
					<div className="flex items-center gap-2 justify-center min-h-[35vh]">
						<Loader2 className="size-6 text-muted-foreground animate-spin" />
						<span className="text-sm text-muted-foreground">
							라이선스 키 확인 중...
						</span>
					</div>
				) : (
					<>
						<CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap px-0 pt-0 pb-6">
							<div className="flex flex-col gap-1">
								<CardTitle className="text-xl flex flex-row gap-2">
									<Key className="size-6 text-muted-foreground self-center" />
									라이선스 키
								</CardTitle>
								<CardDescription>
									엔터프라이즈 기능을 잠금 해제하려면 라이선스 키가 필요합니다.
								</CardDescription>
							</div>

							{enabled && (
								<div className="flex items-center gap-2">
									<span className="text-xs text-muted-foreground">
										{enabled ? "활성화됨" : "비활성화됨"}
									</span>
									<Switch
										checked={enabled}
										disabled={isPending || isSaving || isDeactivating}
										onCheckedChange={async (next) => {
											try {
												await updateEnterpriseSettings({
													enableEnterpriseFeatures: next,
												});
												await utils.licenseKey.getEnterpriseSettings.invalidate();
												toast.success("엔터프라이즈 설정이 업데이트되었습니다");
											} catch (error) {
												console.error(error);
												toast.error("엔터프라이즈 설정 업데이트에 실패했습니다");
											}
										}}
									/>
								</div>
							)}
						</CardHeader>

						<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
							{enabled ? (
								<div className="space-y-6">
									<p className="text-sm text-muted-foreground">
										추가 기능을 사용하려면 엔터프라이즈 라이선스 키가 필요합니다.{" "}
										<Link
											href="https://dokploy.com/contact"
											target="_blank"
											rel="noreferrer"
											className="underline underline-offset-4"
										>
											문의하기
										</Link>
									</p>

									<div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
										<div className="space-y-2">
											<label
												className="text-sm font-medium"
												htmlFor="licenseKey"
											>
												라이선스 키
											</label>
											<Input
												id="licenseKey"
												placeholder="엔터프라이즈 라이선스 키를 입력하세요"
												value={licenseKey}
												onChange={(e) => setLicenseKey(e.target.value)}
											/>
										</div>
										<div className="md:justify-self-end flex gap-2">
											{haveValidLicenseKey && (
												<DialogAction
													title="라이선스 키 비활성화"
													description="정말로 이 라이선스 키를 비활성화하시겠습니까? 엔터프라이즈 기능이 비활성화됩니다."
													onClick={async () => {
														try {
															await deactivateLicenseKey();
															await utils.licenseKey.getEnterpriseSettings.invalidate();
															await utils.licenseKey.haveValidLicenseKey.invalidate();
															setLicenseKey("");
															toast.success("라이선스 키가 비활성화되었습니다");
														} catch (error) {
															console.error(error);
															toast.error(
																error instanceof Error
																	? error.message
																	: "라이선스 키 비활성화에 실패했습니다",
															);
														}
													}}
													disabled={isDeactivating || !haveValidLicenseKey}
												>
													<Button
														variant="destructive"
														disabled={isDeactivating || !haveValidLicenseKey}
														isLoading={isDeactivating}
													>
														비활성화
													</Button>
												</DialogAction>
											)}
											{haveValidLicenseKey && (
												<Button
													variant="outline"
													disabled={
														isSaving || isCheckingLicenseKey || isDeactivating
													}
													isLoading={isValidating}
													onClick={async () => {
														try {
															const valid = await validateLicenseKey();
															if (valid) {
																toast.success("유효한 라이선스 키입니다");
															} else {
																toast.error("유효하지 않은 라이선스 키입니다");
															}
														} catch (error) {
															console.error(error);
															toast.error(
																error instanceof Error
																	? error.message
																	: "라이선스 키 확인에 실패했습니다",
															);
														}
													}}
												>
													검증
												</Button>
											)}
											{!haveValidLicenseKey && (
												<Button
													variant="secondary"
													disabled={
														isSaving ||
														isValidating ||
														isDeactivating ||
														!licenseKey.trim()
													}
													isLoading={isActivating}
													onClick={async () => {
														try {
															await activateLicenseKey({ licenseKey });
															await utils.licenseKey.getEnterpriseSettings.invalidate();
															await utils.licenseKey.haveValidLicenseKey.invalidate();
															toast.success("라이선스 키가 활성화되었습니다");
														} catch (error) {
															console.error(error);
															toast.error(
																error instanceof Error
																	? error.message
																	: "라이선스 키 활성화에 실패했습니다",
															);
														}
													}}
												>
													활성화
												</Button>
											)}
										</div>
									</div>
								</div>
							) : (
								<div className="flex flex-col items-center gap-6 justify-center min-h-[35vh] text-center">
									<div className="flex flex-col items-center gap-3 max-w-[450px]">
										<div className="rounded-full bg-muted p-4">
											<ShieldCheck className="size-10 text-muted-foreground" />
										</div>
										<div className="space-y-1.5">
											<h3 className="text-xl font-semibold">엔터프라이즈 기능</h3>
											<p className="text-sm text-muted-foreground">
												SSO, 감사 로그, 화이트레이블링 등 강력한 고급 기능을
												사용해 보세요.
											</p>
										</div>
									</div>

									<Button
										onClick={async () => {
											try {
												await updateEnterpriseSettings({
													enableEnterpriseFeatures: true,
												});
												await utils.licenseKey.getEnterpriseSettings.invalidate();
												toast.success("엔터프라이즈 기능이 활성화되었습니다");
											} catch (error) {
												console.error(error);
												toast.error("엔터프라이즈 기능 활성화에 실패했습니다");
											}
										}}
										isLoading={isSaving}
										disabled={isPending || isDeactivating}
										size="lg"
									>
										엔터프라이즈 기능 활성화
									</Button>
								</div>
							)}
						</CardContent>
					</>
				)}
			</div>
		</Card>
	);
}
