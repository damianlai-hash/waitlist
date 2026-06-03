"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/lib/icons";
import { useTheme } from "@/components/ThemeProvider";

export function AppBar({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle?: string;
  /** When set, shows a back chevron instead of the bell. */
  back?: boolean;
}) {
  const { theme, toggle } = useTheme();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex items-center gap-3">
        {back ? (
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-ink"
          >
            <Icon.ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link href="/m" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--primary)" }}>
            <Icon.Scissors className="h-5 w-5" />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-extrabold leading-tight text-ink">{title}</div>
          {subtitle && <div className="truncate text-xs text-muted">{subtitle}</div>}
        </div>

        <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink">
          {theme === "dark" ? <Icon.Sun className="h-[18px] w-[18px]" /> : <Icon.Moon className="h-[18px] w-[18px]" />}
        </button>
        {!back && (
          <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-ink">
            <Icon.Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2 ring-surface" style={{ background: "var(--primary)" }} />
          </button>
        )}
      </div>
    </header>
  );
}
