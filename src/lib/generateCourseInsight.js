export async function generateCourseInsight(course) {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
    const prompt = `
  You are an AI assistant helping refinery workers choose relevant courses.
  
  Here is a course:
  Title: ${course.title}
  Description: ${course.description}
  
  In 2-3 sentences, explain how the skills or knowledge from this course would be useful in a refinery environment. Be clear, helpful, and use industry-relevant terms if appropriate.
  `;
  
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
    });
  
    const responseData = await response.json();
  
    return responseData.choices?.[0]?.message?.content ?? 'No insight generated.';
  }
  