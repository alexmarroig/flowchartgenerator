# MVP: Fluxograma

## Inserir texto → gerar fluxograma
**Descrição**
Permite inserir um texto estruturado e gerar automaticamente um fluxograma com nós e conexões iniciais.

**Critérios de aceitação**
- Dado um texto válido, o sistema gera um fluxograma com nós correspondentes às etapas descritas.
- O fluxograma gerado apresenta conexões coerentes entre nós (ex.: sequência linear por padrão).
- O usuário recebe feedback claro em caso de texto inválido ou vazio.

## Arrastar nós → reposicionar
**Descrição**
Permite ao usuário arrastar nós do fluxograma para ajustar o layout.

**Critérios de aceitação**
- O usuário consegue clicar e arrastar um nó para uma nova posição.
- Ao soltar, o nó permanece na posição definida pelo usuário.
- As conexões do nó se atualizam visualmente para refletir a nova posição.

## Editar rótulos e metadados
**Descrição**
Permite editar o texto do rótulo do nó e seus metadados (ex.: responsável, prazo, tipo).

**Critérios de aceitação**
- O usuário consegue editar o rótulo de um nó e ver a alteração aplicada imediatamente.
- O usuário consegue editar metadados de um nó e salvar as alterações.
- As alterações persistem durante a sessão e são refletidas na visualização do fluxograma.

## Exportar imagem/PDF/JSON
**Descrição**
Permite exportar o fluxograma em formatos de imagem, PDF e JSON.

**Critérios de aceitação**
- O usuário consegue exportar o fluxograma como imagem (ex.: PNG ou SVG) com o layout atual.
- O usuário consegue exportar o fluxograma como PDF mantendo legibilidade.
- O usuário consegue exportar o fluxograma como JSON contendo nós, conexões e metadados.
