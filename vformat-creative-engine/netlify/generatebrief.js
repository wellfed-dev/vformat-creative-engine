// netlify/functions/generatebrief.js
import fetch from 'node-fetch';

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    // Step 1: Claude generates a structured data brief
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const claudeJson = await claudeResponse.json();
    const structuredBrief = JSON.parse(
      claudeJson.content[0].text.replace(/```json|```/g, '').trim()
    );

    // Step 2: GPT uses Claude's output to generate a creative brief
    const gptPrompt = `You are a creative strategist. Take this structured brief:
${JSON.stringify(structuredBrief, null, 2)}

Turn it into an emotionally engaging and strategic creative proposal. Write it section by section in clear, human language, suitable for pitching to a studio exec.`;

    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: gptPrompt }],
        max_tokens: 1500,
        temperature: 0.75
      })
    });

    const gptJson = await gptResponse.json();
    const creativeText = gptJson.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        structured: structuredBrief,
        creative: creativeText
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate brief' })
    };
  }
}
