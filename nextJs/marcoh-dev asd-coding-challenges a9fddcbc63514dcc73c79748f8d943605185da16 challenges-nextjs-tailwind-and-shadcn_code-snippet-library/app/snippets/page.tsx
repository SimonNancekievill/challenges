import SnippetFilter from "@/components/SnippetFilter";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function SnippetsPage() {
	const snippets = await getAllSnippets(); // calls separate Backend API or makes a direct database query

	return (
		<>
			<h2 className="font-semibold text-2xl">All Snippets</h2>
			<section>
				<Link
					href="/snippets/new"
					className={buttonVariants({ variant: "default", size: "lg" })}
				>
					+ New Snippet
				</Link>
			</section>
			<SnippetFilter snippets={snippets} />
		</>
	);
}
