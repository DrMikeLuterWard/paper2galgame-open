# Paper2Galgame 📚✨

> Turn academic papers into an immersive visual-novel experience, explained to you by the guardian spirit **Murasame**!

![OpenAI-compatible](https://img.shields.io/badge/API-OpenAI--compatible-412991)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)

## 📖 Overview

Paper2Galgame is a web app that uses an LLM to turn a dry research paper into a
visual-novel-style dialogue. A character (by default the guardian spirit
"Murasame") walks you through the paper step by step — tsundere, gentle or strict,
your call.

### ✨ Features

- 📄 **PDF parsing** — extracts the paper's text automatically
- 🤖 **AI-driven** — works with any OpenAI-compatible API (DeepSeek, OpenAI, OpenRouter, local LM Studio / Ollama / llama.cpp, ...)
- 🎭 **Multiple personalities** — tsundere / gentle / strict explanation styles
- 📊 **Adjustable depth** — brief / detailed / academic
- 💬 **Full VN experience** — typewriter effect, auto-play, dialogue history
- 🎨 **Polished UI** — dynamic sprites with emotion switching
- ⚙️ **Config, not hardcode** — API keys, samplers and character are all in `config/`, kept out of git

## 🚀 Quick start

### Requirements

- Node.js >= 18
- npm (or pnpm)

### Install

```bash
git clone <repository-url>
cd paper2galgame
npm install
```

### Configure

All settings live in the `config/` folder, which is **git-ignored**. On first run,
copy the templates from `config/example/` and fill them in:

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

Then edit:

| File | What it configures |
|------|--------------------|
| [`config/api.ts`](config/example/api.ts) | Provider, server URL, API key, model, and optional sampler params |
| [`config/character.ts`](config/example/character.ts) | Name, emotion sprites, title sprite, background, and the persona prompt |

> The app won't start until `config/api.ts` and `config/character.ts` exist —
> that's expected, just copy the templates as shown above.
> See [`config/example/README.md`](config/example/README.md) for details.

### Run

```bash
npm run dev       # dev server
npm run build     # production build
npm run preview   # preview the production build
```

Then open `http://localhost:3000`.

## 📁 Project structure

```
paper2galgame/
├── index.html            # HTML entry
├── index.tsx             # React entry
├── App.tsx               # Root component
├── types.ts              # TypeScript types (incl. config types)
├── components/
│   ├── TitleScreen.tsx     # Title screen
│   ├── UploadScreen.tsx    # Upload screen
│   ├── GameScreen.tsx      # Main game screen
│   └── SettingsScreen.tsx  # Settings screen
├── services/
│   └── llmService.ts       # LLM API service layer
└── config/               # Local settings (git-ignored)
    └── example/            # Templates, committed to git
```

## ⚙️ Options

### Analysis depth ([`GameSettings.detailLevel`](types.ts))

| Option | Description | Turns |
|--------|-------------|-------|
| `brief` | Quick summary | ~15 |
| `detailed` | Deep dive | ~30 |
| `academic` | Research-focused analysis | ~30 |

### Personality ([`GameSettings.personality`](types.ts))

| Option | Description |
|--------|-------------|
| `tsundere` | Reluctant on the outside, careful explainer underneath |
| `gentle` | Supportive, older-sister style |
| `strict` | Demanding instructor — no slacking |

The actual prompt text for each option lives in
[`config/character.ts`](config/example/character.ts), so you can rewrite the
persona (language, tone, whole character) without touching any code.

## 🎨 Custom sprites

Edit the `sprites` object in [`config/character.ts`](config/example/character.ts):

```typescript
sprites: {
  normal: 'your-image-url',   // or a local path like '/murasame_normal.png' (put the file in public/)
  happy: 'your-image-url',
  angry: 'your-image-url',
  // ...
},
```

## 🎚️ Sampler parameters

`config/api.ts` has an optional `samplers` object that is merged straight into the
`/chat/completions` request body. Put any keys your server understands here —
including non-standard ones for local backends:

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

For cloud APIs (OpenAI, DeepSeek), keep only the fields they support, or drop the
block entirely.

## 🔧 Tech stack

- **Framework**: React 19 + TypeScript
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS
- **PDF parsing**: pdfjs-dist
- **AI API**: OpenAI-compatible endpoints


## 🦦 About this fork

So, my ADHD ass was trying to figure out how to study for exams, and I stumbled across `paper2galgame-open`. Naturally, instead of actually studying, I ended up building out this thing that *might* help with studying (I know, peak rationality!). 

What’s even more ironic is that I don’t even know TypeScript — I just decided to vibe-code whatever I needed. Who knows, maybe someone else will find it useful too!

## 📝 License

MIT License

---

*Designed for Research & Fun* 🌸
