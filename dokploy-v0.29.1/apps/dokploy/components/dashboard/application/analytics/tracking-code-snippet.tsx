import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Props {
	trackingScript: string;
}

export const TrackingCodeSnippet = ({ trackingScript }: Props) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		copy(trackingScript);
		setCopied(true);
		toast.success("트래킹 코드가 복사되었습니다");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">트래킹 코드</CardTitle>
				<CardDescription>
					아래 코드를 사이트의 {"<head>"} 태그에 추가하세요.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="relative">
					<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto font-mono">
						{trackingScript}
					</pre>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-2 right-2"
						onClick={handleCopy}
					>
						{copied ? (
							<Check className="size-4" />
						) : (
							<Copy className="size-4" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
