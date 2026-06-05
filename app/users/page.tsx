"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, Filter, ArrowUpDown, UserCheck, UserX, TrendingUp, Users } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from "recharts";

const growthData = [
  { month: "Jan", new: 320, churned: 45, net: 275 },
  { month: "Feb", new: 410, churned: 52, net: 358 },
  { month: "Mar", new: 380, churned: 48, net: 332 },
  { month: "Apr", new: 520, churned: 61, net: 459 },
  { month: "May", new: 490, churned: 55, net: 435 },
  { month: "Jun", new: 640, churned: 70, net: 570 },
  { month: "Jul", new: 580, churned: 63, net: 517 },
  { month: "Aug", new: 720, churned: 78, net: 642 },
  { month: "Sep", new: 810, churned: 85, net: 725 },
  { month: "Oct", new: 760, churned: 80, net: 680 },
  { month: "Nov", new: 940, churned: 92, net: 848 },
  { month: "Dec", new: 1080, churned: 100, net: 980 },
];

const planDist = [
  { name: "Enterprise", value: 12, color: "#c8f560" },
  { name: "Pro", value: 35, color: "#60a5fa" },
  { name: "Starter", value: 53, color: "#a78bfa" },
];

const activityData = [
  { day: "Mon", active: 2100, inactive: 1400 },
  { day: "Tue", active: 2400, inactive: 1100 },
  { day: "Wed", active: 2800, inactive: 700 },
  { day: "Thu", active: 3100, inactive: 400 },
  { day: "Fri", active: 2700, inactive: 800 },
  { day: "Sat", active: 1600, inactive: 1900 },
  { day: "Sun", active: 1200, inactive: 2300 },
];

const users = [
  { name: "Ravi Sharma", email: "ravi@techcorp.in", plan: "Enterprise", status: "Active", joined: "Jan 12, 2025", revenue: "₹92,400", sessions: 284 },
  { name: "Priya Nair", email: "priya@startup.io", plan: "Pro", status: "Active", joined: "Feb 3, 2025", revenue: "₹61,200", sessions: 197 },
  { name: "Arjun Mehta", email: "arjun@designco.com", plan: "Enterprise", status: "Active", joined: "Feb 18, 2025", revenue: "₹58,900", sessions: 231 },
  { name: "Sneha Rao", email: "sneha@media.in", plan: "Pro", status: "Active", joined: "Mar 7, 2025", revenue: "₹41,600", sessions: 158 },
  { name: "Kiran Das", email: "kiran@agency.io", plan: "Starter", status: "Active", joined: "Apr 1, 2025", revenue: "₹23,100", sessions: 89 },
  { name: "Meera Joshi", email: "meera@ecom.co", plan: "Pro", status: "Inactive", joined: "Apr 15, 2025", revenue: "₹18,700", sessions: 42 },
  { name: "Varun Patel", email: "varun@saas.io", plan: "Starter", status: "Active", joined: "May 20, 2025", revenue: "₹12,300", sessions: 67 },
  { name: "Ananya Singh", email: "ananya@fin.com", plan: "Enterprise", status: "Active", joined: "Jun 10, 2025", revenue: "₹88,500", sessions: 312 },
];

const planColor: Record<string, string> = { Enterprise: "#c8f560", Pro: "#60a5fa", Starter: "#a78bfa" };
const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" };

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Users</h1>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>Manage and analyze your user base</p>
        </header>

        <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {[
              { label: "Total Users", value: "3,500", change: "+18.2%", icon: <Users size={18} color="var(--accent)" /> },
              { label: "Active Today", value: "2,847", change: "+5.4%", icon: <UserCheck size={18} color="#4ade80" /> },
              { label: "Churned (30d)", value: "84", change: "-12%", icon: <UserX size={18} color="#f87171" /> },
              { label: "Net New (30d)", value: "+412", change: "+22%", icon: <TrendingUp size={18} color="#60a5fa" /> },
            ].map(k => (
              <div key={k.label} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{ width: 36, height: 36, background: "#1a1a1a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>{k.icon}</div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 20, background: "rgba(200,245,96,0.1)", color: "var(--accent)" }}>{k.change}</span>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.3rem" }}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.25rem" }}>
            <div style={card}>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>User Growth</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>New vs churned users monthly</div>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c8f560" stopOpacity={0.2} /><stop offset="95%" stopColor="#c8f560" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gChurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} /><stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                  <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                  <Area type="monotone" dataKey="new" stroke="#c8f560" fill="url(#gNew)" strokeWidth={2} name="New Users" />
                  <Area type="monotone" dataKey="churned" stroke="#f87171" fill="url(#gChurn)" strokeWidth={2} name="Churned" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={card}>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Plan Distribution</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>Users by subscription plan</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={planDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {planDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                  {planDist.map(p => (
                    <div key={p.name} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <span style={{ width: 7, height: 7, background: p.color, borderRadius: "50%", display: "inline-block" }} />{p.name}
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: p.color }}>{p.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily activity */}
          <div style={card}>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Daily Active vs Inactive</div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem", marginBottom: "1.5rem" }}>User activity by day of week</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="day" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(1)}k`} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, fontSize: "0.78rem" }} />
                <Bar dataKey="active" fill="#c8f560" radius={[4,4,0,0]} name="Active" stackId="a" />
                <Bar dataKey="inactive" fill="#1f2d00" radius={[4,4,0,0]} name="Inactive" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Users table */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>All Users</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem" }}>{filtered.length} users shown</div>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#0d0d0d", border: "1px solid var(--border)", borderRadius: 22, padding: "0.45rem 0.9rem" }}>
                  <Search size={13} color="var(--muted)" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: "0.8rem", width: 160 }} />
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", padding: "0.45rem 0.9rem", borderRadius: 22, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>
                  <Filter size={12} /> Filter
                </button>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["User", "Plan", "Status", "Joined", "Revenue", "Sessions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.6rem 0.8rem", fontSize: "0.72rem", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>{h} <ArrowUpDown size={10} /></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #141414" }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "#141414"}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}
                  >
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                          {u.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{u.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 20, background: `${planColor[u.plan]}18`, color: planColor[u.plan] }}>{u.plan}</span>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: u.status === "Active" ? "#4ade80" : "#f87171" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: u.status === "Active" ? "#4ade80" : "#f87171", display: "inline-block" }} />
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.9rem 0.8rem", fontSize: "0.8rem", color: "var(--soft)" }}>{u.joined}</td>
                    <td style={{ padding: "0.9rem 0.8rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>{u.revenue}</td>
                    <td style={{ padding: "0.9rem 0.8rem", fontSize: "0.82rem", color: "var(--soft)" }}>{u.sessions}</td>
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
