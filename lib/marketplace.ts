import { SERVICES } from "./data";
import type { Service } from "./data";

/* ---------------------------------------------------------------------------
   Marketplace mock data — consumer side (discovery + venue + booking).
   Self-contained so it can be swapped for the Bookzyr API later.
--------------------------------------------------------------------------- */

export type Category = {
  key: string;
  label: string;
  icon: "Scissors" | "Sparkles" | "Heart" | "Tag" | "Activity" | "Star";
  gradient: [string, string];
};

export const CATEGORIES: Category[] = [
  { key: "hair", label: "Hair & Beauty", icon: "Scissors", gradient: ["#FF6B5B", "#E8B86A"] },
  { key: "barber", label: "Barbershop", icon: "Scissors", gradient: ["#1A2942", "#4A9FBF"] },
  { key: "nails", label: "Nails", icon: "Sparkles", gradient: ["#B98AC9", "#FF8B70"] },
  { key: "spa", label: "Spa & Wellness", icon: "Heart", gradient: ["#6CC289", "#4A9FBF"] },
  { key: "brows", label: "Brows & Lashes", icon: "Star", gradient: ["#E8B86A", "#FF6B5B"] },
  { key: "massage", label: "Massage", icon: "Activity", gradient: ["#4A9FBF", "#6CC289"] },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  categoryKey: string;
  categoryLabel: string;
  suburb: string;
  city: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  gradient: [string, string];
  badge?: "Editor's pick" | "Trending" | "New";
  growth?: string; // e.g. "+400%"
  blurb: string;
  services: Service[];
  team: { name: string; role: string; initials: string; color: string }[];
  hours: string;
  reviewList: Review[];
};

const TEAM_COLORS = ["#FF6B5B", "#4A9FBF", "#6CC289", "#B98AC9", "#E8B86A"];

function team(names: [string, string][]) {
  return names.map(([name, role], i) => ({
    name,
    role,
    initials: name.split(" ").map((w) => w[0]).slice(0, 2).join(""),
    color: TEAM_COLORS[i % TEAM_COLORS.length],
  }));
}

function pickServices(ids: string[]): Service[] {
  return ids.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean);
}

const sampleReviews = (name: string): Review[] => [
  { id: "r1", author: "Leon C.", rating: 5, date: "2 days ago", body: `Best fade I've had in ${name.split(" ")[0]}. Booked in 20 seconds and barely waited.` },
  { id: "r2", author: "Aisha K.", rating: 5, date: "1 week ago", body: "Spotless place, friendly team and the result was exactly what I asked for." },
  { id: "r3", author: "Marco S.", rating: 4, date: "2 weeks ago", body: "Great value and easy rebooking. Took one star off only because parking is tight." },
];

