"use client";

import { Bookmark, Plus } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function WorkoutActions({ id }) {
  const { addToPlan, saveForLater } = usePlan();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(id)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
      >
        <Plus size={18} aria-hidden="true" />
        Add to today&apos;s plan
      </button>
      <button
        type="button"
        onClick={() => saveForLater(id)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-accent transition-colors hover:bg-accent/10"
      >
        <Bookmark size={18} aria-hidden="true" />
        Save for later
      </button>
    </div>
  );
}
