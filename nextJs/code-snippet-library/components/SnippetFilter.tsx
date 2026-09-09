"use client";

import { Snippet } from "@/lib/services/snippetsService";
import Link from "next/link";
import { useState } from "react";

export default function SnippetFilter({ snippets }: { snippets: Snippet[] }) {
  const [language, setLanguage] = useState("all");
  const visible =
    language === "all"
      ? snippets
      : snippets.filter((snippet) => snippet.language === language);
  return (
    <>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="all">All</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">Javascript</option>
        <option value="TypeScript">Typescript</option>
      </select>
      <ul>
        {visible.map((snippet) => (
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
