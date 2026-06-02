"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/lib/icons";
import { NAV_ITEMS } from "@/lib/data";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 ${
        collapsed ? "w-[78px]" : "w-[264px]"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white" style={{ background: "var(--primary)" }}>
          E
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold uppercase tracking-tight text-ink">Empire Barbershop</div>
            <div className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Powered by Bookzyr
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto grid h-7 w-7 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink"
          aria-label="Toggle sidebar"
        >
          <Icon.ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const ActiveIcon = Icon[item.icon];
          const active = pathname === item.href || (pathname === "/" && item.href === "/calendar");
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="nav-link"
              title={item.label}
            >
              <ActiveIcon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  className="ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold text-white"
                  style={{ background: active ? "rgba(255,255,255,.25)" : "var(--primary)" }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-border px-3 py-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: "var(--primary)" }}>
            <Icon.Pin className="h-4 w-4" />
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Location</span>
              <span className="block truncate text-sm font-semibold text-ink">All locations</span>
            </span>
          )}
          {!collapsed && <Icon.ChevronDown className="ml-auto h-4 w-4 text-muted" />}
        </button>

        {!collapsed && (
          <div className="grid grid-cols-2 gap-1.5 px-1 py-1">
            <SmallLink icon={<Icon.Globe className="h-4 w-4" />} label="Browse" />
            <SmallLink icon={<Icon.Home className="h-4 w-4" />} label="Business" tone="gold" />
          </div>
        )}

        {!collapsed && (
          <Link href="/command-centre" className="chip w-full justify-start rounded-xl px-3 py-2 text-gold ring-1 ring-gold/30" style={{ background: "rgba(232,184,106,.1)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Admin panel
          </Link>
        )}

        <Link href="/settings" className="nav-link">
          <Icon.Help className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Help &amp; FAQ</span>}
        </Link>

        <div className="mt-1 flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white">DA</span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">Damian Admin</span>
              <span className="block truncate text-xs text-muted">Empire Barbershop</span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}

function SmallLink({ icon, label, tone }: { icon: React.ReactNode; label: string; tone?: "gold" }) {
  return (
    <button
      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold ${
        tone === "gold" ? "text-gold" : "text-muted hover:text-ink"
      } hover:bg-surface-2`}
      style={tone === "gold" ? { background: "rgba(232,184,106,.1)" } : undefined}
    >
      {icon}
      {label}
    </button>
  );
}
