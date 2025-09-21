import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { soundController } from '../../../../core/controllers/sound.controller';
import type { Card, GameSettings, GameState, Player } from '../types';
import { DIFFICULTY_LEVELS } from '../types';
import {
  checkAchievements,
  loadAchievements,
  saveAchievements,
} from '../utils/achievements';
import {
  generateDefaultPlayerNames,
  validatePlayerNames,
} from '../utils/playerValidation';
import {
  calculateScore,
  calculateTimeRemaining,
  isTimeUp,
} from '../utils/scoring';

interface GameStore
  extends GameSettings,
    Omit<GameState, 'cards' | 'flippedCards' | 'isLoading'> {
  // Game state
  cards: Card[];
  flippedCards: string[];
  isLoading: boolean;
  showingMatch: boolean; // Estado para controlar animação de match

  // Timer
  timer: NodeJS.Timeout | null;
  playerTimer: NodeJS.Timeout | null;

  // Actions
  setDifficulty: (difficulty: GameSettings['difficulty']) => void;
  setTheme: (theme: string) => void;
  setGameMode: (gameMode: GameSettings['gameMode']) => void;
  setTimerDuration: (duration: number) => void;
  setPlayerNames: (names: string[]) => void;
  setCards: (cards: Card[]) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  updateTime: () => void;
  setGameComplete: (complete: boolean) => void;
  setLoading: (loading: boolean) => void;
  clearTimer: () => void;

  // New actions
  nextPlayer: () => void;
  getCurrentPlayer: () => Player | null;
  getWinner: () => Player | null;
  isMultiplayerTurnComplete: () => boolean;
  checkAchievements: () => void;
  unlockAchievement: (achievementId: string) => void;
  calculateScore: () => number;
  canStartGame: () => boolean;
  validatePlayerNames: () => { isValid: boolean; errors: string[] };

  // Player timer actions
  startPlayerTimer: () => void;
  updatePlayerTimer: () => void;
  stopPlayerTimer: () => void;

  // Match animation actions
  setShowingMatch: (showing: boolean) => void;
}

// Função para gerar URLs do DiceBear baseadas no tema e identificador
const generateDiceBearUrl = (theme: string, identifier: string): string => {
  const baseUrl = 'https://api.dicebear.com/7.x';

  if (theme === 'numbers') {
    return identifier;
  }

  return `${baseUrl}/${theme}/svg?seed=${encodeURIComponent(identifier)}`;
};

// Função para gerar identificadores únicos para cada par
const generateIdentifiers = (pairs: number, theme: string): string[] => {
  const identifiers: string[] = [];

  if (theme === 'numbers') {
    for (let i = 1; i <= pairs; i++) {
      identifiers.push(i.toString());
    }
  } else {
    const words = [
      'apple',
      'banana',
      'cherry',
      'date',
      'elderberry',
      'fig',
      'grape',
      'honeydew',
      'kiwi',
      'lemon',
      'mango',
      'nectarine',
      'orange',
      'papaya',
      'quince',
      'raspberry',
      'strawberry',
      'tangerine',
      'ugli',
      'vanilla',
      'watermelon',
      'xigua',
      'yellow',
      'zucchini',
      'apricot',
      'blackberry',
      'cantaloupe',
      'dragonfruit',
      'elderberry',
      'feijoa',
      'gooseberry',
      'huckleberry',
      'icecream',
      'jujube',
      'kumquat',
      'lychee',
      'mulberry',
      'nashi',
      'olive',
      'peach',
      'quince',
      'rambutan',
      'soursop',
      'tamarind',
    ];

    for (let i = 0; i < pairs; i++) {
      if (i < words.length) {
        identifiers.push(words[i]);
      } else {
        const word1 = words[i % words.length];
        const word2 = words[Math.floor(i / words.length) % words.length];
        identifiers.push(`${word1}-${word2}`);
      }
    }
  }

  return identifiers;
};

