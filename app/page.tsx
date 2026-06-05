"use client";
import { Bell, Search, RefreshCw } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import TopUsers from "@/components/TopUsers";
import AIAssistant from "@/components/AIAssistant";

const stats = [
  { title: "Total Revenue", value: "$118k", change: "+24.5%", positive: true, icon: "💰", metric: "Total Revenue", rawValue: "$118,000" },
  { title: "Active Users", value: "3,500", change: "+18.2%", positive: true, icon: "👥", metric: "Active Users", rawValue: "3500 active users" },
  { title: "Churn Rate", value: "2.4%", change: "-0.8%", positive: true, icon: "📉", metric: "Churn Rate", rawValue: "2.4% churn rate" },
  { title: "Satisfaction", value: "94.2%", change: "+3.1%", positive: true, icon: "⭐", metric: "Customer Satisfaction", rawValue: "94.2% satisfaction score" },
];

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Dashboard</h1>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>Welcome back, Sai Punith 👋</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: "0.45rem 0.9rem" }}>
              <Search size={13} color="var(--muted)" />
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Search...</span>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <RefreshCw size={14} color="var(--muted)" />
            </button>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <Bell size={14} color="var(--muted)" />
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--accent)", borderRadius: "50%", border: "1.5px solid var(--bg)" }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: "2rem" }}>
          {/* Date range */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              Showing data for <span style={{ color: "var(--text)", fontWeight: 600 }}>Jan – Dec 2025</span>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {["7D", "1M", "3M", "1Y"].map((r, i) => (
                <button key={r} style={{
                  fontSize: "0.72rem", padding: "0.28rem 0.7rem", borderRadius: 20, border: "1px solid",
                  borderColor: i === 3 ? "var(--accent)" : "var(--border)",
                  background: i === 3 ? "var(--accent2)" : "transparent",
                  color: i === 3 ? "var(--accent)" : "var(--muted)", cursor: "pointer", fontWeight: i === 3 ? 600 : 400,
                }}>{r}</button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {stats.map(s => <StatCard key={s.title} {...s} />)}
          </div>

          {/* Revenue chart - full width */}
          <div style={{ marginBottom: "1.5rem" }}>
            <RevenueChart />
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <TrafficChart />
            <TopUsers />
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
