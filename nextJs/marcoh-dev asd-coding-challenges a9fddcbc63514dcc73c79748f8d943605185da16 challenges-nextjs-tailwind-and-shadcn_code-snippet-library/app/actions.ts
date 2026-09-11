"use server";

import { createSnippet, deleteSnippet } from "@/lib/services/snippetsService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSnippet(formData: FormData) {
	const title = String(formData.get("title") ?? "").trim();
	const language = String(formData.get("language") ?? "").trim();
	const description = String(formData.get("description") ?? "").trim();
	const code = String(formData.get("code") ?? "").trim();

	const snippet = await createSnippet({ title, language, description, code });

	if (snippet) {
		revalidatePath("/snippets");
		redirect("/snippets");
	}
}

export async function removeSnippet(id: number) {
	const deleted = await deleteSnippet(id);

	if (deleted) {
		revalidatePath("/snippets");
		redirect("/snippets");
	}
}
