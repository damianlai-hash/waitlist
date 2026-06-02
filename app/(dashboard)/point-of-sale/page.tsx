"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";
import { SERVICES } from "@/lib/data";

type Line = { id: string; name: string; price: number; qty: number };

export default function PosPage() {
  const [cart, setCart] = useState<Line[]>([]);

  function add(id: string, name: string, price: number) {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, name, price, qty: 1 }];
    });
  }
  function dec(id: string) {
    setCart((prev) => prev.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])));
  }

  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <>
      <PageHeader title="Point of Sale" subtitle="Ring up walk-ins, products and tips" />

      <div className="grid grid-cols-1 gap-5 px-6 pb-8 lg:grid-cols-3">
        {/* Catalog */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => add(s.id, s.name, s.price)} className="card p-4 text-left transition-transform hover:-translate-y-0.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(255,107,91,.12)", color: "var(--primary)" }}>
                  <Icon.Scissors className="h-5 w-5" />
                </span>
                <div className="mt-3 font-bold text-ink">{s.name}</div>
                <div className="text-sm text-muted">£{s.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="card flex flex-col p-5">
          <h2 className="text-lg font-extrabold text-ink">Current sale</h2>
          <div className="mt-3 flex-1 space-y-2">
            {cart.length === 0 && <p className="py-10 text-center text-sm text-muted">Tap a service to start a sale.</p>}
            {cart.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
                <div className="flex-1">
                  <div className="font-semibold text-ink">{l.name}</div>
                  <div className="text-xs text-muted">£{l.price} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => dec(l.id)} className="grid h-6 w-6 place-items-center rounded-md bg-surface text-muted hover:text-ink"><Icon.Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-5 text-center text-sm font-bold text-ink">{l.qty}</span>
                  <button onClick={() => add(l.id, l.name, l.price)} className="grid h-6 w-6 place-items-center rounded-md bg-surface text-muted hover:text-ink"><Icon.Plus className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="mt-1 flex justify-between text-lg font-extrabold text-ink"><span>Total</span><span>£{subtotal.toFixed(2)}</span></div>
            <button className="btn-primary mt-4 w-full py-3" disabled={cart.length === 0}>
              <Icon.Dollar className="h-4 w-4" /> Take payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
