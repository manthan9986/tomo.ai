import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatGroq } from '@langchain/groq';
import { tool } from '@langchain/core/tools';
import { MemorySaver } from '@langchain/langgraph';
import { z } from "zod";


// Initialize memory to persist state between graph runs
const checkpointSaver = new MemorySaver();

// Define the tools for the agent to use
const weatherTool = tool(
  async ({ query }) => {
    // This is a placeholder, but don't tell the LLM that...
    if (query.toLowerCase().includes('san francisco')) {
      return "It's 60 degrees and foggy.";
    }
    return "It's 90 degrees and sunny.";
  },
  {
    name: 'weather',
    description: 'Get Weather in a specific city',
    schema: z.object({
      query: z.string().describe('The query to use in your search.'),
    }),
  }
);

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.1,
  model: 'llama3-70b-8192',
});

export const agent = createReactAgent({
  llm: model,
  tools: [weatherTool],
  memory: checkpointSaver,
});
const result = await agent.invoke({
    messages: [
      {
        role: 'user',
        content: "What's the weather in San Francisco ?",
      }
    ],
    configurable: { thread_id: 42 },
  });
  
  
  console.log(result.messages.at(-1)?.content);