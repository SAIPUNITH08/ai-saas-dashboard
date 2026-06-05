/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { User, Bell, Shield, Palette, CreditCard, Key, Save, Check } from "lucide-react";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Security" },
  { icon: Palette, label: "Appearance" },
  { icon: CreditCard, label: "Billing" },
  { icon: Key, label: "API Keys" },
];

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 12, cursor: "pointer", transition: "background 0.2s",
      background: value ? "var(--accent)" : "#2a2a2a", position: "relative", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18,
        borderRadius: "50%", background: value ? "#0a0a0a" : "#666", transition: "left 0.2s",
      }} />
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.1rem 0", borderBottom: "1px solid #141414" }}>
      <div>
        <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text)" }}>{label}</div>
        {desc && <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem" }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Sai Punith K R", email: "saipunith215@gmail.com", role: "Frontend Developer", company: "Nextbrain Technologies", timezone: "Asia/Kolkata", bio: "Frontend & AI Developer based in Bengaluru." });
  const [notifs, setNotifs] = useState({ email: true, push: true, revenue: true, users: false, system: true, weekly: true, monthly: false });
  const [appearance, setAppearance] = useState({ theme: "dark", accent: "#c8f560", density: "comfortable" });
  const [twoFA, set2FA] = useState(false);
  const [sessions, setSessions] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.75rem" };
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.6rem 0.9rem", background: "#0d0d0d",
    border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)",
    fontSize: "0.85rem", outline: "none",
  };
  const labelStyle: React.CSSProperties = { fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.4rem", display: "block" };

  const accents = ["#c8f560", "#60a5fa", "#a78bfa", "#fb923c", "#34d399", "#f472b6"];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Settings</h1>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>Manage your account and preferences</p>
          </div>
          <button onClick={handleSave} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.82rem", fontWeight: 600, padding: "0.55rem 1.25rem",
            borderRadius: 20, border: "none", cursor: "pointer",
            background: saved ? "#4ade80" : "var(--accent)",
            color: "#0a0a0a", transition: "background 0.3s",
          }}>
            {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </header>

        <main style={{ padding: "2rem", display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* Sidebar tabs */}
          <div style={{ ...card, padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {tabs.map(({ icon: Icon, label }) => (
              <button key={label} onClick={() => setActiveTab(label)} style={{
                display: "flex", alignItems: "center", gap: "0.7rem",
                padding: "0.65rem 0.9rem", borderRadius: 8, border: "none", cursor: "pointer",
                background: activeTab === label ? "var(--accent2)" : "transparent",
                color: activeTab === label ? "var(--accent)" : "var(--muted)",
                fontSize: "0.84rem", fontWeight: activeTab === label ? 600 : 400,
                width: "100%", textAlign: "left", transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (activeTab !== label) (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a"; }}
                onMouseLeave={e => { if (activeTab !== label) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <Icon size={15} />{label}
              </button>
            ))}
          </div>

          {/* Content panels */}
          <div style={card}>

            {/* PROFILE */}
            {activeTab === "Profile" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>Profile Information</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Update your personal details and public profile.</div>

                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem", padding: "1.25rem", background: "#0d0d0d", borderRadius: 10, border: "1px solid var(--border)" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: "#0a0a0a" }}>SP</div>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>Profile Avatar</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", margin: "0.25rem 0" }}>Auto-generated from your initials</div>
                    <button style={{ fontSize: "0.72rem", padding: "0.3rem 0.8rem", borderRadius: 20, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>Change Avatar</button>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[
                    { key: "name", label: "Full Name" },
                    { key: "email", label: "Email Address" },
                    { key: "role", label: "Role / Title" },
                    { key: "company", label: "Company" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input value={(profile as any)[f.key]} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={labelStyle}>Timezone</label>
                  <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
                    <option value="America/New_York">America/New_York (EST, UTC-5)</option>
                    <option value="Europe/London">Europe/London (GMT, UTC+0)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT, UTC+8)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Bio</label>
                  <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "none" }} />
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "Notifications" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>Notification Preferences</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Choose how and when you want to be notified.</div>
                <SettingRow label="Email Notifications" desc="Receive alerts via email"><Toggle value={notifs.email} onChange={() => setNotifs(n => ({ ...n, email: !n.email }))} /></SettingRow>
                <SettingRow label="Push Notifications" desc="Browser push notifications in real-time"><Toggle value={notifs.push} onChange={() => setNotifs(n => ({ ...n, push: !n.push }))} /></SettingRow>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "1.25rem 0 0" }}>Alert Categories</div>
                <SettingRow label="Revenue Alerts" desc="MRR changes, new deals, payment failures"><Toggle value={notifs.revenue} onChange={() => setNotifs(n => ({ ...n, revenue: !n.revenue }))} /></SettingRow>
                <SettingRow label="User Alerts" desc="Signups, churn risk, milestone reached"><Toggle value={notifs.users} onChange={() => setNotifs(n => ({ ...n, users: !n.users }))} /></SettingRow>
                <SettingRow label="System Alerts" desc="API issues, CI/CD failures, storage warnings"><Toggle value={notifs.system} onChange={() => setNotifs(n => ({ ...n, system: !n.system }))} /></SettingRow>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "1.25rem 0 0" }}>Reports</div>
                <SettingRow label="Weekly Digest" desc="Summary of key metrics every Monday"><Toggle value={notifs.weekly} onChange={() => setNotifs(n => ({ ...n, weekly: !n.weekly }))} /></SettingRow>
                <SettingRow label="Monthly Report" desc="Full analytics report on the 1st of each month"><Toggle value={notifs.monthly} onChange={() => setNotifs(n => ({ ...n, monthly: !n.monthly }))} /></SettingRow>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "Security" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>Security Settings</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Manage your password, 2FA, and active sessions.</div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.9rem" }}>Change Password</div>
                  {["Current Password", "New Password", "Confirm New Password"].map(p => (
                    <div key={p} style={{ marginBottom: "0.75rem" }}>
                      <label style={labelStyle}>{p}</label>
                      <input type="password" placeholder="••••••••" style={inputStyle} />
                    </div>
                  ))}
                  <button style={{ fontSize: "0.82rem", fontWeight: 600, padding: "0.55rem 1.25rem", borderRadius: 20, background: "var(--accent2)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", marginTop: "0.5rem" }}>Update Password</button>
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "1.5rem 0" }} />
                <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security to your account"><Toggle value={twoFA} onChange={() => set2FA(v => !v)} /></SettingRow>
                <SettingRow label="Active Session Alerts" desc="Get notified of new logins from unrecognized devices"><Toggle value={sessions} onChange={() => setSessions(v => !v)} /></SettingRow>

                <div style={{ height: 1, background: "var(--border)", margin: "1.5rem 0" }} />
                <div style={{ padding: "1rem", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f87171", marginBottom: "0.3rem" }}>Danger Zone</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "0.9rem" }}>Permanently delete your account and all data. This cannot be undone.</div>
                  <button style={{ fontSize: "0.78rem", fontWeight: 600, padding: "0.45rem 1rem", borderRadius: 20, background: "transparent", border: "1px solid #f87171", color: "#f87171", cursor: "pointer" }}>Delete Account</button>
                </div>
              </div>
            )}

            {/* APPEARANCE */}
            {activeTab === "Appearance" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>Appearance</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Customize how AInsight looks for you.</div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Theme</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {["dark", "light", "system"].map(t => (
                      <button key={t} onClick={() => setAppearance(a => ({ ...a, theme: t }))} style={{
                        flex: 1, padding: "0.75rem", borderRadius: 10, border: "1px solid",
                        borderColor: appearance.theme === t ? "var(--accent)" : "var(--border)",
                        background: appearance.theme === t ? "var(--accent2)" : "#0d0d0d",
                        color: appearance.theme === t ? "var(--accent)" : "var(--muted)",
                        cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, textTransform: "capitalize",
                      }}>{t}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Accent Color</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {accents.map(c => (
                      <div key={c} onClick={() => setAppearance(a => ({ ...a, accent: c }))} style={{
                        width: 36, height: 36, borderRadius: "50%", background: c, cursor: "pointer",
                        border: appearance.accent === c ? `3px solid white` : "3px solid transparent",
                        transition: "border 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {appearance.accent === c && <Check size={14} color="#0a0a0a" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Layout Density</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {["compact", "comfortable", "spacious"].map(d => (
                      <button key={d} onClick={() => setAppearance(a => ({ ...a, density: d }))} style={{
                        flex: 1, padding: "0.75rem", borderRadius: 10, border: "1px solid",
                        borderColor: appearance.density === d ? "var(--accent)" : "var(--border)",
                        background: appearance.density === d ? "var(--accent2)" : "#0d0d0d",
                        color: appearance.density === d ? "var(--accent)" : "var(--muted)",
                        cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, textTransform: "capitalize",
                      }}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BILLING */}
            {activeTab === "Billing" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>Billing & Plan</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Manage your subscription and payment details.</div>

                <div style={{ padding: "1.25rem", background: "var(--accent2)", border: "1px solid var(--accent)", borderRadius: 12, marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.3rem" }}>CURRENT PLAN</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>Pro Plan</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--soft)", marginTop: "0.2rem" }}>$79/month · Renews Jan 1, 2027</div>
                  </div>
                  <button style={{ fontSize: "0.78rem", fontWeight: 600, padding: "0.55rem 1.1rem", borderRadius: 20, background: "var(--accent)", border: "none", color: "#0a0a0a", cursor: "pointer" }}>Upgrade to Enterprise</button>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.9rem" }}>Payment Method</div>
                  <div style={{ padding: "1rem 1.25rem", background: "#0d0d0d", border: "1px solid var(--border)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                      <div style={{ width: 38, height: 26, background: "#1a1aff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "white", fontWeight: 900 }}>VISA</div>
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500 }}>•••• •••• •••• 4242</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Expires 08/2028</div>
                      </div>
                    </div>
                    <button style={{ fontSize: "0.72rem", padding: "0.3rem 0.8rem", borderRadius: 20, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>Update</button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.9rem" }}>Invoice History</div>
                  {["Dec 2026 — $79", "Nov 2026 — $79", "Oct 2026 — $79"].map((inv, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #141414" }}>
                      <div style={{ fontSize: "0.84rem", color: "var(--soft)" }}>{inv}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ fontSize: "0.7rem", padding: "0.18rem 0.6rem", borderRadius: 20, background: "rgba(74,222,128,0.1)", color: "#4ade80", fontWeight: 600 }}>Paid</span>
                        <button style={{ fontSize: "0.72rem", color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API KEYS */}
            {activeTab === "API Keys" && (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.3rem" }}>API Keys</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.75rem" }}>Manage keys for programmatic access to AInsight data.</div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "1.5rem" }}>
                  {[
                    { name: "Production Key", key: "sk-live-•••••••••••••••••••••4f8a", created: "Jan 12, 2025", lastUsed: "2 mins ago", status: "Active" },
                    { name: "Development Key", key: "sk-dev-••••••••••••••••••••••9c2b", created: "Mar 5, 2025", lastUsed: "3 days ago", status: "Active" },
                    { name: "Test Key", key: "sk-test-•••••••••••••••••••••1d4e", created: "Jun 20, 2025", lastUsed: "Never", status: "Inactive" },
                  ].map(k => (
                    <div key={k.name} style={{ padding: "1.1rem 1.25rem", background: "#0d0d0d", border: "1px solid var(--border)", borderRadius: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{k.name}</div>
                          <div style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.2rem" }}>{k.key}</div>
                        </div>
                        <span style={{ fontSize: "0.68rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: k.status === "Active" ? "rgba(74,222,128,0.1)" : "rgba(102,102,102,0.15)", color: k.status === "Active" ? "#4ade80" : "var(--muted)", fontWeight: 600 }}>{k.status}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Created {k.created} · Last used {k.lastUsed}</div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button style={{ fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: 20, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>Revoke</button>
                          <button style={{ fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: 20, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>Copy</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", fontWeight: 600, padding: "0.6rem 1.25rem", borderRadius: 20, background: "var(--accent2)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer" }}>
                  <Key size={13} /> Generate New Key
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}