import SnippetFilter from "@/components/SnippetFilter";
import { getAllSnippets } from "@/lib/services/snippetsService";

export default async function snippetsPage() {
  const snippets = await getAllSnippets();

  return (
    <>
      <SnippetFilter snippets={snippets} />
    </>
  );
}
