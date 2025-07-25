import fetch from 'node-fetch';

export async function handler(event) {
  const { trends } = JSON.parse(event.body);

  if (!trends) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing trends input" }),
    };
  }

  try {
    // Step 2: Ask Claude for a structured data brief
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
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
        messages: [{
          role: 'user',
          content: `Create a JSON data brief summarizing the following trends: ${trends}. Include platform performance, genre opportunity, and any standout behavior patterns.`,
        }],
      }),
    });

    const claudeJson = await claudeResponse.json();
    const structuredBrief = claudeJson?.content?.[0]?.text?.replace(/```json\n?|```/g, '').trim();

    // Safety fallback
    if (!structuredBrief) {
      throw new Error("Claude response invalid.");
    }

    // Step 3: Ask GPT to generate creative using the structured brief
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a creative strategist generating engaging vertical series pitches.' },
          {
            role: 'user',
            content: `Based on the following data brief, write a creative concept for a short-form episodic series:\n\n${structuredBrief}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const gptJson = await gptResponse.json();
    const creativeOutput = gptJson?.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        brief: structuredBrief,
        creative: creativeOutput,
      }),
    };
  } catch (error) {
    console.error("Error in generatebrief function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
