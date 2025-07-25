import express from 'express';
import { getAiAnswer } from './services/ai.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: 'https://revmarci.github.io',
    })
);

app.use(express.json());

// ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wake up
app.get('/wake', async (req, res) => {
    res.json({ success: true, message: 'Server is awake.' });
});

// API endpoint
app.post('/ask', async (req, res) => {
    const messages = req.body;

    try {
        const answer = await getAiAnswer(messages);
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
