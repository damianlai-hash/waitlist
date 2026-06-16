"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconKey } from "@/lib/icons";
import { useBiz } from "./BizProvider";

const TABS: { label: string; href: string; icon: IconKey; badge?: boolean }[] = [
  { label: "Home", href: "/biz", icon: "Home" },
  { label: "Bookings", href: "/biz/bookings", icon: "Calendar", badge: true },
  { label: "Insights", href: "/biz/insights", icon: "Chart" },
  { label: "Listing", href: "/biz/listing", icon: "Tag" },
  { label: "More", href: "/biz/more", icon: "List" },
];

export function BizNav() {
  const pathname = usePathname();
  const { requests } = useBiz();

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="grid grid-cols-5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {TABS.map((t) => {
          const active = t.href === "/biz" ? pathname === "/biz" : pathname.startsWith(t.href);
          const TabIcon = Icon[t.icon];
          return (
            <Link key={t.href} href={t.href} className={`relative flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold ${active ? "text-coral" : "text-muted"}`}>
              <span className="relative">
                <TabIcon className="h-[22px] w-[22px]" />
                {t.badge && requests.length > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "var(--primary)" }}>
                    {requests.length}
                  </span>
                )}
              </span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
