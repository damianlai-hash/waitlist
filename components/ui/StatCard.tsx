import { Icon, type IconKey } from "@/lib/icons";

export function StatCard({
  icon,
  label,
  value,
  delta,
  tone = "#FF6B5B",
}: {
  icon: IconKey;
  label: string;
  value: string;
  delta?: string;
  tone?: string;
}) {
  const Glyph = Icon[icon];
  const positive = delta?.startsWith("+");
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${tone}1f`, color: tone }}>
          <Glyph className="h-5 w-5" />
        </span>
        {delta && (
          <span className="chip text-xs" style={{ background: positive ? "rgba(108,194,137,.15)" : "rgba(255,107,91,.12)", color: positive ? "#2F8F4F" : "#E8584A" }}>
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
