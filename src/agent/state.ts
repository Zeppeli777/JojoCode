import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

/**
 * Agent 的共享状态定义
 * 使用 LangGraph Annotation API 声明节点间传递的数据结构
 */
export const AgentState = Annotation.Root({
  /** 对话历史消息 */
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  /** 当前用户输入 */
  userInput: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  /** 工作目录路径 */
  workingDirectory: Annotation<string>({
    reducer: (_, next) => next,
    default: () => process.cwd(),
  }),
  /** Agent 是否应该继续推理 */
  shouldContinue: Annotation<boolean>({
    reducer: (_, next) => next,
    default: () => true,
  }),
});

export type AgentStateType = typeof AgentState.State;
