import { getWorkouts } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const workouts = await getWorkouts({ cache: "no-store" });
    return Response.json(workouts);
  } catch {
    return Response.json({ error: "Workout service is unavailable" }, { status: 502 });
  }
}
