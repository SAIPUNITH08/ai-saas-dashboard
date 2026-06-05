import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { metric, value, trend } = await req.json();

  const prompt = `You are an AI business analyst. Given this dashboard metric:
- Metric: ${metric}
- Current Value: ${value}
- Trend: ${trend}

Give a sharp 2-sentence business insight and one specific action recommendation. Be concise and direct. No markdown.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const insight = data.content?.[0]?.text || "Unable to generate insight at this time.";
  return NextResponse.json({ insight });
}
