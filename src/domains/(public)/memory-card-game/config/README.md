# Sistema de Configuração de Modos de Jogo

Este sistema centraliza todas as regras e comportamentos dos diferentes modos de jogo em configurações declarativas, eliminando a necessidade de múltiplas condicionais espalhadas pelo código.

## Estrutura

### 1. Configuração Base (`game-modes.config.ts`)

Cada modo de jogo tem uma configuração completa que define:

- **Timer**: Se tem timer, duração, quando inicia
- **Movimentos**: Se tem timer por movimento, limite
- **Multiplayer**: Se é multiplayer, quantos jogadores, regras de turno
- **Interface**: Quais elementos mostrar/ocultar
- **Gameplay**: O que pode ser feito (pausar, reiniciar, etc.)
- **Scoring**: Se pontuação, conquistas e leaderboard estão habilitados
- **Mensagens**: Textos específicos para cada situação

### 2. Hook de Configuração (`useGameConfig.ts`)

O hook `useGameConfig` fornece:

- **Configuração completa** do modo atual
- **Helpers** para lógica condicional (`shouldShow`, `canDo`, `getMessage`)
- **Validações** específicas do modo
- **Getters** para valores específicos

## Como Usar

### Exemplo 1: Renderização Condicional

```tsx
import { useGameConfig } from '../hooks/useGameConfig';

function MyComponent() {
  const { shouldShow, getMessage } = useGameConfig();
  
  return (
    <div>
      {shouldShow('showStreak') && <StreakDisplay />}
      {shouldShow('showTimeRemaining') && <TimerDisplay />}
      {shouldShow('showMultiplayerUI') && <MultiplayerInfo />}
      
      <p>{getMessage('initialMessage')}</p>
    </div>
  );
}
```

### Exemplo 2: Validação de Ações

```tsx
import { useGameConfig } from '../hooks/useGameConfig';

function GameControls() {
  const { canDo, isValidForCurrentMode } = useGameConfig();
  
  return (
    <div>
      {canDo('canPause') && <PauseButton />}
      {canDo('canRestart') && <RestartButton />}
      
      <button 
        onClick={startGame}
        disabled={!isValidForCurrentMode('startGame')}
      >
        Iniciar Jogo
      </button>
    </div>
  );
}
```

### Exemplo 3: Configuração Específica

```tsx
import { useGameConfig } from '../hooks/useGameConfig';

function GameSettings() {
  const { getMaxPlayers, getMinPlayers, shouldShow } = useGameConfig();
  
  if (!shouldShow('showMultiplayerUI')) return null;
  
  return (
    <div>
      <p>Jogadores: {getMinPlayers()} - {getMaxPlayers()}</p>
      {/* Renderizar controles de multiplayer */}
    </div>
  );
}
```

## Vantagens

### 1. **Centralização**

- Todas as regras em um local
- Fácil de manter e atualizar
- Reduz duplicação de código

### 2. **Declarativo**

- Configuração clara e legível
- Fácil de entender o comportamento de cada modo
- Menos propenso a erros

### 3. **Flexível**

- Fácil adicionar novos modos
- Fácil modificar comportamentos existentes
- Suporte a configurações complexas

### 4. **Testável**

- Configurações podem ser testadas isoladamente
- Comportamentos previsíveis
- Menos bugs de lógica condicional

## Adicionando Novos Modos

1. **Definir configuração** em `GAME_MODE_CONFIGS`:

```typescript
newMode: {
  hasTimer: true,
  timerDuration: 30,
  isMultiplayer: false,
  showStreak: true,
  // ... outras configurações
}
```

2. **Atualizar tipos** se necessário
3. **Usar o hook** nos componentes

## Adicionando Novas Configurações

1. **Adicionar propriedade** em `GameModeConfig`
2. **Definir valores** para cada modo
3. **Atualizar helpers** no hook se necessário
4. **Usar nos componentes** com `shouldShow` ou `canDo`

## Migração

Para migrar código existente:

1. **Identificar condicionais** baseadas em `gameMode`
2. **Substituir por helpers** do `useGameConfig`
3. **Testar** comportamento de cada modo
4. **Remover** código antigo

### Exemplo de Migração

**Antes:**

```tsx
{gameMode === 'multiplayer' && <MultiplayerInfo />}
{gameMode === 'timer' && <TimerDisplay />}
{gameMode !== 'multiplayer' && <StreakDisplay />}
```

**Depois:**

```tsx
{shouldShow('showMultiplayerUI') && <MultiplayerInfo />}
{shouldShow('showTimeRemaining') && <TimerDisplay />}
{shouldShow('showStreak') && <StreakDisplay />}
```

## Benefícios Imediatos

- ✅ **Menos bugs** de lógica condicional
- ✅ **Código mais limpo** e legível
- ✅ **Fácil manutenção** e evolução
- ✅ **Comportamento consistente** entre modos
- ✅ **Testes mais simples** e confiáveis
