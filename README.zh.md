# Paper2Galgame 📚✨

> 将学术论文转化为沉浸式视觉小说体验，由守护灵**丛雨**（Murasame）为你讲解！

![OpenAI-compatible](https://img.shields.io/badge/API-OpenAI--compatible-412991)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)

[English](README.md) · [Русский](README.ru.md) · **中文**

## 📖 项目简介

Paper2Galgame 是一个 Web 应用，利用 LLM 将枯燥的学术论文转化为视觉小说风格的对话。
角色（默认是守护灵「丛雨」）会一步步为你讲解论文——傲娇、温柔或严厉，任你选择。

### ✨ 特性

- 📄 **PDF 解析** — 自动提取论文文本
- 🤖 **AI 驱动** — 支持任意 OpenAI 兼容 API（DeepSeek、OpenAI、OpenRouter、本地 LM Studio / Ollama / llama.cpp 等）
- 🎭 **多种性格** — 傲娇 / 温柔 / 严厉 三种讲解风格
- 📊 **可调深度** — 简略 / 详细 / 学术
- 💬 **完整 VN 体验** — 打字机效果、自动播放、对话历史
- 🎨 **精美 UI** — 动态立绘、情绪切换
- 🌍 **多语言** — 界面支持 English / Русский / 中文，回复语言可单独设置
- ⚙️ **配置而非硬编码** — API Key、采样参数和角色都放在 `config/`，不进入 git

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm（或 pnpm）

### 安装

```bash
git clone <repository-url>
cd paper2galgame
npm install
```

### 配置

所有配置都放在 `config/` 目录中，该目录**已加入 .gitignore**。首次使用时，从
`config/example/` 复制模板并填写：

```bash
# Linux / macOS
cp config/example/api.ts       config/api.ts
cp config/example/character.ts config/character.ts
```

```powershell
# Windows (PowerShell)
Copy-Item config/example/api.ts       config/api.ts
Copy-Item config/example/character.ts config/character.ts
```

然后编辑：

| 文件 | 配置内容 |
|------|----------|
| [`config/api.ts`](config/example/api.ts) | 提供商、服务器地址、API Key、模型，以及可选的采样参数 |
| [`config/character.ts`](config/example/character.ts) | 名字、情绪立绘、标题立绘、背景，以及角色设定 Prompt |

> 在 `config/api.ts` 和 `config/character.ts` 创建之前，应用不会启动——这是正常的，
> 按上面的方式复制模板即可。
> 详见 [`config/example/README.md`](config/example/README.md)。

### 运行

```bash
npm run dev       # 开发服务器
npm run build     # 生产构建
npm run preview   # 预览生产构建
```

然后访问 `http://localhost:3000`。

## 📁 项目结构

```
paper2galgame/
├── index.html            # HTML 入口
├── index.tsx             # React 入口
├── App.tsx               # 根组件
├── types.ts              # TypeScript 类型（含配置类型）
├── components/
│   ├── TitleScreen.tsx     # 标题界面
│   ├── UploadScreen.tsx    # 上传界面
│   ├── GameScreen.tsx      # 游戏主界面
│   └── SettingsScreen.tsx  # 设置界面
├── services/
│   └── llmService.ts       # LLM API 服务层
├── i18n/                 # 界面翻译（en / ru / zh）与语言上下文
└── config/               # 本地配置（已加入 .gitignore）
    └── example/            # 模板，提交到 git
```

## ⚙️ 选项

### 解析深度（[`GameSettings.detailLevel`](types.ts)）

| 选项 | 描述 | 轮数 |
|------|------|------|
| `brief` | 快速总结 | ~15 |
| `detailed` | 深入讲解 | ~30 |
| `academic` | 学术分析 | ~30 |

### 性格（[`GameSettings.personality`](types.ts)）

| 选项 | 描述 |
|------|------|
| `tsundere` | 嘴上嫌弃，讲解却很用心 |
| `gentle` | 像大姐姐一样鼓励你 |
| `strict` | 严厉的教官——不许偷懒 |

每个选项的实际 Prompt 文本都在
[`config/character.ts`](config/example/character.ts) 中，因此你可以重写角色
（语言、语气、整个人设）而无需改动代码。

## 🎨 自定义立绘

模板配置已内置原作者的立绘链接，因此应用可以开箱即用。准备好后换成你自己的——
编辑 [`config/character.ts`](config/example/character.ts) 中的 `sprites` 对象：

```typescript
sprites: {
  normal: '你的图片链接',   // 或本地路径 '/murasame_normal.png'（文件放在 public/ 里）
  happy: '你的图片链接',
  angry: '你的图片链接',
  // ...
},
```

## 🌍 多语言

界面提供 **英语、俄语和中文**。在 **设置 → 界面语言** 中切换；选择会保存在浏览器里。

角色*回复*所用的语言与界面语言是**分开的**。在
[`config/character.ts`](config/example/character.ts) 中把 `outputLanguage` 设为任意
语言——即使它不在界面语言里（例如 `'Español'`）。它会通过 `{{language}}` 占位符注入
到 Prompt 中。

## 🎚️ 采样参数

`config/api.ts` 有一个可选的 `samplers` 对象，会直接合并进 `/chat/completions`
请求体。这里可以填任何你的服务器支持的键——包括本地后端的非标准参数：

```typescript
samplers: {
  temperature: 0.75,
  top_k: 20,
  min_p: 0.03,
  repeat_penalty: 1.05,
  dry_multiplier: 0.6,
  // ...
},
```

对于云端 API（OpenAI、DeepSeek），只保留它们支持的字段，或整块删除。

## 🦦 关于这个 Fork

事情是这样的：我这个多动症的破脑子本来想搞清楚怎么复习考试，结果刷到了
`paper2galgame-open`。理所当然地，我没去复习，反而开始魔改这个*也许*能帮上复习忙的
玩意儿——拿它来代替真正的复习（我知道，理性到家了！）。

更讽刺的是，我压根不会 TypeScript——需要啥就 vibe coding 现写。谁知道呢，说不定
也能帮到别人。

## 🔧 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS
- **PDF 解析**: pdfjs-dist
- **AI API**: OpenAI 兼容接口

## 📝 许可证

MIT License

---

*Designed for Research & Fun* 🌸
