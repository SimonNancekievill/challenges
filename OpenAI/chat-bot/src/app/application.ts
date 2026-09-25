"use server";

export type Messages = {
  role: string;
  content: string;
};

export async function sendChat(messages: Messages[]) {
  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    },
  );
  const data = await openaiResponse.json();
  if (!openaiResponse.ok) {
    console.error("OpenAI API error:", data);
    throw new Error(data.error?.message ?? "API request failed");
  }
  return data.choices[0].message;
}
