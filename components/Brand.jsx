import Image from "next/image";
import Link from "next/link";

export default function Brand({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="FitLog home">
      <Image src="/logo.png" alt="" width={28} height={28} priority />
      <span className="font-display text-xl font-semibold uppercase tracking-wide text-white">FitLog</span>
    </Link>
  );
}
