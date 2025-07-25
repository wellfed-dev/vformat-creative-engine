import fetch from 'node-fetch';

export async function handler(event) {
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
  return {
    statusCode: 200,
    body: JSON.stringify({ response: data.content[0].text })
  };
}
