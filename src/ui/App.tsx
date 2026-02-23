import React, { useState, useCallback } from "react";
import { Box, Text, useApp } from "ink";
import { BaseMessage } from "@langchain/core/messages";
import { MessageList } from "./components/MessageList.js";
import { ChatInput } from "./components/ChatInput.js";
import { buildAgentGraph } from "../agent/graph.js";

const agentGraph = buildAgentGraph();

export function App() {
  const { exit } = useApp();
  const [messages, setMessages] = useState<BaseMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (userInput: string) => {
      setIsLoading(true);
      try {
        const result = await agentGraph.invoke({
          userInput,
          messages,
          workingDirectory: process.cwd(),
          shouldContinue: true,
        });
        setMessages(result.messages);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("Agent 执行出错：", errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <Box flexDirection="column" padding={1}>
      {/* 标题栏 */}
      <Box borderStyle="double" borderColor="magenta" paddingX={1} marginBottom={1}>
        <Text bold color="magenta">
          🤖 JojoCode — AI Coding Agent
        </Text>
      </Box>

      {/* 消息列表 */}
      <MessageList messages={messages} />

      {/* 输入框 */}
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </Box>
  );
}
