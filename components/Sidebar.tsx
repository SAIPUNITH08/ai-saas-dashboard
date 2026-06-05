"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, TrendingUp, Users, ShoppingCart, Bell, Settings, Zap } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: ShoppingCart, label: "Revenue", href: "/revenue" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 220, background: "var(--card)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", minHeight: "100vh", padding: "1.5rem 0", position: "sticky", top: 0, height: "100vh" }}>
      <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid var(--border)", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>AInsight</div>
            <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>AI Dashboard</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "0 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {nav.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link key={label} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.65rem 0.85rem", borderRadius: 8, cursor: "pointer",
                background: active ? "var(--accent2)" : "transparent",
                color: active ? "var(--accent)" : "var(--muted)",
                fontSize: "0.85rem", fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "#1a1a1a"; (e.currentTarget as HTMLDivElement).style.color = "var(--text)"; } }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "var(--muted)"; } }}
              >
                <Icon size={16} />
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "#0a0a0a" }}>SP</div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>Sai Punith K R</div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Frontend Developer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
