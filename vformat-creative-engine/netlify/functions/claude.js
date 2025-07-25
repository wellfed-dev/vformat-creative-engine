const fetch = require('node-fetch'); 
console.log("Claude function running correctly");

exports.handler = async function(event) {
  try {
    const { prompt } = JSON.parse(event.body);
    console.log("Prompt received:", prompt);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", // ✅ updated to latest
          max_tokens: 1024,
          temperature: 0.5,
          messages: [{ role: "user", content: prompt }]
        })
      });
      

    const data = await response.json();
    console.log("Claude raw response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: data?.content?.map(part => part.text).join('') || ''
      })
    };
  } catch (err) {
    console.error("Claude error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
