"use client";

import { useCallback, useEffect, useState } from "react";

export default function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async (signal) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/workouts", { signal });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setWorkouts(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (error) {
      if (error.name === "AbortError") return;
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const retry = useCallback(() => load(), [load]);

  return { workouts, status, retry };
}
