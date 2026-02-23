import { ChatAnthropic } from "@langchain/anthropic";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AgentStateType } from "./state.js";
import { allTools } from "../tools/index.js";
import { renderTemplate } from "../utils/template.js";

const model = new ChatAnthropic({
  model: process.env.MODEL_NAME ?? "claude-opus-4-5",
  apiKey: process.env.ANTHROPIC_API_KEY,
}).bindTools(allTools);

/**
 * 调用 LLM 的节点：生成 System Prompt、调用模型
 */
export async function callModelNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
  const systemPrompt = await renderTemplate("system", {
    workingDirectory: state.workingDirectory,
    currentDate: new Date().toISOString().split("T")[0],
  });

  const messages =
    state.messages.length === 0
      ? [new SystemMessage(systemPrompt), new HumanMessage(state.userInput)]
      : state.messages;

  const response = await model.invoke(messages);
  return { messages: [response] };
}

/**
 * 工具调用节点：执行 LLM 返回的 tool_calls
 */
export const toolNode = new ToolNode(allTools);

/**
 * 路由函数：判断是否继续工具调用循环
 */
export function shouldContinueEdge(state: AgentStateType): "tools" | "__end__" {
  const lastMessage = state.messages.at(-1);
  if (!lastMessage) return "__end__";

  const toolCalls =
    "tool_calls" in lastMessage && Array.isArray((lastMessage as { tool_calls?: unknown[] }).tool_calls)
      ? (lastMessage as { tool_calls: unknown[] }).tool_calls
      : [];

  return toolCalls.length > 0 ? "tools" : "__end__";
}
