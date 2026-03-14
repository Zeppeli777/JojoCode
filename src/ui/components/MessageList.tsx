import React from "react";
import { Box, Text } from "ink";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

interface MessageListProps {
  messages: BaseMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Box paddingY={1}>
        <Text dimColor>还没有消息，输入内容开始对话吧 👋</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingY={1}>
      {messages.map((msg, i) => {
        const isHuman = msg instanceof HumanMessage;
        const isAI = msg instanceof AIMessage;
        const role = isHuman ? "You" : isAI ? "JojoCode" : "System";
        const color = isHuman ? "cyan" : isAI ? "green" : "yellow";
        const content = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);

        return (
          <Box key={i} flexDirection="column" marginBottom={1}>
            <Text bold color={color}>
              {role}
            </Text>
            <Text wrap="wrap">{content}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
