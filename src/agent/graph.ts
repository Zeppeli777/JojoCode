import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { callModelNode, toolNode, shouldContinueEdge } from "./nodes.js";

/**
 * 构建 LangGraph Agent 图
 *
 * 节点流程：
 *   [START] → agent → (有 tool_calls?) → tools → agent → ...
 *                    ↘ (无 tool_calls)  → [END]
 */
export function buildAgentGraph() {
  const graph = new StateGraph(AgentState)
    .addNode("agent", callModelNode)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinueEdge)
    .addEdge("tools", "agent");

  return graph.compile();
}

export type AgentGraph = ReturnType<typeof buildAgentGraph>;
