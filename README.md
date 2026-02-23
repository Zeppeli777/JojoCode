# JojoCode — ClaudeCode

一个自娱自乐的仿 Claude Code 的 Coding Agent，基于 Node.js (TypeScript) + LangChain + LangGraph + Handlebars + Ink 构建。

---

## ✨ 功能特性

- 🤖 **AI Coding Agent**：基于 LangGraph 构建的多步推理 Agent，支持代码阅读、编辑、执行等工具调用
- 🧩 **LangChain 工具链**：集成 LangChain 生态，方便扩展 LLM Provider 与工具插件
- 📝 **Handlebars 模板引擎**：使用 `.hbs` 模板统一管理 System Prompt 与 User Prompt，方便迭代调试
- 🖥️ **Ink 终端 UI**：基于 React + Ink 构建富交互的命令行界面，提供类 Claude Code 的交互体验
- 🔧 **TypeScript 全栈**：完整的类型覆盖，保障代码质量

---

## 📁 项目结构

```
JojoCode/
├── src/
│   ├── index.tsx              # 应用入口，挂载 Ink UI
│   ├── agent/
│   │   ├── graph.ts           # LangGraph 图定义（节点 + 边）
│   │   ├── nodes.ts           # 图中各个处理节点
│   │   └── state.ts           # Agent 状态类型定义
│   ├── tools/
│   │   └── index.ts           # Agent 可调用工具集合
│   ├── templates/
│   │   ├── system.hbs         # System Prompt 模板
│   │   └── user.hbs           # User Prompt 模板
│   ├── ui/
│   │   ├── App.tsx            # Ink 根组件
│   │   └── components/
│   │       ├── ChatInput.tsx  # 用户输入框组件
│   │       └── MessageList.tsx# 消息列表组件
│   └── utils/
│       └── template.ts        # Handlebars 编译工具函数
├── .env.example               # 环境变量示例
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入你的 LLM API Key
```

### 3. 启动开发模式

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
npm start
```

---

## 🛠️ 技术栈

| 层次 | 技术 | 说明 |
|------|------|------|
| 运行时 | Node.js + TypeScript | 全栈类型安全 |
| Agent 框架 | LangGraph + LangChain | 多步推理图编排 |
| 模板引擎 | Handlebars | Prompt 模板管理 |
| 终端 UI | Ink (React) | 富交互命令行界面 |
| LLM Provider | OpenAI | 可替换为其他 Provider |
| 环境配置 | dotenv | 本地开发环境变量 |
| 数据验证 | Zod | 运行时类型校验 |

---

## 📝 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `OPENAI_API_KEY` | ✅ | OpenAI API Key |
| `MODEL_NAME` | ❌ | 模型名称，默认 `gpt-4o` |
| `MAX_ITERATIONS` | ❌ | Agent 最大推理轮数，默认 `10` |

---

## 📄 License

MIT
