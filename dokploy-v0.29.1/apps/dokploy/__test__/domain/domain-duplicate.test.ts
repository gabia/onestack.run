import { beforeEach, describe, expect, it, vi } from "vitest";
import { TRPCError } from "@trpc/server";

// Mock findFirst to control duplicate detection behavior
const findFirstMock = vi.fn();

vi.mock("@dokploy/server/db", () => {
	const chain: any = () => chain;
	chain.set = () => chain;
	chain.where = () => chain;
	chain.values = () => chain;
	chain.returning = () =>
		Promise.resolve([
			{
				domainId: "new-domain-id",
				host: "new.onestack.run",
				applicationId: "app-1",
			},
		]);
	chain.from = () => chain;
	chain.then = (resolve: (value: unknown) => void) => resolve([]);

	return {
		db: {
			query: {
				domains: {
					findFirst: (...args: any[]) => findFirstMock(...args),
					findMany: vi.fn(() => Promise.resolve([])),
				},
				// Proxy for other tables that might be accessed
				applications: {
					findFirst: vi.fn(() => Promise.resolve(undefined)),
				},
			},
			insert: vi.fn(() => ({
				values: () => ({
					returning: () =>
						Promise.resolve([
							{
								domainId: "new-domain-id",
								host: "new.onestack.run",
								applicationId: "app-1",
							},
						]),
				}),
			})),
			update: vi.fn(() => chain),
			delete: vi.fn(() => chain),
			transaction: vi.fn(async (fn: any) => {
				const tx = {
					insert: () => ({
						values: () => ({
							returning: () =>
								Promise.resolve([
									{
										domainId: "new-domain-id",
										host: "new.onestack.run",
										applicationId: "app-1",
									},
								]),
						}),
					}),
				};
				return fn(tx);
			}),
		},
	};
});

// Mock manageDomain (Traefik integration)
vi.mock("@dokploy/server/utils/traefik/domain", () => ({
	manageDomain: vi.fn(() => Promise.resolve()),
}));

// Mock application lookup
vi.mock("@dokploy/server/services/application", () => ({
	findApplicationById: vi.fn(() =>
		Promise.resolve({ applicationId: "app-1", appName: "test-app" }),
	),
}));

// Mock other dependencies
vi.mock("@dokploy/server/services/web-server-settings", () => ({
	getWebServerSettings: vi.fn(() => Promise.resolve({ serverIp: "1.2.3.4" })),
}));
vi.mock("@dokploy/server/templates", () => ({
	generateRandomDomain: vi.fn(() => "random.traefik.me"),
}));
vi.mock("@dokploy/server/services/cdn", () => ({
	detectCDNProvider: vi.fn(() => null),
}));
vi.mock("@dokploy/server/services/server", () => ({
	findServerById: vi.fn(() =>
		Promise.resolve({ ipAddress: "1.2.3.4" }),
	),
}));

const {
	createDomain,
	updateDomainById,
	checkDomainAvailability,
} = await import("@dokploy/server/services/domain");

