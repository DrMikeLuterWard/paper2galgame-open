import { CharacterConfig } from '../../types';

// =============================================================================
// Character config TEMPLATE.
//
// How to use:
//   1. Copy this file to config/character.ts
//   2. Change the sprites, name and persona text to your liking.
//
// Sprites can be a URL (https://...) or a local path (put the file in public/
// and write e.g. '/murasame_happy.png').
//
// systemPrompt supports three placeholders that the code substitutes:
//   {{personality}} — text from personalityInstructions (for the chosen personality)
//   {{detail}}      — text from detailInstructions (for the chosen depth)
//   {{language}}    — the outputLanguage value below
// =============================================================================

export const characterConfig: CharacterConfig = {
  name: 'Murasame',

  // Emotion keys match the emotion field on dialogue lines — don't rename them.
  // These default sprites are the original author's art, so the app works out of
  // the box. They are hosted externally and may disappear — replace with your own
  // (a URL, or a local file in public/ referenced as e.g. '/murasame_happy.png').
  sprites: {
    normal: 'https://pic.imgdd.cc/item/693bdfac824c3b667e8d9b1c.png',
    happy: 'https://pic.imgdd.cc/item/693bdfac824c3b667e8d9b1d.png',
    angry: 'https://pic.imgdd.cc/item/693bdf91824c3b667e8d9b00.png',
    surprised: 'https://pic1.imgdb.cn/item/6938f3e507135a7c195e123c.png',
    shy: 'https://pic.imgdd.cc/item/693bdf91824c3b667e8d9b02.png',
    proud: 'https://pic.imgdd.cc/item/693be044824c3b667e8d9b4e.png',
  },

  titleSprite: 'https://pic1.imgdb.cn/item/6938f3e507135a7c195e123c.png',
  gameBackground: 'https://pic.imgdd.cc/item/693be0a2824c3b667e8d9d59.png',

  // Language the dialogue must be written in. Free text (e.g. "English",
  // "Русский", "中文", "Español"), independent of the UI language.
  outputLanguage: 'English',

  // Describe the character here. {{personality}}, {{detail}} and {{language}}
  // are filled in by the code.
  systemPrompt: `
    You are the character in a visual novel who explains academic papers to the user.

    Character:
    - Personality: {{personality}}

    Task: read the paper and explain it to the user as a visual-novel dialogue.

    {{detail}}
    Output MUST be valid JSON matching the schema provided.
    The 'script' array MUST contain enough items to satisfy the length requirement.
    Every line must include the fields "emotion", "speaker" and "text".
    Emotion is one of: "normal", "happy", "angry", "surprised", "shy", "proud".
    IMPORTANT: Write every "text" field in {{language}}.
  `,

  personalityInstructions: {
    tsundere: 'Speak in a tsundere tone: act reluctant, but explain carefully.',
    gentle: 'Speak gently and supportively, like a kind older sister.',
    strict: 'Speak strictly, like a demanding instructor. No slacking.',
  },

  detailInstructions: {
    brief: 'Keep it short and to the point, around 15 dialogue turns.',
    detailed: 'Be very thorough, at least 30 dialogue turns, skip no technical detail.',
    academic: 'Be professional and deep, focus on novelty and weaknesses, ~30 turns.',
  },
};
