# AI SaaS Analytics Dashboard

A production-grade AI-powered analytics dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Claude AI.

## 🚀 Features

- **Real-time metrics** — Revenue, Users, Churn, Satisfaction KPI cards
- **AI Insight per metric** — Click "AI Insight" on any stat card to get Claude-powered analysis
- **Interactive Charts** — Area chart (revenue + users), Bar chart (weekly traffic) via Recharts
- **Top Customers table** — Ranked by revenue with growth indicators
- **AI Business Analyst Chat** — Ask questions about your dashboard in natural language, powered by Claude
- **Dark theme** — Professional dark UI with lime green accent

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + inline styles
- **Charts:** Recharts
- **AI:** Anthropic Claude API (claude-haiku-4-5)
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Setup

```bash
# Install dependencies
npm install

# Add your API key
# Edit .env.local and add: ANTHROPIC_API_KEY=your_key_here

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

```bash
npx vercel --prod
```

Add `ANTHROPIC_API_KEY` in Vercel environment variables.

## 👨‍💻 Built by

**Sai Punith K R** — Frontend & AI Developer  
[GitHub](https://github.com/saipunith0804) · [LinkedIn](https://linkedin.com/in/sai-punith-k-r-73a271325)
