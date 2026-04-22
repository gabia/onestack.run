import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
	name: string;
	color?: string | null;
	className?: string;
	children?: React.ReactNode;
}

export function TagBadge({ name, color, className, children }: TagBadgeProps) {
	return (
		<Badge
			variant="outline"
			style={{
				backgroundColor: color ? `${color}18` : undefined,
				color: color || undefined,
			}}
			className={cn("gap-1.5", className)}
		>
			{color && (
				<span
					style={{
						width: 6,
						height: 6,
						borderRadius: 3,
						background: color,
						flexShrink: 0,
						display: "inline-block",
					}}
				/>
			)}
			{name}
			{children}
		</Badge>
	);
}
