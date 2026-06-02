"use client";

import { Icon } from "@/lib/icons";
import { useTheme } from "./ThemeProvider";

export function TopBar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface/80 px-5 py-3 backdrop-blur">
      <div className="relative max-w-xl flex-1">
        <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          className="input pl-10"
          placeholder="Search clients by name, phone, or email…"
          aria-label="Search clients"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <IconButton label="Announcements">
          <Icon.Megaphone className="h-5 w-5" />
        </IconButton>
        <IconButton label="Notifications" dot>
          <Icon.Bell className="h-5 w-5" />
        </IconButton>
        <IconButton label="Toggle theme" onClick={toggle}>
          {theme === "dark" ? <Icon.Sun className="h-5 w-5" /> : <Icon.Moon className="h-5 w-5" />}
        </IconButton>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
  dot,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  dot?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {children}
      {dot && <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: "var(--primary)" }} />}
    </button>
  );
}
