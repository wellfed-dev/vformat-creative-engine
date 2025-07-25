exports.handler = async function(event) {
    try {
      const { prompt } = JSON.parse(event.body);
  
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          temperature: 0.5,
          messages: [{ role: "user", content: prompt }]
        })
      });
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: data?.content?.[0]?.text || ''
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  };
  