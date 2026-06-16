"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { TODAY_BOOKINGS, serviceById } from "@/lib/data";
import type { Booking } from "@/lib/data";

/* A lightweight client-side store shared across the mobile staff app.
   Seeded with a busier day than the desktop demo so the agenda feels live.
   Persists for the lifetime of the mobile layout (survives tab switches). */

const SEED: Booking[] = [
  { id: "m1", barberId: "damian", clientName: "Leon Carter", serviceId: "s1", start: 9 * 60 + 30, status: "paid" },
  { id: "m2", barberId: "jay", clientName: "Aisha Khan", serviceId: "s8", start: 10 * 60, status: "confirmed" },
  { id: "m3", barberId: "damian", clientName: "Marco Silva", serviceId: "s2", start: 11 * 60, status: "confirmed" },
  { id: "m4", barberId: "marcus", clientName: "Daniel Osei", serviceId: "s3", start: 11 * 60 + 30, status: "pending" },
  { id: "m5", barberId: "tom", clientName: "Sophie Adams", serviceId: "s4", start: 13 * 60, status: "confirmed" },
  { id: "m6", barberId: "jay", clientName: "Hassan Ali", serviceId: "s5", start: 14 * 60, status: "confirmed" },
  { id: "m7", barberId: "damian", clientName: "Tom Whitfield", serviceId: "s1", start: 15 * 60 + 30, status: "confirmed" },
  { id: "m8", barberId: "marcus", clientName: "Priya Nair", serviceId: "s6", start: 16 * 60, status: "pending" },
  ...TODAY_BOOKINGS.map((b) => ({ ...b, id: `seed-${b.id}` })),
];

type Ctx = {
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
  revenue: number;
};

const MobileContext = createContext<Ctx | null>(null);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED);

  const value = useMemo<Ctx>(() => {
    const revenue = bookings.reduce((sum, b) => sum + (serviceById(b.serviceId)?.price ?? 0), 0);
    return {
      bookings,
      addBooking: (b) => setBookings((prev) => [...prev, { ...b, id: `b${Date.now()}` }]),
      revenue,
    };
  }, [bookings]);

  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
}

export function useMobile() {
  const ctx = useContext(MobileContext);
  if (!ctx) throw new Error("useMobile must be used within MobileProvider");
  return ctx;
}
