import { Clock, Flame, Star } from "lucide-react";

export default function Stats({ workout, className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted ${className}`}>
      <li className="flex items-center gap-1.5">
        <Clock size={15} className="text-accent" aria-hidden="true" />
        <span>{workout.duration} min</span>
      </li>
      <li className="flex items-center gap-1.5">
        <Flame size={15} className="text-accent" aria-hidden="true" />
        <span>{workout.caloriesBurned} kcal</span>
      </li>
      <li className="flex items-center gap-1.5">
        <Star size={15} className="fill-accent text-accent" aria-hidden="true" />
        <span>{workout.rating}</span>
      </li>
    </ul>
  );
}
