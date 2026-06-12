"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/lib/icons";
import { useTheme } from "@/components/ThemeProvider";

const NAV = [
  { label: "Browse", href: "/browse" },
  { label: "Help", href: "/browse" },
  { label: "For Business", href: "/command-centre" },
];

export function MarketHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--primary)" }}>
            <Icon.Scissors className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink">Bookzyr</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-surface-2 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink hover:bg-surface-2">
            {theme === "dark" ? <Icon.Sun className="h-[18px] w-[18px]" /> : <Icon.Moon className="h-[18px] w-[18px]" />}
          </button>
          <Link href="/command-centre" className="hidden btn-ghost sm:inline-flex">
            List your business
          </Link>
          <Link href="/browse" className="hidden btn-soft md:inline-flex">
            Sign in
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink md:hidden">
            <Icon.List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-2 md:hidden">
          {[...NAV, { label: "Sign in", href: "/browse" }, { label: "List your business", href: "/command-centre" }].map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-surface-2">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
