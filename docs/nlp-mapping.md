# Regras de interpretação NLP → Flowchart

Este documento descreve regras para transformar frases em nós/arestas do schema de fluxograma.

## Identificação de passos sequenciais

- Cada frase declarativa vira um nó do tipo **processo**.
- A sequência é preservada pela ordem textual: o nó anterior conecta ao próximo.
- Marcadores de lista ("1.", "-", "•") indicam ordem explícita quando presentes.
- Verbos no imperativo ou no infinitivo (ex.: "coletar", "validar") também viram processos sequenciais.

## Palavras-chave de decisão

- Palavras-chave de decisão: **"se"**, **"caso"**, **"senão"**.
- A frase que inicia com "se" ou "caso" cria um nó **decisão**.
- O trecho imediatamente após a decisão é o ramo **verdadeiro**.
- Um "senão" explícito cria o ramo **falso**.
- Se não houver "senão", o ramo falso aponta para o próximo passo após o bloco de decisão.

## Agrupamentos e sub-processos

- Frases que introduzem blocos ("subprocesso", "grupo", "etapa") criam um nó **subprocesso**.
- Itens aninhados dentro do bloco viram nós internos do subprocesso.
- O subprocesso se conecta ao próximo passo após o bloco.

## Pseudocódigo de transformação

```pseudo
fun mapearFrasesParaFluxo(frases):
    nodes = []
    edges = []
    stack = []  # para blocos de decisão/subprocessos
    previous = null

    para cada frase em frases:
        tipo = detectarTipo(frase)

        se tipo == "subprocesso":
            node = criarNo("subprocesso", frase)
            conectar(previous, node)
            stack.push(node)
            previous = node
            continue

        se tipo == "decisao":
            node = criarNo("decisao", frase)
            conectar(previous, node)
            stack.push(node)
            previous = node
            continue

        se tipo == "senao":
            decisao = stack.peek()
            branch = criarNo("processo", frase)
            criarAresta(decisao, branch, "falso")
            previous = branch
            continue

        # padrão: processo sequencial
        node = criarNo("processo", frase)

        se stack.naoVazio() e ultimoTipo(stack) == "decisao" e ramoVerdadeiroNaoConectado(stack.peek()):
            criarAresta(stack.peek(), node, "verdadeiro")
        senao:
            conectar(previous, node)

        previous = node

    # finalizar blocos abertos
    enquanto stack.naoVazio():
        bloco = stack.pop()
        se bloco.tipo == "decisao" e ramoFalsoNaoConectado(bloco):
            criarAresta(bloco, proximoAposBloco(bloco), "falso")

    retornar { nodes, edges }
```

### Funções auxiliares (descrição)

- `detectarTipo(frase)`: retorna "decisao" se a frase inicia com "se" ou "caso"; retorna "senao" se inicia com "senão"; retorna "subprocesso" se contém marcadores de bloco; caso contrário retorna "processo".
- `conectar(a, b)`: cria aresta sequencial entre nós.
- `criarAresta(decisao, no, rotulo)`: cria aresta com rótulo "verdadeiro" ou "falso".
- `proximoAposBloco(bloco)`: resolve o primeiro nó após o término do bloco.
