import axios from 'axios';
import 'dotenv/config';

const messages = [
	{
    	role: "system",
    	content: "Mindig rövid, tömör, lényegretörő választ adj!"
  	}
];

// Calls OprenRouter
export async function getAiAnswer(question) {
  	if (!question || typeof question !== 'string') {
    	throw new Error("Invalid question input.");
  	}

  	messages.push({ role: 'user', content: question });

  	try {
    	const response = await axios.post(
      			"https://openrouter.ai/api/v1/chat/completions",
      		{
        		model: "deepseek/deepseek-chat-v3-0324:free",
        		messages
      		},
      		{
        		headers: {
          			"Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          			"Content-Type": "application/json"
        		}
      		}
    	);

    	const answer = response.data.choices[0]?.message?.content;

    	if (!answer) throw new Error("No response from AI.");

    	messages.push({ role: 'assistant', content: answer });

    	return answer;
  	} catch (error) {
    	console.error("API error:", error.response?.data || error.message);
    	throw new Error("Failed to fetch AI response.");
  	}
}
