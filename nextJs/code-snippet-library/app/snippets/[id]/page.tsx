import { getSnippetById } from "@/lib/services/snippetsService";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";

export default async function SnippetDetailPage({
  params,
}: PageProps<"/snippets/[id]">) {
  const { id } = await params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    return (
      <>
        <h2>Snippet with ID: {id} not found.</h2>
      </>
    );
  }

  return (
    <article>
      <h2>{snippet.title}</h2>
      <p>{snippet.description}</p>
      <pre>
        <code>{snippet.code}</code>
      </pre>
      <p>{snippet.language}</p>
      <Link href="/snippets">Go back</Link>
    </article>
  );
}
