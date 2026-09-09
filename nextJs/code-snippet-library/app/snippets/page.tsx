import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function snippetsPage() {
  const snippets = await getAllSnippets();

  return (
    <>
      <ul>
        {snippets.map((snippet) => (
          <Link key={snippet.id} href={`snippets/${snippet.id}`}>
            <article>
              <li>
                <h2>{snippet.title}</h2>
                <p>{snippet.language}</p>
              </li>
            </article>
          </Link>
        ))}
      </ul>
    </>
  );
}
