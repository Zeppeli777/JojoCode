import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";

interface ChatInputProps {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(input: string) {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setValue("");
    onSubmit(trimmed);
  }

  if (isLoading) {
    return (
      <Box borderStyle="round" borderColor="yellow" paddingX={1}>
        <Text color="yellow">⏳ 思考中...</Text>
      </Box>
    );
  }

  return (
    <Box borderStyle="round" borderColor="cyan" paddingX={1}>
      <Text color="cyan">❯ </Text>
      <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} placeholder="输入你的问题（Enter 发送，Ctrl+C 退出）" />
    </Box>
  );
}
