"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<>
			<h2 className="font-semibold text-2xl">Could not create this snippet.</h2>
			<p>{error.message}</p>
			<Button onClick={reset}>Try again</Button>
		</>
	);
}
