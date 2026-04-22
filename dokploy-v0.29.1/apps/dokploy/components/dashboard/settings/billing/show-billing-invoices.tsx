import { CreditCard, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShowInvoices } from "./show-invoices";

const navigationItems = [
	{
		name: "Subscription",
		href: "/dashboard/settings/billing",
		icon: CreditCard,
	},
	{
		name: "Invoices",
		href: "/dashboard/settings/invoices",
		icon: FileText,
	},
];

export const ShowBillingInvoices = () => {
	const router = useRouter();

	return (
		<div className="w-full">
			<Card className="bg-sidebar rounded-lg max-w-5xl mx-auto">
				<div className="rounded-xl bg-background shadow-md p-6">
					<CardHeader className="px-0 pt-0 pb-6">
						<CardTitle className="text-xl flex flex-row gap-2">
							<CreditCard className="size-6 text-muted-foreground self-center" />
							결제
						</CardTitle>
						<CardDescription>
							구독 및 인보이스 관리
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6 pt-6 border-t px-0 pb-0">
						<nav className="flex space-x-2 border-b">
							{navigationItems.map((item) => {
								const Icon = item.icon;
								const isActive = router.pathname === item.href;
								return (
									<Link
										key={item.name}
										href={item.href}
										className={cn(
											"flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
											isActive
												? "border-primary text-primary"
												: "border-transparent text-muted-foreground hover:text-primary hover:border-muted",
										)}
									>
										<Icon className="h-4 w-4" />
										{item.name}
									</Link>
								);
							})}
						</nav>

						<div className="mt-6">
							<ShowInvoices />
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
};
