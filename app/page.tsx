"use client";
import { useState, useEffect } from "react";
import { Bell, Search, RefreshCw, X, TrendingUp, TrendingDown } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import TopUsers from "@/components/TopUsers";
import AIAssistant from "@/components/AIAssistant";

type StatItem = { title: string; value: string; change: string; positive: boolean; icon: string; metric: string; rawValue: string; };
const allStats: Record<string, StatItem[]> = {
  "7D": [
    { title: "Total Revenue", value: "$18.2k", change: "+8.1%", positive: true, icon: "💰", metric: "Total Revenue", rawValue: "$18,200" },
    { title: "Active Users", value: "2,840", change: "+4.2%", positive: true, icon: "👥", metric: "Active Users", rawValue: "2840 active users" },
    { title: "Churn Rate", value: "3.1%", change: "+0.3%", positive: false, icon: "📉", metric: "Churn Rate", rawValue: "3.1% churn rate" },
    { title: "Satisfaction", value: "92.8%", change: "+1.2%", positive: true, icon: "⭐", metric: "Customer Satisfaction", rawValue: "92.8% satisfaction score" },
  ],
  "1M": [
    { title: "Total Revenue", value: "$42k", change: "+14.3%", positive: true, icon: "💰", metric: "Total Revenue", rawValue: "$42,000" },
    { title: "Active Users", value: "3,100", change: "+9.8%", positive: true, icon: "👥", metric: "Active Users", rawValue: "3100 active users" },
    { title: "Churn Rate", value: "2.8%", change: "-0.4%", positive: true, icon: "📉", metric: "Churn Rate", rawValue: "2.8% churn rate" },
    { title: "Satisfaction", value: "93.5%", change: "+2.1%", positive: true, icon: "⭐", metric: "Customer Satisfaction", rawValue: "93.5% satisfaction score" },
  ],
  "3M": [
    { title: "Total Revenue", value: "$89k", change: "+19.2%", positive: true, icon: "💰", metric: "Total Revenue", rawValue: "$89,000" },
    { title: "Active Users", value: "3,280", change: "+13.4%", positive: true, icon: "👥", metric: "Active Users", rawValue: "3280 active users" },
    { title: "Churn Rate", value: "2.6%", change: "-0.6%", positive: true, icon: "📉", metric: "Churn Rate", rawValue: "2.6% churn rate" },
    { title: "Satisfaction", value: "93.9%", change: "+2.8%", positive: true, icon: "⭐", metric: "Customer Satisfaction", rawValue: "93.9% satisfaction score" },
  ],
  "1Y": [
    { title: "Total Revenue", value: "$118k", change: "+24.5%", positive: true, icon: "💰", metric: "Total Revenue", rawValue: "$118,000" },
    { title: "Active Users", value: "3,500", change: "+18.2%", positive: true, icon: "👥", metric: "Active Users", rawValue: "3500 active users" },
    { title: "Churn Rate", value: "2.4%", change: "-0.8%", positive: true, icon: "📉", metric: "Churn Rate", rawValue: "2.4% churn rate" },
    { title: "Satisfaction", value: "94.2%", change: "+3.1%", positive: true, icon: "⭐", metric: "Customer Satisfaction", rawValue: "94.2% satisfaction score" },
  ],
};

const notifications = [
  { id: 1, title: "Revenue target exceeded", msg: "December MRR hit $118k, surpassing $100k target.", time: "2m ago", unread: true, color: "#4ade80" },
  { id: 2, title: "High churn risk detected", msg: "14 Enterprise users haven't logged in for 30+ days.", time: "18m ago", unread: true, color: "#f87171" },
  { id: 3, title: "New Enterprise signup", msg: "FinServe Ltd signed up — ₹12,00,000 ARR deal.", time: "3h ago", unread: false, color: "#c8f560" },
  { id: 4, title: "API latency spike", msg: "Average response time increased to 840ms.", time: "5h ago", unread: false, color: "#fbbf24" },
];

const dateLabels: Record<string, string> = {
  "7D": "Jun 1 – Jun 7, 2026",
  "1M": "May 2026",
  "3M": "Mar – May 2026",
  "1Y": "Jan – Dec 2025",
};

