import Link from "next/link";
import { Icon } from "@/lib/icons";
import { CATEGORIES, CITIES } from "@/lib/marketplace";

export function MarketFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--primary)" }}>
              <Icon.Scissors className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-ink">Bookzyr</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            The free way to book beauty &amp; wellness. Real-time availability from verified pros near you.
          </p>
        </div>

        <FooterCol title="Treatments" links={CATEGORIES.map((c) => ({ label: c.label, href: `/browse?cat=${c.key}` }))} />
        <FooterCol title="Cities" links={CITIES.map((c) => ({ label: c, href: `/browse?city=${c}` }))} />
        <FooterCol
          title="Company"
          links={[
            { label: "For Business", href: "/command-centre" },
            { label: "List your business", href: "/command-centre" },
            { label: "Help centre", href: "/browse" },
            { label: "Staff app", href: "/m" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Bookzyr. All rights reserved.</span>
          <span>Made for beauty &amp; wellness, better than the rest.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-ink hover:text-coral">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
