"use client";
import Sidebar from "@/components/Sidebar";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const monthlyData = [
  { month: "Jan", sessions: 12400, pageviews: 34200, bounce: 42 },
  { month: "Feb", sessions: 14800, pageviews: 41000, bounce: 38 },
  { month: "Mar", sessions: 13200, pageviews: 37500, bounce: 45 },
  { month: "Apr", sessions: 18600, pageviews: 52000, bounce: 33 },
  { month: "May", sessions: 16900, pageviews: 48200, bounce: 36 },
  { month: "Jun", sessions: 21300, pageviews: 61400, bounce: 29 },
  { month: "Jul", sessions: 19800, pageviews: 57800, bounce: 31 },
  { month: "Aug", sessions: 24100, pageviews: 69200, bounce: 27 },
  { month: "Sep", sessions: 27400, pageviews: 78500, bounce: 24 },
  { month: "Oct", sessions: 25900, pageviews: 74100, bounce: 26 },
  { month: "Nov", sessions: 31200, pageviews: 89400, bounce: 22 },
  { month: "Dec", sessions: 35800, pageviews: 102600, bounce: 19 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#c8f560" },
  { name: "Direct", value: 24, color: "#60a5fa" },
  { name: "Social Media", value: 18, color: "#a78bfa" },
  { name: "Referral", value: 12, color: "#fb923c" },
  { name: "Email", value: 8, color: "#34d399" },
];

const deviceData = [
  { device: "Desktop", sessions: 18400, conversion: 4.2 },
  { device: "Mobile", sessions: 13200, conversion: 2.8 },
  { device: "Tablet", sessions: 4200, conversion: 3.5 },
];

const radarData = [
  { metric: "Performance", score: 88 },
  { metric: "SEO", score: 76 },
  { metric: "Accessibility", score: 92 },
  { metric: "Engagement", score: 81 },
  { metric: "Retention", score: 74 },
  { metric: "Conversion", score: 68 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.8rem" }}>
        <div style={{ color: "#666", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === "number" && p.value > 1000 ? p.value.toLocaleString() : p.value}{p.name === "bounce" ? "%" : ""}</div>
        ))}
      </div>
    );
  }
  return null;
};

const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" };
const secTitle = { fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" as const };
const secSub = { fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" };

export default function Analytics() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Analytics</h1>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>Deep-dive into traffic, engagement & performance</p>
        </header>

        <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {[
              { label: "Total Sessions", value: "261.4k", change: "+31%", icon: "📡" },
              { label: "Page Views", value: "744k", change: "+28%", icon: "👁️" },
              { label: "Avg. Bounce Rate", value: "31%", change: "-12%", icon: "📉" },
              { label: "Avg. Session Time", value: "4m 22s", change: "+18%", icon: "⏱️" },
            ].map(k => (
              <div key={k.label} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{k.icon}</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 20, background: "rgba(200,245,96,0.1)", color: "var(--accent)" }}>{k.change}</span>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.3rem" }}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* Sessions & Pageviews line chart */}
          <div style={card}>
            <div style={secTitle}>Sessions & Page Views</div>
            <div style={secSub}>Monthly traffic overview — full year 2025</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "0.78rem", color: "#666" }} />
                <Line type="monotone" dataKey="sessions" stroke="#c8f560" strokeWidth={2.5} dot={false} name="Sessions" />
                <Line type="monotone" dataKey="pageviews" stroke="#60a5fa" strokeWidth={2.5} dot={false} name="Page Views" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Row: Traffic Sources + Device breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

            {/* Pie chart */}
            <div style={card}>
              <div style={secTitle}>Traffic Sources</div>
              <div style={secSub}>Where your visitors come from</div>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {trafficSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                  {trafficSources.map(s => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                        <span style={{ fontSize: "0.8rem", color: "var(--soft)" }}>{s.name}</span>
                      </div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Device bar chart */}
            <div style={card}>
              <div style={secTitle}>Device Breakdown</div>
              <div style={secSub}>Sessions & conversion rate by device type</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={deviceData} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                  <XAxis dataKey="device" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                  <Legend wrapperStyle={{ fontSize: "0.78rem", color: "#666" }} />
                  <Bar yAxisId="left" dataKey="sessions" fill="#c8f560" radius={[4,4,0,0]} name="Sessions" />
                  <Bar yAxisId="right" dataKey="conversion" fill="#60a5fa" radius={[4,4,0,0]} name="Conversion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row: Bounce rate + Radar */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.25rem" }}>
            <div style={card}>
              <div style={secTitle}>Bounce Rate Trend</div>
              <div style={secSub}>Monthly bounce rate — lower is better</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                  <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[15, 50]} />
                  <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} formatter={(v: any) => [`${v}%`, "Bounce Rate"]} />
                  <Line type="monotone" dataKey="bounce" stroke="#fb923c" strokeWidth={2.5} dot={{ fill: "#fb923c", r: 3 }} name="Bounce %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={card}>
              <div style={secTitle}>Site Health Score</div>
              <div style={secSub}>Key performance dimensions</div>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1f1f1f" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#666", fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#c8f560" fill="#c8f560" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
