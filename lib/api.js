const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function request(path, init) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, init);
      if (res.status === 404) return null;
      if (res.ok) return await res.json();
    } catch {
      continue;
    }
  }
  throw new Error("Workout service is unavailable");
}

function unwrap(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  return data;
}

export async function getWorkouts(init) {
  const data = unwrap(await request("", init));
  return Array.isArray(data) ? data : [];
}

function pickOne(data) {
  if (Array.isArray(data)) return data[0] ?? null;
  if (data && data.data && typeof data.data === "object") return data.data;
  return data && data.id !== undefined ? data : null;
}

export async function getWorkout(id, init) {
  try {
    const single = pickOne(unwrap(await request(`/${encodeURIComponent(id)}`, init)));
    if (single) return single;
  } catch {
    return findInList(id, init);
  }
  return findInList(id, init);
}

async function findInList(id, init) {
  const all = await getWorkouts(init);
  return all.find((w) => String(w.id) === String(id)) ?? null;
}
