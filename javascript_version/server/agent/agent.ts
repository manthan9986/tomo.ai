import {ChatOpenAI} from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { HumanMessage } from "@langchain/core/messages";
import { Tool } from "@langchain/core/tools";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import { LLM } from "@langchain/core/language_models/llms";
import {ConversationBufferMemory} from "@langchain/memory";

const llm = new ChatOpenAI({model: "gpt-4o-mini", temperature: 0.1});

const memory = new ConversationBufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "input",
  outputKey: "output",});

const system_prompt = "You are a helpful assistant. Answer the user's questions based on the provided context.\n\n";
const messages = [new SystemMessage({content: system_prompt}, new HumanMessage({content: {input}}0))];
const general_agent = createReactAgent({ llm });
const response = await general_agent.invoke({ messages });
    
console.log(response);