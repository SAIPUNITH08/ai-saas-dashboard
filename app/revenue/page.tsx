"use client";
import Sidebar from "@/components/Sidebar";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", mrr: 42000, arr: 504000, new: 8200, expansion: 3100, churn: 1200 },
  { month: "Feb", mrr: 48000, arr: 576000, new: 9400, expansion: 3800, churn: 1500 },
  { month: "Mar", mrr: 39000, arr: 468000, new: 7100, expansion: 2900, churn: 2100 },
  { month: "Apr", mrr: 61000, arr: 732000, new: 12400, expansion: 4600, churn: 1800 },
  { month: "May", mrr: 55000, arr: 660000, new: 10800, expansion: 4100, churn: 1600 },
  { month: "Jun", mrr: 73000, arr: 876000, new: 14200, expansion: 5500, churn: 2000 },
  { month: "Jul", mrr: 68000, arr: 816000, new: 13100, expansion: 5100, churn: 1900 },
  { month: "Aug", mrr: 82000, arr: 984000, new: 16100, expansion: 6200, churn: 2200 },
  { month: "Sep", mrr: 91000, arr: 1092000, new: 17800, expansion: 6900, churn: 2400 },
  { month: "Oct", mrr: 87000, arr: 1044000, new: 16800, expansion: 6600, churn: 2300 },
  { month: "Nov", mrr: 105000, arr: 1260000, new: 20400, expansion: 8100, churn: 2700 },
  { month: "Dec", mrr: 118000, arr: 1416000, new: 23100, expansion: 9200, churn: 3000 },
];

const planRevenue = [
  { plan: "Starter", revenue: 82400, users: 1855, arpu: 44 },
  { plan: "Pro", revenue: 214800, users: 1225, arpu: 175 },
  { plan: "Enterprise", revenue: 472800, users: 420, arpu: 1126 },
];

const topDeals = [
  { company: "TechCorp India", plan: "Enterprise", value: "₹14,40,000", growth: "+28%", status: "Renewed" },
  { company: "FinServe Ltd", plan: "Enterprise", value: "₹12,00,000", growth: "+15%", status: "Renewed" },
  { company: "MediaHouse Co", plan: "Pro", value: "₹2,10,000", growth: "+40%", status: "Upgraded" },
  { company: "StartupXYZ", plan: "Pro", value: "₹1,80,000", growth: "New", status: "New" },
  { company: "RetailCo", plan: "Enterprise", value: "₹10,80,000", growth: "+8%", status: "Renewed" },
];

const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.8rem" }}>
        <div style={{ color: "#666", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color || p.stroke, marginTop: "0.2rem" }}>
            {p.name}: ${(p.value / 1000).toFixed(0)}k
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenuePage() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.mrr, 0);
  const avgMRR = Math.round(totalRevenue / 12);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Revenue</h1>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>MRR, ARR, and revenue breakdown analytics</p>
        </header>

        <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {[
              { label: "Total Revenue 2025", value: `$${(totalRevenue / 1000).toFixed(0)}k`, change: "+34%", color: "var(--accent)" },
              { label: "Current MRR", value: "$118k", change: "+24.5%", color: "#60a5fa" },
              { label: "ARR (Run Rate)", value: "$1.42M", change: "+24.5%", color: "#a78bfa" },
              { label: "Avg MRR/Month", value: `$${(avgMRR / 1000).toFixed(0)}k`, change: "+34%", color: "#fb923c" },
            ].map(k => (
              <div key={k.label} style={{ ...card, borderTop: `2px solid ${k.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>{k.label}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 20, background: "rgba(200,245,96,0.1)", color: "var(--accent)" }}>{k.change}</span>
                </div>
                <div style={{ fontSize: "1.9rem", fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* MRR trend area chart */}
          <div style={card}>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>MRR Growth</div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>Monthly Recurring Revenue — full year trend</div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c8f560" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#c8f560" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="mrr" stroke="#c8f560" strokeWidth={2.5} fill="url(#mrrGrad)" name="MRR" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue breakdown + Plan revenue */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.25rem" }}>
            <div style={card}>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Revenue Breakdown</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>New, expansion, and churn impact monthly</div>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                  <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "0.75rem", color: "#666" }} />
                  <Bar dataKey="new" fill="#c8f560" radius={[3,3,0,0]} name="New" stackId="a" />
                  <Bar dataKey="expansion" fill="#60a5fa" radius={[3,3,0,0]} name="Expansion" stackId="a" />
                  <Bar dataKey="churn" fill="#f87171" radius={[3,3,0,0]} name="Churn" stackId="b" />
                  <Line type="monotone" dataKey="mrr" stroke="#a78bfa" strokeWidth={2} dot={false} name="MRR" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div style={card}>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Revenue by Plan</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>Annual revenue contribution per tier</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {planRevenue.map((p, i) => {
                  const colors = ["#a78bfa", "#60a5fa", "#c8f560"];
                  const total = planRevenue.reduce((s, r) => s + r.revenue, 0);
                  const pct = Math.round((p.revenue / total) * 100);
                  return (
                    <div key={p.plan}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <div>
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{p.plan}</span>
                          <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginLeft: "0.5rem" }}>{p.users} users · ${p.arpu} ARPU</span>
                        </div>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: colors[i] }}>${(p.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div style={{ height: 8, background: "#1a1a1a", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: colors[i], borderRadius: 4, transition: "width 1s ease" }} />
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.3rem" }}>{pct}% of total revenue</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#0d0d0d", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: "0.3rem" }}>💡 Key Insight</div>
                <div style={{ fontSize: "0.8rem", color: "var(--soft)", lineHeight: 1.6 }}>Enterprise users (12% of base) generate <span style={{ color: "var(--accent)", fontWeight: 600 }}>61% of revenue</span>. Focus retention efforts here for maximum impact.</div>
              </div>
            </div>
          </div>

          {/* Top deals table */}
          <div style={card}>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.3rem" }}>Top Deals</div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "1.25rem" }}>Highest value contracts in 2025</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Company", "Plan", "Annual Value", "Growth", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontSize: "0.72rem", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topDeals.map((d, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #141414" }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "#141414"}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}
                  >
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)" }}>
                          {d.company[0]}
                        </div>
                        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{d.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 20, background: d.plan === "Enterprise" ? "rgba(200,245,96,0.1)" : "rgba(96,165,250,0.1)", color: d.plan === "Enterprise" ? "var(--accent)" : "#60a5fa" }}>{d.plan}</span>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem", fontSize: "0.88rem", fontWeight: 700, color: "var(--text)" }}>{d.value}</td>
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <span style={{ fontSize: "0.8rem", color: d.growth === "New" ? "#fb923c" : "#4ade80", fontWeight: 600 }}>{d.growth}</span>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <span style={{ fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: 20, background: d.status === "New" ? "rgba(251,146,60,0.1)" : "rgba(74,222,128,0.1)", color: d.status === "New" ? "#fb923c" : "#4ade80", fontWeight: 600 }}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
