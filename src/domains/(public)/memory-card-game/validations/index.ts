import { z } from 'zod';

// Game settings validation
export const GameSettingsSchema = z.object({
  difficulty: z.enum(['easy', 'medium', 'hard']),
  theme: z.string().min(1, 'Tema é obrigatório'),
});

// Card validation
export const CardSchema = z.object({
  id: z.string().min(1, 'ID da carta é obrigatório'),
  emoji: z.string().min(1, 'Emoji é obrigatório'),
  isFlipped: z.boolean(),
  isMatched: z.boolean(),
});

// Game state validation
export const GameStateSchema = z.object({
  cards: z.array(CardSchema),
  flippedCards: z.array(z.string()),
  matchedPairs: z.number().min(0),
  moves: z.number().min(0),
  time: z.number().min(0),
  isGameComplete: z.boolean(),
  isPlaying: z.boolean(),
  isLoading: z.boolean(),
});

// Leaderboard entry validation
export const LeaderboardEntrySchema = z.object({
  id: z.number().positive(),
  score: z.number().min(0),
  moves: z.number().min(0),
  timestamp: z.number().positive(),
});

// Validation functions
export const validateGameSettings = (data: unknown) => {
  return GameSettingsSchema.parse(data);
};

export const validateGameState = (data: unknown) => {
  return GameStateSchema.parse(data);
};

export const validateLeaderboardEntry = (data: unknown) => {
  return LeaderboardEntrySchema.parse(data);
};

// Type inference from schemas
export type GameSettingsInput = z.input<typeof GameSettingsSchema>;
export type GameStateInput = z.input<typeof GameStateSchema>;
export type LeaderboardEntryInput = z.input<typeof LeaderboardEntrySchema>;
