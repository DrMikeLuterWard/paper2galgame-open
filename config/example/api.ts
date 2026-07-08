import { ApiConfig } from '../../types';

// =============================================================================
// API config TEMPLATE.
//
// How to use:
//   1. Copy this file to config/api.ts
//   2. Fill in your own values below.
//
// Works with any OpenAI-compatible API (DeepSeek, OpenAI, OpenRouter, a local
// LM Studio / Ollama / vLLM, etc.) — only baseUrl, apiKey and model change.
// =============================================================================

export const apiConfig: ApiConfig = {
  // Provider label (cosmetic, just a note to yourself).
  provider: 'deepseek',

  // Base server URL up to and including /v1. The code appends /chat/completions.
  // Examples:
  //   DeepSeek:  https://api.deepseek.com/v1
  //   OpenAI:    https://api.openai.com/v1
  //   Local:     http://localhost:1234/v1
  baseUrl: 'https://api.deepseek.com/v1',

  // API key. For local servers any non-empty string usually works.
  apiKey: 'YOUR_API_KEY_HERE',

  // Model name, e.g. deepseek-chat, gpt-4o, ...
  model: 'deepseek-chat',

  // Extra sampler parameters. These are merged straight into the request body,
  // so you can put any keys your server understands here — including
  // non-standard ones (min_p, dry_*, ...). For cloud APIs (OpenAI, DeepSeek),
  // keep only the fields they support or delete this block entirely.
  samplers: {
    temperature: 0.75,
    top_k: 20,
    min_p: 0.03,
    repeat_penalty: 1.05,
    dry_multiplier: 0.6,
    dry_base: 1.75,
    dry_allowed_length: 3,
    dry_sequence_breakers: ['\n', ':', '"', '*'],
    logprobs: true,
    top_logprobs: 20,
  },
};
