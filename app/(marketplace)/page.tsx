import Link from "next/link";
import { Icon } from "@/lib/icons";
import {
  VENUES,
  CATEGORIES,
  BENEFITS,
  TESTIMONIALS,
  MARKET_STATS,
} from "@/lib/marketplace";
import { SearchBar } from "@/components/market/SearchBar";
import { VenueCard } from "@/components/market/VenueCard";
import { VenueCover, Stars } from "@/components/market/ui";
import { MapSection } from "@/components/market/MapSection";
import { Faq } from "@/components/market/Faq";

const HOT = VENUES.slice(1, 5);

export default function MarketplaceHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(197,58,40,0.10), rgba(197,58,40,0) 62%)" }} />
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center sm:px-6 sm:pt-20">
          <span className="chip mx-auto bg-surface px-3 py-1.5 text-ink shadow-card">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} />
            {MARKET_STATS.pros}+ verified pros · Real-time availability · Instant booking
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            Book your next <span className="text-coral">beauty &amp; wellness</span> appointment.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Bookzyr is the marketplace for finding and instantly booking trusted hair salons, barbershops, spas, nail bars, lash studios, massage therapists, skincare clinics and more — with real-time availability and verified reviews.
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
            <Stat value={`${MARKET_STATS.pros}+`} label="verified pros" tone="var(--primary)" />
            <span className="text-border">·</span>
            <Stat value={MARKET_STATS.bookingsThisMonth.toLocaleString()} label="bookings this month" tone="#6CC289" />
            <span className="text-border">·</span>
            <Stat value={`${MARKET_STATS.secToBook} sec`} label="to book" tone="#4A9FBF" />
          </div>
        </div>
      </section>

      {/* Map */}
      <MapSection />

      {/* Recommended for you */}
      <Section title="Recommended for you" subtitle="Highly rated venues, services and pros taking new clients this week — handpicked by the Bookzyr team.">
        <Grid>
          {VENUES.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </Grid>
      </Section>

      {/* What's hot this week (dark band) */}
      <section className="mt-6" style={{ background: "linear-gradient(135deg, #0E1A2B, #1A2942)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">What&apos;s hot this week</h2>
              <p className="mt-1 max-w-2xl text-sm text-white/70">The fastest-growing venues, services and pros on Bookzyr — booking up faster than the rest.</p>
            </div>
            <Link href="/browse" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-white hover:underline sm:inline-flex">
              See all 501 venues <Icon.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {HOT.map((v, i) => {
              const cat = CATEGORIES.find((c) => c.key === v.categoryKey);
              return (
                <Link key={v.id} href={`/venue/${v.slug}`} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.07]">
                  <VenueCover gradient={v.gradient} label={v.name} icon={cat?.icon ?? "Scissors"} className="aspect-[4/3] w-full" />
                  <div className="mt-3 flex items-center gap-2">
                    <span className="chip bg-leaf/20 px-2 py-0.5 text-[11px] text-leaf">{v.growth ?? "Trending"}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-white">
                      <Icon.Star className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} /> {v.rating}
                    </span>
                  </div>
                  <h3 className="mt-1.5 truncate text-sm font-extrabold text-white">{v.name}</h3>
                  <p className="truncate text-xs text-white/60">{v.suburb}, {v.city} · from £{v.priceFrom}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">What people say about booking on Bookzyr</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">Verified reviews from real customers who booked their last appointment through Bookzyr.</p>
          <div className="mt-3 inline-flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon.Star key={i} className="h-4 w-4" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
              ))}
            </span>
            <span className="text-sm font-bold text-ink">{MARKET_STATS.rating}</span>
            <span className="text-sm text-muted">· {MARKET_STATS.reviews.toLocaleString()}+ reviews</span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="card p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.Star key={i} className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
                ))}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink">“{t.quote}”</p>
              <p className="mt-3 text-xs font-bold text-muted">{t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">The fastest way to book beauty &amp; wellness.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">Built for people who want a great salon, barber, spa or pro — without playing phone tag, getting ghosted, or paying booking fees.</p>
        </div>
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

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Questions, answered.</h2>
        <div className="mt-8">
          <Faq />
        </div>
      </section>

      {/* List your business CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl px-8 py-12 text-center" style={{ background: "linear-gradient(135deg, #C53A28, #E0492F)" }}>
          <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(circle at 85% 15%, #fff, transparent 40%)" }} />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Run a salon, barbershop, spa or beauty business?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Join {MARKET_STATS.pros}+ pros taking online bookings on Bookzyr. Fill your chair, cut no-shows, and get paid — set up in about 20 minutes.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/biz" className="btn mx-auto bg-white px-6 py-3 text-base font-bold text-coral hover:bg-white/90 sm:mx-0">
                List your business
              </Link>
              <Link href="/command-centre" className="btn mx-auto border border-white/40 px-6 py-3 text-base font-bold text-white hover:bg-white/10 sm:mx-0">
                See Bookzyr software
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <span>
      <span className="font-extrabold" style={{ color: tone }}>
        {value}
      </span>{" "}
      <span className="text-muted">{label}</span>
    </span>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>
        </div>
        <Link href="/browse" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-coral hover:underline sm:inline-flex">
          See all 501 venues <Icon.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}