// Função otimizada para criar cartas
const createCards = (
  theme: string,
  difficulty: GameSettings['difficulty'],
): Card[] => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty];
  const identifiers = generateIdentifiers(difficultyConfig.pairs, theme);

  const pairsArray = identifiers.flatMap(identifier => {
    const emoji = generateDiceBearUrl(theme, identifier);
    return [
      { id: `${identifier}-1`, emoji, isFlipped: false, isMatched: false },
      { id: `${identifier}-2`, emoji, isFlipped: false, isMatched: false },
    ];
  });

  // Embaralhar usando Fisher-Yates shuffle
  for (let i = pairsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
  }

  return pairsArray;
};

// Função para inicializar jogadores no modo multiplayer
const initializePlayers = (playerNames: string[]): Player[] => {
  return playerNames.map((name, index) => ({
    id: index,
    name,
    matchedPairs: 0,
    moves: 0,
    isActive: index === 0,
    isWinner: false,
  }));
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cards: createCards('avataaars', 'easy'),
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      time: 0,
      isGameComplete: false,
      isPlaying: false,
      isLoading: false,
      isTimeUp: false,
      streak: 0,
      maxStreak: 0,
      achievements: loadAchievements(),
      players: [],
      timeRemaining: undefined,
      playerTimeRemaining: undefined,
      playerTimerActive: false,
      showingMatch: false,

      // Timers
      timer: null,
      playerTimer: null,

      // Settings
      difficulty: 'easy',
      theme: 'avataaars',
      gameMode: 'classic',
      timerDuration: 180,
      playerNames: [],
      currentPlayer: 0,
      arePlayerNamesValid: false,

      // Actions
      setDifficulty: (difficulty: GameSettings['difficulty']) => {
        set({ difficulty, isLoading: true });

        setTimeout(() => {
          const newCards = createCards(get().theme, difficulty);
          set({
            cards: newCards,
            flippedCards: [],
            matchedPairs: 0,
            moves: 0,
            time: 0,
            isGameComplete: false,
            isPlaying: false,
            isLoading: false,
            isTimeUp: false,
            streak: 0,
            maxStreak: 0,
          });
        }, 500);
      },

      setTheme: (theme: string) => {
        set({ theme, isLoading: true });

        setTimeout(() => {
          const newCards = createCards(theme, get().difficulty);
          set({
            cards: newCards,
            flippedCards: [],
            matchedPairs: 0,
            moves: 0,
            time: 0,
            isGameComplete: false,
            isPlaying: false,
            isLoading: false,
            isTimeUp: false,
            streak: 0,
            maxStreak: 0,
          });
        }, 500);
      },

      setGameMode: (gameMode: GameSettings['gameMode']) => {
        // Resetar o jogo quando mudar de modo para evitar bugs de estado
        const currentState = get();

        // Resetar estado do jogo
        set({
          gameMode,
          // Resetar estado do jogo
          isGameComplete: false,
          isPlaying: false,
          isLoading: false,
          isTimeUp: false,
          moves: 0,
          time: 0,
          matchedPairs: 0,
          flippedCards: [],
          streak: 0,
          maxStreak: 0,
          players: undefined,
          timeRemaining: undefined,
          // Manter configurações que não devem ser resetadas
          difficulty: currentState.difficulty,
          theme: currentState.theme,
          timerDuration: currentState.timerDuration,
        });

        // Configurar modo específico
        if (gameMode === 'multiplayer') {
          // Sempre resetar para nomes padrão quando muda para multiplayer
          const defaultNames = generateDefaultPlayerNames(2);
          set({
            playerNames: defaultNames,
            arePlayerNamesValid: false, // Nomes padrão não são considerados válidos
          });
        } else {
          // Para modos single-player, limpar configurações de multiplayer
          set({
            players: undefined,
            playerNames: undefined,
            arePlayerNamesValid: undefined,
          });
        }

        // Regenerar cartas para o novo modo
        set({ isLoading: true });
        setTimeout(() => {
          const newCards = createCards(
            currentState.theme,
            currentState.difficulty as 'easy' | 'medium' | 'hard',
          );
          set({
            cards: newCards,
            isLoading: false,
          });
        }, 500);
      },

      setTimerDuration: (duration: number) => {
        set({ timerDuration: duration });
      },

      setPlayerNames: (names: string[]) => {
        // Validar nomes dos jogadores
        const validation = validatePlayerNames(names);

        set({
          playerNames: names,
          arePlayerNamesValid: validation.isValid,
        });

        if (get().gameMode === 'multiplayer' && validation.isValid) {
          set({ players: initializePlayers(validation.validNames) });
        }
      },

      setCards: (cards: Card[]) => set({ cards }),

      flipCard: (cardId: string) => {
        const state = get();
        const card = state.cards.find(c => c.id === cardId);

        if (
          state.flippedCards.includes(cardId) ||
          card?.isMatched ||
          state.flippedCards.length >= 2
        ) {
          return;
        }

        // Verificar se o tempo acabou no modo timer
        if (state.gameMode === 'timer' && state.isTimeUp) {
          return;
        }

        // No multiplayer, verificar se é a vez do jogador atual
        if (state.gameMode === 'multiplayer' && state.players) {
          const currentPlayer = state.players.find(p => p.isActive);
          if (!currentPlayer) return;

          // Verificar se o turno já está completo (2 cartas viradas)
          if (state.flippedCards.length >= 2) {
            return;
          }
        }

        if (!state.isPlaying) {
          const newCards = state.cards.map(card =>
            card.id === cardId ? { ...card, isFlipped: true } : card,
          );

          // Tocar som de início do jogo
          soundController.play('GAME_START');

          set({
            cards: newCards,
            flippedCards: [cardId],
            isPlaying: true,
          });

          // Iniciar timer do jogador se for multiplayer
          if (
            state.gameMode === 'multiplayer' &&
            state.players &&
            state.players.length > 0
          ) {
            setTimeout(() => {
              get().startPlayerTimer();
            }, 100);
          }
          return;
        }

        const newFlippedCards = [...state.flippedCards, cardId];
        const newCards = state.cards.map(card =>
          card.id === cardId ? { ...card, isFlipped: true } : card,
        );

        // Tocar som de virada de carta
        soundController.play('CARD_FLIP');

        // Atualizar o estado imediatamente para mostrar o segundo card virado
        set({
          cards: newCards,
          flippedCards: newFlippedCards,
        });

        if (newFlippedCards.length === 2) {
          const [firstId, secondId] = newFlippedCards;
          const firstCard = newCards.find(card => card.id === firstId);
          const secondCard = newCards.find(card => card.id === secondId);

          const firstIdentifier = firstCard?.id.split('-')[0];
          const secondIdentifier = secondCard?.id.split('-')[0];
          const newMoves = state.moves + 1;

          if (firstIdentifier === secondIdentifier) {
            // Par encontrado!
            soundController.play('CARD_MATCH');

            // Primeiro, mostrar a animação de match
            set({
              showingMatch: true,
              flippedCards: newFlippedCards, // Manter as cartas viradas para mostrar o match
            });

            // Depois de 1.5 segundos, processar o match e remover as cartas
            setTimeout(() => {
              const currentState = get();
              const updatedCards = currentState.cards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isMatched: true }
                  : card,
              );

              const newMatchedPairs = currentState.matchedPairs + 1;
              const newStreak = currentState.streak + 1;
              const newMaxStreak = Math.max(currentState.maxStreak, newStreak);

              const difficultyConfig =
                DIFFICULTY_LEVELS[currentState.difficulty];
              const isGameComplete = newMatchedPairs === difficultyConfig.pairs;

              // Verificar se é modo timer e tempo acabou
              const timeUp =
                currentState.gameMode === 'timer' &&
                currentState.timeRemaining !== undefined &&
                isTimeUp(currentState.timeRemaining);

              // Atualizar jogador atual no multiplayer
              let updatedPlayers = currentState.players;
              if (
                currentState.gameMode === 'multiplayer' &&
                currentState.players
              ) {
                updatedPlayers = currentState.players.map(player => {
                  if (player.isActive) {
                    return {
                      ...player,
                      matchedPairs: player.matchedPairs + 1,
                      moves: player.moves + 1,
                    };
                  }
                  return player;
                });
              }

              // Marcar vencedor no multiplayer quando o jogo termina
              let finalPlayers = updatedPlayers;
              if (
                isGameComplete &&
                currentState.gameMode === 'multiplayer' &&
                updatedPlayers
              ) {
                const winner = updatedPlayers.reduce((prev, current) =>
                  current.matchedPairs > prev.matchedPairs ? current : prev,
                );
                finalPlayers = updatedPlayers.map(player => ({
                  ...player,
                  isWinner: player.id === winner.id,
                }));
              }

              set({
                cards: updatedCards,
                flippedCards: [],
                matchedPairs: newMatchedPairs,
                moves: newMoves,
                streak: newStreak,
                maxStreak: newMaxStreak,
                isGameComplete: isGameComplete,
                isPlaying: !isGameComplete && !timeUp,
                players: finalPlayers,
                showingMatch: false, // Finalizar animação
              });

              // Parar timer do jogador no multiplayer quando um par é encontrado
              if (currentState.gameMode === 'multiplayer') {
                get().stopPlayerTimer();
              }

              // Verificar conquistas
              get().checkAchievements();

              // Tocar som de jogo completo
              if (isGameComplete) {
                soundController.play('GAME_COMPLETE');
              }
            }, 1500); // 1.5 segundos de animação
          } else {
            // Par não encontrado - tocar som de erro
            soundController.play('CARD_MISMATCH');

            // Par não encontrado - passar a vez no multiplayer
            if (state.gameMode === 'multiplayer' && state.players) {
              // Atualizar movimentos do jogador atual
              const updatedPlayers = state.players.map(player => {
                if (player.isActive) {
                  return {
                    ...player,
                    moves: player.moves + 1,
                  };
                }
                return player;
              });

              // Passar para o próximo jogador
              const currentIndex = state.currentPlayer || 0;
              const nextIndex = (currentIndex + 1) % state.players.length;
              const playersWithNextActive = updatedPlayers.map(
                (player, index) => ({
                  ...player,
                  isActive: index === nextIndex,
                }),
              );

              setTimeout(() => {
                set(state => ({
                  cards: state.cards.map(card =>
                    card.id === firstId || card.id === secondId
                      ? { ...card, isFlipped: false }
                      : card,
                  ),
                  flippedCards: [],
                  streak: 0, // Reset streak on miss
                  players: playersWithNextActive,
                  currentPlayer: nextIndex,
                }));
              }, 1000);

              set({
                cards: newCards,
                flippedCards: newFlippedCards,
                moves: newMoves,
                streak: 0,
                players: playersWithNextActive,
                currentPlayer: nextIndex,
              });
            } else {
              // Modo single player - comportamento normal
              setTimeout(() => {
                set(state => ({
                  cards: state.cards.map(card =>
                    card.id === firstId || card.id === secondId
                      ? { ...card, isFlipped: false }
                      : card,
                  ),
                  flippedCards: [],
                  streak: 0, // Reset streak on miss
                }));
              }, 1000);

              set({
                cards: newCards,
                flippedCards: newFlippedCards,
                moves: newMoves,
                streak: 0,
              });
            }
          }
        } else {
          set({
            cards: newCards,
            flippedCards: newFlippedCards,
          });
        }
      },

      resetGame: () => {
        const state = get();
        const newCards = createCards(state.theme, state.difficulty);

        // Reinicializar jogadores se for multiplayer
        const players =
          state.gameMode === 'multiplayer' &&
          state.playerNames &&
          state.playerNames.length > 0
            ? initializePlayers(state.playerNames)
            : [];

        set({
          cards: newCards,
          flippedCards: [],
          matchedPairs: 0,
          moves: 0,
          time: 0,
          isGameComplete: false,
          isPlaying: false,
          isTimeUp: false,
          streak: 0,
          maxStreak: 0,
          players,
          timeRemaining:
            state.gameMode === 'timer' ? state.timerDuration : undefined,
        });
      },

      startGame: () => {
        const state = get();
        const newCards = createCards(state.theme, state.difficulty);

        const players =
          state.gameMode === 'multiplayer' &&
          state.playerNames &&
          state.playerNames.length > 0
            ? initializePlayers(state.playerNames)
            : [];

        set({
          cards: newCards,
          flippedCards: [],
          matchedPairs: 0,
          moves: 0,
          time: 0,
          isGameComplete: false,
          isPlaying: true,
          isTimeUp: false,
          streak: 0,
          maxStreak: 0,
          players,
          timeRemaining:
            state.gameMode === 'timer' ? state.timerDuration : undefined,
          playerTimeRemaining: undefined,
          playerTimerActive: false,
        });

        // Iniciar timer do jogador se for multiplayer
        if (state.gameMode === 'multiplayer' && players.length > 0) {
          setTimeout(() => {
            get().startPlayerTimer();
          }, 100);
        }
      },

      pauseGame: () => set({ isPlaying: false }),

      updateTime: () => {
        const state = get();
        if (!state.isPlaying || state.isGameComplete) return;

        const newTime = state.time + 1;

        if (state.gameMode === 'timer' && state.timerDuration) {
          const timeRemaining = calculateTimeRemaining(
            state.timerDuration,
            newTime,
          );

          set({
            time: newTime,
            timeRemaining,
          });

          // Verificar se o tempo acabou no modo timer
          if (isTimeUp(timeRemaining)) {
            set({ isPlaying: false, isTimeUp: true });
          }
        } else {
          set({ time: newTime });
        }
      },

      setGameComplete: (complete: boolean) => set({ isGameComplete: complete }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      clearTimer: () => {
        const state = get();
        if (state.timer) {
          clearInterval(state.timer);
          set({ timer: null });
        }
      },

      // New actions
      nextPlayer: () => {
        const state = get();
        if (state.gameMode === 'multiplayer' && state.players) {
          const currentIndex = state.currentPlayer || 0;
          const nextIndex = (currentIndex + 1) % state.players.length;

          const updatedPlayers = state.players.map((player, index) => ({
            ...player,
            isActive: index === nextIndex,
          }));

          set({
            players: updatedPlayers,
            currentPlayer: nextIndex,
            flippedCards: [], // Reset flipped cards for next player
          });

          // Iniciar timer para o próximo jogador
          setTimeout(() => {
            get().startPlayerTimer();
          }, 100);
        }
      },

      getCurrentPlayer: () => {
        const state = get();
        if (state.gameMode === 'multiplayer' && state.players) {
          return state.players.find(p => p.isActive) || null;
        }
        return null;
      },

      getWinner: () => {
        const state = get();
        if (state.gameMode === 'multiplayer' && state.players) {
          // Encontrar o jogador com mais pares
          const winner = state.players.reduce((prev, current) =>
            current.matchedPairs > prev.matchedPairs ? current : prev,
          );

          // Verificar se há empate
          const maxPairs = winner.matchedPairs;
          const winners = state.players.filter(
            p => p.matchedPairs === maxPairs,
          );

          if (winners.length === 1) {
            return { ...winner, isWinner: true };
          }

          // Em caso de empate, retornar null ou o primeiro
          return winners.length > 1 ? null : winner;
        }
        return null;
      },

      isMultiplayerTurnComplete: () => {
        const state = get();
        if (state.gameMode === 'multiplayer') {
          // Turno completo quando 2 cartas foram viradas
          return state.flippedCards.length === 2;
        }
        return false;
      },

      checkAchievements: () => {
        const state = get();
        const updatedAchievements = checkAchievements(
          state,
          state,
          state.achievements,
        );
        set({ achievements: updatedAchievements });
        saveAchievements(updatedAchievements);
      },

      unlockAchievement: (achievementId: string) => {
        const state = get();
        const updatedAchievements = state.achievements.map(achievement => {
          if (achievement.id === achievementId && !achievement.unlocked) {
            return {
              ...achievement,
              unlocked: true,
              unlockedAt: Date.now(),
            };
          }
          return achievement;
        });
        set({ achievements: updatedAchievements });
        saveAchievements(updatedAchievements);
      },

      calculateScore: () => {
        const state = get();
        const scoreData = calculateScore(
          state.moves,
          state.time,
          state.difficulty,
          state.streak,
          state.maxStreak,
          state.gameMode,
        );
        return scoreData.finalScore;
      },

      canStartGame: () => {
        const state = get();

        // Para modos single player, sempre pode começar
        if (state.gameMode !== 'multiplayer') {
          return true;
        }

        // Para multiplayer, verificar se os nomes são válidos
        return state.arePlayerNamesValid || false;
      },

      validatePlayerNames: () => {
        const state = get();
        if (state.gameMode === 'multiplayer' && state.playerNames) {
          return validatePlayerNames(state.playerNames);
        }
        return { isValid: true, errors: [] };
      },

      // Player timer actions
      startPlayerTimer: () => {
        const state = get();
        if (
          state.gameMode === 'multiplayer' &&
          state.players &&
          state.players.length > 0 &&
          !state.playerTimerActive
        ) {
          // Limpar timer anterior se existir
          if (state.playerTimer) {
            clearInterval(state.playerTimer);
          }

          set({
            playerTimeRemaining: 10, // 10 segundos por jogador
            playerTimerActive: true,
          });

          // Iniciar novo timer
          const timer = setInterval(() => {
            get().updatePlayerTimer();
          }, 1000);

          set({ playerTimer: timer });
        }
      },

      updatePlayerTimer: () => {
        const state = get();

        if (
          state.gameMode === 'multiplayer' &&
          state.playerTimerActive &&
          state.playerTimeRemaining !== undefined
        ) {
          const newTime = state.playerTimeRemaining - 1;

          if (newTime <= 0) {
            // Tempo acabou, passar para o próximo jogador
            set({
              playerTimeRemaining: undefined,
              playerTimerActive: false,
            });

            // Passar para o próximo jogador
            const currentIndex = state.currentPlayer || 0;
            const nextIndex = (currentIndex + 1) % (state.players?.length || 1);
            const updatedPlayers =
              state.players?.map((player, index) => ({
                ...player,
                isActive: index === nextIndex,
              })) || [];

            set({
              players: updatedPlayers,
              currentPlayer: nextIndex,
              flippedCards: [], // Limpar cartas viradas
              cards: state.cards.map(card => ({
                ...card,
                isFlipped: false, // Resetar estado de virada das cartas
              })),
            });

            // Reiniciar timer para o próximo jogador
            setTimeout(() => {
              get().startPlayerTimer();
            }, 100);
          } else {
            set({ playerTimeRemaining: newTime });
          }
        }
      },

      stopPlayerTimer: () => {
        const state = get();
        if (state.playerTimer) {
          clearInterval(state.playerTimer);
        }
        set({
          playerTimeRemaining: undefined,
          playerTimerActive: false,
          playerTimer: null,
        });
      },

      // Match animation actions
      setShowingMatch: (showing: boolean) => set({ showingMatch: showing }),
    }),
    {
      name: 'memory-game-storage',
      partialize: state => ({
        difficulty: state.difficulty,
        theme: state.theme,
        gameMode: state.gameMode,
        timerDuration: state.timerDuration,
        playerNames: state.playerNames,
        achievements: state.achievements,
      }),
    },
  ),
);
