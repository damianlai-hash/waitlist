"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/lib/icons";
import { useTheme } from "@/components/ThemeProvider";
import { useBiz } from "./BizProvider";

export function BizBar({ title, subtitle, back }: { title: string; subtitle?: string; back?: boolean }) {
  const { theme, toggle } = useTheme();
  const { requests } = useBiz();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex items-center gap-3">
        {back ? (
          <button onClick={() => router.back()} aria-label="Back" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-ink">
            <Icon.ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link href="/biz" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-black text-white" style={{ background: "var(--primary)" }}>
            B
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[15px] font-extrabold leading-tight text-ink">{title}</span>
            {!back && <span className="chip bg-coral/12 px-1.5 py-0 text-[9px] font-bold uppercase tracking-wide text-coral">Business</span>}
          </div>
          {subtitle && <div className="truncate text-xs text-muted">{subtitle}</div>}
        </div>

        <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink">
          {theme === "dark" ? <Icon.Sun className="h-[18px] w-[18px]" /> : <Icon.Moon className="h-[18px] w-[18px]" />}
        </button>
        {!back && (
          <Link href="/biz/bookings" aria-label="Requests" className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-ink">
            <Icon.Bell className="h-[18px] w-[18px]" />
            {requests.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold text-white ring-2 ring-surface" style={{ background: "var(--primary)" }}>
                {requests.length}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
