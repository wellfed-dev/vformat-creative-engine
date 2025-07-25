import fetch from 'node-fetch';

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    // Fallback if response doesn't include expected structure
    const text = data?.content?.[0]?.text || 'No response generated.';

    return {
      statusCode: 200,
      body: JSON.stringify({ response: text })
    };
  } catch (error) {
    console.error('Claude Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
}
