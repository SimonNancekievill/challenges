"use client";

import Link from "next/link";
import { addSnippet } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";

export default function NewSnippetPage() {
	return (
		<>
			<h2 className="font-semibold text-2xl">New Snippet</h2>
			<form action={addSnippet}>
				<div className="grid gap-2">
					<Label htmlFor="title">Title</Label>
					<Input id="title" name="title" placeholder="Title" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="language">Language</Label>
					<select id="language" name="language">
						<option value="CSS">CSS</option>
						<option value="JavaScript">JavaScript</option>
						<option value="TypeScript">TypeScript</option>
					</select>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="description">Description</Label>
					<Input id="description" name="description" placeholder="Description" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="code">Code</Label>
					<Input id="code" name="code" placeholder="Code" />
				</div>
				<button
					type="submit"
					className={buttonVariants({ variant: "default", size: "lg" })}
				>
					Create snippet
				</button>
			</form>
			<Link href="/snippets">&lt;- All snippets</Link>
		</>
	);
}
