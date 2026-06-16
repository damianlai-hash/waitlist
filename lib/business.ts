import { SERVICES, serviceById } from "./data";
import type { Booking } from "./data";
import { VENUES } from "./marketplace";

/* ---------------------------------------------------------------------------
   Business ("Bookzyr for Business" owner app) mock data, anchored to the
   owner's venue — Empire Barbershop (also venue v1 in the marketplace).
--------------------------------------------------------------------------- */

export const MY_VENUE = VENUES[0];

/** Seeded day for the business app. Two requests are pending acceptance. */
export const BIZ_BOOKINGS_SEED: Booking[] = [
  { id: "bz1", barberId: "damian", clientName: "Leon Carter", serviceId: "s1", start: 9 * 60 + 30, status: "paid" },
  { id: "bz2", barberId: "jay", clientName: "Aisha Khan", serviceId: "s8", start: 10 * 60, status: "confirmed" },
  { id: "bz3", barberId: "damian", clientName: "Marco Silva", serviceId: "s2", start: 11 * 60, status: "confirmed" },
  { id: "bz4", barberId: "marcus", clientName: "Daniel Osei", serviceId: "s3", start: 13 * 60, status: "confirmed" },
  { id: "bz5", barberId: "tom", clientName: "Sophie Adams", serviceId: "s4", start: 14 * 60 + 30, status: "confirmed" },
  { id: "bz6", barberId: "damian", clientName: "Tom Whitfield", serviceId: "s1", start: 16 * 60, status: "confirmed" },
];

/** Incoming requests from the marketplace awaiting accept/decline. */
export const BIZ_REQUESTS_SEED: Booking[] = [
  { id: "req1", barberId: "jay", clientName: "Reece Holt", serviceId: "s3", start: 12 * 60, status: "pending" },
  { id: "req2", barberId: "marcus", clientName: "Omar Farah", serviceId: "s5", start: 17 * 60, status: "pending" },
];

export const REVENUE_WEEK = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 410 },
  { day: "Wed", value: 280 },
  { day: "Thu", value: 520 },
  { day: "Fri", value: 640 },
  { day: "Sat", value: 880 },
  { day: "Sun", value: 210 },
];

export const BIZ_METRICS = {
  revenueToday: 642,
  bookingsToday: 14,
  newClients: 5,
  rating: MY_VENUE.rating,
  reviews: MY_VENUE.reviews,
  avgSpend: 38,
  occupancy: 82,
  retention: 78,
  // marketplace funnel (this week)
  impressions: 4820,
  profileViews: 1240,
  marketplaceBookings: 96,
  weekChangePct: 12,
};

export const TOP_SERVICES = [
  { name: "Skin Fade", bookings: 86, revenue: 2752 },
  { name: "Cut & Beard", bookings: 54, revenue: 2268 },
  { name: "Classic Cut", bookings: 71, revenue: 1846 },
  { name: "Hot Towel Shave", bookings: 33, revenue: 990 },
  { name: "Beard Trim", bookings: 40, revenue: 640 },
];

export const RATING_BREAKDOWN = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export type BizReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  service: string;
  body: string;
  reply?: string;
};

export const BIZ_REVIEWS: BizReview[] = [
  { id: "rv1", author: "Leon C.", rating: 5, date: "2 days ago", service: "Skin Fade", body: "Best fade I've had in Surry Hills. In and out in 30 minutes." },
  { id: "rv2", author: "Marco S.", rating: 4, date: "4 days ago", service: "Classic Cut", body: "Great cut, friendly team. Parking nearby is a bit tight." },
  { id: "rv3", author: "Daniel O.", rating: 5, date: "1 week ago", service: "Cut & Beard", body: "Damian is a magician with the clippers. Booked my next 3 already.", reply: "Cheers Daniel — see you next time! 🙌" },
  { id: "rv4", author: "Hassan A.", rating: 5, date: "1 week ago", service: "Hot Towel Shave", body: "The hot towel shave is unreal. Proper old-school service." },
];

export type Payout = { id: string; date: string; amount: number; status: "Paid" | "Scheduled" };

export const PAYOUTS = {
  available: 1840,
  nextDate: "Mon 22 Jun",
  thisMonth: 9420,
  history: [
    { id: "p1", date: "8 Jun 2026", amount: 2180, status: "Paid" },
    { id: "p2", date: "1 Jun 2026", amount: 1960, status: "Paid" },
    { id: "p3", date: "25 May 2026", amount: 2240, status: "Paid" },
    { id: "p4", date: "18 May 2026", amount: 1875, status: "Paid" },
  ] as Payout[],
};

export type Promotion = { id: string; title: string; detail: string; active: boolean; tone: string };

export const PROMOTIONS: Promotion[] = [
  { id: "pr1", title: "20% off first visit", detail: "New clients from Bookzyr · 48 redeemed", active: true, tone: "#C53A28" },
  { id: "pr2", title: "Midweek skin fade £24", detail: "Tue–Thu before 3pm", active: true, tone: "#4A9FBF" },
  { id: "pr3", title: "Refer a mate — £5 each", detail: "Paused", active: false, tone: "#6CC289" },
];

export function revenueTotal(series: { value: number }[]) {
  return series.reduce((s, d) => s + d.value, 0);
}

export { SERVICES, serviceById };
