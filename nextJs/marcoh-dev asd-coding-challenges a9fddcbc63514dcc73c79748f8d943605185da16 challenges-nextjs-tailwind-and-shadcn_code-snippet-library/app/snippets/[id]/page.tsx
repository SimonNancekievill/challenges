import { getAllSnippets, getSnippetById } from "@/lib/services/snippetsService";
import { notFound } from "next/navigation";
import Link from "next/link";
import SnippetDeleteButton from "@/components/SnippetDeleteButton";
import { buttonVariants } from "@/components/ui/button";

export async function generateStaticParams() {
	const snippets = await getAllSnippets();
	return snippets.map((snippet) => ({ id: String(snippet.id) }));
}

export default async function SnippetDetailPage({ params }: PageProps<"/snippets/[id]">) {
	const { id } = await params;
	const snippet = await getSnippetById(Number(id));

	if (!snippet) {
		// better for not found (404):
		notFound();

		// can be used for business logic/other errors
		// throw new Error(`Snippet ${id} not found`);

		// loading.tsx
		// use sparingly, better build <Suspense fallback={}> for single async components/functions
		// or leave it away when async is expected to be fast
	}

	return (
		<>
			<h2 className="font-semibold text-2xl">Snippet {id}</h2>
			<p>Title: {snippet.title}</p>
			<p>Description: {snippet.description}</p>
			<p>Language: {snippet.language}</p>
			<pre className="bg-gray-200 p-4">
				<code>{snippet.code}</code>
			</pre>
			<section>
				<SnippetDeleteButton id={snippet.id!} style="icon" />
			</section>
			<section>
				<Link
					href="/snippets"
					className={buttonVariants({ variant: "default", size: "lg" })}
				>
					&lt;- All snippets
				</Link>
			</section>
		</>
	);
}
