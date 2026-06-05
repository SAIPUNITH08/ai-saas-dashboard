"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, Sparkles, Loader2 } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  metric: string;
  rawValue: string;
}

export default function StatCard({ title, value, change, positive, icon, metric, rawValue }: StatCardProps) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getInsight = async () => {
    if (insight) { setOpen(o => !o); return; }
    setLoading(true);
    setOpen(true);
    const res = await fetch("/api/ai-insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metric, value: rawValue, trend: change }),
    });
    const data = await res.json();
    setInsight(data.insight);
    setLoading(false);
  };

  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: 14, padding: "1.4rem", transition: "border-color 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#333"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem",
          borderRadius: 20, background: positive ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
          color: positive ? "#4ade80" : "#f87171",
        }}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </span>
      </div>
      <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "var(--text)", lineHeight: 1, marginBottom: "0.3rem" }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1rem" }}>{title}</div>

      {/* AI Insight Button */}
      <button onClick={getInsight} style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
        background: "var(--accent2)", border: "none", borderRadius: 20,
        padding: "0.3rem 0.8rem", cursor: "pointer", letterSpacing: "0.04em",
      }}>
        <Sparkles size={11} />
        AI Insight
      </button>

      {open && (
        <div style={{
          marginTop: "0.85rem", padding: "0.85rem", background: "#0d0d0d",
          borderRadius: 10, border: "1px solid var(--accent2)", fontSize: "0.8rem",
          color: "var(--soft)", lineHeight: 1.65,
        }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--muted)" }}>
              <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
              Analyzing...
            </div>
          ) : (
            <>{insight}</>
          )}
        </div>
      )}
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
