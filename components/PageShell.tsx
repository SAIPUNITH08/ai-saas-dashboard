"use client";
import Sidebar from "./Sidebar";
import { Bell, Search, RefreshCw } from "lucide-react";

export default function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>{title}</h1>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>{subtitle}</p>
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
        <main style={{ padding: "2rem" }}>{children}</main>
      </div>
    </div>
  );
}
