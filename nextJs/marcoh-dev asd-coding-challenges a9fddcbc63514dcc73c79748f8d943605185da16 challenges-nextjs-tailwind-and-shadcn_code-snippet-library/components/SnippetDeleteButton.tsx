import { removeSnippet } from "@/app/actions";
import { buttonVariants } from "./ui/button";

export default function SnippetDeleteButton({
	id,
	style = "button",
}: {
	id: number;
	style?: "icon" | "button";
}) {
	return style === "icon" ? (
		<form className="inline" action={removeSnippet.bind(null, id)}>
			<button
				type="submit"
				className={buttonVariants({ variant: "destructive", size: "lg" })}
				aria-label="Delete"
			>
				Delete
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M3 6h18" />
					<path d="M8 6V4h8v2" />
					<path d="M19 6l-1 14H6L5 6" />
				</svg>
			</button>
		</form>
	) : (
		<form action={removeSnippet.bind(null, id)}>
			<button
				type="submit"
				className={buttonVariants({ variant: "destructive", size: "lg" })}
			>
				Delete
			</button>
		</form>
	);
}
