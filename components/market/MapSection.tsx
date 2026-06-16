import Link from "next/link";
import { Icon } from "@/lib/icons";
import { VENUES } from "@/lib/marketplace";

/* Stylised map stand-in (no external map SDK / key needed) with colour-coded
   price pins, matching the real "Find shops near you" section. */

const PINS = [
  { left: "22%", top: "30%", v: VENUES[0] },
  { left: "44%", top: "22%", v: VENUES[1] },
  { left: "63%", top: "38%", v: VENUES[2] },
  { left: "34%", top: "55%", v: VENUES[3] },
  { left: "55%", top: "62%", v: VENUES[4] },
  { left: "74%", top: "58%", v: VENUES[6] },
  { left: "18%", top: "68%", v: VENUES[7] },
];

export function MapSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">On the map</div>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Find shops <span className="text-coral">near you</span>
      </h2>
      <p className="mt-1 text-sm text-muted">Tap a pin to preview a shop and book in two clicks. Pins are coloured by treatment.</p>

      <div className="relative mt-5 h-[360px] w-full overflow-hidden rounded-2xl border border-border shadow-card sm:h-[440px]">
        {/* Faux map terrain */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #dfeaf2 0%, #eef1ec 38%), radial-gradient(circle at 78% 80%, #cfe3ef 0 22%, transparent 22%)",
          }}
        />
        {/* parks */}
        <div className="absolute left-[8%] top-[44%] h-28 w-40 rounded-[40%] bg-[#d7e8d2]" />
        <div className="absolute right-[14%] top-[12%] h-24 w-36 rounded-[45%] bg-[#d7e8d2]" />
        {/* roads */}
        <div className="absolute inset-0 opacity-70" style={{ background: "repeating-linear-gradient(58deg, transparent 0 46px, #ffffff 46px 50px)" }} />
        <div className="absolute inset-0 opacity-70" style={{ background: "repeating-linear-gradient(-32deg, transparent 0 64px, #ffffff 64px 68px)" }} />
        <div className="absolute left-0 right-0 top-[48%] h-[6px] bg-white/90" />
        <div className="absolute bottom-0 top-0 left-[40%] w-[6px] bg-white/90" />

        {/* Pins */}
        {PINS.map(({ left, top, v }, i) => (
          <Link
            key={v.id}
            href={`/venue/${v.slug}`}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={{ left, top }}
          >
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-pop ring-2 ring-white transition-transform group-hover:scale-110"
              style={{ background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "#4A9FBF" : "#6CC289" }}
            >
              £{v.priceFrom}
            </span>
            <span
              className="mx-auto block h-2 w-2 -translate-y-1 rotate-45"
              style={{ background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "#4A9FBF" : "#6CC289" }}
            />
          </Link>
        ))}

        {/* Floating preview card */}
        <div className="absolute bottom-4 left-4 w-60 rounded-xl border border-border bg-surface p-3 shadow-pop">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white" style={{ background: "var(--primary)" }}>
              {VENUES[0].name.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-ink">{VENUES[0].name}</div>
              <div className="flex items-center gap-1 text-[11px] text-muted">
                <Icon.Star className="h-3 w-3" style={{ fill: "#E8B86A", color: "#E8B86A" }} /> {VENUES[0].rating} · {VENUES[0].suburb}
              </div>
            </div>
          </div>
          <Link href={`/venue/${VENUES[0].slug}`} className="btn-primary mt-2.5 w-full py-1.5 text-xs">
            Book from £{VENUES[0].priceFrom}
          </Link>
        </div>

        {/* Map controls (decorative) */}
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
          <span className="grid h-8 w-8 place-items-center border-b border-border text-ink">
            <Icon.Plus className="h-4 w-4" />
          </span>
          <span className="grid h-8 w-8 place-items-center text-ink">
            <Icon.Minus className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
