"use client";
import { ArrowUpRight } from "lucide-react";

const users = [
  { name: "Ravi Sharma", plan: "Enterprise", revenue: "$12,400", growth: "+18%", avatar: "RS" },
  { name: "Priya Nair", plan: "Pro", revenue: "$8,200", growth: "+12%", avatar: "PN" },
  { name: "Arjun Mehta", plan: "Enterprise", revenue: "$7,900", growth: "+9%", avatar: "AM" },
  { name: "Sneha Rao", plan: "Pro", revenue: "$5,600", growth: "+22%", avatar: "SR" },
  { name: "Kiran Das", plan: "Starter", revenue: "$3,100", growth: "+6%", avatar: "KD" },
];

const planColor: Record<string, string> = {
  Enterprise: "#c8f560",
  Pro: "#60a5fa",
  Starter: "#a78bfa",
};

export default function TopUsers() {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Top Customers</div>
        <button style={{ fontSize: "0.72rem", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem" }}>
          View all <ArrowUpRight size={12} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {users.map((u) => (
          <div key={u.name} style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.6rem 0", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
              {u.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.84rem", fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
              <div style={{ fontSize: "0.7rem", color: planColor[u.plan], fontWeight: 600, marginTop: "0.1rem" }}>{u.plan}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--text)" }}>{u.revenue}</div>
              <div style={{ fontSize: "0.7rem", color: "#4ade80", marginTop: "0.1rem" }}>{u.growth}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
