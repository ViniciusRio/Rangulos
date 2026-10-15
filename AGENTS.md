# Instruções para agentes

## Segurança e privacidade

- Trate autenticação e autorização como responsabilidade do backend. Ao analisar o legado, diferencie ausência de checagem visível no código de vulnerabilidade demonstrada; registre evidência e impacto potencial.
- Em código novo, verifique permissão para cada recurso no backend e mantenha credenciais fora de URLs.
- Não inclua credenciais, JWTs, dados pessoais ou endereços reais de eventos em commits, Issues, PRs, logs ou exemplos. Use dados fictícios ou anonimizados.
- Antes de expor dados de eventos ou convidados em uma proposta, identifique quem deveria poder vê-los; se a política não estiver definida, registre a questão como pendente.

## Qualidade, testes e documentação

- Mantenha cada mudança no escopo da tarefa e preserve arquivos existentes. Para mudanças de código, execute os testes pertinentes e informe comandos, resultados e limitações; para documentação, verifique links, referências e `git diff --check`.
- Documente comportamento observado com referências ao código ou a fontes de primeira parte. Separe fatos do legado, hipóteses e requisitos ainda não aprovados.
- Atualize `GLOSSARY.md` quando um termo de domínio for validado. Registre em `docs/adr/` apenas decisões arquiteturais tomadas com alternativas e justificativa.

## Branches e Pull Requests

- Trabalhe em branch separada de `master`. São proibidos commits e alterações diretas em `master`.
- Entregue mudanças para revisão em Pull Request com resumo, evidências de verificação e riscos conhecidos. Mantenha o PR como Draft enquanto houver revisão ou pendências.
- Não faça merge nem deploy sem autorização explícita do responsável pelo projeto.

## Agent skills

### Issue tracker

As tarefas e especificações deste repositório são GitHub Issues. Consulte `docs/agents/issue-tracker.md` antes de criar ou atualizar uma tarefa.

### Triage labels

Use os cinco rótulos de triagem definidos em `docs/agents/triage-labels.md` ao classificar Issues.

### Domain docs

Este repositório usa um único contexto de domínio. Leia `GLOSSARY.md` e os ADRs pertinentes em `docs/adr/` antes de propor mudanças no comportamento do aplicativo; consulte `docs/agents/domain.md`.
