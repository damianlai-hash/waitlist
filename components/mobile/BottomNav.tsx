"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconKey } from "@/lib/icons";

type Tab = { label: string; href: string; icon: IconKey };

const TABS: Tab[] = [
  { label: "Today", href: "/m", icon: "Home" },
  { label: "Agenda", href: "/m/agenda", icon: "Calendar" },
  { label: "Clients", href: "/m/clients", icon: "Users" },
  { label: "More", href: "/m/more", icon: "List" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Focused task flows take over the full screen — hide the tab bar there.
  if (pathname === "/m/new") return null;

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="relative grid grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {TABS.map((t, i) => {
          const active = t.href === "/m" ? pathname === "/m" : pathname.startsWith(t.href);
          const TabIcon = Icon[t.icon];
          // Leave room for the centre New button between the 2nd and 3rd tab.
          const nudge = i < 2 ? "pr-3" : "pl-3";
          return (
            <Link
              key={t.href}
              href={t.href}
              data-active={active}
              className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold ${nudge} ${
                active ? "text-coral" : "text-muted"
              }`}
            >
              <TabIcon className="h-[22px] w-[22px]" />
              {t.label}
            </Link>
          );
        })}

        {/* Centre "New booking" action */}
        <Link
          href="/m/new"
          aria-label="New booking"
          className="absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-pop ring-4 ring-bg"
          style={{ background: "var(--primary)" }}
        >
          <Icon.Plus className="h-7 w-7" />
        </Link>
      </div>
    </nav>
  );
}
