"use client";

import Link from "next/link";
import { Icon, type IconKey } from "@/lib/icons";
import { useTheme } from "@/components/ThemeProvider";
import { AppBar } from "@/components/mobile/AppBar";

type Row = { label: string; href: string; icon: IconKey; tone: string; external?: boolean };

const MANAGE: Row[] = [
  { label: "Staff", href: "/m/staff", icon: "Scissors", tone: "#FF6B5B" },
  { label: "Services & prices", href: "/m/services", icon: "Tag", tone: "#6CC289" },
  { label: "Clients", href: "/m/clients", icon: "Users", tone: "#4A9FBF" },
];

const FULL_ADMIN: Row[] = [
  { label: "Analytics", href: "/analytics", icon: "Chart", tone: "#B98AC9", external: true },
  { label: "Reports", href: "/reports", icon: "Doc", tone: "#E8B86A", external: true },
  { label: "Marketing", href: "/marketing", icon: "Megaphone", tone: "#4A9FBF", external: true },
  { label: "Settings", href: "/settings", icon: "Settings", tone: "#6B7589", external: true },
];

export default function MorePage() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <AppBar title="More" />

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
          <span className="chip bg-leaf/15 px-2.5 py-1 text-leaf">On shift</span>
        </div>

        <Group title="Manage">
          {MANAGE.map((r) => (
            <RowItem key={r.href} row={r} />
          ))}
        </Group>

        <Group title="Full admin">
          {FULL_ADMIN.map((r) => (
            <RowItem key={r.href} row={r} />
          ))}
        </Group>

        <Group title="Preferences">
          <button onClick={toggle} className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-surface-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "#1A294220", color: "var(--text)" }}>
              {theme === "dark" ? <Icon.Moon className="h-5 w-5" /> : <Icon.Sun className="h-5 w-5" />}
            </span>
            <span className="flex-1 text-sm font-semibold text-ink">{theme === "dark" ? "Dark" : "Light"} appearance</span>
            <span className="relative h-6 w-11 rounded-full transition-colors" style={{ background: theme === "dark" ? "var(--primary)" : "var(--surface-3)" }}>
              <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all" style={{ left: theme === "dark" ? "1.375rem" : "0.125rem" }} />
            </span>
          </button>
        </Group>

        <div className="mt-6 text-center text-xs text-muted">Bookzyr Staff · v1.0 · Empire Barbershop</div>
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
      {row.external && <span className="text-[10px] font-bold uppercase tracking-wide text-muted">Web</span>}
      <Icon.ChevronRight className="h-4 w-4 text-muted" />
    </Link>
  );
}
