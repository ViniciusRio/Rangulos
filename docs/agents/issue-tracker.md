# Rastreador de tarefas: GitHub Issues

As tarefas e especificações de Rangulos ficam nas Issues de `ViniciusRio/Rangulos`. Use `gh` na raiz deste repositório; o remoto `origin` determina o projeto.

## Operações

- Criar: `gh issue create --title "..." --body-file <arquivo>`.
- Ler: `gh issue view <número> --json number,title,body,labels,comments`.
- Listar: `gh issue list --state open --json number,title,body,labels` (adicione filtros de estado ou rótulo conforme a tarefa).
- Comentar: `gh issue comment <número> --body-file <arquivo>`.
- Rotular: `gh issue edit <número> --add-label "..."` ou `--remove-label "..."`.
- Fechar: `gh issue close <número> --comment "..."`.

Quando uma skill pedir para publicar no rastreador, crie uma Issue. Quando pedir a tarefa relevante, leia a Issue correspondente. Use `docs/agents/triage-labels.md` para os nomes dos rótulos.

## Pull requests como entrada de triagem

**PRs como entrada de solicitações: não.** A triagem de solicitações usa Issues; esta opção pode ser alterada aqui se o fluxo do projeto mudar.

## Relações entre tarefas

Quando o `gh` instalado suportar sub-issues, prefira a relação nativa. Caso contrário, registre `Part of #<número>` no corpo da tarefa filha e uma lista de tarefas na Issue principal. Registre bloqueios como `Blocked by: #<número>` no corpo da tarefa dependente se a API de dependências não estiver disponível.
