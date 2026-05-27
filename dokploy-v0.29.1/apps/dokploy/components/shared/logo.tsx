import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	logoUrl?: string;
}

export const Logo = ({ className = "size-14", logoUrl }: Props) => {
	if (logoUrl) {
		return (
			// biome-ignore lint/performance/noImgElement: this is for dynamic logo loading
			<img
				src={logoUrl}
				alt="Organization Logo"
				className={cn(className, "object-contain rounded-sm")}
			/>
		);
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill="none"
			className={className}
		>
			<path d="M16 4L28 10L16 16L4 10L16 4Z" className="fill-primary" />
			<path d="M4 14L16 20L28 14V17L16 23L4 17V14Z" className="fill-primary" fillOpacity="0.6" />
			<path d="M4 21L16 27L28 21V23L16 29L4 23V21Z" className="fill-primary" fillOpacity="0.3" />
		</svg>
	);
};
