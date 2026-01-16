# Flowchart Generator Backend

Backend para criação automática de fluxogramas com endpoints simples para CRUD e geração em Mermaid.

## Como rodar

```bash
npm install
npm run start
```

## Endpoints principais

- `POST /api/flowcharts`
  - Cria um novo fluxograma.
- `POST /api/flowcharts/:id/auto`
  - Recebe `{ "text": "..." }` e gera nós/arestas automaticamente.
- `GET /api/flowcharts/:id/mermaid`
  - Retorna representação Mermaid.
- `PUT /api/flowcharts/:id`
  - Atualiza nós e arestas (drag-and-drop no front-end).

## Exemplo rápido

```bash
curl -X POST http://localhost:3000/api/flowcharts \
  -H "Content-Type: application/json" \
  -d '{ "title": "Processo de compras" }'

curl -X POST http://localhost:3000/api/flowcharts/<id>/auto \
  -H "Content-Type: application/json" \
  -d '{ "text": "Receber pedido\nAnalisar crédito\nSe aprovado, liberar compra\nEnviar nota fiscal" }'
```
