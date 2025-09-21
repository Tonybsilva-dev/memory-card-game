/**
 * Valida se os nomes dos jogadores são válidos para o modo multiplayer
 */
export const validatePlayerNames = (
  playerNames: string[],
): {
  isValid: boolean;
  errors: string[];
  validNames: string[];
} => {
  const errors: string[] = [];
  const validNames: string[] = [];

  // Verificar se há pelo menos 2 jogadores
  if (playerNames.length < 2) {
    errors.push('É necessário pelo menos 2 jogadores para o modo multiplayer');
    return { isValid: false, errors, validNames };
  }

  // Verificar se há no máximo 4 jogadores
  if (playerNames.length > 4) {
    errors.push('O máximo de jogadores permitido é 4');
    return { isValid: false, errors, validNames };
  }

  // Verificar se há nomes vazios ou apenas espaços
  const emptyNames = playerNames.filter(name => !name.trim());
  if (emptyNames.length > 0) {
    errors.push('Todos os jogadores devem ter nomes definidos');
    return { isValid: false, errors, validNames };
  }

  // Verificar se há nomes duplicados
  const uniqueNames = new Set(
    playerNames.map(name => name.trim().toLowerCase()),
  );
  if (uniqueNames.size !== playerNames.length) {
    errors.push('Os nomes dos jogadores devem ser únicos');
    return { isValid: false, errors, validNames };
  }

  // Verificar se os nomes não são apenas os valores padrão
  const defaultNames = ['Player 1', 'Player 2'];
  const hasOnlyDefaults = playerNames.every(
    (name, index) =>
      name.trim() === defaultNames[index] ||
      name.trim() === `Player ${index + 1}`,
  );

  if (hasOnlyDefaults) {
    errors.push(
      'Por favor, personalize os nomes dos jogadores antes de começar',
    );
    return { isValid: false, errors, validNames };
  }

  // Se chegou até aqui, os nomes são válidos
  validNames.push(...playerNames.map(name => name.trim()));
  return { isValid: true, errors, validNames };
};

/**
 * Gera nomes padrão para jogadores
 */
export const generateDefaultPlayerNames = (count: number): string[] => {
  const names: string[] = [];
  for (let i = 1; i <= count; i++) {
    names.push(`Player ${i}`);
  }
  return names;
};

/**
 * Verifica se um nome de jogador é válido individualmente
 */
export const isValidPlayerName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 20;
};
