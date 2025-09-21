# Como Adicionar Novos Modos de Jogo

## 🎮 **Exemplo: Adicionando Modo "Speed"**

Vamos adicionar um novo modo de jogo chamado "Speed" que combina timer com multiplicadores de pontuação.

### 1. **Atualizar Tipos**

```typescript
// src/domains/(public)/memory-card-game/types/index.ts
export type GameMode = 'classic' | 'timer' | 'zen' | 'multiplayer' | 'speed';
```

### 2. **Adicionar Configuração do Modo**

```typescript
// src/domains/(public)/memory-card-game/config/game-modes.config.ts
export const GAME_MODE_CONFIGS: Record<GameMode, GameModeConfig> = {
  // ... modos existentes ...
  
  speed: {
    // Timer
    hasTimer: true,
    timerDuration: 30, // 30 segundos
    timerStartsOnFirstMove: true,
    
    // Movimentos
    hasMoveTimer: true,
    maxTimerPerMovement: 5, // 5 segundos por movimento
    
    // Multiplayer
    isMultiplayer: false,
    minPlayers: 1,
    maxPlayers: 1,
    turnBased: false,
    playersCanContinueOnMatch: false,
    
    // Interface
    showStreak: true,
    showTimeRemaining: true,
    showMoveTimer: true, // Mostrar timer por movimento
    showPlayerTurn: false,
    showMultiplayerScore: false,
    showMultiplayerUI: false,
    
    // Gameplay
    canPause: false,
    canRestart: true,
    autoSave: true,
    showConfettiOnMatch: true,
    
    // Scoring
    scoringEnabled: true,
    achievementsEnabled: true,
    leaderboardEnabled: true,
    
    // Messages
    initialMessage: 'Rápido! Encontre os pares em 30 segundos!',
    gameCompleteMessage: 'Incrível! Você completou no modo Speed!',
    timeUpMessage: 'Tempo esgotado! Tente ser mais rápido!',
    multiplayerWinMessage: 'JOGO FINALIZADO',
  },
};
```

### 3. **Adicionar Opção no UI**

```typescript
// src/domains/(public)/memory-card-game/types/index.ts
export const GAME_MODE_OPTIONS = [
  // ... opções existentes ...
  {
    value: 'speed',
    label: 'Speed',
    description: 'Encontre pares em tempo recorde!',
    icon: '⚡',
  },
] as const;
```

### 4. **Usar no Componente**

```tsx
// src/domains/(public)/memory-card-game/components/GameBoard.tsx
function GameBoard() {
  const { shouldShow, getMessage } = useGameConfig();
  
  return (
    <div>
      {/* Timer principal */}
      {shouldShow('showTimeRemaining') && <MainTimer />}
      
      {/* Timer por movimento */}
      {shouldShow('showMoveTimer') && <MoveTimer />}
      
      {/* Sequência */}
      {shouldShow('showStreak') && <StreakDisplay />}
      
      {/* Mensagem inicial */}
      <p>{getMessage('initialMessage')}</p>
    </div>
  );
}
```

### 5. **Adicionar Lógica Específica (se necessário)**

```typescript
// src/domains/(public)/memory-card-game/stores/game.store.ts
const flipCard = (cardId: string) => {
  // ... lógica existente ...
  
  // Lógica específica para modo Speed
  if (gameMode === 'speed') {
    // Resetar timer por movimento
    resetMoveTimer();
    
    // Aplicar multiplicador de pontuação baseado na velocidade
    const speedMultiplier = calculateSpeedMultiplier();
    updateScore(speedMultiplier);
  }
};
```

## 🎯 **Vantagens do Sistema**

### **Antes (Sistema Antigo)**

```tsx
// Múltiplas condicionais espalhadas
{gameMode === 'speed' && <MoveTimer />}
{gameMode === 'timer' && <MainTimer />}
{gameMode === 'speed' && gameMode === 'timer' && <BothTimers />}
{gameMode !== 'multiplayer' && <StreakDisplay />}
```

### **Depois (Sistema Novo)**

```tsx
// Configuração centralizada
{shouldShow('showMoveTimer') && <MoveTimer />}
{shouldShow('showTimeRemaining') && <MainTimer />}
{shouldShow('showStreak') && <StreakDisplay />}
```

## 🔧 **Configurações Disponíveis**

### **Timer**

- `hasTimer`: Se tem timer principal
- `timerDuration`: Duração do timer
- `timerStartsOnFirstMove`: Se inicia no primeiro movimento

### **Movimentos**

- `hasMoveTimer`: Se tem timer por movimento
- `maxTimerPerMovement`: Limite de tempo por movimento

### **Multiplayer**

- `isMultiplayer`: Se é modo multiplayer
- `minPlayers`: Número mínimo de jogadores
- `maxPlayers`: Número máximo de jogadores
- `turnBased`: Se é baseado em turnos
- `playersCanContinueOnMatch`: Se jogadores continuam após acerto

### **Interface**

- `showStreak`: Mostrar sequência de acertos
- `showTimeRemaining`: Mostrar tempo restante
- `showMoveTimer`: Mostrar timer por movimento
- `showPlayerTurn`: Mostrar vez do jogador
- `showMultiplayerScore`: Mostrar placar multiplayer
- `showMultiplayerUI`: Mostrar interface multiplayer
- `showConfettiOnMatch`: Mostrar confetti ao acertar

### **Gameplay**

- `canPause`: Se pode pausar
- `canRestart`: Se pode reiniciar
- `autoSave`: Se salva automaticamente
- `showConfettiOnMatch`: Se mostra confetti

### **Scoring**

- `scoringEnabled`: Se pontuação está habilitada
- `achievementsEnabled`: Se conquistas estão habilitadas
- `leaderboardEnabled`: Se leaderboard está habilitado

### **Mensagens**

- `initialMessage`: Mensagem inicial
- `gameCompleteMessage`: Mensagem de vitória
- `timeUpMessage`: Mensagem de tempo esgotado
- `multiplayerWinMessage`: Mensagem de vitória multiplayer

## 🚀 **Exemplo Completo: Modo "Challenge"**

```typescript
challenge: {
  // Timer
  hasTimer: true,
  timerDuration: 120, // 2 minutos
  timerStartsOnFirstMove: true,
  
  // Movimentos
  hasMoveTimer: false,
  maxTimerPerMovement: null,
  
  // Multiplayer
  isMultiplayer: false,
  minPlayers: 1,
  maxPlayers: 1,
  turnBased: false,
  playersCanContinueOnMatch: false,
  
  // Interface
  showStreak: true,
  showTimeRemaining: true,
  showMoveTimer: false,
  showPlayerTurn: false,
  showMultiplayerScore: false,
  showMultiplayerUI: false,
  
  // Gameplay
  canPause: false,
  canRestart: true,
  autoSave: true,
  showConfettiOnMatch: true,
  
  // Scoring
  scoringEnabled: true,
  achievementsEnabled: true,
  leaderboardEnabled: true,
  
  // Messages
  initialMessage: 'Desafio: Complete em 2 minutos!',
  gameCompleteMessage: 'Parabéns! Você superou o desafio!',
  timeUpMessage: 'Desafio falhado! Tente novamente!',
  multiplayerWinMessage: 'JOGO FINALIZADO',
},
```

## ✅ **Resultado**

Com esse sistema, adicionar novos modos é:

- **Simples**: Apenas definir a configuração
- **Consistente**: Comportamento automático baseado na configuração
- **Maintível**: Mudanças centralizadas
- **Escalável**: Fácil adicionar novas funcionalidades

**O sistema resolve completamente o problema de múltiplas condicionais espalhadas!** 🎯
