# Rastreador de tarefas: GitHub Issues

As tarefas e especificações de Rangulos ficam nas Issues de **`ViniciusRio/Rangulos`**. Sempre passe `-R ViniciusRio/Rangulos` aos comandos `gh issue` e `gh label`; em `gh api`, use `repos/ViniciusRio/Rangulos/...`. A branch de trabalho pode apontar para um fork, e a escolha implícita de repositório não é segura.

## Leitura

- Ler uma tarefa: `gh issue view <número> -R ViniciusRio/Rangulos --json number,title,body,labels,comments`.
- Listar tarefas: `gh issue list -R ViniciusRio/Rangulos --state open --json number,title,body,labels` (adicione filtros conforme necessário).
- Listar rótulos: `gh label list -R ViniciusRio/Rangulos`.
- Conferir permissões da conta autenticada: `gh api repos/ViniciusRio/Rangulos --jq '.permissions'`.

## Escrita

Execute somente quando a tarefa autorizar a operação e a conta tiver a permissão necessária:

- Criar: `gh issue create -R ViniciusRio/Rangulos --title "..." --body-file <arquivo>`.
- Comentar: `gh issue comment <número> -R ViniciusRio/Rangulos --body-file <arquivo>`.
- Rotular: `gh issue edit <número> -R ViniciusRio/Rangulos --add-label "..."` ou `--remove-label "..."`.
- Fechar: `gh issue close <número> -R ViniciusRio/Rangulos --comment "..."`.
- Criar um rótulo ausente, quando autorizado: `gh label create <nome> -R ViniciusRio/Rangulos --color <hex> --description "..."`.

Se faltar permissão ou a API recusar a escrita, interrompa essa operação, registre o comando, a resposta e as permissões observadas, e deixe a ação pendente para um mantenedor. Não redirecione Issues ou rótulos ao fork, não use outra identidade e não trate HTTP 404 como prova de que o repositório não existe sem verificar a leitura.

Em 2026-10-13, a conta `vlmdr` obteve leitura HTTP 200 das etiquetas e permissões `pull: true`, `push: false`, `triage: false`, `maintain: false`, `admin: false` em `ViniciusRio/Rangulos`. Antes de existir um remoto de fork neste clone, `gh label create 'needs-triage' --color 'd4c5f9' --description 'Aguardando avaliação'` retornou HTTP 404 em `https://api.github.com/repos/ViniciusRio/Rangulos/labels`. A falta de permissão de escrita é a explicação sustentada pelas permissões; o código HTTP isolado não distingue todas as causas possíveis. Os quatro rótulos ausentes permanecem para um mantenedor criar: `needs-triage`, `needs-info`, `ready-for-agent` e `ready-for-human`. `wontfix` já existe.

Quando uma skill pedir publicação no rastreador, use uma Issue do repositório original. Use `docs/agents/triage-labels.md` para o vocabulário de rótulos.

## Pull requests como entrada de triagem

**PRs como entrada de solicitações: não.** A triagem de solicitações usa Issues; esta opção pode ser alterada aqui se o fluxo do projeto mudar.

## Relações entre tarefas

Quando o `gh` instalado suportar sub-issues, prefira a relação nativa, sempre com o repositório original explícito. Caso contrário, registre `Part of #<número>` no corpo da tarefa filha e uma lista de tarefas na Issue principal. Registre bloqueios como `Blocked by: #<número>` no corpo da tarefa dependente se a API de dependências não estiver disponível.
