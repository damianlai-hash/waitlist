import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/lib/icons";

const CAMPAIGNS = [
  { name: "Win-back: lapsed clients", channel: "Email", status: "Active", sent: 142, opened: "61%", tone: "#6CC289" },
  { name: "Friday flash — 15% off fades", channel: "SMS", status: "Scheduled", sent: 0, opened: "—", tone: "#E8B86A" },
  { name: "Birthday rewards", channel: "Email", status: "Active", sent: 38, opened: "72%", tone: "#6CC289" },
  { name: "Spring rebrand announcement", channel: "Email", status: "Draft", sent: 0, opened: "—", tone: "#6B7589" },
];

export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        subtitle="Campaigns, automations and client outreach"
        actions={<button className="btn-primary"><Icon.Plus className="h-4 w-4" /> New campaign</button>}
      />

      <div className="space-y-5 px-6 pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon="Mail" label="Messages sent (30d)" value="1,204" delta="+22%" tone="#FF6B5B" />
          <StatCard icon="Activity" label="Avg open rate" value="64%" delta="+4%" tone="#4A9FBF" />
          <StatCard icon="Dollar" label="Attributed revenue" value="£2,860" delta="+31%" tone="#6CC289" />
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-lg font-extrabold text-ink">Campaigns</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Campaign</th>
                <th className="px-5 py-3">Channel</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Sent</th>
                <th className="px-5 py-3">Open rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CAMPAIGNS.map((c) => (
                <tr key={c.name} className="hover:bg-surface-2/50">
                  <td className="px-5 py-3.5 font-semibold text-ink">{c.name}</td>
                  <td className="px-5 py-3.5 text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      {c.channel === "Email" ? <Icon.Mail className="h-4 w-4" /> : <Icon.Phone className="h-4 w-4" />}
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="chip" style={{ background: `${c.tone}22`, color: c.tone }}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-ink">{c.sent || "—"}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">{c.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
