"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconKey } from "@/lib/icons";
import { useTheme } from "@/components/ThemeProvider";
import { PAYOUTS, BIZ_METRICS, BIZ_REVIEWS } from "@/lib/business";
import { BizBar } from "@/components/business/BizBar";

type Row = { label: string; href: string; icon: IconKey; tone: string; meta?: string; external?: boolean };

export default function BizMore() {
  const { theme, toggle } = useTheme();
  const [notif, setNotif] = useState(true);
  const unanswered = BIZ_REVIEWS.filter((r) => !r.reply).length;

  const manage: Row[] = [
    { label: "Reviews", href: "/biz/reviews", icon: "Star", tone: "#E8B86A", meta: `${unanswered} to reply` },
    { label: "Payments & payouts", href: "/biz/payouts", icon: "Dollar", tone: "#6CC289", meta: `£${PAYOUTS.available.toLocaleString()}` },
    { label: "Marketing", href: "/biz/marketing", icon: "Megaphone", tone: "#C53A28" },
    { label: "Clients", href: "/m/clients", icon: "Users", tone: "#4A9FBF" },
  ];

  const apps: Row[] = [
    { label: "View on Bookzyr", href: "/venue/empire-barbershop", icon: "Globe", tone: "#C53A28", external: true },
    { label: "Staff app", href: "/m", icon: "Scissors", tone: "#4A9FBF", external: true },
    { label: "Full admin", href: "/command-centre", icon: "Home", tone: "#6B7589", external: true },
  ];

  return (
    <>
      <BizBar title="More" />

      <div className="px-4 pb-6 pt-4">
        {/* Profile */}
        <div className="card flex items-center gap-3 p-4">
          <span className="grid h-12 w-12 place-items-center rounded-full text-base font-bold text-white" style={{ background: "#B98AC9" }}>
            DL
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-ink">Damian Lai</div>
            <div className="text-xs text-muted">Owner · Empire Barbershop</div>
          </div>
          <span className="chip bg-gold/15 px-2.5 py-1 text-gold">
            <Icon.Star className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} /> {BIZ_METRICS.rating.toFixed(1)}
          </span>
        </div>

        <Group title="Manage">
          {manage.map((r) => (
            <RowItem key={r.href} row={r} />
          ))}
        </Group>

        <Group title="Your apps">
          {apps.map((r) => (
            <RowItem key={r.label} row={r} />
          ))}
        </Group>

        <Group title="Preferences">
          <ToggleRow icon={theme === "dark" ? "Moon" : "Sun"} label={`${theme === "dark" ? "Dark" : "Light"} appearance`} on={theme === "dark"} onClick={toggle} />
          <ToggleRow icon="Bell" label="Booking notifications" on={notif} onClick={() => setNotif((v) => !v)} />
        </Group>

        <div className="mt-6 text-center text-xs text-muted">Bookzyr for Business · v1.0</div>
      </div>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</h2>
      <div className="card divide-y divide-border overflow-hidden">{children}</div>
    </div>
  );
}

function RowItem({ row }: { row: Row }) {
  const RowIcon = Icon[row.icon];
  return (
    <Link href={row.href} className="flex items-center gap-3 px-4 py-3.5 active:bg-surface-2">
      <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `${row.tone}20`, color: row.tone }}>
        <RowIcon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-sm font-semibold text-ink">{row.label}</span>
      {row.meta && <span className="text-xs font-bold text-muted">{row.meta}</span>}
      {row.external && <span className="text-[10px] font-bold uppercase tracking-wide text-muted">Open</span>}
      <Icon.ChevronRight className="h-4 w-4 text-muted" />
    </Link>
  );
}

function ToggleRow({ icon, label, on, onClick }: { icon: IconKey; label: string; on: boolean; onClick: () => void }) {
  const RowIcon = Icon[icon];
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-surface-2">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink">
        <RowIcon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-sm font-semibold text-ink">{label}</span>
      <span className="relative h-6 w-11 rounded-full transition-colors" style={{ background: on ? "var(--primary)" : "var(--surface-3)" }}>
        <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all" style={{ left: on ? "1.375rem" : "0.125rem" }} />
      </span>
    </button>
  );
}
