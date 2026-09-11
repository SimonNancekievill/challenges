import Link from "next/link";

export default function Error() {
	return (
		<>
			<h2 className="font-semibold text-2xl">Snippet not found.</h2>
			<Link href={`/snippets`}>&lt;- All Snippets</Link>
		</>
	);
}
