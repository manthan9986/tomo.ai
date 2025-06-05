import express from 'express';
import cors from 'cors';
import {agent} from './agent.js'; // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({origin: '*'})); // Adjust the origin as needed

app.get('/', (req, res) => {
    res.send('Hello from the Agent Server!');
});

app.post('/generate', async (req, res) => {
    const result = await agent.invoke({
        messages: [{
            role: 'user',
            content: req.body.input
        }]
    },
 {configurable:{thread_id : 42}}
);
    res.json(result.messages.at(-1).content); // Ensure response is sent back to the client
});

app.listen(PORT, () => {
    console.log(`Agent server is running on http://localhost:${PORT}`);
});