"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/lib/icons";
import type { Venue } from "@/lib/marketplace";
import { VenueCover, Stars } from "./ui";

function prettyDate(key: string | null) {
  if (!key) return "Today";
  const d = new Date(key);
  if (isNaN(d.getTime())) return "Today";
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

export function BookingFlow({ venue }: { venue: Venue }) {
  const params = useSearchParams();
  const serviceId = params.get("service") ?? venue.services[0]?.id;
  const service = venue.services.find((s) => s.id === serviceId) ?? venue.services[0];
  const day = params.get("day");
  const time = params.get("time") ?? "10:15";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const valid = name.trim() && email.trim() && phone.trim();
  const ref = `BZ-${venue.id.toUpperCase()}${time.replace(":", "")}`;

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-leaf">
          <Icon.Check className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">You're booked!</h1>
        <p className="mt-2 text-muted">A confirmation has been sent to {email}.</p>

        <div className="card mt-6 p-5 text-left">
          <div className="flex items-center gap-3">
            <VenueCover gradient={venue.gradient} label={venue.name} className="h-14 w-14" />
            <div className="min-w-0">
              <div className="truncate font-extrabold text-ink">{venue.name}</div>
              <div className="text-sm text-muted">{venue.suburb}, {venue.city}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Service" value={`${service?.name} · ${service?.durationMin}m`} />
            <Row label="When" value={`${prettyDate(day)} · ${time}`} />
            <Row label="Reference" value={ref} />
            <Row label="Total" value={`£${service?.price}`} bold />
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href={`/venue/${venue.slug}`} className="btn-ghost">
            View venue
          </Link>
          <Link href="/" className="btn-primary">
            Done
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Link href={`/venue/${venue.slug}`} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-coral">
        <Icon.ChevronLeft className="h-4 w-4" /> Back to {venue.name}
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Confirm &amp; book</h1>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr,360px]">
        {/* Details form */}
        <div className="card p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-ink">Your details</h2>
          <p className="mt-1 text-sm text-muted">We'll send your confirmation and reminders here.</p>

          <div className="mt-4 space-y-4">
            <Field label="Full name">
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Leon Carter" autoFocus />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email">
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </Field>
              <Field label="Mobile">
                <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 4xx xxx xxx" />
              </Field>
            </div>
            <Field label="Notes for the venue (optional)">
              <textarea className="input min-h-[80px] resize-none" placeholder="Anything they should know?" />
            </Field>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-xs text-muted">
            <Icon.Shield className="h-4 w-4 shrink-0 text-leaf" />
            Free cancellation up to 24 hours before. No booking fees, ever.
          </div>
        </div>

        {/* Summary */}
        <aside>
          <div className="card p-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <VenueCover gradient={venue.gradient} label={venue.name} className="h-14 w-14" />
              <div className="min-w-0">
                <div className="truncate font-extrabold text-ink">{venue.name}</div>
                <Stars rating={venue.rating} className="text-xs" />
              </div>
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
              <Row label="Service" value={service?.name ?? "—"} />
              <Row label="Duration" value={`${service?.durationMin} min`} />
              <Row label="Date" value={prettyDate(day)} />
              <Row label="Time" value={time} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-bold text-ink">Total</span>
              <span className="text-2xl font-extrabold text-ink">£{service?.price}</span>
            </div>

            <button onClick={() => valid && setConfirmed(true)} disabled={!valid} className="btn-primary mt-5 w-full py-3 text-base disabled:opacity-50">
              Confirm booking
            </button>
            <p className="mt-2 text-center text-xs text-muted">You won't be charged now — pay at the venue.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right ${bold ? "font-extrabold text-ink" : "font-semibold text-ink"}`}>{value}</dd>
    </div>
  );
}
