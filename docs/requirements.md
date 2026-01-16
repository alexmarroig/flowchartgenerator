# Documento de Requisitos — Gerador de Fluxogramas

## Objetivo
Definir requisitos para um gerador de fluxogramas baseado em conceitos BPMN básicos, incluindo tipos de nós, conexões, atributos de processo e regras de validação.

## Tipos de nós

### 1. Tarefa (`task`)
- **Descrição**: representa uma atividade executável.
- **Uso**: ação única, normalmente executada por uma pessoa ou sistema.
- **Representação visual**: retângulo com bordas arredondadas.

### 2. Decisão (`decision`)
- **Descrição**: ponto de ramificação do fluxo com múltiplos caminhos.
- **Uso**: decisões com base em condições (ex.: aprovado? sim/não).
- **Representação visual**: losango.

### 3. Início (`start`)
- **Descrição**: ponto de partida do processo.
- **Uso**: exatamente um por processo.
- **Representação visual**: círculo com borda simples.

### 4. Fim (`end`)
- **Descrição**: término do processo.
- **Uso**: pode haver múltiplos fins (ex.: sucesso, rejeição).
- **Representação visual**: círculo com borda dupla.

## Conexões (arestas)
- **Descrição**: ligações direcionais entre nós.
- **Requisitos**:
  - Conexões devem ter `source` e `target` válidos (nós existentes).
  - Toda conexão deve representar o fluxo de execução (seta).
  - Em decisões, cada saída deve ter uma condição (`label`).
  - Não é permitido ciclo direto entre `start` e `end` sem ao menos uma tarefa intermediária.

## Atributos dos nós

### Atributos comuns
- `id` (string): identificador único.
- `type` (string): `start`, `task`, `decision`, `end`.
- `label` (string): rótulo exibido.

### Atributos específicos
- **Responsável** (`owner`):
  - Quem executa a tarefa ou é dono da decisão.
  - Opcional para `start` e `end`.
- **SLA** (`slaHours`):
  - Prazo máximo em horas para conclusão.
  - Obrigatório para tarefas críticas (definidas no processo).
- **Tempo estimado** (`estimatedMinutes`):
  - Duração média em minutos.
  - Opcional, mas recomendado para tarefas.

## Metadados do processo
- `name` (string): nome do processo.
- `version` (string): versão do fluxo.
- `createdAt` (string, ISO 8601): data de criação.
- `updatedAt` (string, ISO 8601): data de atualização.
- `author` (string): responsável pela modelagem.

## Regras BPMN básicas
1. **Um único início**: deve haver exatamente um nó `start`.
2. **Ao menos um fim**: deve existir pelo menos um nó `end`.
3. **Fluxo contínuo**:
   - Todo nó (exceto `start`) deve ter pelo menos uma entrada.
   - Todo nó (exceto `end`) deve ter pelo menos uma saída.
4. **Decisões com condições**:
   - Nós `decision` devem possuir duas ou mais saídas.
   - Cada saída deve ter um `label` não vazio.
5. **Sem nós órfãos**: não pode existir nó sem arestas.
6. **Tipos válidos**: apenas `start`, `task`, `decision`, `end`.

## Exemplos

### Exemplo 1 — Entrada em linguagem natural
> “O processo inicia com o registro do pedido. Em seguida, o gerente aprova o pedido. Se aprovado, o time financeiro emite a nota; se reprovado, o processo termina.”

### Exemplo 1 — JSON esperado
```json
{
  "metadata": {
    "name": "Aprovação de Pedido",
    "version": "1.0",
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z",
    "author": "Equipe de Processos"
  },
  "nodes": [
    {
      "id": "start_1",
      "type": "start",
      "label": "Início"
    },
    {
      "id": "task_1",
      "type": "task",
      "label": "Registrar pedido",
      "owner": "Atendimento",
      "estimatedMinutes": 10
    },
    {
      "id": "decision_1",
      "type": "decision",
      "label": "Pedido aprovado?",
      "owner": "Gerente"
    },
    {
      "id": "task_2",
      "type": "task",
      "label": "Emitir nota",
      "owner": "Financeiro",
      "slaHours": 24,
      "estimatedMinutes": 30
    },
    {
      "id": "end_1",
      "type": "end",
      "label": "Fim"
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "start_1",
      "target": "task_1"
    },
    {
      "id": "edge_2",
      "source": "task_1",
      "target": "decision_1"
    },
    {
      "id": "edge_3",
      "source": "decision_1",
      "target": "task_2",
      "label": "Sim"
    },
    {
      "id": "edge_4",
      "source": "decision_1",
      "target": "end_1",
      "label": "Não"
    },
    {
      "id": "edge_5",
      "source": "task_2",
      "target": "end_1"
    }
  ]
}
```

### Exemplo 2 — Entrada em linguagem natural
> “O processo começa. A equipe de TI analisa a solicitação. Se precisar de aprovação, o diretor decide; caso contrário, a TI executa a mudança e o processo termina.”

### Exemplo 2 — JSON esperado
```json
{
  "metadata": {
    "name": "Mudança de TI",
    "version": "2.1",
    "createdAt": "2024-02-01T13:00:00Z",
    "updatedAt": "2024-02-02T16:30:00Z",
    "author": "PMO"
  },
  "nodes": [
    {
      "id": "start_1",
      "type": "start",
      "label": "Início"
    },
    {
      "id": "task_1",
      "type": "task",
      "label": "Analisar solicitação",
      "owner": "TI",
      "estimatedMinutes": 60
    },
    {
      "id": "decision_1",
      "type": "decision",
      "label": "Precisa de aprovação?",
      "owner": "TI"
    },
    {
      "id": "task_2",
      "type": "task",
      "label": "Aprovar mudança",
      "owner": "Diretoria",
      "slaHours": 48
    },
    {
      "id": "task_3",
      "type": "task",
      "label": "Executar mudança",
      "owner": "TI",
      "estimatedMinutes": 120
    },
    {
      "id": "end_1",
      "type": "end",
      "label": "Fim"
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "start_1",
      "target": "task_1"
    },
    {
      "id": "edge_2",
      "source": "task_1",
      "target": "decision_1"
    },
    {
      "id": "edge_3",
      "source": "decision_1",
      "target": "task_2",
      "label": "Sim"
    },
    {
      "id": "edge_4",
      "source": "decision_1",
      "target": "task_3",
      "label": "Não"
    },
    {
      "id": "edge_5",
      "source": "task_2",
      "target": "task_3"
    },
    {
      "id": "edge_6",
      "source": "task_3",
      "target": "end_1"
    }
  ]
}
```
