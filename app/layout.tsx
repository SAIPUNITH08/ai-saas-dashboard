import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AInsight | AI Dashboard",
  description: "AI-powered analytics dashboard built with Next.js, TypeScript, and Recharts",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%231a2400'/><rect width='100' height='100' rx='18' fill='none' stroke='%23c8f560' stroke-width='4'/><text y='58' x='50' text-anchor='middle' font-size='44' font-family='monospace' font-weight='900' fill='%23c8f560'>⚡</text><text y='82' x='50' text-anchor='middle' font-size='26' font-family='monospace' font-weight='900' fill='%23c8f560'>AI</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}