describe("도메인 중복 검사", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// ===== createDomain =====

	describe("createDomain", () => {
		it("중복되지 않은 도메인은 정상적으로 생성된다", async () => {
			findFirstMock.mockResolvedValue(undefined);

			const result = await createDomain({
				host: "new.onestack.run",
				applicationId: "app-1",
			} as any);

			expect(result).toBeDefined();
			expect(result.host).toBe("new.onestack.run");
		});

		it("이미 존재하는 도메인으로 생성하면 CONFLICT 에러가 발생한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "existing-id",
				host: "test.onestack.run",
			});

			await expect(
				createDomain({
					host: "test.onestack.run",
					applicationId: "app-2",
				} as any),
			).rejects.toThrow(TRPCError);

			await expect(
				createDomain({
					host: "test.onestack.run",
					applicationId: "app-2",
				} as any),
			).rejects.toThrow("이 도메인은 이미 다른 서비스에서 사용 중입니다");
		});

		it("앞뒤 공백이 있는 도메인도 trim 후 중복 검사한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "existing-id",
				host: "test.onestack.run",
			});

			await expect(
				createDomain({
					host: "  test.onestack.run  ",
					applicationId: "app-2",
				} as any),
			).rejects.toThrow("이 도메인은 이미 다른 서비스에서 사용 중입니다");
		});

		it("다른 도메인이면 정상적으로 생성된다", async () => {
			findFirstMock.mockResolvedValue(undefined);

			const result = await createDomain({
				host: "other.onestack.run",
				applicationId: "app-1",
			} as any);

			expect(result).toBeDefined();
		});
	});

	// ===== updateDomainById =====

	describe("updateDomainById", () => {
		it("host를 변경하지 않으면 중복 검사를 하지 않는다", async () => {
			await updateDomainById("domain-1", { port: 8080 });

			expect(findFirstMock).not.toHaveBeenCalled();
		});

		it("다른 도메인이 같은 host를 사용하면 CONFLICT 에러가 발생한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "other-domain-id",
				host: "taken.onestack.run",
			});

			await expect(
				updateDomainById("domain-1", { host: "taken.onestack.run" }),
			).rejects.toThrow("이 도메인은 이미 다른 서비스에서 사용 중입니다");
		});

		it("자기 자신의 host로 수정하면 중복으로 판단하지 않는다 (findFirst가 null 반환)", async () => {
			// excludeDomainId 조건으로 자기 자신은 제외됨
			findFirstMock.mockResolvedValue(undefined);

			// 에러 없이 정상 동작해야 함
			await expect(
				updateDomainById("domain-1", { host: "my.onestack.run" }),
			).resolves.not.toThrow();
		});

		it("host 변경 시 공백을 trim 후 검사한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "other-id",
				host: "taken.onestack.run",
			});

			await expect(
				updateDomainById("domain-1", { host: "  taken.onestack.run  " }),
			).rejects.toThrow("이 도메인은 이미 다른 서비스에서 사용 중입니다");
		});
	});

	// ===== checkDomainAvailability =====

	describe("checkDomainAvailability", () => {
		it("사용 가능한 도메인이면 available: true를 반환한다", async () => {
			findFirstMock.mockResolvedValue(undefined);

			const result = await checkDomainAvailability("new.onestack.run");

			expect(result).toEqual({ available: true });
		});

		it("이미 사용 중인 도메인이면 available: false를 반환한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "existing-id",
				host: "taken.onestack.run",
			});

			const result = await checkDomainAvailability("taken.onestack.run");

			expect(result).toEqual({ available: false });
		});

		it("excludeDomainId를 전달하면 해당 도메인은 제외하고 검사한다", async () => {
			findFirstMock.mockResolvedValue(undefined);

			const result = await checkDomainAvailability(
				"my.onestack.run",
				"my-domain-id",
			);

			expect(result).toEqual({ available: true });
		});

		it("excludeDomainId 외에 같은 host가 있으면 available: false를 반환한다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "other-domain-id",
				host: "shared.onestack.run",
			});

			const result = await checkDomainAvailability(
				"shared.onestack.run",
				"my-domain-id",
			);

			expect(result).toEqual({ available: false });
		});

		it("공백이 포함된 도메인도 trim 후 검사한다", async () => {
			findFirstMock.mockResolvedValue(undefined);

			const result = await checkDomainAvailability("  new.onestack.run  ");

			expect(result).toEqual({ available: true });
		});
	});

	// ===== 에러 코드 검증 =====

	describe("에러 코드 검증", () => {
		it("createDomain의 중복 에러 코드는 CONFLICT이다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "existing-id",
				host: "test.onestack.run",
			});

			try {
				await createDomain({
					host: "test.onestack.run",
					applicationId: "app-1",
				} as any);
				expect.unreachable("에러가 발생해야 합니다");
			} catch (error) {
				expect(error).toBeInstanceOf(TRPCError);
				expect((error as TRPCError).code).toBe("CONFLICT");
			}
		});

		it("updateDomainById의 중복 에러 코드는 CONFLICT이다", async () => {
			findFirstMock.mockResolvedValue({
				domainId: "other-id",
				host: "test.onestack.run",
			});

			try {
				await updateDomainById("domain-1", { host: "test.onestack.run" });
				expect.unreachable("에러가 발생해야 합니다");
			} catch (error) {
				expect(error).toBeInstanceOf(TRPCError);
				expect((error as TRPCError).code).toBe("CONFLICT");
			}
		});
	});
});
