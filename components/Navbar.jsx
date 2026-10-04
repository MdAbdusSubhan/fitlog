"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import { usePlan } from "./PlanProvider";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/workout");
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, ready } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Brand />
        <nav aria-label="Primary" className="order-3 flex w-full justify-center gap-2 md:order-none md:w-auto">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            aria-label={`Plan, ${ready ? plan.length : 0} lifts`}
            className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase text-black"
          >
            Plan
            <span className="min-w-5 rounded-full bg-black/85 px-1.5 text-center text-accent">{ready ? plan.length : 0}</span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved, ${ready ? saved.length : 0} lifts`}
            className="flex items-center gap-2 rounded-full border border-accent px-3 py-1.5 text-xs font-bold uppercase text-accent"
          >
            Saved
            <span className="min-w-5 text-center">{ready ? saved.length : 0}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
