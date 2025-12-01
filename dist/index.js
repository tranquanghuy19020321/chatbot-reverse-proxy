"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.PORTFOLIO_GEMINI_API_KEY || '';
const ai = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to Chatbot Proxy API' });
});
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.post('/api/chat', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            res.status(400).json({ error: 'Query is required' });
            return;
        }
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        const result = await model.generateContentStream(query);
        for await (const chunk of result.stream) {
            const text = chunk.text();
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
    }
    catch (error) {
        console.error('Error proxying request to Gemini:', error);
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Failed to process request',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map