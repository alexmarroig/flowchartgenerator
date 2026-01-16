# Arquitetura de Alto Nível

Este documento descreve uma visão macro dos principais blocos do gerador de fluxogramas e como os dados fluem entre eles.

## Componentes principais

### Front-end (React + TypeScript)
- **Responsável pela interface**: edição do texto, visualização do diagrama e interações (zoom, pan, seleção).
- **Comunicação**: envia o texto ao backend/local parser e recebe a estrutura e o layout para renderização.

### Motor de diagramação (dagre/elkjs)
- **Responsável pelo layout**: organiza nós e arestas calculando posições, tamanhos e roteamento.
- **Entrada**: grafo estruturado (nós, arestas, metadados).
- **Saída**: coordenadas e rota das arestas para renderização.

### Parser de linguagem natural (pipeline local + regras)
- **Responsável por interpretar o texto**: transforma o texto livre em uma estrutura de grafo.
- **Pipeline local**: tokenização, detecção de intenções, extração de entidades.
- **Regras**: normalização, validação e inferência de conexões.

## Diagrama de componentes

```mermaid
flowchart LR
  UI[Front-end\nReact + TypeScript] -->|texto| Parser[Parser NL\nPipeline local + regras]
  Parser -->|estrutura (nós/arestas)| Layout[Motor de diagramação\nDagre/ELK.js]
  Layout -->|layout (posições/rotas)| UI
```

## Fluxo de dados

```mermaid
flowchart LR
  T[Texto] --> S[Estrutura\n(nós, arestas, metadados)]
  S --> L[Layout\n(posições, rotas)]
  L --> U[UI\n(renderização)]
```

### Passos detalhados
1. **Texto**: o usuário descreve o fluxo em linguagem natural no front-end.
2. **Estrutura**: o parser local transforma o texto em um grafo com nós e arestas, aplicando regras de validação.
3. **Layout**: o motor de diagramação calcula posições e rotas para as conexões.
4. **UI**: o front-end renderiza o diagrama e permite interação.
