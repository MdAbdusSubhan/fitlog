"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import useWorkouts from "@/lib/useWorkouts";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

const SORTS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function Library() {
  const { workouts, status, retry } = useWorkouts();
  const [sortKey, setSortKey] = useState("duration");

  const sorted = useMemo(
    () => [...workouts].sort((a, b) => b[sortKey] - a[sortKey] || a.id - b.id),
    [workouts, sortKey]
  );

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="relative w-full sm:w-52">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg border border-line bg-panel py-2.5 pl-4 pr-10 text-sm font-semibold text-white"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                Sort By: {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent"
            aria-hidden="true"
          />
        </div>
      </div>

      {status === "loading" && <Spinner />}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-display text-2xl uppercase text-white">Could not load workouts</p>
          <p className="text-muted">Check your connection and try again.</p>
          <button
            type="button"
            onClick={retry}
            className="rounded-lg bg-accent px-5 py-2.5 font-display font-semibold uppercase text-black"
          >
            Try again
          </button>
        </div>
      )}

      {status === "ready" && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((workout, index) => (
            <li key={workout.id}>
              <WorkoutCard workout={workout} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
