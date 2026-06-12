import Link from "next/link";
import { Icon } from "@/lib/icons";
import {
  CATEGORIES,
  EDITORS_PICKS,
  TRENDING,
  BENEFITS,
  MARKET_STATS,
} from "@/lib/marketplace";
import { SearchBar } from "@/components/market/SearchBar";
import { VenueCard } from "@/components/market/VenueCard";
import { Faq } from "@/components/market/Faq";

export default function MarketplaceHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(255,107,91,0.10), rgba(255,107,91,0) 60%)" }} />
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
          <span className="chip mx-auto bg-surface px-3 py-1.5 text-coral shadow-card">
            <Icon.Star className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
            {MARKET_STATS.rating} from {MARKET_STATS.reviews.toLocaleString()}+ verified reviews
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Book beauty &amp; wellness,
            <br className="hidden sm:block" /> <span className="text-coral">instantly.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Discover {MARKET_STATS.pros}+ verified salons, barbershops and spas near you. Real-time availability, no phone calls, no booking fees.
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBar />
          </div>

          {/* Category quick links */}
          <div className="no-scrollbar mt-6 flex justify-start gap-2 overflow-x-auto px-1 sm:justify-center sm:flex-wrap">
            {CATEGORIES.map((c) => {
              const CatIcon = Icon[c.icon];
              return (
                <Link key={c.key} href={`/browse?cat=${c.key}`} className="chip shrink-0 border border-border bg-surface px-3 py-2 text-ink hover:border-coral hover:text-coral">
                  <CatIcon className="h-4 w-4" />
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <Section title="Editor's picks" subtitle="Handpicked venues accepting new clients" href="/browse">
        <Grid>
          {EDITORS_PICKS.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </Grid>
      </Section>

      {/* Trending */}
      <Section title="Trending now" subtitle="Fast-growing venues people are loving" href="/browse">
        <Grid>
          {TRENDING.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </Grid>
      </Section>

      {/* Why Bookzyr */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">Why book with Bookzyr</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => {
            const BIcon = Icon[b.icon];
            return (
              <div key={b.title} className="card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-coral/12 text-coral">
                  <BIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reviews band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card overflow-hidden">
          <div className="grid items-center gap-6 p-8 sm:grid-cols-[auto,1fr] sm:p-10">
            <div className="text-center sm:border-r sm:border-border sm:pr-10">
              <div className="text-6xl font-extrabold text-ink">{MARKET_STATS.rating}</div>
              <div className="mt-2 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.Star key={i} className="h-5 w-5" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
                ))}
              </div>
              <div className="mt-2 text-sm text-muted">{MARKET_STATS.reviews.toLocaleString()}+ reviews</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["“Booked a fade in under a minute. Unreal.”", "Leon C."],
                ["“Found a spa near me with a same-day slot.”", "Priya N."],
                ["“No fees, real reviews. My go-to now.”", "Marco S."],
              ].map(([quote, who]) => (
                <div key={who} className="rounded-xl bg-surface-2 p-4">
                  <p className="text-sm font-medium text-ink">{quote}</p>
                  <p className="mt-2 text-xs font-bold text-muted">{who}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* List your business CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl px-8 py-12 text-center" style={{ background: "linear-gradient(135deg, #1A2942, #2A3852)" }}>
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 85% 15%, #FF6B5B, transparent 40%)" }} />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Own a salon, barbershop or spa?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Join {MARKET_STATS.pros}+ pros taking online bookings on Bookzyr. Fill your chair, cut no-shows, and get paid — set up in minutes.
            </p>
            <Link href="/command-centre" className="btn-primary mx-auto mt-6 px-6 py-3 text-base">
              List your business <Icon.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">Frequently asked questions</h2>
        <div className="mt-8">
          <Faq />
        </div>
      </section>
    </>
  );
}

function Section({ title, subtitle, href, children }: { title: string; subtitle: string; href: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        <Link href={href} className="hidden shrink-0 items-center gap-1 text-sm font-bold text-coral hover:underline sm:inline-flex">
          See all venues <Icon.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}
