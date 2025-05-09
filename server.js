import express from 'express';
import { getAiAnswer } from './service/ai.js';  // helyes import
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await getAiAnswer(question);
        res.json({ answer });
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

app.listen(port, () => {
    console.log(`Szerver elindult: http://localhost:${port}`);
});
