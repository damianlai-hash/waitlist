import type { IconKey } from "./icons";

export type NavItem = {
  label: string;
  href: string;
  icon: IconKey;
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Command Centre", href: "/command-centre", icon: "Home" },
  { label: "Calendar", href: "/calendar", icon: "Calendar" },
  { label: "Clients", href: "/clients", icon: "Users" },
  { label: "Staff", href: "/staff", icon: "Scissors" },
  { label: "Services", href: "/services", icon: "Tag" },
  { label: "Point of Sale", href: "/point-of-sale", icon: "Cart" },
  { label: "Analytics", href: "/analytics", icon: "Chart" },
  { label: "Reports", href: "/reports", icon: "Doc" },
  { label: "Marketing", href: "/marketing", icon: "Megaphone" },
  { label: "AI Assistant", href: "/ai-assistant", icon: "Sparkles", badge: 5 },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

export type Barber = {
  id: string;
  name: string;
  initials: string;
  color: string; // accent used for avatar + bookings
  working: boolean;
};

export const BARBERS: Barber[] = [
  { id: "damian", name: "Damian", initials: "DL", color: "#B98AC9", working: true },
  { id: "jay", name: "Jay", initials: "JP", color: "#4A9FBF", working: false },
  { id: "marcus", name: "Marcus", initials: "MC", color: "#FF6B5B", working: false },
  { id: "tom", name: "Tom", initials: "TR", color: "#6CC289", working: false },
];

export type Service = {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  category: string;
};

export const SERVICES: Service[] = [
  { id: "s1", name: "Skin Fade", durationMin: 45, price: 32, category: "Cuts" },
  { id: "s2", name: "Classic Cut", durationMin: 30, price: 26, category: "Cuts" },
  { id: "s3", name: "Cut & Beard", durationMin: 60, price: 42, category: "Cuts" },
  { id: "s4", name: "Beard Trim", durationMin: 20, price: 16, category: "Beard" },
  { id: "s5", name: "Hot Towel Shave", durationMin: 40, price: 30, category: "Beard" },
  { id: "s6", name: "Kids Cut", durationMin: 25, price: 18, category: "Cuts" },
  { id: "s7", name: "Buzz Cut", durationMin: 20, price: 18, category: "Cuts" },
  { id: "s8", name: "Wash & Style", durationMin: 30, price: 22, category: "Styling" },
];

export type Booking = {
  id: string;
  barberId: string;
  clientName: string;
  serviceId: string;
  /** minutes from 00:00 */
  start: number;
  status: "confirmed" | "pending" | "paid";
};

export const TODAY_BOOKINGS: Booking[] = [
  {
    id: "b1",
    barberId: "damian",
    clientName: "Leon Carter",
    serviceId: "s1",
    start: 14 * 60,
    status: "confirmed",
  },
];

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  visits: number;
  lastVisit: string;
  spend: number;
  tag: "Regular" | "New" | "VIP" | "Lapsed";
};

export const CLIENTS: Client[] = [
  { id: "c1", name: "Leon Carter", phone: "+44 7700 900123", email: "leon@example.com", visits: 18, lastVisit: "2 Jun 2026", spend: 612, tag: "VIP" },
  { id: "c2", name: "Aisha Khan", phone: "+44 7700 900871", email: "aisha@example.com", visits: 9, lastVisit: "28 May 2026", spend: 244, tag: "Regular" },
  { id: "c3", name: "Marco Silva", phone: "+44 7700 900455", email: "marco@example.com", visits: 1, lastVisit: "30 May 2026", spend: 32, tag: "New" },
  { id: "c4", name: "Tom Whitfield", phone: "+44 7700 900099", email: "tomw@example.com", visits: 23, lastVisit: "1 Jun 2026", spend: 781, tag: "VIP" },
  { id: "c5", name: "Priya Nair", phone: "+44 7700 900512", email: "priya@example.com", visits: 6, lastVisit: "12 Mar 2026", spend: 168, tag: "Lapsed" },
  { id: "c6", name: "Daniel Osei", phone: "+44 7700 900644", email: "daniel@example.com", visits: 14, lastVisit: "29 May 2026", spend: 392, tag: "Regular" },
  { id: "c7", name: "Sophie Adams", phone: "+44 7700 900733", email: "sophie@example.com", visits: 3, lastVisit: "26 May 2026", spend: 78, tag: "New" },
  { id: "c8", name: "Hassan Ali", phone: "+44 7700 900288", email: "hassan@example.com", visits: 11, lastVisit: "27 May 2026", spend: 318, tag: "Regular" },
];

export type WaitlistEntry = {
  id: string;
  name: string;
  service: string;
  preferredBarber: string;
  window: string;
};

export const WAITLIST: WaitlistEntry[] = [
  { id: "w1", name: "Reece Holt", service: "Skin Fade", preferredBarber: "Damian", window: "Today, afternoon" },
  { id: "w2", name: "Omar Farah", service: "Cut & Beard", preferredBarber: "Any", window: "Today, after 5pm" },
  { id: "w3", name: "Jess Lin", service: "Beard Trim", preferredBarber: "Marcus", window: "This week" },
];

/** Time grid config for the calendar (matches the original 30-min slots). */
export const DAY_START = 9 * 60; // 09:00
export const DAY_END = 20 * 60; // 20:00
export const SLOT_MIN = 30;

export function formatTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function serviceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}
