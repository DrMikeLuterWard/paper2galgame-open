export interface DialogueLine {
  speaker: string;
  text: string;
  emotion: 'normal' | 'happy' | 'angry' | 'surprised' | 'shy' | 'proud';
  note?: string; // For technical terms explanation
}

export interface PaperAnalysisResponse {
  title: string;
  script: DialogueLine[];
}

export interface GameSettings {
  detailLevel: 'brief' | 'detailed' | 'academic';
  personality: 'tsundere' | 'gentle' | 'strict';
}

export enum GameState {
  IDLE,
  PROCESSING,
  PLAYING,
  PAUSED,
}

// =============================================================================
// CONFIG TYPES
// Shape of the files in config/. The actual values live in config/*.ts
// (working copies, git-ignored) and config/example/*.ts (templates, committed).
// =============================================================================

/** Connection settings for the API (any OpenAI-compatible endpoint). */
export interface ApiConfig {
  /** Provider label — cosmetic only (deepseek / openai / local / ...). */
  provider: string;
  /** Base server URL up to and including /v1, e.g. http://localhost:1234/v1 */
  baseUrl: string;
  /** API key (Bearer token). For local servers any non-empty string usually works. */
  apiKey: string;
  /** Model name, e.g. deepseek-chat, gpt-4o. */
  model: string;
  /**
   * Extra sampler parameters, merged straight into the /chat/completions
   * request body. Any keys your server understands (temperature, top_k,
   * min_p, dry_multiplier, logprobs, ...). Optional — omit for cloud APIs.
   */
  samplers?: Record<string, unknown>;
}

/** All character settings: appearance and persona text. */
export interface CharacterConfig {
  /** Character name (used as sprite alt text and as a fallback speaker). */
  name: string;
  /** Sprites per emotion. Keys must match DialogueLine['emotion']. */
  sprites: Record<DialogueLine['emotion'], string>;
  /** Decorative sprite on the title screen. */
  titleSprite: string;
  /** Background image of the game screen. */
  gameBackground: string;
  /**
   * Persona system prompt. Supports placeholders:
   *   {{personality}} — replaced with text from personalityInstructions
   *   {{detail}}      — replaced with text from detailInstructions
   */
  systemPrompt: string;
  /** Persona variants for GameSettings.personality. */
  personalityInstructions: Record<GameSettings['personality'], string>;
  /** Depth variants for GameSettings.detailLevel. */
  detailInstructions: Record<GameSettings['detailLevel'], string>;
}
