import fetch from 'node-fetch';

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing prompt input" }),
      };
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const data = await res.json();

    // ✅ Log error content if present
    if (!res.ok) {
      console.error("Claude API error:", data);
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data.error || "Claude API error" }),
      };
    }

    const responseText = data?.content?.[0]?.text;
    if (!responseText) {
      console.error("Claude returned no usable content:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Claude API did not return usable content." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseText }),
    };
  } catch (err) {
    console.error("Unhandled error in Claude function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