export const VENUES: Venue[] = [
  {
    id: "v1",
    slug: "empire-barbershop",
    name: "Empire Barbershop",
    categoryKey: "barber",
    categoryLabel: "Barbershop",
    suburb: "Surry Hills",
    city: "Sydney",
    rating: 4.9,
    reviews: 482,
    priceFrom: 18,
    gradient: ["#1A2942", "#4A9FBF"],
    badge: "Editor's pick",
    blurb: "A modern take on the classic barbershop — skin fades, hot-towel shaves and zero-fuss booking.",
    services: pickServices(["s1", "s2", "s3", "s4", "s5", "s7"]),
    team: team([["Damian Lai", "Master barber"], ["Jay Patel", "Barber"], ["Marcus Cole", "Barber"], ["Tom Reed", "Junior barber"]]),
    hours: "Mon–Sat · 9:00–20:00",
    reviewList: sampleReviews("Surry Hills"),
  },
  {
    id: "v2",
    slug: "gloss-hair-studio",
    name: "Gloss Hair Studio",
    categoryKey: "hair",
    categoryLabel: "Hair & Beauty",
    suburb: "Fitzroy",
    city: "Melbourne",
    rating: 4.8,
    reviews: 318,
    priceFrom: 30,
    gradient: ["#FF6B5B", "#E8B86A"],
    badge: "Trending",
    growth: "+400%",
    blurb: "Colour specialists and precision cuts in the heart of Fitzroy. Balayage, gloss and styling.",
    services: pickServices(["s2", "s8", "s3"]),
    team: team([["Priya Nair", "Senior stylist"], ["Sophie Adams", "Colourist"], ["Hassan Ali", "Stylist"]]),
    hours: "Tue–Sun · 9:00–18:00",
    reviewList: sampleReviews("Fitzroy"),
  },
  {
    id: "v3",
    slug: "serene-day-spa",
    name: "Serene Day Spa",
    categoryKey: "spa",
    categoryLabel: "Spa & Wellness",
    suburb: "Bondi",
    city: "Sydney",
    rating: 4.95,
    reviews: 521,
    priceFrom: 45,
    gradient: ["#6CC289", "#4A9FBF"],
    badge: "Editor's pick",
    blurb: "Ocean-side sanctuary for massage, facials and full-body wellness rituals.",
    services: pickServices(["s5", "s8"]),
    team: team([["Mia Turner", "Therapist"], ["Daniel Osei", "Masseur"]]),
    hours: "Daily · 8:00–21:00",
    reviewList: sampleReviews("Bondi"),
  },
  {
    id: "v4",
    slug: "luxe-nail-bar",
    name: "Luxe Nail Bar",
    categoryKey: "nails",
    categoryLabel: "Nails",
    suburb: "South Yarra",
    city: "Melbourne",
    rating: 4.7,
    reviews: 274,
    priceFrom: 25,
    gradient: ["#B98AC9", "#FF8B70"],
    badge: "Trending",
    growth: "+280%",
    blurb: "Gel, BIAB and nail art by award-winning technicians. Walk-ins welcome.",
    services: pickServices(["s8", "s4"]),
    team: team([["Jess Lin", "Nail artist"], ["Reece Holt", "Technician"]]),
    hours: "Mon–Sun · 10:00–19:00",
    reviewList: sampleReviews("South Yarra"),
  },
  {
    id: "v5",
    slug: "the-grooming-room",
    name: "The Grooming Room",
    categoryKey: "barber",
    categoryLabel: "Barbershop",
    suburb: "Newtown",
    city: "Sydney",
    rating: 4.85,
    reviews: 396,
    priceFrom: 22,
    gradient: ["#2A3852", "#FF6B5B"],
    badge: "New",
    blurb: "Inner-west favourite for sharp cuts, beard sculpting and a proper hot towel finish.",
    services: pickServices(["s1", "s3", "s4", "s7"]),
    team: team([["Omar Farah", "Barber"], ["Tom Whitfield", "Barber"]]),
    hours: "Mon–Sat · 8:30–19:00",
    reviewList: sampleReviews("Newtown"),
  },
  {
    id: "v6",
    slug: "brow-and-lash-lab",
    name: "Brow & Lash Lab",
    categoryKey: "brows",
    categoryLabel: "Brows & Lashes",
    suburb: "Paddington",
    city: "Sydney",
    rating: 4.78,
    reviews: 188,
    priceFrom: 20,
    gradient: ["#E8B86A", "#FF6B5B"],
    blurb: "Brow lamination, lash lifts and tints from certified brow stylists.",
    services: pickServices(["s4", "s8"]),
    team: team([["Sophie Adams", "Brow stylist"], ["Aisha Khan", "Lash tech"]]),
    hours: "Tue–Sat · 9:00–17:00",
    reviewList: sampleReviews("Paddington"),
  },
  {
    id: "v7",
    slug: "still-point-massage",
    name: "Still Point Massage",
    categoryKey: "massage",
    categoryLabel: "Massage",
    suburb: "Carlton",
    city: "Melbourne",
    rating: 4.9,
    reviews: 233,
    priceFrom: 55,
    gradient: ["#4A9FBF", "#6CC289"],
    badge: "Trending",
    growth: "+150%",
    blurb: "Remedial and deep-tissue massage with health-fund rebates on the spot.",
    services: pickServices(["s5", "s8"]),
    team: team([["Daniel Osei", "Remedial therapist"], ["Mia Turner", "Therapist"]]),
    hours: "Mon–Sat · 9:00–20:00",
    reviewList: sampleReviews("Carlton"),
  },
  {
    id: "v8",
    slug: "halo-beauty-co",
    name: "Halo Beauty Co.",
    categoryKey: "hair",
    categoryLabel: "Hair & Beauty",
    suburb: "Brunswick",
    city: "Melbourne",
    rating: 4.82,
    reviews: 301,
    priceFrom: 28,
    gradient: ["#FF8B70", "#B98AC9"],
    badge: "Editor's pick",
    blurb: "All-in-one beauty house: cuts, colour, nails and makeup under one roof.",
    services: pickServices(["s2", "s6", "s8"]),
    team: team([["Priya Nair", "Stylist"], ["Jess Lin", "Beauty therapist"], ["Hassan Ali", "Barber"]]),
    hours: "Daily · 9:00–19:00",
    reviewList: sampleReviews("Brunswick"),
  },
];

export function venueBySlug(slug: string) {
  return VENUES.find((v) => v.slug === slug);
}

export const EDITORS_PICKS = VENUES.filter((v) => v.badge === "Editor's pick");
export const TRENDING = VENUES.filter((v) => v.badge === "Trending");

export const CITIES = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast"];

export const WHEN_OPTIONS = ["Any time", "Today", "Tomorrow", "This week", "This month"];

export const BENEFITS: { icon: "Clock" | "Shield" | "Dollar" | "Check"; title: string; body: string }[] = [
  { icon: "Clock", title: "Real-time availability", body: "See open slots and book instantly — no phone calls, no waiting for a callback." },
  { icon: "Shield", title: "Verified reviews only", body: "Every review comes from a real, completed booking. No fakes, ever." },
  { icon: "Dollar", title: "Always free", body: "Booking through Bookzyr never costs you a cent. No hidden fees." },
  { icon: "Check", title: "Free cancellation", body: "Plans change. Cancel free up to 24 hours before your appointment." },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "How does Bookzyr work?", a: "Search by treatment, location and time, pick a venue, choose a service and an open slot, and confirm. You get instant confirmation — no phone tag." },
  { q: "Does it cost anything to book?", a: "No. Booking through Bookzyr is completely free for customers. You only pay the venue for your service." },
  { q: "Can I cancel or reschedule?", a: "Yes — you can cancel or reschedule free of charge up to 24 hours before your appointment, right from your bookings." },
  { q: "Are the reviews real?", a: "Every review is tied to a completed booking, so you only ever see feedback from genuine customers." },
  { q: "How do I list my business?", a: "Tap “List your business”, tell us about your venue and services, and you can start taking online bookings the same day." },
];

export const MARKET_STATS = { venues: 501, rating: 4.84, reviews: 12480, pros: 501 };
