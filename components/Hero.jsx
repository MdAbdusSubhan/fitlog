import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Workout Library</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
          >
            <ArrowDown size={18} aria-hidden="true" />
            Browse workouts
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white lg:max-w-none">
          <Image
            src="/banner.png"
            alt="Muscle anatomy figure performing a preacher curl on a gym machine"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-contain p-4"
          />
        </div>
      </div>
    </section>
  );
}
