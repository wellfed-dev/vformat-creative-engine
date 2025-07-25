exports.handler = async function (event) {
  const { structured } = JSON.parse(event.body);

  if (!structured) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing structured input" })
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are a creative strategist generating vertical series pitches from structured data."
          },
          {
            role: "user",
            content: `Using the following brief, write a fully structured JSON output for the pitch:\n\n${JSON.stringify(structured)}`
          }
        ]
      })
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ response: result.choices?.[0]?.message?.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
