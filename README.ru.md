# Paper2Galgame 📚✨

> Превращай научные статьи в атмосферу визуальной новеллы, где их тебе объясняет дух-хранитель **Мурасамэ**!

![OpenAI-compatible](https://img.shields.io/badge/API-OpenAI--compatible-412991)
![React](https://img.shields.io/badge/React-19.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)

[English](README.md) · **Русский** · [中文](README.zh.md)

## 📖 О проекте

Paper2Galgame — веб-приложение, которое с помощью LLM превращает сухую научную
статью в диалог в стиле визуальной новеллы. Персонаж (по умолчанию дух-хранитель
«Мурасамэ») шаг за шагом разбирает статью — в тоне цундэрэ, ласковом или строгом,
на твой выбор.

### ✨ Возможности

- 📄 **Разбор PDF** — автоматически извлекает текст статьи
- 🤖 **На базе ИИ** — работает с любым OpenAI-совместимым API (DeepSeek, OpenAI, OpenRouter, локальные LM Studio / Ollama / llama.cpp, ...)
- 🎭 **Разные характеры** — цундэрэ / ласковый / строгий стили объяснения
- 📊 **Настраиваемая глубина** — кратко / подробно / академично
- 💬 **Полный опыт VN** — эффект печатной машинки, автопрокрутка, история диалога
- 🎨 **Аккуратный UI** — динамические спрайты со сменой эмоций
- 🌍 **Локализация** — интерфейс на English / Русский / 中文, язык ответов настраивается отдельно
- ⚙️ **Конфиг, а не хардкод** — ключи API, семплеры и персонаж лежат в `config/` и не попадают в git

## 🚀 Быстрый старт

### Требования

- Node.js >= 18
- npm (или pnpm)

### Установка

```bash
git clone <repository-url>
cd paper2galgame
npm install
```

### Настройка

Все настройки лежат в папке `config/`, которая **в .gitignore**. При первом запуске
скопируй шаблоны из `config/example/` и заполни их:

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

Затем отредактируй:

| Файл | Что настраивает |
|------|-----------------|
| [`config/api.ts`](config/example/api.ts) | Провайдер, адрес сервера, ключ API, модель и опциональные семплеры |
| [`config/character.ts`](config/example/character.ts) | Имя, спрайты эмоций, титульный спрайт, фон и промпт персонажа |

> Приложение не запустится, пока не созданы `config/api.ts` и `config/character.ts` —
> это нормально, просто скопируй шаблоны, как показано выше.
> Подробнее — в [`config/example/README.md`](config/example/README.md).

### Запуск

```bash
npm run dev       # dev-сервер
npm run build     # production-сборка
npm run preview   # предпросмотр production-сборки
```

Затем открой `http://localhost:3000`.

## 📁 Структура проекта

```
paper2galgame/
├── index.html            # HTML-точка входа
├── index.tsx             # Точка входа React
├── App.tsx               # Корневой компонент
├── types.ts              # Типы TypeScript (включая типы конфига)
├── components/
│   ├── TitleScreen.tsx     # Титульный экран
│   ├── UploadScreen.tsx    # Экран загрузки
│   ├── GameScreen.tsx      # Основной игровой экран
│   └── SettingsScreen.tsx  # Экран настроек
├── services/
│   └── llmService.ts       # Слой обращения к LLM API
├── i18n/                 # Переводы UI (en / ru / zh) + контекст языка
└── config/               # Локальные настройки (в .gitignore)
    └── example/            # Шаблоны, коммитятся в git
```

## ⚙️ Опции

### Глубина разбора ([`GameSettings.detailLevel`](types.ts))

| Опция | Описание | Реплик |
|-------|----------|--------|
| `brief` | Быстрое резюме | ~15 |
| `detailed` | Глубокий разбор | ~30 |
| `academic` | Научный анализ | ~30 |

### Характер ([`GameSettings.personality`](types.ts))

| Опция | Описание |
|-------|----------|
| `tsundere` | Ворчит снаружи, заботливо объясняет внутри |
| `gentle` | Поддерживает, как старшая сестра |
| `strict` | Требовательный препод — никаких поблажек |

Тексты промпта для каждой опции лежат в
[`config/character.ts`](config/example/character.ts), так что персонажа (язык, тон,
весь характер) можно переписать, не трогая код.

## 🎨 Свои спрайты

Шаблон конфига уже содержит ссылки на спрайты оригинального автора, поэтому
приложение работает «из коробки». Замени их своими, когда будешь готов — правь
объект `sprites` в [`config/character.ts`](config/example/character.ts):

```typescript
sprites: {
  normal: 'ссылка-на-картинку',   // или локальный путь '/murasame_normal.png' (файл в public/)
  happy: 'ссылка-на-картинку',
  angry: 'ссылка-на-картинку',
  // ...
},
```

## 🌍 Локализация

Интерфейс доступен на **английском, русском и китайском**. Переключается в
**Настройки → Язык интерфейса**; выбор сохраняется в браузере.

Язык, на котором персонаж *отвечает*, **отделён** от языка интерфейса. Впиши в
`outputLanguage` в [`config/character.ts`](config/example/character.ts) любой язык —
даже которого нет среди языков UI (например, `'Español'`). Он подставляется в
промпт через плейсхолдер `{{language}}`.

## 🎚️ Параметры семплинга

В `config/api.ts` есть опциональный объект `samplers`, который подмешивается прямо
в тело запроса `/chat/completions`. Впиши сюда любые ключи, которые понимает твой
сервер — включая нестандартные для локальных бэкендов:

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

Для облачных API (OpenAI, DeepSeek) оставь только поддерживаемые ими поля или
удали блок целиком.

## 🦦 Об этом форке

В общем, моя СДВГ-шная жопа пыталась найти способ подготовиться к экзаменам, я нашёл `paper2galgame-open` и решил допилить штуку, которая *может быть* поможет с подготовкой вместо самой подготовки (да, очень рационально!).

Ещё более иронично то, что я вообще не знаю TypeScript — поэтому я решил просто навайбкодить всё,
чего мне не хватает. Может, кому-то ещё это пригодится

## 🔧 Технологии

- **Фреймворк**: React 19 + TypeScript
- **Сборщик**: Vite 6
- **Стили**: Tailwind CSS
- **Разбор PDF**: pdfjs-dist
- **AI API**: OpenAI-совместимые эндпоинты

## 📝 Лицензия

MIT License

---

*Designed for Research & Fun* 🌸
