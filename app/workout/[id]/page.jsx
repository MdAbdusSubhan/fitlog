import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkout } from "@/lib/api";
import Tags from "@/components/Tags";
import WorkoutActions from "@/components/WorkoutActions";

export const revalidate = 3600;

async function load(id) {
  const workout = await getWorkout(id, { next: { revalidate: 3600 } });
  if (!workout) notFound();
  return workout;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const workout = await getWorkout(id, { next: { revalidate: 3600 } });
    return { title: workout ? workout.name : "Workout not found" };
  } catch {
    return { title: "Workout" };
  }
}

export default async function WorkoutPage({ params }) {
  const { id } = await params;
  const workout = await load(id);

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to library
      </Link>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-panel lg:sticky lg:top-24 lg:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
              {workout.name}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{workout.description}</p>
            <Tags items={workout.muscleGroups} size="lg" />
          </div>

          <section aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="mb-3 font-display text-xl font-semibold uppercase tracking-wide text-white">
              Key specs
            </h2>
            <dl className="overflow-hidden rounded-xl border border-line bg-panel">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted">{label}</dt>
                  <dd className="text-right font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="mb-3 font-display text-xl font-semibold uppercase tracking-wide text-white"
            >
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {(workout.instructions ?? []).map((step, index) => (
                <li key={step} className="flex gap-4 rounded-xl border border-line bg-panel p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-black">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-white/90 sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <WorkoutActions id={workout.id} />
        </div>
      </div>
    </div>
  );
}
