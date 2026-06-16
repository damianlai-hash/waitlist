"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";

type Msg = { role: "ai" | "user"; text: string };

const SUGGESTIONS = [
  "Who are my top 5 clients by spend?",
  "Draft a win-back SMS for lapsed clients",
  "When is my quietest hour this week?",
  "Summarise yesterday's takings",
];

const SEED: Msg[] = [
  { role: "ai", text: "Hi Damian 👋 I'm your Bookzyr assistant. I can pull insights, draft messages, and help you fill empty chairs. What would you like to do?" },
];

export default function AiAssistantPage() {
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text: t },
      { role: "ai", text: "Here's what I found based on your shop data. (This is a demo response — wire me to your Bookzyr backend to go live.)" },
    ]);
    setInput("");
  }

  return (
    <>
      <PageHeader
        title="AI Assistant"
        subtitle="Ask anything about your bookings, clients and revenue"
        actions={<span className="chip text-white" style={{ background: "var(--primary)" }}><Icon.Sparkles className="h-3.5 w-3.5" /> 5 new insights</span>}
      />

      <div className="mx-6 mb-8 flex h-[calc(100vh-200px)] flex-col">
        <div className="card flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: m.role === "ai" ? "var(--primary)" : "var(--navy)" }}>
                  {m.role === "ai" ? <Icon.Sparkles className="h-5 w-5" /> : "DA"}
                </span>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "ai" ? "bg-surface-2 text-ink" : "text-white"}`} style={m.role === "user" ? { background: "var(--navy)" } : undefined}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="chip text-ink hover:text-coral" style={{ background: "var(--surface-2)" }}>
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input className="input" placeholder="Ask your assistant…" value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" className="btn-primary px-4 py-2.5"><Icon.ChevronRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
