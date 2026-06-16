import Link from "next/link";

export function BookzyrLogo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg text-base font-black text-white" style={{ background: "var(--primary)" }}>
        B
      </span>
      <span className="text-lg font-extrabold uppercase tracking-[0.04em] text-ink">Bookzyr</span>
    </Link>
  );
}
