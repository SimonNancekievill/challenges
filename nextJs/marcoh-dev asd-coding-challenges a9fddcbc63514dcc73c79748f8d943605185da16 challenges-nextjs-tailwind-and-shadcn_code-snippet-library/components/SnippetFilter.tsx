"use client";

import { useState } from "react";
import { SnippetRequest } from "@/lib/services/snippetsService";
import Link from "next/link";
import SnippetDeleteButton from "./SnippetDeleteButton";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";

export default function SnippetFilter({ snippets }: { snippets: SnippetRequest[] }) {
	const [language, setLanguage] = useState("all");

	const visible =
		language === "all" ? snippets : snippets.filter((snippet) => snippet.language === language);

	console.log("visible", visible);
	return (
		<>
			<select
				name="language"
				id="language"
				value={language}
				onChange={(event) => setLanguage(event.target.value)}
			>
				<option value="all">All</option>
				<option value="CSS">CSS</option>
				<option value="JavaScript">JavaScript</option>
				<option value="TypeScript">TypeScript</option>
			</select>
			<ul>
				{visible.map((snippet) => (
					<li key={snippet.id}>
						<Card>
							<CardHeader>
								<CardTitle>{snippet.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{snippet.description}</p>
								<p>Language: {snippet.language}</p>
								<CardAction>
									<Link
										href={`/snippets/${snippet.id}`}
										className={buttonVariants({
											variant: "secondary",
											size: "lg",
										})}
									>
										Detail -&gt;
									</Link>
								</CardAction>
								<CardAction>
									<SnippetDeleteButton id={snippet.id!} style="icon" />
								</CardAction>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
		</>
	);
}
