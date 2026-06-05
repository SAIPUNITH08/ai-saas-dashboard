"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 48000, users: 1450 },
  { month: "Mar", revenue: 39000, users: 1300 },
  { month: "Apr", revenue: 61000, users: 1800 },
  { month: "May", revenue: 55000, users: 1650 },
  { month: "Jun", revenue: 73000, users: 2100 },
  { month: "Jul", revenue: 68000, users: 2050 },
  { month: "Aug", revenue: 82000, users: 2400 },
  { month: "Sep", revenue: 91000, users: 2700 },
  { month: "Oct", revenue: 87000, users: 2600 },
  { month: "Nov", revenue: 105000, users: 3100 },
  { month: "Dec", revenue: 118000, users: 3500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.8rem" }}>
        <div style={{ color: "#666", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#c8f560" }}>Revenue: ${(payload[0].value / 1000).toFixed(0)}k</div>
        <div style={{ color: "#60a5fa" }}>Users: {payload[1]?.value?.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Revenue & User Growth</div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem" }}>Full year 2025 overview</div>
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.72rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--soft)" }}>
            <span style={{ width: 8, height: 8, background: "#c8f560", borderRadius: "50%", display: "inline-block" }} />Revenue
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--soft)" }}>
            <span style={{ width: 8, height: 8, background: "#60a5fa", borderRadius: "50%", display: "inline-block" }} />Users
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c8f560" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#c8f560" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
          <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="#c8f560" strokeWidth={2} fill="url(#colorRev)" />
          <Area type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={2} fill="url(#colorUsers)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
