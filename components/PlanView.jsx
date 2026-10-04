"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useWorkouts from "@/lib/useWorkouts";
import { usePlan } from "./PlanProvider";
import PlanCard from "./PlanCard";
import Spinner from "./Spinner";

const TABS = [
  { value: "plan", label: "Today's Plan" },
  { value: "saved", label: "Saved" },
];

export default function PlanView() {
  const { workouts, status, retry } = useWorkouts();
  const { plan, saved, done, ready, addToPlan, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState("plan");

  const byId = useMemo(() => new Map(workouts.map((w) => [w.id, w])), [workouts]);
  const resolve = (ids) => ids.map((id) => byId.get(id)).filter(Boolean);

  const planItems = resolve(plan);
  const savedItems = resolve(saved);
  const items = tab === "plan" ? planItems : savedItems;

  const metrics = [
    { label: "Exercises", value: planItems.length },
    { label: "Minutes", value: planItems.reduce((sum, w) => sum + w.duration, 0) },
    { label: "Calories", value: planItems.reduce((sum, w) => sum + w.caloriesBurned, 0) },
  ];

  const loading = status === "loading" || !ready;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">My Plan</h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse rounded-xl border border-line bg-panel p-4 text-center sm:p-6">
            <dd className="font-display text-3xl font-bold text-accent sm:text-5xl">{m.value}</dd>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted sm:text-sm">{m.label}</dt>
          </div>
        ))}
      </dl>

      <div role="tablist" aria-label="Plan sections" className="mt-8 flex gap-2 border-b border-line">
        {TABS.map((t) => {
          const active = tab === t.value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.value)}
              className={`-mb-px border-b-2 px-4 py-3 font-display text-base font-semibold uppercase tracking-wide transition-colors ${
                active ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-6">
        {loading && <Spinner />}

        {!loading && status === "error" && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="font-display text-2xl uppercase text-white">Could not load workouts</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-lg bg-accent px-5 py-2.5 font-display font-semibold uppercase text-black"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && status === "ready" && items.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-line px-6 py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-white">Nothing here yet</h2>
            <p className="max-w-sm text-muted">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="rounded-lg bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {!loading && status === "ready" && items.length > 0 && (
          <ul className="flex flex-col gap-4">
            {items.map((workout) => (
              <li key={workout.id}>
                <PlanCard
                  workout={workout}
                  mode={tab}
                  done={tab === "plan" && done.includes(workout.id)}
                  onDone={() => markDone(workout.id)}
                  onAdd={() => addToPlan(workout.id)}
                  onRemove={() => (tab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
