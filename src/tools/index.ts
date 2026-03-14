import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { readFile, writeFile, readdir } from "fs/promises";
import { join } from "path";

/**
 * 读取文件内容
 */
export const readFileTool = tool(
  async ({ filePath }) => {
    const content = await readFile(filePath, "utf-8");
    return content;
  },
  {
    name: "read_file",
    description: "读取指定路径的文件内容",
    schema: z.object({
      filePath: z.string().describe("文件的绝对或相对路径"),
    }),
  }
);

/**
 * 写入文件内容
 */
export const writeFileTool = tool(
  async ({ filePath, content }) => {
    await writeFile(filePath, content, "utf-8");
    return `文件已写入：${filePath}`;
  },
  {
    name: "write_file",
    description: "将内容写入指定路径的文件（会覆盖已有内容）",
    schema: z.object({
      filePath: z.string().describe("文件的绝对或相对路径"),
      content: z.string().describe("要写入文件的内容"),
    }),
  }
);

/**
 * 列出目录内容
 */
export const listDirectoryTool = tool(
  async ({ dirPath }) => {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const result = entries.map((e) => `${e.isDirectory() ? "[dir]" : "[file]"} ${e.name}`);
    return result.join("\n");
  },
  {
    name: "list_directory",
    description: "列出指定目录下的文件和子目录",
    schema: z.object({
      dirPath: z.string().describe("目录的绝对或相对路径"),
    }),
  }
);

/**
 * 在文件中搜索内容
 */
export const searchInFileTool = tool(
  async ({ filePath, pattern }) => {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const regex = new RegExp(pattern, "gi");
    const matches = lines
      .map((line, i) => ({ line, index: i + 1 }))
      .filter(({ line }) => regex.test(line))
      .map(({ line, index }) => `L${index}: ${line}`);
    return matches.length > 0 ? matches.join("\n") : "未找到匹配内容";
  },
  {
    name: "search_in_file",
    description: "在文件中搜索匹配指定模式的行",
    schema: z.object({
      filePath: z.string().describe("文件路径"),
      pattern: z.string().describe("搜索的正则表达式模式"),
    }),
  }
);

/**
 * 解析工作目录路径
 */
export const getWorkingDirTool = tool(
  async ({ subPath }) => {
    const workingDir = join(process.cwd(), subPath ?? "");
    return workingDir;
  },
  {
    name: "get_working_dir",
    description: "获取当前工作目录路径，可选传入子路径进行拼接",
    schema: z.object({
      subPath: z.string().optional().describe("可选的子路径"),
    }),
  }
);

/** 所有可用工具列表 */
export const allTools = [
  readFileTool,
  writeFileTool,
  listDirectoryTool,
  searchInFileTool,
  getWorkingDirTool,
];
