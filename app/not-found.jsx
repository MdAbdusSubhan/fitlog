import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">404</p>
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">Rep not found</h1>
      <p className="text-muted">That page does not exist or the workout has been removed.</p>
      <Link
        href="/"
        className="rounded-lg bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
      >
        Back to workouts
      </Link>
    </div>
  );
}
