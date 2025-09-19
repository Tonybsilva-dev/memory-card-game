# 🧪 Guia de Testes

Este diretório contém todas as configurações, factories e utilitários para testes do projeto.

## 📁 Estrutura

```
src/test/
├── setup.ts                    # Configuração global dos testes
├── test-utils.tsx             # Utilitários customizados do Testing Library
├── index.ts                   # Exportações centralizadas
├── config/
│   ├── test-env.ts            # Configurações de ambiente
│   ├── global-mocks.ts        # Mocks globais
│   ├── coverage.config.ts     # Configurações de coverage
│   └── vitest-ui.config.ts    # Configurações da UI do Vitest
├── factories/
│   ├── user.factory.ts        # Factory para usuários
│   └── auth.factory.ts        # Factory para autenticação
└── utils/
    ├── mock-store.ts          # Utilitários para Zustand
    ├── mock-router.ts         # Utilitários para React Router
    └── mock-api.ts            # Utilitários para APIs
```

## 🚀 Scripts Disponíveis

### Execução de Testes
```bash
# Modo watch (recomendado para desenvolvimento)
npm run test

# Interface visual dos testes
npm run test:ui

# Execução única
npm run test:run

# Execução com coverage
npm run test:coverage
```

### Coverage
```bash
# Gerar relatório de coverage
npm run coverage

# Interface visual com coverage
npm run coverage:ui

# Abrir relatório de coverage no navegador
npm run coverage:open
```

## 📊 Coverage

O projeto está configurado com thresholds mínimos de 80% para:
- **Branches**: Cobertura de condicionais
- **Functions**: Cobertura de funções
- **Lines**: Cobertura de linhas
- **Statements**: Cobertura de statements

### Relatórios Gerados
- **HTML**: `coverage/index.html` - Relatório interativo
- **JSON**: `coverage/coverage-final.json` - Para CI/CD
- **LCOV**: `coverage/lcov.info` - Para integração com ferramentas
- **Console**: Resumo no terminal

## 🏭 Factories

### User Factory
```typescript
import { createUser, createUsers } from '@/test';

// Criar um usuário
const user = createUser({ name: 'João' });

// Criar múltiplos usuários
const users = createUsers(5, { role: 'admin' });
```

### Auth Factory
```typescript
import { createLoginCredentials, createAuthState } from '@/test';

// Criar credenciais de login
const credentials = createLoginCredentials({ 
  email: 'test@example.com' 
});

// Criar estado de autenticação
const authState = createAuthState({ 
  isAuthenticated: true 
});
```

## 🛠️ Utilitários de Mock

### Mock Store (Zustand)
```typescript
import { createMockStore, createMockHook } from '@/test';

const mockStore = createMockStore({ user: null });
const mockHook = createMockHook({ isLoading: false });
```

### Mock Router
```typescript
import { createMockUseNavigate, createMockUseLocation } from '@/test';

const mockNavigate = createMockUseNavigate();
const mockLocation = createMockUseLocation();
```

### Mock API
```typescript
import { createMockApiResponse, createMockFetch } from '@/test';

const mockResponse = createMockApiResponse({ data: 'success' });
const mockFetch = createMockFetch({ data: 'success' });
```

## 📝 Escrevendo Testes

### Estrutura de Teste
```typescript
// src/components/meu-componente.tsx
// src/components/__tests__/meu-componente.spec.tsx

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MeuComponente } from '../meu-componente';

describe('MeuComponente', () => {
  it('should render correctly', () => {
    render(<MeuComponente />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Convenções
- ✅ Use `.spec.tsx` para componentes React
- ✅ Use `.spec.ts` para utilitários
- ✅ Coloque testes em `__tests__/` junto ao arquivo
- ✅ Use factories para dados de teste
- ✅ Use mocks para dependências externas

## 🔧 Configurações

### Coverage
- **Provider**: V8 (mais rápido)
- **Thresholds**: 80% global
- **Exclusões**: Arquivos de teste, configuração, tipos

### Vitest UI
- **Porta**: 51204
- **Tema**: Auto (light/dark)
- **Atualização**: Automática

## 🐛 Troubleshooting

### Testes não executam
1. Verifique se o Vitest está instalado
2. Execute `npm run test:run` para ver erros
3. Verifique imports e mocks

### Coverage baixo
1. Execute `npm run coverage:ui` para ver detalhes
2. Adicione testes para funções não cobertas
3. Verifique exclusões no `vite.config.ts`

### UI não abre
1. Verifique se a porta 51204 está livre
2. Execute `npm run test:ui` novamente
3. Acesse `http://localhost:51204` manualmente
