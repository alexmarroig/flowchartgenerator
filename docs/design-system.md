# Design System

## Paleta de cores

| Token | Uso | Valor |
| --- | --- | --- |
| `color.canvas` | Fundo principal do app | `#0F172A` |
| `color.surface` | Painéis, cards, barra lateral | `#111827` |
| `color.surface-alt` | Minimap, elementos secundários | `#1F2937` |
| `color.border` | Divisórias e contornos suaves | `#334155` |
| `color.text.primary` | Texto principal | `#E2E8F0` |
| `color.text.secondary` | Texto de apoio | `#94A3B8` |
| `color.text.inverse` | Texto sobre cores fortes | `#0B1120` |
| `color.brand.primary` | Destaques e ações primárias | `#38BDF8` |
| `color.brand.secondary` | Suporte, seleções | `#818CF8` |
| `color.state.success` | Conexão válida | `#22C55E` |
| `color.state.warning` | Avisos de validação | `#F59E0B` |
| `color.state.danger` | Erros ou exclusão | `#F97316` |
| `color.state.focus` | Anel de foco | `#7DD3FC` |
| `color.node.default` | Fundo do nó | `#1E293B` |
| `color.node.selected` | Nó selecionado | `#2563EB` |
| `color.edge.default` | Conexão padrão | `#CBD5F5` |
| `color.edge.active` | Conexão ativa/hover | `#38BDF8` |

## Tipografia

| Uso | Fonte | Peso | Tamanho | Altura de linha |
| --- | --- | --- | --- | --- |
| `heading.lg` | Inter | 600 | 24px | 32px |
| `heading.md` | Inter | 600 | 20px | 28px |
| `heading.sm` | Inter | 600 | 16px | 24px |
| `body.md` | Inter | 400 | 14px | 22px |
| `body.sm` | Inter | 400 | 12px | 18px |
| `label` | Inter | 500 | 12px | 16px |
| `mono` | JetBrains Mono | 500 | 12px | 18px |

Recomendações:
- Evite tamanhos menores que 12px em elementos interativos.
- Use `heading.sm` para títulos em nós e `body.sm` para detalhes secundários.

## Espaçamentos

| Token | Valor | Uso |
| --- | --- | --- |
| `space.0` | 0 | Sem espaçamento |
| `space.1` | 4px | Separação mínima |
| `space.2` | 8px | Espaço entre ícones e texto |
| `space.3` | 12px | Padding compacto |
| `space.4` | 16px | Padding padrão |
| `space.5` | 20px | Gaps em colunas |
| `space.6` | 24px | Seções e cards |
| `space.8` | 32px | Respiros maiores |
| `space.10` | 40px | Layouts amplos |
| `space.12` | 48px | Margens principais |

## Sombras

| Token | Valor | Uso |
| --- | --- | --- |
| `shadow.sm` | `0 1px 2px rgba(15, 23, 42, 0.4)` | Botões e chips |
| `shadow.md` | `0 8px 24px rgba(15, 23, 42, 0.45)` | Nós e minimap |
| `shadow.lg` | `0 16px 40px rgba(15, 23, 42, 0.55)` | Barra lateral |
| `shadow.focus` | `0 0 0 2px rgba(125, 211, 252, 0.4)` | Foco acessível |

## Bordas

| Token | Valor | Uso |
| --- | --- | --- |
| `radius.sm` | 6px | Botões, inputs |
| `radius.md` | 10px | Nós e cards |
| `radius.lg` | 14px | Painéis e minimap |
| `border.thin` | 1px solid `#334155` | Divisórias |
| `border.emphasis` | 1px solid `#38BDF8` | Estado ativo |

## Componentes essenciais

- **Nós arrastáveis**: cartões com cabeçalho, ícone de status e alças para conexão. Estados: padrão, hover, selecionado, desabilitado.
- **Conexão**: linhas com curvas suaves, setas opcionais e estado de validação (sucesso/erro). Deve exibir highlight ao passar o cursor.
- **Minimap**: painel flutuante com bordas suaves, fundo `color.surface-alt` e viewport com contorno `color.brand.primary`.
- **Barra lateral de propriedades**: painel fixo com tabs de configurações, inputs e ações rápidas (duplicar, excluir).
- **Timeline/Cronograma**: faixa horizontal com eventos, pins e agrupamentos; suporta zoom e marcações de tempo.

## Referências de estilo

- Grid de 8px para alinhamento de nós e espaçamentos internos.
- Use `color.node.selected` combinado com `shadow.md` para reforçar a seleção.
- Ícones com 16px/20px e cor `color.text.secondary`.
- Inputs com fundo `color.surface`, borda `border.thin` e foco `shadow.focus`.
- Estados destrutivos devem utilizar `color.state.danger` e manter contraste AA.

## Comportamento de drag-and-drop

- Inicie o drag ao segurar o nó por 150ms para evitar arrastes acidentais.
- Mostre um outline de pré-visualização e reduza a opacidade do nó para 85% durante o arraste.
- Use snapping de 8px e guias de alinhamento quando dois nós estiverem próximos.
- Atualize a posição com `requestAnimationFrame` para manter 60fps.
- Ao soltar, aplique uma pequena animação de settle (`150ms`, `ease-out`).
- Para conexões, permita clicar e arrastar a partir das alças; invalide conexões proibidas com cor `color.state.warning` e tooltip.
