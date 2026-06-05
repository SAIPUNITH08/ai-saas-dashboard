"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { day: "Mon", visits: 4200 },
  { day: "Tue", visits: 5800 },
  { day: "Wed", visits: 5200 },
  { day: "Thu", visits: 7100 },
  { day: "Fri", visits: 6400 },
  { day: "Sat", visits: 3900 },
  { day: "Sun", visits: 3200 },
];

export default function TrafficChart() {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Weekly Traffic</div>
        <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem" }}>Page visits this week</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="day" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.8rem" }}
            labelStyle={{ color: "#666" }}
            itemStyle={{ color: "#c8f560" }}
            formatter={(v: any) => [Number(v).toLocaleString(), "Visits"]}
          />
          {data.map((entry) => (
            <Bar key={entry.day} dataKey="visits" radius={[4, 4, 0, 0]}>
              <Cell fill={entry.visits === Math.max(...data.map(d => d.visits)) ? "#c8f560" : "#1f2d00"} />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
