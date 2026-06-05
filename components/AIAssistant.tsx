"use client";
import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";

interface Message { role: "user" | "ai"; text: string; }

const suggestions = [
  "What's driving the revenue spike in Q4?",
  "Which user segment should I focus on?",
  "How can I reduce churn rate?",
  "Predict next month's revenue",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm your AI business analyst. Ask me anything about your dashboard metrics or business performance. 📊" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai-insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metric: "Dashboard Query",
        value: text,
        trend: "User asking: " + text + ". Dashboard context: Revenue $118k Dec (peak), 3500 users, 94.2% satisfaction, 2.4% churn rate. Respond as a helpful AI business analyst in 3-4 sentences.",
      }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "ai", text: data.insight }]);
    setLoading(false);
  };

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", height: 420 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <div style={{ width: 28, height: 28, background: "var(--accent2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={14} color="var(--accent)" />
        </div>
        <div>
          <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text)" }}>AI Business Analyst</div>
          <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>Powered by Claude</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.68rem", color: "#4ade80" }}>
          <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
          Online
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "0.65rem 0.9rem", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.role === "user" ? "var(--accent2)" : "#1a1a1a",
              border: m.role === "user" ? "1px solid var(--accent)" : "1px solid #252525",
              color: m.role === "user" ? "var(--accent)" : "var(--soft)",
              fontSize: "0.82rem", lineHeight: 1.6,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ padding: "0.65rem 0.9rem", background: "#1a1a1a", border: "1px solid #252525", borderRadius: "12px 12px 12px 2px", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--muted)", fontSize: "0.8rem" }}>
              <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{
              fontSize: "0.7rem", padding: "0.3rem 0.7rem", borderRadius: 20,
              background: "transparent", border: "1px solid var(--border)",
              color: "var(--muted)", cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(input)}
          placeholder="Ask about your metrics..."
          style={{
            flex: 1, padding: "0.65rem 1rem", background: "#0d0d0d",
            border: "1px solid var(--border)", borderRadius: 22,
            color: "var(--text)", fontSize: "0.82rem", outline: "none",
          }}
        />
        <button onClick={() => send(input)} style={{
          width: 38, height: 38, borderRadius: "50%", background: "var(--accent)",
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Send size={15} color="#0a0a0a" />
        </button>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
