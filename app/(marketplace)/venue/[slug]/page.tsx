import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/lib/icons";
import { VENUES, CATEGORIES, venueBySlug } from "@/lib/marketplace";
import { VenueCover, Stars, Badge } from "@/components/market/ui";
import { BookingPanel } from "@/components/market/BookingPanel";

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const v = venueBySlug(params.slug);
  return { title: v ? `${v.name} · ${v.suburb} · Bookzyr` : "Venue · Bookzyr" };
}

export default function VenuePage({ params }: { params: { slug: string } }) {
  const venue = venueBySlug(params.slug);
  if (!venue) notFound();

  const cat = CATEGORIES.find((c) => c.key === venue.categoryKey);
  const categories = Array.from(new Set(venue.services.map((s) => s.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="hover:text-coral">
          Home
        </Link>
        <Icon.ChevronRight className="h-4 w-4" />
        <Link href={`/browse?cat=${venue.categoryKey}`} className="hover:text-coral">
          {venue.categoryLabel}
        </Link>
        <Icon.ChevronRight className="h-4 w-4" />
        <span className="text-ink">{venue.name}</span>
      </div>

      {/* Gallery */}
      <div className="grid gap-3 sm:grid-cols-[2fr,1fr]">
        <VenueCover gradient={venue.gradient} label={venue.name} icon={cat?.icon ?? "Scissors"} className="aspect-[16/9] w-full sm:aspect-[2/1]" />
        <div className="hidden grid-rows-2 gap-3 sm:grid">
          <VenueCover gradient={[venue.gradient[1], venue.gradient[0]]} label={venue.name} icon={cat?.icon ?? "Scissors"} className="w-full" />
          <VenueCover gradient={["#2A3852", venue.gradient[0]]} label={venue.suburb} icon="Pin" className="w-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr,360px]">
        {/* Main */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {venue.badge && <Badge tone={venue.badge === "Trending" ? "#6CC289" : "#FF6B5B"}>{venue.badge}</Badge>}
            <span className="chip bg-surface-2 px-2.5 py-1 text-xs text-muted">{venue.categoryLabel}</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{venue.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <Stars rating={venue.rating} />
            <span>({venue.reviews} reviews)</span>
            <span className="inline-flex items-center gap-1">
              <Icon.Pin className="h-4 w-4" /> {venue.suburb}, {venue.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Icon.Clock className="h-4 w-4" /> {venue.hours}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{venue.blurb}</p>

          {/* Services */}
          <section className="mt-8">
            <h2 className="text-xl font-extrabold text-ink">Services</h2>
            <div className="mt-3 space-y-5">
              {categories.map((c) => (
                <div key={c}>
                  <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{c}</h3>
                  <div className="card divide-y divide-border overflow-hidden">
                    {venue.services
                      .filter((s) => s.category === c)
                      .map((s) => (
                        <div key={s.id} className="flex items-center gap-4 px-4 py-3.5">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-ink">{s.name}</div>
                            <div className="flex items-center gap-1 text-xs text-muted">
                              <Icon.Clock className="h-3.5 w-3.5" /> {s.durationMin} min
                            </div>
                          </div>
                          <span className="text-base font-extrabold text-ink">£{s.price}</span>
                          <Link href={`/book/${venue.slug}?service=${s.id}`} className="btn-soft shrink-0">
                            Book
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mt-8">
            <h2 className="text-xl font-extrabold text-ink">Meet the team</h2>
            <div className="no-scrollbar mt-3 flex gap-4 overflow-x-auto pb-1">
              {venue.team.map((m) => (
                <div key={m.name} className="w-24 shrink-0 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full text-lg font-bold text-white" style={{ background: m.color }}>
                    {m.initials}
                  </span>
                  <div className="mt-2 truncate text-sm font-bold text-ink">{m.name}</div>
                  <div className="truncate text-xs text-muted">{m.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="mt-8">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-ink">Reviews</h2>
              <span className="chip bg-surface-2 px-2.5 py-1 text-xs text-ink">
                <Icon.Star className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} /> {venue.rating.toFixed(2)} · {venue.reviews}
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {venue.reviewList.map((r) => (
                <div key={r.id} className="card p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">{r.author}</span>
                    <span className="text-xs text-muted">{r.date}</span>
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon.Star key={i} className="h-3.5 w-3.5" style={{ fill: i < r.rating ? "#E8B86A" : "transparent", color: "#E8B86A" }} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Booking sidebar */}
        <aside>
          <div className="lg:sticky lg:top-24">
            <BookingPanel venue={venue} />
          </div>
        </aside>
      </div>
    </div>
  );
}
