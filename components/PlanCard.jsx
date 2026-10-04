import Image from "next/image";
import Link from "next/link";
import { Check, Plus, X } from "lucide-react";
import Stats from "./Stats";

export default function PlanCard({ workout, mode, done, onDone, onAdd, onRemove }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${
        done ? "opacity-70" : ""
      }`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-panel-2 sm:h-24 sm:w-32">
        <Image src={workout.image} alt={workout.name} fill sizes="(min-width: 640px) 128px, 100vw" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">{workout.name}</h3>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold uppercase text-black">
              <Check size={12} aria-hidden="true" />
              Done
            </span>
          )}
        </div>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <Stats workout={workout} />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {mode === "plan" ? (
          <button
            type="button"
            onClick={onDone}
            disabled={done}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={16} aria-hidden="true" />
            {done ? "Completed" : "Mark as Done"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            <Plus size={16} aria-hidden="true" />
            Add to plan
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
