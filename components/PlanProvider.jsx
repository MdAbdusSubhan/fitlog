"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Check, Info } from "lucide-react";

const STORAGE_KEY = "fitlog:v1";
const EMPTY = { plan: [], saved: [], done: [] };

const PlanContext = createContext(null);

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      done: Array.isArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return EMPTY;
  }
}

export default function PlanProvider({ children }) {
  const [state, setState] = useState(EMPTY);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => {
    setState(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      return;
    }
  }, [state, ready]);

  const notify = useCallback((message, tone = "success") => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 2800);
  }, []);

  const addToPlan = useCallback(
    (id) => {
      if (state.plan.includes(id)) {
        notify("Already in today's plan", "info");
        return;
      }
      setState((s) => ({ ...s, plan: [...s.plan, id] }));
      notify("Added to today's plan");
    },
    [state.plan, notify]
  );

  const saveForLater = useCallback(
    (id) => {
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
    (id) => {
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
    (id) => {
      setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));
      notify("Removed from saved");
    },
    [notify]
  );

  const markDone = useCallback(
    (id) => {
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
      ready,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [state, ready, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone]
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
