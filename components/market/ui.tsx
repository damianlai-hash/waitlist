import { Icon } from "@/lib/icons";

/* Gradient "cover art" stand-in for venue photography — deterministic, no
   external image requests, so it renders identically offline and in tests. */
export function VenueCover({
  gradient,
  label,
  icon = "Scissors",
  className = "",
  rounded = "rounded-2xl",
}: {
  gradient: [string, string];
  label: string;
  icon?: keyof typeof Icon;
  className?: string;
  rounded?: string;
}) {
  const Glyph = Icon[icon];
  const initials = label.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 80% 20%, #fff, transparent 45%)" }} />
      <Glyph className="absolute -bottom-5 -right-3 h-32 w-32 text-white/15" />
      <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-base font-extrabold text-white backdrop-blur">
        {initials}
      </div>
    </div>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Icon.Star className="h-4 w-4" style={{ color: "#E8B86A", fill: "#E8B86A" }} />
      <span className="font-bold text-ink">{rating.toFixed(2)}</span>
    </span>
  );
}

export function Badge({ children, tone = "#FF6B5B" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span className="chip px-2.5 py-1 text-[11px] text-white shadow-sm" style={{ background: tone }}>
      {children}
    </span>
  );
}
