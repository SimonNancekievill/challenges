import SnippetFilter from "@/components/SnippetFilter";
import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function snippetsPage() {
  const snippets = await getAllSnippets();

  return (
    <>
      <SnippetFilter snippets={snippets} />
    </>
  );
}
