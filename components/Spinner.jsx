import { Dumbbell } from "lucide-react";

export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-24 text-muted">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-line border-t-accent" />
        <Dumbbell size={22} className="text-accent" aria-hidden="true" />
      </div>
      <p className="font-display text-lg uppercase tracking-wide">{label}</p>
    </div>
  );
}
