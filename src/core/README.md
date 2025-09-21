# 🎮 Core - Sistema de Layout para Jogos

Este módulo fornece uma estrutura reutilizável para criar jogos de forma consistente e organizada.

## 📁 Estrutura

```
src/core/
├── layouts/
│   ├── GameLayout.tsx          # Layout fixo: Header + Content + Settings
│   └── index.ts
├── components/
│   ├── GameSettingsBase.tsx    # Base com estatísticas + configurações do jogo
│   ├── GameSettingsPanel.tsx   # Painel de configurações reutilizável
│   └── index.ts
├── hooks/
│   ├── useGameState.ts         # Hook para gerenciar estado do jogo
│   └── index.ts
└── index.ts                    # Exportações centralizadas
```

## 🎯 Layout Fixo

O layout é sempre o mesmo para todos os jogos:

```
┌─────────────────────────────────────────────────────────┐
│                    HEADER                              │
├─────────────────────────────────┬───────────────────────┤
│                                 │                       │
│         CONTENT GAME            │    SETTINGS GAME      │
│                                 │                       │
│                                 │                       │
│                                 │                       │
└─────────────────────────────────┴───────────────────────┘
```

## 🚀 Como Usar

### 1. Criando um Novo Jogo

```tsx
// src/domains/(public)/meu-jogo/view/meu-jogo.view.tsx
import { GameLayout, useGameState } from '../../../../core';
import { MeuJogoSettings } from '../components/MeuJogoSettings';

export const MeuJogoView: React.FC = () => {
  const { gameState, setDifficulty, setTheme, resetGame } = useGameState();

  return (
    <GameLayout
      testId="meu-jogo-view"
      onRestart={resetGame}
      onShowLeaderboard={() => {}}
      onShare={() => {}}
      isLeaderboardOpen={false}
      onCloseLeaderboard={() => {}}
      GameSettings={() => (
        <MeuJogoSettings
          difficulty={gameState.difficulty}
          theme={gameState.theme}
          onDifficultyChange={setDifficulty}
          onThemeChange={setTheme}
          // Outras props específicas do seu jogo
        />
      )}
    >
      {/* Seu conteúdo do jogo aqui */}
      <div>Meu Jogo</div>
    </GameLayout>
  );
};
```

### 2. Configurações Específicas do Jogo

Cada jogo define suas próprias configurações em um componente separado:

```tsx
// src/domains/(public)/meu-jogo/components/MeuJogoSettings.tsx
export const MeuJogoSettings = ({ 
  difficulty, 
  theme, 
  score, 
  onDifficultyChange, 
  onThemeChange 
}) => {
  return (
    <div className="h-full p-12">
      {/* Estatísticas específicas do seu jogo */}
      <div className="mb-8">
        <h3>Estatísticas do Meu Jogo</h3>
        <div>Score: {score}</div>
      </div>

      {/* Configurações específicas */}
      <div>
        <h3>Dificuldade</h3>
        <Button onClick={() => onDifficultyChange('easy')}>Fácil</Button>
        <Button onClick={() => onDifficultyChange('hard')}>Difícil</Button>
      </div>
    </div>
  );
};
```

### 3. Gerenciamento de Estado

```tsx
const {
  gameState,           // Estado completo do jogo
  setDifficulty,       // Alterar dificuldade
  setTheme,           // Alterar tema
  setTime,            // Alterar tempo
  setMoves,           // Alterar número de movimentos
  setMoveTimer,       // Alterar timer de movimento
  setIsPlaying,       // Controlar se está jogando
  setIsPaused,        // Controlar se está pausado
  resetGame,          // Resetar jogo
  incrementMoves,     // Incrementar movimentos
} = useGameState({
  difficulty: 'medium',
  theme: 'animals',
  // ... outras configurações iniciais
});
```

## 🎯 Vantagens

1. **Consistência**: Todos os jogos seguem o mesmo padrão visual
2. **Reutilização**: Componentes e hooks compartilhados
3. **Flexibilidade**: Configurações customizáveis por jogo
4. **Manutenibilidade**: Mudanças no layout afetam todos os jogos
5. **Escalabilidade**: Fácil adição de novos jogos

## 🔧 Componentes Disponíveis

### GameLayout

- **Layout fixo**: Header + Content + Settings
- **Estrutura consistente** para todos os jogos
- **Integração com leaderboard** e compartilhamento
- **Props obrigatórias**: GameSettings (componente), ações do header
- **Flexibilidade total**: Cada jogo define suas próprias configurações

### GameSettingsBase (Opcional)

- **Base para configurações** com estatísticas automáticas
- **Estatísticas padrão**: tempo, movimentos, timer
- **Children**: Configurações específicas do jogo
- **Layout consistente** para o painel lateral

### GameSettingsPanel (Opcional)

- **Painel de configurações reutilizável**
- **Suporte a dificuldade e tema** padrão
- **Opções customizáveis** por jogo
- **Integração com GameSettingsBase**

### useGameState

- Hook para gerenciar estado do jogo
- Funções utilitárias para controle do jogo
- Estado inicial customizável
- Reset e controle de jogo

## 📝 Exemplo Completo

Veja `src/domains/(public)/puzzle-game/` para um exemplo completo de como implementar um novo jogo usando este sistema.
