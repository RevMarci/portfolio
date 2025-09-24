import axios from 'axios';
import 'dotenv/config';

// Calls OprenRouter
export async function getAiAnswer(messages) {
    console.log('Sending API request');
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-chat-v3.1:free',
                messages: messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const answer = response.data.choices[0]?.message?.content;

        if (!answer) throw new Error('No response from AI.');

        return answer;
    } catch (error) {
        console.error('API error:', error.response?.data || error.message);
        throw new Error('Failed to fetch AI response.');
    }
}
