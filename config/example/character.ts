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
// systemPrompt supports two placeholders that the code substitutes:
//   {{personality}} — text from personalityInstructions (for the chosen personality)
//   {{detail}}      — text from detailInstructions (for the chosen depth)
// =============================================================================

export const characterConfig: CharacterConfig = {
  name: 'Murasame',

  // Emotion keys match the emotion field on dialogue lines — don't rename them.
  sprites: {
    normal: 'https://placehold.co/600x1200/FFC0CB/333?text=normal',
    happy: 'https://placehold.co/600x1200/FFC0CB/333?text=happy',
    angry: 'https://placehold.co/600x1200/FFC0CB/333?text=angry',
    surprised: 'https://placehold.co/600x1200/FFC0CB/333?text=surprised',
    shy: 'https://placehold.co/600x1200/FFC0CB/333?text=shy',
    proud: 'https://placehold.co/600x1200/FFC0CB/333?text=proud',
  },

  titleSprite: 'https://placehold.co/600x1200/FFC0CB/333?text=title',
  gameBackground: 'https://placehold.co/1920x1080/A8D8EA/333?text=background',

  // Describe the character here. {{personality}} and {{detail}} are filled in by the code.
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
