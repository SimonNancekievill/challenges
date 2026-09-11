import Link from "next/link";

export default function Home() {
	return (
		<>
			<Link href={`/snippets`}>-&gt; All Snippets</Link>
		</>
	);
}
