"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/lib/icons";
import { VENUES, CATEGORIES, CITIES } from "@/lib/marketplace";
import { VenueCard } from "@/components/market/VenueCard";
import { SearchBar } from "@/components/market/SearchBar";

const SORTS = ["Recommended", "Top rated", "Price: low to high", "Most reviewed"] as const;

export function BrowseClient() {
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get("cat") ?? "");
  const [city, setCity] = useState(params.get("city") ?? "");
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = VENUES.filter((v) => {
      if (cat && v.categoryKey !== cat) return false;
      if (city && v.city !== city) return false;
      if (v.priceFrom > maxPrice) return false;
      if (v.rating < minRating) return false;
      return true;
    });
    if (sort === "Top rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Price: low to high") list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "Most reviewed") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [cat, city, maxPrice, minRating, sort]);

  const Filters = (
    <div className="space-y-6">
      <FilterGroup label="Treatment">
        <div className="flex flex-wrap gap-2">
          <Chip active={cat === ""} onClick={() => setCat("")}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
              {c.label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="City">
        <div className="flex flex-wrap gap-2">
          <Chip active={city === ""} onClick={() => setCity("")}>
            Anywhere
          </Chip>
          {CITIES.map((c) => (
            <Chip key={c} active={city === c} onClick={() => setCity(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={`Max price · £${maxPrice}`}>
        <input type="range" min={15} max={100} step={5} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-coral" />
      </FilterGroup>

      <FilterGroup label="Minimum rating">
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>
              {r === 0 ? "Any" : `${r}+`}
            </Chip>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-ink">Filters</h2>
            {Filters}
          </div>
        </aside>

        <div>
          {/* Results header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-extrabold text-ink">
                {results.length} venue{results.length === 1 ? "" : "s"}
                {city && <span className="text-muted"> in {city}</span>}
              </h1>
              <p className="text-sm text-muted">{cat ? CATEGORIES.find((c) => c.key === cat)?.label : "All treatments"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFiltersOpen((v) => !v)} className="btn-ghost lg:hidden">
                <Icon.Sliders className="h-4 w-4" /> Filters
              </button>
              <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm">
                <span className="text-muted">Sort</span>
                <select className="market-select w-auto" value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}>
                  {SORTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Mobile filters drawer */}
          {filtersOpen && (
            <div className="mb-5 rounded-2xl border border-border bg-surface p-4 lg:hidden">{Filters}</div>
          )}

          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="card flex flex-col items-center gap-3 p-12 text-center">
              <Icon.Search className="h-8 w-8 text-muted" />
              <p className="text-sm text-muted">No venues match your filters. Try widening your search.</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setCat("");
                  setCity("");
                  setMaxPrice(100);
                  setMinRating(0);
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{label}</h3>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`chip border px-3 py-1.5 ${active ? "border-transparent text-white" : "border-border bg-surface text-ink hover:border-coral"}`}
      style={active ? { background: "var(--primary)" } : undefined}
    >
      {children}
    </button>
  );
}
