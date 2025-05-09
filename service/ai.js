// ai.js

import axios from 'axios';
import 'dotenv/config';

const messages = [
  {
    role: "system",
    content: "Mindig rövid, tömör, lényegretörő választ adj!"
  }
];

export async function getAiAnswer(question) {
  console.log("AI got the question");
  messages.push({ role: 'user', content: question });
  try {
    console.log("AI send the question");
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: messages
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("AI got the answare");
    messages.push({
      role: 'assistant',
      content: response.data.choices[0].message.content
    });
    console.log("AI sent the answare to front end: " + response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
