import Image from "next/image";
import Link from "next/link";
import Stats from "./Stats";
import Tags from "./Tags";

export default function WorkoutCard({ workout, priority = false }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-panel-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Tags items={workout.muscleGroups} />
        <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <Stats workout={workout} className="mt-auto border-t border-line pt-3" />
      </div>
    </Link>
  );
}
