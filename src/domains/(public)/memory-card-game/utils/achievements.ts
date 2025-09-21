import type { Achievement, GameSettings, GameState } from '../types';
import { ACHIEVEMENTS } from '../types';

const ACHIEVEMENT_STORAGE_KEY = 'memory-game-achievements';

/**
 * Carrega conquistas salvas do localStorage
 */
export const loadAchievements = (): Achievement[] => {
  try {
    const saved = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    if (saved) {
      const savedAchievements = JSON.parse(saved);
      // Merge com conquistas padrão para garantir que novas conquistas sejam incluídas
      return ACHIEVEMENTS.map(achievement => {
        const saved = savedAchievements.find(
          (a: Achievement) => a.id === achievement.id,
        );
        return saved
          ? { ...achievement, ...saved }
          : { ...achievement, unlocked: false };
      });
    }
  } catch (error) {
    console.error('Erro ao carregar conquistas:', error);
  }

  return ACHIEVEMENTS.map(achievement => ({ ...achievement, unlocked: false }));
};

/**
 * Salva conquistas no localStorage
 */
export const saveAchievements = (achievements: Achievement[]): void => {
  try {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(achievements));
  } catch (error) {
    console.error('Erro ao salvar conquistas:', error);
  }
};

/**
 * Verifica e desbloqueia conquistas baseado no estado do jogo
 */
export const checkAchievements = (
  gameState: GameState,
  settings: GameSettings,
  achievements: Achievement[],
): Achievement[] => {
  const updatedAchievements = [...achievements];
  const now = Date.now();

  // Primeiro par
  if (
    gameState.matchedPairs >= 1 &&
    !updatedAchievements.find(a => a.id === 'first_match')?.unlocked
  ) {
    unlockAchievement(updatedAchievements, 'first_match', now);
  }

  // Sequência de 5
  if (
    gameState.streak >= 5 &&
    !updatedAchievements.find(a => a.id === 'streak_5')?.unlocked
  ) {
    unlockAchievement(updatedAchievements, 'streak_5', now);
  }

  // Sequência de 10
  if (
    gameState.streak >= 10 &&
    !updatedAchievements.find(a => a.id === 'streak_10')?.unlocked
  ) {
    unlockAchievement(updatedAchievements, 'streak_10', now);
  }

  // Demônio da Velocidade (completar em menos de 2 minutos)
  if (
    gameState.isGameComplete &&
    gameState.time < 120 &&
    !updatedAchievements.find(a => a.id === 'speed_demon')?.unlocked
  ) {
    unlockAchievement(updatedAchievements, 'speed_demon', now);
  }

  // Perfeccionista (completar sem erros - assumindo que movimentos = pares * 2 é perfeito)
  const totalPairs =
    settings.difficulty === 'easy'
      ? 15
      : settings.difficulty === 'medium'
        ? 25
        : 40;
  const perfectMoves = totalPairs * 2;
  if (
    gameState.isGameComplete &&
    gameState.moves === perfectMoves &&
    !updatedAchievements.find(a => a.id === 'perfectionist')?.unlocked
  ) {
    unlockAchievement(updatedAchievements, 'perfectionist', now);
  }

  return updatedAchievements;
};

/**
 * Desbloqueia uma conquista específica
 */
const unlockAchievement = (
  achievements: Achievement[],
  achievementId: string,
  timestamp: number,
): void => {
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.unlockedAt = timestamp;

    // Mostrar notificação (pode ser implementado com toast)
    console.log(`🏆 Conquista desbloqueada: ${achievement.name}!`);
  }
};

/**
 * Obtém estatísticas de conquistas
 */
export const getAchievementStats = (achievements: Achievement[]) => {
  const total = achievements.length;
  const unlocked = achievements.filter(a => a.unlocked).length;
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  return {
    total,
    unlocked,
    percentage,
    locked: total - unlocked,
  };
};