export default function Dashboard() {
  const [range, setRange] = useState("1Y");
  const [stats, setStats] = useState(allStats["1Y"]);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const [lastRefreshed, setLastRefreshed] = useState("Just now");

  const unreadCount = notifs.filter(n => n.unread).length;

  // Change time range
  const handleRange = (r: string) => {
    setRange(r);
    setStats(allStats[r]);
  };

  // Refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshed("Just now");
    }, 1200);
  };

  // Mark notif read
  const markRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  // Search results (simple filter)
  const searchResults = searchQuery.length > 1 ? [
    { label: "Dashboard", href: "/" },
    { label: "Analytics", href: "/analytics" },
    { label: "Users", href: "/users" },
    { label: "Revenue", href: "/revenue" },
    { label: "Alerts", href: "/alerts" },
    { label: "Settings", href: "/settings" },
  ].filter(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Dashboard</h1>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>
              Welcome back, Sai Punith 👋 · Last refreshed: {lastRefreshed}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", position: "relative" }}>

            {/* SEARCH */}
            <div style={{ position: "relative" }}>
              {showSearch ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--card)", border: "1px solid var(--accent)", borderRadius: 22, padding: "0.45rem 0.9rem", width: 240 }}>
                  <Search size={13} color="var(--accent)" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search pages..."
                    style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: "0.8rem", flex: 1 }}
                  />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex" }}>
                    <X size={13} />
                  </button>
                  {/* Search dropdown */}
                  {searchResults.length > 0 && (
                    <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", zIndex: 100 }}>
                      {searchResults.map(r => (
                        <a key={r.label} href={r.href} style={{ display: "block", padding: "0.65rem 1rem", fontSize: "0.83rem", color: "var(--text)", textDecoration: "none", borderBottom: "1px solid #1a1a1a" }}
                          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#1a1a1a"}
                          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}>
                          {r.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: "0.45rem 0.9rem", cursor: "pointer", color: "var(--muted)", fontSize: "0.78rem" }}>
                  <Search size={13} /> Search...
                </button>
              )}
            </div>

            {/* REFRESH */}
            <button onClick={handleRefresh} title="Refresh data" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <RefreshCw size={14} color={refreshing ? "var(--accent)" : "var(--muted)"} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} />
            </button>

            {/* NOTIFICATIONS */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(v => !v)} title="Notifications" style={{ width: 36, height: 36, borderRadius: "50%", background: showNotifs ? "var(--accent2)" : "var(--card)", border: `1px solid ${showNotifs ? "var(--accent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                <Bell size={14} color={showNotifs ? "var(--accent)" : "var(--muted)"} />
                {unreadCount > 0 && (
                  <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "var(--accent)", borderRadius: "50%", border: "1.5px solid var(--bg)", fontSize: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0a0a", fontWeight: 700 }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifs && (
                <div style={{ position: "absolute", top: "110%", right: 0, width: 320, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", zIndex: 100, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                  <div style={{ padding: "0.9rem 1.1rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={() => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))} style={{ fontSize: "0.7rem", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  {notifs.map(n => (
                    <div key={n.id} onClick={() => markRead(n.id)} style={{ padding: "0.85rem 1.1rem", borderBottom: "1px solid #141414", cursor: "pointer", background: n.unread ? "rgba(200,245,96,0.03)" : "transparent", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#141414"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = n.unread ? "rgba(200,245,96,0.03)" : "transparent"}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.unread ? n.color : "transparent", border: `1px solid ${n.color}`, flexShrink: 0, marginTop: 5 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.82rem", fontWeight: n.unread ? 600 : 400, color: "var(--text)", marginBottom: "0.15rem" }}>{n.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.5 }}>{n.msg}</div>
                        <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginTop: "0.3rem" }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                  <a href="/alerts" style={{ display: "block", textAlign: "center", padding: "0.75rem", fontSize: "0.78rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                    View all alerts →
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Click outside to close notifs */}
        {showNotifs && <div onClick={() => setShowNotifs(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />}

        {/* Page content */}
        <main style={{ padding: "2rem" }}>
          {/* Date range */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              Showing data for <span style={{ color: "var(--text)", fontWeight: 600 }}>{dateLabels[range]}</span>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {["7D", "1M", "3M", "1Y"].map(r => (
                <button key={r} onClick={() => handleRange(r)} style={{
                  fontSize: "0.72rem", padding: "0.28rem 0.7rem", borderRadius: 20, border: "1px solid",
                  borderColor: range === r ? "var(--accent)" : "var(--border)",
                  background: range === r ? "var(--accent2)" : "transparent",
                  color: range === r ? "var(--accent)" : "var(--muted)",
                  cursor: "pointer", fontWeight: range === r ? 600 : 400,
                  transition: "all 0.15s",
                }}>{r}</button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {stats.map(s => <StatCard key={s.title} {...s} />)}
          </div>

          {/* Revenue chart */}
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
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}