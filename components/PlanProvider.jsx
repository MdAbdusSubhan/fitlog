"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Check, Info } from "lucide-react";

const PLAN_LIMIT = 5;
const EMPTY = { plan: [], saved: [], done: [] };

const PlanContext = createContext(null);

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}

export default function PlanProvider({ children }) {
  const [state, setState] = useState(EMPTY);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const notify = useCallback((message, tone = "success") => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 2800);
  }, []);

  const addToPlan = useCallback(
    (raw) => {
      const id = String(raw);
      if (state.plan.includes(id)) {
        notify("Already in today's plan", "info");
        return;
      }
      if (state.plan.length >= PLAN_LIMIT) {
        notify("Today's plan is full. Finish or remove a lift first", "info");
        return;
      }
      setState((s) => ({ ...s, plan: [...s.plan, id] }));
      notify("Added to today's plan");
    },
    [state.plan, notify]
  );

  const saveForLater = useCallback(
    (raw) => {
      const id = String(raw);
      if (state.saved.includes(id)) {
        notify("Already in your saved lifts", "info");
        return;
      }
      setState((s) => ({ ...s, saved: [...s.saved, id] }));
      notify("Saved for later");
    },
    [state.saved, notify]
  );

  const removeFromPlan = useCallback(
    (raw) => {
      const id = String(raw);
      setState((s) => ({
        ...s,
        plan: s.plan.filter((x) => x !== id),
        done: s.done.filter((x) => x !== id),
      }));
      notify("Removed from today's plan");
    },
    [notify]
  );

  const removeFromSaved = useCallback(
    (raw) => {
      const id = String(raw);
      setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));
      notify("Removed from saved");
    },
    [notify]
  );

  const markDone = useCallback(
    (raw) => {
      const id = String(raw);
      if (state.done.includes(id)) return;
      setState((s) => ({ ...s, done: [...s.done, id] }));
      notify("Marked as done");
    },
    [state.done, notify]
  );

  const value = useMemo(
    () => ({
      plan: state.plan,
      saved: state.saved,
      done: state.done,
      ready: true,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [state, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-toast pointer-events-auto flex items-center gap-2 rounded-lg border border-line bg-panel-2 px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            {t.tone === "success" ? (
              <Check size={16} className="text-accent" aria-hidden="true" />
            ) : (
              <Info size={16} className="text-muted" aria-hidden="true" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
}