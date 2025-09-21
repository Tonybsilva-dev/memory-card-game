# Comparação dos Modos de Jogo

## 🎮 **Visão Geral dos Modos**

| Modo | Foco | Pressão | Competição | Experiência |
|------|------|---------|------------|-------------|
| **Classic** | Tradicional | Média | Alta | Competitiva |
| **Timer** | Velocidade | Alta | Muito Alta | Intensa |
| **Zen** | Relaxamento | Nenhuma | Nenhuma | Meditativa |
| **Multiplayer** | Social | Média | Alta | Colaborativa |

## 📊 **Comparação Detalhada**

### 🎯 **Modo Classic**

**Objetivo:** Experiência tradicional de jogo da memória

**Características:**

- ⏱️ **Sem timer** - Jogue no seu ritmo
- 📊 **Pontuação ativa** - Sistema de scoring completo
- 🏆 **Leaderboard** - Compare com outros jogadores
- 🔥 **Sequência de acertos** - Mostra streaks
- 🎯 **Conquistas** - Sistema de achievements
- 💾 **Auto-save** - Progresso salvo automaticamente
- 🎉 **Confetti** - Celebração em acertos

**Ideal para:** Jogadores que querem uma experiência tradicional com elementos competitivos

### ⏰ **Modo Timer**

**Objetivo:** Desafio de velocidade e precisão

**Características:**

- ⏱️ **Com timer** - Pressão de tempo (60s padrão)
- 📊 **Pontuação ativa** - Sistema de scoring completo
- 🏆 **Leaderboard** - Compare tempos e pontuações
- 🔥 **Sequência de acertos** - Mostra streaks
- 🎯 **Conquistas** - Sistema de achievements
- 💾 **Auto-save** - Progresso salvo automaticamente
- 🎉 **Confetti** - Celebração em acertos
- ⏸️ **Sem pausa** - Não pode pausar durante o jogo

**Ideal para:** Jogadores que gostam de desafios de velocidade e competição

### 🧘 **Modo Zen**

**Objetivo:** Experiência relaxante e meditativa

**Características:**

- ⏱️ **Sem timer** - Jogue no seu ritmo
- 📊 **Sem pontuação** - Foco na experiência, não na competição
- 🏆 **Sem leaderboard** - Evita pressão competitiva
- 🔥 **Sem sequência** - Remove elementos de pressão
- 🎯 **Sem conquistas** - Mantém ambiente relaxante
- 💾 **Sem auto-save** - Experiência momentânea
- 🎉 **Confetti** - Celebração suave em acertos
- 🧘 **Mensagens zen** - Textos relaxantes e inspiradores

**Ideal para:** Jogadores que querem relaxar e desestressar

### 👥 **Modo Multiplayer**

**Objetivo:** Experiência social e colaborativa

**Características:**

- ⏱️ **Sem timer** - Jogue no ritmo do grupo
- 📊 **Pontuação ativa** - Sistema de scoring completo
- 🏆 **Leaderboard** - Compare com outros jogadores
- 🔥 **Sem sequência** - Foco nos jogadores
- 🎯 **Conquistas** - Sistema de achievements
- 💾 **Auto-save** - Progresso salvo automaticamente
- 🎉 **Confetti** - Celebração em acertos
- 👥 **2-4 jogadores** - Modo colaborativo
- 🔄 **Turnos** - Jogadores alternam
- 📋 **Placar** - Mostra progresso de cada jogador

**Ideal para:** Jogadores que querem jogar com amigos e família

## 🎨 **Interface por Modo**

### **Classic & Timer**

```
┌─────────────────────────────────────┐
│ 🔥 Sequência: 3 | Maior: 5         │
│ ⏰ Tempo restante: 02:30 (só Timer) │
│ 🎮 Clique em uma carta para começar!│
│                                     │
│ [Card] [Card] [Card] [Card]         │
│ [Card] [Card] [Card] [Card]         │
│                                     │
│ 📊 Movimentos: 15 | Tempo: 01:30    │
└─────────────────────────────────────┘
```

### **Zen**

```
┌─────────────────────────────────────┐
│ 🧘 Respire fundo e encontre os pares│
│     no seu ritmo...                 │
│                                     │
│ [Card] [Card] [Card] [Card]         │
│ [Card] [Card] [Card] [Card]         │
│                                     │
│ 🌸 Que momento de paz!              │
└─────────────────────────────────────┘
```

### **Multiplayer**

```
┌─────────────────────────────────────┐
│ 👥 Player 1 - É sua vez!            │
│ ┌─────────┬─────────┐               │
│ │ Player 1│ Player 2│               │
│ │ Pares: 3│ Pares: 1│               │
│ │ Mov: 8  │ Mov: 5  │               │
│ └─────────┴─────────┘               │
│                                     │
│ [Card] [Card] [Card] [Card]         │
│ [Card] [Card] [Card] [Card]         │
└─────────────────────────────────────┘
```

## 🔄 **Mudanças de Modo**

### **Reset Automático**

Ao mudar de modo, o sistema:

- ✅ **Reseta estado** do jogo (tempo, movimentos, cartas)
- ✅ **Preserva configurações** (dificuldade, tema)
- ✅ **Aplica configurações** específicas do novo modo
- ✅ **Regenera cartas** para o novo contexto

### **Configurações Preservadas**

- `difficulty` - Dificuldade selecionada
- `theme` - Tema escolhido
- `timerDuration` - Duração do timer (se aplicável)

### **Configurações Resetadas**

- `moves` - Contador de movimentos
- `time` - Tempo decorrido
- `matchedPairs` - Pares encontrados
- `flippedCards` - Cartas viradas
- `streak` - Sequência de acertos
- `isPlaying` - Status do jogo
- `cards` - Cartas do jogo

## 🎯 **Recomendações de Uso**

### **Para Iniciantes**

- 🧘 **Zen** - Aprender sem pressão
- 🎯 **Classic** - Experiência tradicional

### **Para Competitivos**

- ⏰ **Timer** - Desafio de velocidade
- 🎯 **Classic** - Pontuação e leaderboard

### **Para Relaxar**

- 🧘 **Zen** - Experiência meditativa
- 👥 **Multiplayer** - Social e divertido

### **Para Grupos**

- 👥 **Multiplayer** - Colaborativo e social

## 🚀 **Benefícios do Sistema de Configuração**

### **Antes (Sistema Antigo)**

```tsx
// Múltiplas condicionais espalhadas
{gameMode === 'zen' && <ZenMessage />}
{gameMode === 'timer' && <TimerDisplay />}
{gameMode !== 'zen' && <StreakDisplay />}
{gameMode === 'multiplayer' && <MultiplayerUI />}
```

### **Depois (Sistema Novo)**

```tsx
// Configuração centralizada e consistente
{shouldShow('showStreak') && <StreakDisplay />}
{shouldShow('showTimeRemaining') && <TimerDisplay />}
{shouldShow('showMultiplayerUI') && <MultiplayerUI />}
{getMessage('initialMessage')}
```

**O sistema garante que cada modo tenha sua identidade única e comportamento consistente!** ✨
