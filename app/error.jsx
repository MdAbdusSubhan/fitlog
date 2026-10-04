"use client";

export default function ErrorPage({ reset }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold uppercase text-white">Something went wrong</h1>
      <p className="text-muted">The workout service did not respond. Try again in a moment.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wide text-black"
      >
        Try again
      </button>
    </div>
  );
}
