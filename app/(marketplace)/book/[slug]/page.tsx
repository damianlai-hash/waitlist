import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VENUES, venueBySlug } from "@/lib/marketplace";
import { BookingFlow } from "@/components/market/BookingFlow";

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export const metadata = { title: "Confirm booking · Bookzyr" };

export default function BookPage({ params }: { params: { slug: string } }) {
  const venue = venueBySlug(params.slug);
  if (!venue) notFound();

  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-20 text-center text-muted sm:px-6">Loading…</div>}>
      <BookingFlow venue={venue} />
    </Suspense>
  );
}
