import sql from "@/lib/db";

export type SnippetRequest = {
	id?: number;
	title: string;
	language?: string | null;
	description?: string | null;
	code: string;
};

export type CreateSnippetPayload = Pick<
	SnippetRequest,
	"title" | "language" | "description" | "code"
>;

const snippets: SnippetRequest[] = [
	{
		id: 1,
		title: "CSS Grid Areas",
		language: "CSS",
		description: "Create a grid with named areas.",
		code: ".grid-container {\n  display: grid;\n  grid-template-areas:\n    'header header header'\n    'sidebar content content'\n    'footer footer footer'; \n  grid-gap: 10px;\n  background-color: #2196F3;\n  padding: 10px;\n}",
	},
	{
		id: 2,
		title: "Range of numbers",
		language: "JavaScript",
		description: "Build an array from a start value up to an end value.",
		code: "const range = (start, end) =>\n  Array.from({ length: end - start }, (_, i) => start + i);",
	},
	{
		id: 3,
		title: "Group by key",
		language: "TypeScript",
		description: "Turn a list into buckets keyed by one of its fields.",
		code: "function groupBy(items, key) {\n  return items.reduce((acc, item) => {\n    (acc[item[key]] ??= []).push(item);\n    return acc;\n  }, {});\n}",
	},
];

/*
export function getAllSnippets(): Snippet[] {
	return snippets;
}

export function getSnippetById(id: number): Snippet | null {
	return snippets.find((snippet) => snippet.id === Number(id)) || null;
}
*/

export async function getAllSnippets(): Promise<SnippetRequest[]> {
	return sql<SnippetRequest[]>`SELECT * FROM snippets`;
}

export async function getSnippetById(id: number): Promise<SnippetRequest | null> {
	const [snippet] = await sql<SnippetRequest[]>`
    SELECT * FROM snippets WHERE id = ${id}
  `;
	return snippet ?? null;
}

export async function createSnippet({
	title,
	language,
	description,
	code,
}: CreateSnippetPayload): Promise<SnippetRequest | null> {
	if (title === "" || code === "" || language === "") {
		throw new Error("title, language and code are required fields");
	}

	const [created] = await sql<SnippetRequest[]>`
        INSERT INTO snippets (title, language, description, code) VALUES (${title!}, ${language!}, ${description!}, ${code!}) RETURNING *;
      `;

	return created ?? null;
}

export async function deleteSnippet(id: number): Promise<boolean> {
	const result = await sql`
    DELETE FROM snippets
    WHERE id = ${id}
  `;

	return result.count > 0;
}
