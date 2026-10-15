# Etapa 02 — execução local do frontend legado

Execução: 13/10/2026; documentação revisada em 15/10/2026. Código testado: `ViniciusRio/Rangulos` `c7b51e1`. A branch de documentação foi alinhada ao `master` `3fc1f3a`; o intervalo entre esses commits só adicionou documentação, sem mudar código ou dependências do frontend. Esta verificação não alterou código, dependências ou configuração do aplicativo.

## Requisitos encontrados

`package.json` declara Angular `~8.1.2`, Ionic Angular `^4.7.1`, Capacitor `1.2.1` e uma dependência Git de `cordova-android`; `package-lock.json` usa formato v1. `src/environments/environment.ts` e `environment.prod.ts` apontam para `http://localhost:8081/api`. O segundo arquivo contém ainda uma URL antiga comentada, sem evidência de serviço ativo. O host tinha Node 24; para evitar modernização implícita, a reprodução usou `node:12.22.12-buster` (Node `v12.22.12`, npm `6.14.16`, Git `2.20.1`) em container temporário.

## Instalação e execução

| Passo | Resultado |
| --- | --- |
| `npm ci --ignore-scripts --no-audit --no-fund` no container Node 12, primeira tentativa | Falhou em `git`: o worktree continha um arquivo `.git` que apontava para o diretório Git do host, invisível no container. |
| Mesmo comando, montando worktree e diretório Git original nos respectivos caminhos absolutos (Git original somente leitura) | Sucesso: 1.747 pacotes adicionados em 54,778 s. Sem alteração de `package.json` ou lockfile. |
| `npm run build` com rede do container desabilitada | Sucesso (código 0), bundles ES2015 e ES5 gerados. Aviso de base `caniuse-lite` antiga; nenhum upgrade realizado. |
| `npm start -- --host 0.0.0.0 --port 18080` | Compilação de desenvolvimento concluída. Porta publicada somente em `127.0.0.1:18080`; `GET /` retornou `200 text/html`. |
| Navegador Chrome headless, com conta fictícia do laboratório | A página `/home` mostrou o título do evento fictício criado na API. Após gravar o token local de laboratório no armazenamento do navegador, `GET /api/user` e `GET /api/events` responderam `200`; `GET /api/event/{id}/image` respondeu `200` para os eventos consultados. Requisições iniciais antes do token responderam `401`, como esperado. O preflight CORS para `/api/events` respondeu `200`. |

Para a integração no navegador, a API foi publicada apenas em `127.0.0.1:8081` e o frontend em `127.0.0.1:18080`; ambos usaram dados fictícios. O navegador fez as requisições reais entre essas portas. O uso de `localhost` na configuração só resolve para o próprio dispositivo que abre o aplicativo; não demonstra conexão de um aparelho móvel à API no host. Não foram executados build Android/iOS, plugins nativos, testes E2E ou fluxo de pagamento no navegador.

## Divergências e próximos passos

- O frontend constrói a URL da imagem com `?token=...` em `src/app/events/events.service.ts`; o contrato observado permite renderização, mas expõe JWT na URL dentro do laboratório. Esse transporte precisa de revisão antes de qualquer ambiente não isolado.
- O build de produção também usa `http://localhost:8081/api`; publicar esse build sem configuração específica impediria a conexão esperada fora da máquina do usuário. A URL de produção deve ser decidida e validada em etapa própria.
- A execução no navegador demonstrou viabilidade do frontend legado **sem atualizar frameworks**. A [validação correspondente da API](https://github.com/vlmdr/Rangulos-API/blob/docs/stage02-local-api-validation/docs/research/stage02-api-validation.md) registra contratos e problemas de autorização observados; o corpo dos dois Draft PRs traz os links cruzados.
