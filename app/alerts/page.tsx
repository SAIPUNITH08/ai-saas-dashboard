/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle, X, Filter } from "lucide-react";

type Severity = "critical" | "warning" | "info" | "success";

const allAlerts = [
  { id: 1, title: "Revenue target exceeded", message: "December MRR hit $118k, surpassing the $100k target by 18%.", severity: "success" as Severity, time: "2 mins ago", read: false, category: "Revenue" },
  { id: 2, title: "High churn risk detected", message: "14 Enterprise users haven't logged in for 30+ days. Immediate outreach recommended.", severity: "critical" as Severity, time: "18 mins ago", read: false, category: "Users" },
  { id: 3, title: "API response time degraded", message: "Average API latency increased to 840ms, above the 500ms threshold.", severity: "warning" as Severity, time: "1 hour ago", read: false, category: "System" },
  { id: 4, title: "New Enterprise signup", message: "FinServe Ltd signed up for the Enterprise plan — ₹12,00,000 ARR deal.", severity: "success" as Severity, time: "3 hours ago", read: true, category: "Revenue" },
  { id: 5, title: "Bounce rate spike", message: "Landing page bounce rate jumped to 58% today, up from the 31% monthly average.", severity: "warning" as Severity, time: "5 hours ago", read: true, category: "Analytics" },
  { id: 6, title: "Database storage at 78%", message: "PostgreSQL storage usage reached 78%. Consider scaling up within the next 7 days.", severity: "warning" as Severity, time: "8 hours ago", read: true, category: "System" },
  { id: 7, title: "CI/CD pipeline failed", message: "Production deployment #142 failed at the build step. Rollback initiated automatically.", severity: "critical" as Severity, time: "Yesterday", read: true, category: "System" },
  { id: 8, title: "Monthly report ready", message: "Your November analytics report has been generated and is ready to download.", severity: "info" as Severity, time: "Yesterday", read: true, category: "Analytics" },
  { id: 9, title: "User milestone reached", message: "AInsight crossed 3,500 active users — a new all-time high!", severity: "success" as Severity, time: "2 days ago", read: true, category: "Users" },
  { id: 10, title: "Scheduled maintenance", message: "Planned downtime on Dec 28, 2:00–4:00 AM IST for infrastructure upgrades.", severity: "info" as Severity, time: "3 days ago", read: true, category: "System" },
];

const severityConfig: Record<Severity, { icon: any; color: string; bg: string; label: string }> = {
  critical: { icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Critical" },
  warning: { icon: AlertTriangle, color: "#fbbf24", bg: "rgba(251,191,36,0.1)", label: "Warning" },
  info: { icon: Info, color: "#60a5fa", bg: "rgba(96,165,250,0.1)", label: "Info" },
  success: { icon: CheckCircle, color: "#4ade80", bg: "rgba(74,222,128,0.1)", label: "Success" },
};

const categories = ["All", "Revenue", "Users", "Analytics", "System"];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts);
  const [filter, setFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  const markAllRead = () => setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  const dismiss = (id: number) => setAlerts(prev => prev.filter(a => a.id !== id));
  const markRead = (id: number) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));

  const filtered = alerts.filter(a => {
    const catMatch = filter === "All" || a.category === filter;
    const sevMatch = severityFilter === "All" || a.severity === severityFilter.toLowerCase();
    return catMatch && sevMatch;
  });

  const unread = alerts.filter(a => !a.read).length;
  const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Alerts</h1>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>
              {unread > 0 ? <span style={{ color: "var(--accent)" }}>{unread} unread</span> : "All caught up"} · {alerts.length} total alerts
            </p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} style={{ fontSize: "0.78rem", fontWeight: 600, padding: "0.5rem 1.1rem", borderRadius: 20, background: "var(--accent2)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer" }}>
              Mark all as read
            </button>
          )}
        </header>

        <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Summary KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {(["critical","warning","info","success"] as Severity[]).map(s => {
              const cfg = severityConfig[s];
              const Icon = cfg.icon;
              const count = alerts.filter(a => a.severity === s).length;
              return (
                <div key={s} style={{ ...card, borderTop: `2px solid ${cfg.color}`, cursor: "pointer" }}
                  onClick={() => setSeverityFilter(severityFilter === cfg.label ? "All" : cfg.label)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} color={cfg.color} />
                    </div>
                    {severityFilter === cfg.label && <span style={{ fontSize: "0.65rem", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em" }}>FILTERED</span>}
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: cfg.color, lineHeight: 1 }}>{count}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.3rem", textTransform: "capitalize" }}>{s} alerts</div>
                </div>
              );
            })}
          </div>

          {/* Category filter tabs */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Filter size={13} color="var(--muted)" />
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                fontSize: "0.78rem", padding: "0.35rem 0.9rem", borderRadius: 20,
                border: "1px solid", cursor: "pointer", fontWeight: filter === c ? 600 : 400,
                borderColor: filter === c ? "var(--accent)" : "var(--border)",
                background: filter === c ? "var(--accent2)" : "transparent",
                color: filter === c ? "var(--accent)" : "var(--muted)",
              }}>{c}</button>
            ))}
          </div>

          {/* Alerts list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.length === 0 && (
              <div style={{ ...card, textAlign: "center", padding: "3rem" }}>
                <Bell size={32} color="var(--muted)" style={{ margin: "0 auto 1rem" }} />
                <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>No alerts match your filter</div>
              </div>
            )}
            {filtered.map(alert => {
              const cfg = severityConfig[alert.severity];
              const Icon = cfg.icon;
              return (
                <div key={alert.id} onClick={() => markRead(alert.id)} style={{
                  background: "var(--card)", borderRadius: 12, padding: "1.1rem 1.25rem",
                  border: `1px solid ${alert.read ? "var(--border)" : cfg.color + "44"}`,
                  display: "flex", gap: "1rem", alignItems: "flex-start", cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  opacity: alert.read ? 0.75 : 1,
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#161616"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--card)"}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.3rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "0.88rem", fontWeight: alert.read ? 500 : 700, color: "var(--text)" }}>{alert.title}</span>
                        {!alert.read && <span style={{ width: 7, height: 7, background: "var(--accent)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--muted)", whiteSpace: "nowrap" }}>{alert.time}</span>
                        <button onClick={e => { e.stopPropagation(); dismiss(alert.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--muted)", display: "flex" }}>
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--soft)", lineHeight: 1.6, marginBottom: "0.5rem" }}>{alert.message}</div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.68rem", padding: "0.18rem 0.6rem", borderRadius: 20, background: cfg.bg, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                      <span style={{ fontSize: "0.68rem", padding: "0.18rem 0.6rem", borderRadius: 20, background: "#1a1a1a", color: "var(--muted)", border: "1px solid var(--border)" }}>{alert.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}