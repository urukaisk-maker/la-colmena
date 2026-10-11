import { writeFileSync } from 'node:fs';

const p = (id, nombre, descripcion, categoria, score, estrellas, licencia, url = null) =>
  ({ id, nombre, descripcion, categoria, score, estrellas, licencia, ...(url && { url }) });

const proyectos = [
  // === SKILLS, PLUGINS AND RULES (10 visibles de 31) ===
  p("skills", "skills", "Agent skills for planning, TDD, debugging and code review", "skills", 94, 285000, "MIT", "https://github.com/anthropics/skills"),
  p("ecc", "ecc", "Skills, agents, hooks and rules that add a workflow to coding agents", "skills", 93, 277000, "MIT"),
  p("superpowers", "superpowers", "Skill library that enforces a plan-then-TDD workflow in coding agents", "skills", 89, 297000, "MIT"),
  p("ponytail", "ponytail", "Prompt skill that makes coding agents write less, safer code", "skills", 89, 161000, "MIT"),
  p("caveman", "caveman", "Proxy and skill that cut token use in coding agents", "skills", 89, 111000, "Apache-2.0"),
  p("ui-ux-pro-max-skill", "ui-ux-pro-max-skill", "Design-system skill for AI coding assistants with searchable UI styles", "skills", 88, 135000, "MIT"),
  p("spec-kit", "spec-kit", "CLI and agent skills for spec-driven development, bug fixing and idea assessment", "skills", 87, 141000, "MIT"),
  p("agent-skills", "agent-skills", "Markdown engineering skills and slash commands for AI coding agents", "skills", 86, 105000, "MIT"),
  p("impeccable", "impeccable", "Design skill and linter for AI coding agents' frontend output", "skills", 85, 80000, "Apache-2.0"),
  p("claude-mem", "claude-mem", "Persistent session memory plugin for Claude Code and other coding agents", "skills", 84, 100000, "Apache-2.0"),

  // === CODING AGENTS AND ASSISTANTS (10 de 21) ===
  p("opencode", "opencode", "Terminal coding agent with build and plan modes", "coding-agents", 77, 213000, "MIT", "https://github.com/sst/opencode"),
  p("orca", "orca", "Desktop app that runs CLI coding agents in parallel git worktrees", "coding-agents", 75, 89000, "MIT"),
  p("archon", "archon", "YAML workflow engine that runs coding agents in isolated worktrees", "coding-agents", 73, 24000, "MIT"),
  p("codex", "codex", "OpenAI's terminal coding agent that runs locally", "coding-agents", 71, 129000, "Apache-2.0", "https://github.com/openai/codex"),
  p("oh-my-openagent", "oh-my-openagent", "Terminal coding agent that runs parallel sub-agents with git-based memory", "coding-agents", 70, 70000, "custom"),
  p("deepseek-reasoner", "deepseek-reasoner", "Coding agent for terminal, desktop, browser and VS Code, written in Go", "coding-agents", 70, 36000, "MIT"),
  p("gemini-cli", "gemini-cli", "Terminal coding agent running Gemini with file, shell and MCP tools", "coding-agents", 68, 107000, "Apache-2.0", "https://github.com/google-gemini/gemini-cli"),
  p("openhands", "openhands", "Web control center for running coding agents and scheduled automations", "coding-agents", 68, 91000, "MIT", "https://github.com/All-Hands-AI/OpenHands"),
  p("openchamber", "openchamber", "Workspace for running and reviewing OpenCode coding agents across devices", "coding-agents", 68, 11000, "MIT"),
  p("open-swe", "open-swe", "LangChain coding agent that plans, implements and reviews pull requests", "coding-agents", 68, 11000, "MIT"),

  // === MCP SERVERS FOR DEVELOPERS (6) ===
  p("codegraph", "codegraph", "Local code knowledge graph served to coding agents over MCP", "mcp", 80, 74000, "MIT"),
  p("chrome-devtools-mcp", "chrome-devtools-mcp", "MCP server that lets coding agents drive and debug a live Chrome", "mcp", 64, 53000, "Apache-2.0"),
  p("codebase-memory-mcp", "codebase-memory-mcp", "MCP server that indexes codebases into a queryable knowledge graph", "mcp", 62, 46000, "MIT"),
  p("context7", "context7", "Fresh, version-specific library docs injected into coding agent prompts", "mcp", 57, 63000, "MIT"),
  p("github-mcp-server", "github-mcp-server", "MCP server exposing GitHub repos, issues, PRs and Actions to AI tools", "mcp", 54, 34000, "MIT", "https://github.com/github/github-mcp-server"),
  p("cli-anything", "cli-anything", "Generates command-line wrappers so AI agents can drive desktop software", "mcp", 43, 52000, "Apache-2.0"),

  // === MCP SERVERS AND CHAT-HOST APPS (5) ===
  p("mcp-typescript-template", "mcp-typescript-template", "Express and Effect template for a stateless remote MCP server", "mcp-chat", 60, 58, "MIT"),
  p("template-mcp-server", "template-mcp-server", "Python FastMCP server template with OAuth, OpenShift manifests and CI", "mcp-chat", 47, 66, "Apache-2.0"),
  p("mcp-for-next.js", "mcp-for-next.js", "Stateless MCP server route for a Next.js App Router app", "mcp-chat", 41, 373, "MIT"),
  p("openai-apps-sdk-examples", "openai-apps-sdk-examples", "Example MCP servers and widgets for ChatGPT apps on the Apps SDK", "mcp-chat", 32, 2400, "MIT"),
  p("mcp-forge", "mcp-forge", "Go MCP server template with OAuth discovery and JWT validation", "mcp-chat", 24, 98, "Apache-2.0"),

  // === CHAT APPS (10 de 12) ===
  p("langchain-nextjs-template", "langchain-nextjs-template", "Next.js routes for LangChain.js chat, agents, structured output and RAG", "chat", 63, 2500, "MIT"),
  p("chatbot", "chatbot", "Next.js chat template with Auth.js, Postgres history and AI Gateway models", "chat", 54, 21000, "Apache-2.0"),
  p("chat", "chat", "Nuxt UI chat template with GitHub login, SQLite history and AI Gateway", "chat", 52, 376, "MIT"),
  p("gemini-chatbot", "gemini-chatbot", "Next.js chatbot template defaulting to Gemini with NextAuth and Postgres", "chat", 50, 1400, "Apache-2.0"),
  p("claude-quickstarts", "claude-quickstarts", "Independent Claude API starter projects, one folder per pattern", "chat", 48, 18000, "MIT"),
  p("twitterbio", "twitterbio", "Single-form Next.js text generator streaming from Together AI", "chat", 45, 1800, "MIT"),
  p("ai-chat", "ai-chat", "Laravel 12 chat starter streaming replies through Prism to eight providers", "chat", 36, 384, "MIT"),
  p("zola", "zola", "Multi-provider chat UI on Next.js with Ollama detection and BYOK", "chat", 33, 1500, "Apache-2.0"),
  p("openai-chatkit-advanced-samples", "openai-chatkit-advanced-samples", "ChatKit feature demos with FastAPI backends and React frontends", "chat", 31, 660, "MIT"),
  p("openai-chatkit-starter-app", "openai-chatkit-starter-app", "Minimal self-hosted and managed OpenAI ChatKit reference apps", "chat", 23, 883, "MIT"),

  // === RAG AND SEARCH (10 de 12) ===
  p("azure-search-openai-demo", "azure-search-openai-demo", "Azure RAG chat reference on AI Search and Azure OpenAI", "rag", 56, 7800, "MIT", "https://github.com/Azure-Samples/azure-search-openai-demo"),
  p("rag-postgres-openai-python", "rag-postgres-openai-python", "RAG over Postgres rows with hybrid search and SQL filters", "rag", 51, 505, "MIT"),
  p("llm-app", "llm-app", "Pathway RAG pipeline templates that re-index live data sources", "rag", 48, 59000, "MIT"),
  p("chat-langchain", "chat-langchain", "LangChain docs assistant as a Managed Deep Agent with Next.js UI", "rag", 45, 6500, "MIT"),
  p("chat-with-your-data-solution-accelerator", "chat-with-your-data-solution-accelerator", "Azure RAG chat app that answers from your documents with citations", "rag", 44, 1200, "MIT"),
  p("llm-answer-engine", "llm-answer-engine", "Perplexity-style Next.js answer engine over Brave search results", "rag", 41, 5000, "MIT"),
  p("azure-search-openai-javascript", "azure-search-openai-javascript", "TypeScript RAG on Azure AI Search with separate indexer and search", "rag", 41, 322, "MIT"),
  p("nextjs-openai-doc-search", "nextjs-openai-doc-search", "Build-time embeddings of your MDX docs into Supabase pgvector", "rag", 40, 1700, "Apache-2.0"),
  p("supabase-auth-ssr", "SupabaseAuthWithSSR", "Claude chat on Next.js 16 with Supabase auth, pgvector RAG and cost dashboards", "rag", 39, 397, "MIT"),
  p("natural-language-postgres", "natural-language-postgres", "Next.js text-to-SQL over Postgres with auto-selected charts", "rag", 32, 326, "Apache-2.0"),

  // === AGENT BACKENDS (10 de 18) ===
  p("eve-software-factory-template", "eve-software-factory-template", "Pipeline that turns GitHub or Linear issues into reviewed draft PRs", "agents", 65, 1200, "MIT"),
  p("marketing-team-eve-template", "marketing-team-eve-template", "eve lead agent delegating to five marketing specialists with approval gates", "agents", 59, 450, "MIT"),
  p("personal-agent-template", "personal-agent-template", "eve and Nuxt personal agent with Slack, GitHub, Linear and per-user memory", "agents", 57, 476, "MIT"),
  p("adk-recipes", "adk-recipes", "Runnable Agent Development Kit recipes, from patterns to deployable agents", "agents", 53, 10000, "Apache-2.0"),
  p("ai-town", "ai-town", "Generative agent city simulation on Convex with Ollama by default", "agents", 52, 11000, "MIT"),
  p("knowledge-agent-template", "knowledge-agent-template", "Nuxt knowledge agent that greps a synced snapshot repo instead of embedding", "agents", 48, 1100, "MIT"),
  p("open-tag", "open-tag", "Slack and Teams knowledge agent on LangGraph and CopilotKit Channels", "agents", 47, 1300, "MIT"),
  p("react-agent", "react-agent", "Minimal Python LangGraph ReAct agent with Tavily, ready for Studio", "agents", 47, 852, "MIT"),
  p("azure-ai-travel-agents", "azure-ai-travel-agents", "Travel-agency multi-agent sample using MCP servers in four languages", "agents", 45, 483, "MIT"),
  p("openai-cua-sample-app", "openai-cua-sample-app", "Computer-use agent loops for Playwright browsers and PyAutoGUI desktops", "agents", 44, 1900, "MIT"),

  // === AGENT UI AND GENERATIVE UI (6) ===
  p("agent-chat-ui", "agent-chat-ui", "Next.js chat frontend for any LangGraph server with interrupts and artifacts", "agent-ui", 45, 3200, "MIT"),
  p("open-generative-ui", "OpenGenerativeUI", "Chat interface that answers with 3D models, charts, calculators and maps", "agent-ui", 45, 2500, "MIT"),
  p("agent-ui", "agent-ui", "Next.js chat frontend for Agno AgentOS with tool calls and reasoning", "agent-ui", 40, 1900, "MIT"),
  p("stockbot-on-groq", "stockbot-on-groq", "Groq chatbot answering with TradingView widgets via AI SDK generative UI", "agent-ui", 24, 1500, "Apache-2.0"),
  p("assistant-ui-stockbroker", "assistant-ui-stockbroker", "assistant-ui frontend and LangGraph.js stockbroker agent with approvals", "agent-ui", 13, 281, "MIT"),
  p("openai-structured-outputs-samples", "openai-structured-outputs-samples", "Three Next.js samples driving UI from schema-constrained OpenAI outputs", "agent-ui", 11, 685, "MIT"),

  // === VOICE AND REALTIME (10 de 16) ===
  p("agent-starter-react", "agent-starter-react", "Next.js voice assistant frontend for LiveKit Agents", "voice", 51, 949, "MIT"),
  p("agent-starter-python", "agent-starter-python", "Python voice agent on LiveKit Agents with turn detection and simulations", "voice", 50, 264, "MIT"),
  p("agent-starter-node", "agent-starter-node", "Node.js voice agent on LiveKit Agents with turn detection and simulations", "voice", 50, 114, "MIT"),
  p("voice-ui-kit", "voice-ui-kit", "React components and templates for Pipecat voice agent frontends", "voice", 45, 419, "BSD-2-Clause"),
  p("pipecat-examples", "pipecat-examples", "Runnable Pipecat voice agent examples for phone, web and deployment", "voice", 41, 395, "BSD-2-Clause"),
  p("agent-starter-android", "agent-starter-android", "Kotlin and Jetpack Compose voice assistant client for LiveKit Agents", "voice", 41, 104, "MIT"),
  p("agent-starter-swift", "agent-starter-swift", "SwiftUI voice agent client for iOS, macOS and visionOS on LiveKit", "voice", 40, 97, "MIT"),
  p("agent-starter-flutter", "agent-starter-flutter", "Flutter voice agent client for iOS, Android, macOS and web", "voice", 40, 93, "MIT"),
  p("agent-starter-react-native", "agent-starter-react-native", "Expo React Native voice assistant client for LiveKit Agents", "voice", 36, 84, "MIT"),
  p("agent-starter-embed", "agent-starter-embed", "Deprecated Next.js embed widget for a LiveKit voice agent", "voice", 35, 85, "MIT"),

  // === SAAS BOILERPLATES (7) ===
  p("ant-design-pro", "ant-design-pro", "React admin dashboard template based on Ant Design 6 and Umi Max", "saas", 68, 39000, "MIT"),
  p("velobase-harness", "velobase-harness", "Next.js AI SaaS base with credits, usage billing, workers and anti-abuse", "saas", 56, 609, "MIT"),
  p("hackathon-starter", "hackathon-starter", "Node.js and Express boilerplate with auth, API examples and AI samples", "saas", 52, 35000, "MIT", "https://github.com/sahat/hackathon-starter"),
  p("open-saas", "open-saas", "Wasp SaaS template with auth, three payment providers and OpenAI demo", "saas", 47, 16000, "MIT", "https://github.com/wasp-lang/open-saas"),
  p("ai-fullstack-saas-boilerplate", "AI-Fullstack-SaaS-Boilerplate", "Fastify, tRPC and React SaaS base with Better Auth and SSE chat", "saas", 36, 1400, "MIT"),
  p("next-ai-starter", "next-ai-starter", "Next.js 14, tRPC and Prisma starter with LLM SDKs and agent checklists", "saas", 28, 511, "MIT"),
  p("lastsaas", "lastsaas", "Go multi-tenant SaaS kit with Stripe billing and an MCP admin server", "saas", 19, 173, "MIT"),

  // === APP BUILDER STARTERS (7) ===
  p("ai-website-cloner-template", "ai-website-cloner-template", "Next.js template with an agent skill that rebuilds a website from its URL", "app-builder", 77, 36000, "MIT"),
  p("jeecgboot", "jeecgboot", "Java low-code platform with code generator and built-in AI app builder", "app-builder", 63, 48000, "Apache-2.0"),
  p("llamacoder", "llamacoder", "Open-source Claude Artifacts clone generating React apps with Llama", "app-builder", 48, 7100, "MIT", "https://github.com/Nutlope/llamacoder"),
  p("open-agents", "open-agents", "Reference app for background coding agents on Vercel sandboxes", "app-builder", 45, 5800, "MIT"),
  p("vibesdk", "vibesdk", "Self-hosted prompt-to-app platform on Cloudflare Workers and Durable Objects", "app-builder", 44, 5400, "MIT"),
  p("fragments", "fragments", "Open-source Claude Artifacts that runs AI-generated apps in sandboxes", "app-builder", 41, 6400, "Apache-2.0"),
  p("coding-agent-template", "coding-agent-template", "Run Claude Code, Codex and other coding CLIs in Vercel Sandbox", "app-builder", 38, 1800, "Apache-2.0"),

  // === AI EDITORS AND WORKFLOW CANVASES (4) ===
  p("plate-playground-template", "plate-playground-template", "Next.js rich-text editor template on Plate with AI commands", "editors", 54, 241, "MIT"),
  p("editor", "editor", "Notion-style Nuxt editor with AI completions and optional collaboration", "editors", 50, 171, "MIT"),
  p("workflow-builder-template", "workflow-builder-template", "Visual AI workflow builder on Workflow DevKit with real integrations", "editors", 36, 1200, "Apache-2.0"),
  p("tersa", "tersa", "Node canvas for chaining text, image and video models via AI Gateway", "editors", 25, 1000, "MIT"),

  // === CLOUD REFERENCE ARCHITECTURES (7) ===
  p("agent-landing-zone", "agent-landing-zone", "Azure infrastructure templates for deploying enterprise agents on Foundry", "cloud", 64, 1200, "MIT"),
  p("fullstack-solution-template-for-agentcore", "fullstack-solution-template-for-agentcore", "React frontend and AgentCore backend starter deployed to AWS with CDK", "cloud", 44, 597, "Apache-2.0"),
  p("azurechat", "azurechat", "Enterprise private chat on Azure OpenAI with document chat and personas", "cloud", 42, 1400, "MIT"),
  p("openai-chat-app-quickstart", "openai-chat-app-quickstart", "Minimal Azure OpenAI chat app with managed identity", "cloud", 40, 254, "MIT"),
  p("get-started-with-ai-agents", "get-started-with-ai-agents", "Azure azd template for a Foundry agent chat app with file search", "cloud", 33, 374, "MIT"),
  p("serverless-rag-demo", "serverless-rag-demo", "AWS CDK sample for document RAG chat and multi-agent workflows on Bedrock", "cloud", 33, 223, "MIT-0"),
  p("openai-chat-vision-quickstart", "openai-chat-vision-quickstart", "Quart chat app that answers questions about uploaded images via Azure OpenAI", "cloud", 29, 224, "MIT"),

  // === AI API BACKENDS (6) ===
  p("agent-service-toolkit", "agent-service-toolkit", "LangGraph agents served by FastAPI with a Streamlit chat client", "ai-api", 70, 4500, "MIT"),
  p("fastapi-langgraph-agent-template", "fastapi-langgraph-agent-production-ready-template", "FastAPI service for a LangGraph agent with auth, memory and tracing", "ai-api", 55, 2700, "MIT"),
  p("full-stack-ai-agent-template", "full-stack-ai-agent-template", "Project generator for FastAPI and Next.js apps with agents and RAG", "ai-api", 55, 1900, "MIT"),
  p("generative-ai-project-template", "generative-ai-project-template", "uv workspace with FastAPI, NiceGUI, LiteLLM and Promptfoo evals", "ai-api", 51, 118, "MIT"),
  p("nodejs-api-boilerplate", "nodejs-api-boilerplate", "Express TypeScript CRUD API template with an LLM module generator", "ai-api", 31, 164, "MIT"),
  p("genai-api", "genai-api", "Hono API on Cloudflare Workers proxying Gemini with bearer auth", "ai-api", 28, 111, "Apache-2.0"),

  // === MOBILE AND BROWSER EXTENSIONS (2) ===
  p("react-native-ai", "react-native-ai", "Expo chat and image app with an Express proxy for multiple LLMs", "mobile", 51, 1300, "MIT"),
  p("extro", "extro", "WXT and React browser extension starter with Supabase auth and AI", "mobile", 37, 413, "MIT"),

  // === CODE REVIEW (1) ===
  p("open-code-review", "open-code-review", "CLI that reviews Git diffs with an LLM agent and line-level comments", "code-review", 73, 46000, "Apache-2.0"),

  // === DESIGN TO CODE (2) ===
  p("screenshot-to-code", "screenshot-to-code", "Turns screenshots and mockups into Tailwind, React or Vue code", "design-to-code", 65, 80000, "MIT", "https://github.com/abi/screenshot-to-code"),
  p("onlook", "onlook", "Visual editor that edits Next.js and Tailwind apps with AI", "design-to-code", 47, 27000, "Apache-2.0", "https://github.com/onlook-dev/onlook"),

  // === BACKENDS AND DATABASES (2) ===
  p("supabase", "supabase", "Postgres backend with auth, storage, realtime and edge functions", "backends", 73, 111000, "Apache-2.0", "https://github.com/supabase/supabase"),
  p("graphql-engine", "graphql-engine", "GraphQL API layer over Postgres, MongoDB, ClickHouse and SQL Server", "backends", 55, 32000, "Apache-2.0", "https://github.com/hasura/graphql-engine"),

  // === DEPLOY AND HOSTING (2) ===
  p("dokploy", "dokploy", "Self-hosted PaaS for deploying apps and databases on your own servers", "deploy", 85, 38000, "custom", "https://github.com/Dokploy/dokploy"),
  p("dokku", "dokku", "Self-hosted mini-Heroku PaaS that deploys apps with git push", "deploy", 65, 32000, "MIT", "https://github.com/dokku/dokku"),
];

writeFileSync('data/proyectos.json', JSON.stringify(proyectos, null, 2));
console.log(`✅ Escritos ${proyectos.length} proyectos en data/proyectos.json`);

// Estadísticas por categoría
const cats = {};
for (const pr of proyectos) cats[pr.categoria] = (cats[pr.categoria] || 0) + 1;
console.log('\n📊 Por categoría:');
for (const [c, n] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${c.padEnd(18)} ${n}`);
}
