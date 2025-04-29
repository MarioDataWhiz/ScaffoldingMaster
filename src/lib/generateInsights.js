export async function generateInsights(prompt) {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
  
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
  
    const responseData = await response.json()
    return responseData.choices[0].message.content
  }
  