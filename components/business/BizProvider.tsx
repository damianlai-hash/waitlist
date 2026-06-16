"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { BIZ_BOOKINGS_SEED, BIZ_REQUESTS_SEED } from "@/lib/business";
import { serviceById } from "@/lib/data";
import type { Booking } from "@/lib/data";

type Ctx = {
  bookings: Booking[];
  requests: Booking[];
  accept: (id: string) => void;
  decline: (id: string) => void;
  revenueToday: number;
};

const BizContext = createContext<Ctx | null>(null);

export function BizProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(BIZ_BOOKINGS_SEED);
  const [requests, setRequests] = useState<Booking[]>(BIZ_REQUESTS_SEED);

  const value = useMemo<Ctx>(() => {
    const accept = (id: string) =>
      setRequests((reqs) => {
        const r = reqs.find((x) => x.id === id);
        if (r) setBookings((b) => [...b, { ...r, status: "confirmed" }]);
        return reqs.filter((x) => x.id !== id);
      });
    const decline = (id: string) => setRequests((reqs) => reqs.filter((x) => x.id !== id));
    const revenueToday = bookings.reduce((s, b) => s + (serviceById(b.serviceId)?.price ?? 0), 0);
    return { bookings, requests, accept, decline, revenueToday };
  }, [bookings, requests]);

  return <BizContext.Provider value={value}>{children}</BizContext.Provider>;
}

export function useBiz() {
  const ctx = useContext(BizContext);
  if (!ctx) throw new Error("useBiz must be used within BizProvider");
  return ctx;
}
