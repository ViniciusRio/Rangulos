# Etapa 03 — proposta de segurança da API e decisões de domínio

**Estado:** proposta para aprovação; nenhuma regra abaixo foi implementada. **Base:** [PR #11 da API](https://github.com/ViniciusRio/Rangulos-API/pull/11), [PR #40 do frontend](https://github.com/ViniciusRio/Rangulos/pull/40), [auditoria inicial](legacy-audit.md) e [glossário](../../GLOSSARY.md). Os testes do PR #11 ocorreram em SQLite descartável com contas fictícias, não em produção. No código da API em `d118a5e`, [`update`](https://github.com/ViniciusRio/Rangulos-API/blob/d118a5e/app/Http/Controllers/EventController.php#L197-L219) troca `user_creator_id` pelo usuário da requisição; [`destroy`, `restore`, `upload` e `deleteEvent`](https://github.com/ViniciusRio/Rangulos-API/blob/d118a5e/app/Http/Controllers/EventController.php#L227-L242) não verificam propriedade. O probe reproduziu edição, transferência de propriedade e exclusões por outra conta. Esta proposta não escolhe versão de Laravel, reescrita nem migração.

## Critério de desenho

**Autenticação** identifica a conta; **autorização** verifica a ação para o evento específico no backend. O frontend pode ocultar botões, mas isso não autoriza uma requisição. Recomendo uma política única por recurso (`EventPolicy` ou equivalente compatível com Laravel 5.5), chamada em todos os endpoints relevantes, mais consultas e respostas com campos explicitamente selecionados. Checagens espalhadas nos controladores são mais rápidas de iniciar, porém facilitam omissões como as já observadas. Middleware apenas de login também não resolve a posse do recurso. [Pesquisa sobre recursos do Laravel 5.5](stage03-laravel55-capabilities.md).

### Papéis e estados usados na matriz

- **Anônimo:** sem autenticação válida.
- **Alheio:** conta autenticada sem relação com o evento.
- **Convidado:** conta autenticada com registro `guests` daquele evento; esse vínculo não comprova pagamento nem define o direito de ver endereço. Se o proprietário também tiver um registro `guests`, prevalece o papel de proprietário.
- **Proprietário:** `events.user_creator_id` corresponde ao usuário autenticado. Não há papel administrativo demonstrado no código; qualquer exceção administrativa exigirá especificação própria.
- **Ativo / suspenso:** no legado, `deleted_at` vazio / preenchido. O termo *suspenso* vem do glossário; não implica regras de produto adicionais.

Legenda: **P** permitir, **N** negar (`401` anônimo; `403` autenticado quando a rota existe), **D** decisão de produto pendente. Para uma API que precise operar antes dessa decisão, o padrão de contenção proposto é **negar D**, inclusive em listas e projeções, até aprovar um contrato de leitura. Rotas desabilitadas podem responder `404`/`410` para todos; o código exato será fixado no PR de contenção. `404` para recurso inexistente; decidir depois se um recurso existente, mas oculto, responderá `403` ou `404` de modo consistente, sem revelar existência.

| Operação / rota atual | Anônimo | Alheio | Convidado | Proprietário | Condição e alcance propostos |
| --- | :---: | :---: | :---: | :---: | --- |
| Descobrir `GET /events` | N | D | D | P | Hoje a listagem retorna modelos completos, inclusive campos potencialmente sensíveis. Decidir se haverá catálogo e quais campos entram na projeção; até lá, apenas eventos próprios. |
| Ler detalhe `GET /event/{id}` | N | D | D | P | Para terceiros, decidir visibilidade por estado e participação. Endereço e dados de convidados exigem autorização própria; não serializar o modelo inteiro. |
| Ler imagem `GET /event/{id}/image` | N | D | D | P | A imagem herda a visibilidade do evento, com regra explícita; acesso via cabeçalho, sem JWT na URL. |
| Ler convidados `GET /event/{id}/guests` e campos `guests` | N | N | N | P | Dados pessoais de convidados só para proprietário, sujeito a revisão de privacidade. A rota atual não tem método correspondente visível no controlador: confirmar contrato antes de implementar. |
| Criar `POST /events` | N | P | P | P | Qualquer conta autenticada pode criar um evento próprio; `user_creator_id` vem da identidade autenticada, nunca do corpo. `POST /events/fill` fica fora da criação normal. |
| Editar `PUT /event/{id}` | N | N | N | P | Só proprietário do evento ativo; preservar `user_creator_id` mesmo com campo forjado no corpo. Edição de suspenso fica negada na contenção; confirmar se o produto a deseja. |
| Suspender `DELETE /event/{id}` | N | N | N | P | Só proprietário de evento ativo. Repetição deve ter contrato explícito e não causar nova alteração. |
| Restaurar `POST /event/{id}/restore` | N | N | N | P | Só proprietário de evento suspenso. |
| Excluir definitivamente `DELETE /event/{id}/delete` | N | N | N | D | Somente o proprietário poderá receber permissão após definir efeitos sobre convidados, pagamentos e retenção. Até lá, desabilitar a rota fora do laboratório. |
| Enviar imagem `POST /event/{id}/upload` | N | N | N | P | Só proprietário de evento ativo; validar tipo, tamanho e armazenamento antes de gravar caminho/arquivo. |

Esta é uma **matriz mínima de segurança**, não uma aprovação de visibilidade pública ou participação. `P` para criação e operações do proprietário é uma proposta baseada nos fluxos atuais. A distinção entre `D` e `N` impede que uma ausência de regra seja interpretada como permissão. Suspensão, restauração, exclusão definitiva e upload foram exercitados ou inspecionados no PR #11; as regras da tabela ainda precisam de testes automatizados.

## Plano de testes automatizados

Criar testes HTTP na API com banco SQLite **novo e isolado**, `APP_KEY`/`JWT_SECRET` fictícios gerados para o teste e armazenamento falso/temporário. Nunca usar `database/database.sqlite` versionado. Fixar o contrato por resposta **e** efeito no banco/arquivo, pois uma resposta `403` com mutação seria insuficiente. A suíte atual (`2 tests, 2 assertions` no PR #11) não cobre autorização.

| Conjunto | Casos e asserções de aceitação |
| --- | --- |
| Identidade e posse | Para escritas ativas (`PUT`, suspender, restaurar, upload): anônimo `401`; alheio e convidado `403`; proprietário recebe sucesso apenas no estado permitido. A exclusão definitiva permanece desabilitada para todos até a decisão de retenção, com resposta consistente ainda a fixar. Verificar `user_creator_id`, `deleted_at`, campos de evento, linhas de convidados e bytes/caminho da imagem **inalterados** após negativas. Forjar `user_creator_id` no `PUT` não transfere posse. |
| Ciclo do evento | Criar como A atribui posse a A; editar/suspender/restaurar como A produz a transição esperada. Excluir definitivamente só após decisão de retenção. Tentar editar/upload em suspenso deve falhar na política de contenção. ID inexistente retorna `404`; tentativa repetida não altera outros eventos. Cobrir proprietário A, outra conta B e convidado C por operação. |
| Leituras e privacidade | Antes de liberar catálogo/detalhe/imagem para terceiros, testar resposta restrita por papel e estado; confirmar ausência de `address`, e-mail de convidado e outros campos fora da projeção autorizada. Testar listagens `my`, `current`, `past` contra IDs de outras contas. Quando a política de produto for aprovada, substituir os casos `D` pelos resultados escolhidos. |
| Upload | Com armazenamento falso, proprietário de evento ativo envia imagem permitida; alheio, convidado, arquivo inválido e arquivo acima do limite recebem negativa sem arquivo novo nem alteração de `url_image`. O limite/tipos exatos são decisão técnica a especificar no PR. |
| Pagamento e participação | Com dois convidados no mesmo evento, a ação de A jamais muda o estado individual exibido a B. Sem confirmação financeira confiável, nenhum endpoint da conta pode transformar um pagamento em *confirmado*. Testar ausência de convite, repetição da chamada e cancelamento conforme regra aprovada. |
| Transporte de credenciais | Após mudança coordenada do cliente, bearer no cabeçalho funciona; JWT só na query é recusado. Verificar que URLs de imagem e logs de teste não contêm token. Testar a transição cliente/API em ambiente isolado antes de desativar compatibilidade. |

Executar primeiro os testes focados de cada PR, depois `vendor/bin/phpunit` inteiro e o probe HTTP do PR #11 contra um banco descartável. O probe existente comprova o defeito atual e precisará ser ajustado para esperar `403` e ausência de mutação após a correção; não deve ser apontado a serviço compartilhado. Testes de navegador validam a troca do transporte de JWT e a renderização da imagem; não substituem a suíte da API. Registrar comandos, versões e resultados nos PRs.

## `is_paid` e confirmação financeira

O legado mistura três fatos distintos. [`GuestController::store`](https://github.com/ViniciusRio/Rangulos-API/blob/d118a5e/app/Http/Controllers/GuestController.php#L25-L43) cria um vínculo com `payment_confirmed=false`; [`payEvent`](https://github.com/ViniciusRio/Rangulos-API/blob/d118a5e/app/Http/Controllers/EventController.php#L319-L335) permite que o próprio convidado marque `true`; [`show`](https://github.com/ViniciusRio/Rangulos-API/blob/d118a5e/app/Http/Controllers/EventController.php#L155-L188) devolve `is_paid=true` se **qualquer** convidado estiver marcado. O PR #11 demonstrou que B passou a ver `is_paid=true` depois da ação de A. A [tela do anfitrião](https://github.com/ViniciusRio/Rangulos/blob/c7b51e1/src/app/events/event-detail/event-detail.page.html#L76-L88) mostra “Pago” para cada convidado sem condicionar o rótulo ao campo individual. Não há evidência, nesse fluxo, de liquidação financeira externa.

Proponho separar no contrato: **vínculo do usuário com o evento** (existe registro `guests`), **marcador legado daquele usuário** (`payment_confirmed` na sua própria linha; não prova dinheiro recebido) e **confirmação financeira** (somente após definir fonte confiável e reconciliação). `is_paid` não deve ser usado como confirmação financeira nem calculado pelo estado de outro convidado. Antes de aprovar cobrança, o fluxo de autopagamento e os rótulos de “Pago” precisam ser contidos fora do laboratório; mudança de contrato e tela deve ser coordenada para não prometer pagamento inexistente. Não proponho tabela, provedor ou estados finais de cobrança nesta etapa.

## Decisões de produto pendentes

| Tema | Perguntas que destravam o contrato | Efeito se permanecer indefinido |
| --- | --- | --- |
| Visibilidade | Quem descobre evento ativo/suspenso/encerrado? Há catálogo para anônimos ou só autenticados? O que aparece antes de participar? | Manter terceiros sem leitura de detalhe/lista geral e sem projeção pública. |
| Participação | `guest` significa solicitação, convite do anfitrião ou participação aceita? Quem pode entrar/sair? Há limite, aprovação, duplicidade, lista de espera? | Não inferir pagamento ou vaga confirmada de um registro `guests`; não expor ação de ingresso sem regra e teste. |
| Localização | Quem pode ver endereço completo e a partir de quando? O mapa é aberto antes da participação? O que aparece no catálogo? | Omitir endereço de respostas a terceiros, imagens/metadados e logs até definir política. |
| Cobrança | Há cobrança real? Quem cobra, confirma, cancela, estorna e reconcilia? O preço é por pessoa? O que “confirmado” libera? | Não aceitar autopagamento como confirmação financeira nem rotular convidados como pagos. |

`GLOSSARY.md` continua descrevendo o legado. Após aprovação de termos e regras, atualizá-lo **somente com conceitos validados**. Registrar ADR apenas para decisão arquitetural durável com alternativas e justificativa; perguntas de produto permanecem nesta proposta/Issues, não em ADR aprovado. “Atividades complementares” segue pendente no glossário, fora do escopo de segurança desta etapa.

## Contenção antes de qualquer exposição da API

1. Manter a instância de investigação inacessível à rede externa, usando banco e segredos exclusivos; confirmar que não há API de produção acessível antes de tratar a correção como proteção efetiva. Não usar dados reais nem o SQLite versionado.
2. Bloquear escrita de evento sem autorização por recurso, especialmente `PUT`, suspensão, restauração, exclusão definitiva e upload. Desabilitar `/events/fill` fora do laboratório; a rota insere dados estáticos e IDs fixos.
3. Não liberar `GET /events`, detalhe, imagem ou listagens que retornem endereço/dados de convidados a terceiros até aprovar projeções de leitura. Evitar serialização integral dos modelos e verificar cache/logs para dados e credenciais.
4. Conter `POST /event/pay` e indicadores de “Pago” até distinguir marcador individual de confirmação financeira. Não assumir provedor existente.
5. Planejar retirada de `?token=` em cliente/API e URL de imagem, com contrato de cabeçalho e verificação de logs. Configuração `localhost`/HTTP do build de produção no PR #40 impede publicação segura; definir HTTPS e endpoint correto antes de qualquer deploy.

Os itens são **pré-condições de exposição**, não mudanças já executadas. A ordem entre correção da API e ajuste do cliente precisa preservar um ambiente isolado de teste; não abrir a API à rede para validar o aplicativo.

## Divisão sugerida em Issues e PRs

Não criar Issues antes de aprovar a matriz e as políticas pendentes. Quando autorizado, usar `ViniciusRio/Rangulos-API` para tarefas da API e `ViniciusRio/Rangulos` para as do cliente, com repositório explícito nos comandos `gh`; PRs saem de branches separadas e ficam Draft durante revisão. A conta atual não tem permissão de escrita em Issues de `ViniciusRio/Rangulos` conforme [issue-tracker.md](../agents/issue-tracker.md); uma recusa de escrita deve ser registrada, sem redirecionar para o fork.

| Ordem | Issue / PR pequeno | Repositório | Entrega verificável | Dependência |
| --- | --- | --- | --- | --- |
| 1 | Impedir edição por não proprietário | API | Testes HTTP para `PUT`: alheio/convidado `403`, anônimo `401`, proprietário permitido, posse imutável e dados sem alteração após negativa. | Aprovação da matriz mínima. |
| 2 | Proteger suspensão e restauração | API | Testes por conta e estado; só proprietário suspende/restaura, sem efeito após `403`; inexistente `404`. | 1. |
| 3 | Conter exclusão definitiva e `/events/fill` | API | Rotas indisponíveis fora do laboratório enquanto faltam retenção e política; testes provam ausência de alteração. Uma futura habilitação da exclusão será outro PR. | Política de contenção aprovada. |
| 4 | Proteger upload e arquivo | API | Só proprietário ativo envia; arquivo inválido/negado não muda `url_image` nem storage; tipos e limite documentados. | 1; limite técnico especificado no PR. |
| 5 | Projeções de leitura e proteção de dados | API | Listas, detalhe, imagem e convidados respeitam política de visibilidade e endereço; testes por papel/estado sem vazamento. | Decisões de visibilidade e localização. |
| 6 | Integridade do marcador individual e contenção do autopagamento | API | B não herda o estado de A; conta comum não pode confirmar liquidação; testes para dois convidados e requisição repetida. | Decisão de cobrança e contrato de transição. |
| 7 | Migrar transporte de JWT e imagem | API → frontend → API, três PRs coordenados | Primeiro API oferece imagem autenticada por bearer; depois cliente a carrega sem token na URL; por fim API rejeita query token. Testes HTTP e de navegador em ambiente isolado a cada passo. | Contrato de leitura da imagem e janela de compatibilidade. |
| 8 | Configuração de endpoint e proteção de logs | frontend e infraestrutura, PRs separados | Build de teste aponta a HTTPS configurável; checagens evitam `localhost` de produção, tokens em URL e logs. | Endpoint e operação aprovados; sem deploy nesta etapa. |
| 9 | Participação e capacidade | API e, se necessário, frontend | Contrato de entrada/saída/limite, testes de duplicidade e concorrência; revisão do termo “convite”. | Decisão de participação. |

Cada PR deve conter apenas os arquivos necessários, testes focados, `git diff --check`, evidência de execução em ambiente fictício e procedimento de reversão. Itens 5, 6, 8 e 9 ficam bloqueados pelas decisões indicadas; o item 3 contém apenas contenção, não a política definitiva de exclusão. Não preencher lacunas com regra inventada. Nenhum PR desta proposta inclui upgrade de Laravel, reescrita, merge ou deploy.

## Aprovação solicitada

1. Confirmar ou corrigir a **matriz mínima de escrita por proprietário** e a contenção de leitura enquanto a política não existe.
2. Decidir quem pode descobrir eventos e ver detalhe, endereço e imagem; definir o significado de participação e cobrança.
3. Aprovar a ordem das Issues/PRs e o tratamento temporário de `/event/pay`, `/events/fill` e exclusão definitiva.

Até essa revisão, esta página é proposta técnica; não autoriza implementação nem exposição da API.
