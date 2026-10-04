export default function Tags({ items = [], size = "sm" }) {
  const sizing = size === "lg" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[11px]";
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <li
          key={tag}
          className={`rounded-full border border-accent/50 bg-accent/10 font-semibold uppercase tracking-wide text-accent ${sizing}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
