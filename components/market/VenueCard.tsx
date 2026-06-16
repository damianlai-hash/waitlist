import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { Venue } from "@/lib/marketplace";
import { CATEGORIES } from "@/lib/marketplace";
import { VenueCover, Stars, Badge } from "./ui";

export function VenueCard({ venue, className = "" }: { venue: Venue; className?: string }) {
  const cat = CATEGORIES.find((c) => c.key === venue.categoryKey);
  return (
    <Link href={`/venue/${venue.slug}`} className={`group block ${className}`}>
      <div className="relative">
        <VenueCover gradient={venue.gradient} label={venue.name} icon={cat?.icon ?? "Scissors"} className="aspect-[4/3] w-full transition-transform group-hover:scale-[1.01]" />
        {venue.badge && (
          <div className="absolute right-3 top-3">
            <Badge tone={venue.badge === "Trending" ? "#6CC289" : venue.badge === "New" ? "#4A9FBF" : "#FF6B5B"}>
              {venue.badge === "Trending" && venue.growth ? `Trending ${venue.growth}` : venue.badge}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-[15px] font-extrabold text-ink">{venue.name}</h3>
          <Stars rating={venue.rating} className="shrink-0 text-sm" />
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-sm text-muted">
          <Icon.Pin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {venue.suburb}, {venue.city}
          </span>
          <span className="text-border">·</span>
          <span className="shrink-0 text-muted">{venue.reviews} reviews</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm">
          <span className="chip bg-surface-2 px-2 py-0.5 text-xs text-muted">{venue.categoryLabel}</span>
          <span className="ml-auto font-bold text-ink">
            from <span className="text-coral">£{venue.priceFrom}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
