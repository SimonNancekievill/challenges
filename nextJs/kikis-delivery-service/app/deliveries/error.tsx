"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <p>something went wrong, please try again.</p>
      <small>{error.message}</small>
      <button onClick={reset}>retry</button>
    </>
  );
}
