# Product Backlog

## Histórico de Revisão

|    Data    | Versão |   Descrição    |          Autor(es)           |
| :--------: | :----: | :------------: | :--------------------------: |
| 09/07/2022 |  1.0   | Versão inicial |        Toda a equipe         |
| 17/01/2023 |  2.0   |  Versão Final  | Giulia, Julio, Silas, Helder |

## 1. Épicos

| Épico | Descrição                         |
| ----- | --------------------------------- |
| E1    | Disponibilizar forum de duvidas   |
| E2    | Estabelecer ranking               |
| E3    | Realizar administraçao de pessoas |
| E4    | Estabelecer chat de comunicação   |

## 2. Features

| Épico | Feature | Descrição                                  |
| ----- | ------- | ------------------------------------------ |
| E1    | FT01    | Gerenciar avisos                           |
| E1    | FT02    | Gerenciar perguntas                        |
| E1    | FT03    | Gerenciar respostas                        |
| E2    | FT04    | Gerenciar rankeamento de usuários          |
| E2    | FT05    | Gerenciar rankeamento de perguntas         |
| E2    | FT06    | Gerenciar rankeamento de respostas         |
| E2    | FT07    | Gerenciar rankeamento de avisos            |
| E3    | FT08    | Gerenciar usuarios                         |
| E3    | FT08    | Gerenciar autenticação de dados do usuario |
| E4    | FT01    | Gerenciar mensagens                        |
| E4    | FT02    | Gerenciar historico de conversas           |

## 3. User Stories

<!-- -> mudar o numero dos epicos, o numero das features, o numero das historias
-> adicionar as historias 1, 2, 3, 4, 9, 12, 17 e 18 segundo o novo mvp
adicionar os criterios e a prioridade que estão no documento do bacdklog -->

| Épico | Feature | US  | Descrição | Critérios de Aceitação | Prioridade |
| ----- | ------- | --- | --------- | ---------------------- | ---------- |
E1|FT01|US01| Eu, como usuário, gostaria de cadastrar avisos para informar notícias de acontecimentos como monitorias | Caracteres especiais devem ser aceitos ao criar aviso<br><br>Números devem ser aceitos ao criar aviso<br><br>Avisos devem ter identificações diferentes<br><br> Os avisos devem ser adicionadas em alguma engenharia<br><br>O corpo do aviso deve ser obrigatório<br><br>O título do aviso deve ser obrigatório<br><br>O filtro do aviso deve ser obrigatório<br><br>A engenharia do aviso deve ser obrigatória |Alta
E1|FT01|US02| Eu, como usuário, gostaria de visualizar uma lista de avisos feitos para ficar ciente dos acontecimentos da Universidade. | É permitida a visualização de um aviso por vez<br><br>Uma lista de avisos já feitos anteriormente deve ser visualizada<br><br>Os avisos podem estar separadas por área de conhecimento<br><br>A visualização deve conter o nome e o curso do usuário que fez o aviso |Alta
E1|FT01|US03| Eu, como usuário, gostaria de apagar meus avisos para caso de escrita incorreta ou passagem de prazo | A exclusão pode ser feita a qualquer momento sem limite de tempo após sua publicação<br><br>Somente o autor do aviso pode apagá-lo |Alta
E1|FT01|US04| Eu, como usuário gostaria de salvar os avisos que me interessem, para não perde-los e poder verifica-los mais facilmente depois | Os avisos salvos devem ser visualizados numa aba a parte chamada "avisos"<br><br>Deve-se exibir apenas o nome do aviso salvo na lista de visualização |Alta
E1|FT02|US05| Eu como usuário gostaria de ser capaz de publicar perguntas para tirar minhas dúvidas | Caracteres especiais devem ser aceitos ao criar pergunta <br><br> Números devem ser aceitos ao criar pergunta <br><br> Perguntas devem ter identificações diferentes <br><br> As perguntas devem ser adicionadas em alguma engenharia<br><br>O corpo da pergunta deve ser obrigatório<br><br>O título da pergunta deve ser obrigatório<br><br>O filtro da pergunta deve ser obrigatório<br><br>A engenharia da pergunta deve ser obrigatória|Alta
E1|FT02|US06 | Eu como usuário gostaria de visualizar perguntas para fins de busca e estudo | É permitida a visualização dos detalhes de uma pergunta  <br><br> Uma lista de perguntas já feitas anteriormente deve ser visualizada <br><br> As perguntas podem estar separadas por área de conhecimento <br><br> A visualização deve conter o nome e o curso do usuário que fez a pergunta | Alta
E1 | FT02 | US07 | Eu como usuário gostaria de pesquisar perguntas por tema para fins de estudo | A busca deve ser feita através de um filtro por matérias | Alta
E1|FT02|US08|Eu como usuário gostaria de poder deletar as minhas perguntas para caso de escrita incorreta| A exclusão pode ser feita a qualquer momento sem limite de tempo após sua publicação <br><br> Somente o autor da pergunta pode apagá-la | Alta
E1|FT02|US09| Eu como usuário gostaria de salvar as perguntas que me interessem, para não perde-los e poder verifica-los mais facilmente depois | As perguntas salvas devem ser visualizadas numa aba a parte chamada "perguntas"<br><br>Deve-se exibir apenas o nome da pergunta salva na lista de visualização |Alta
E1|FT03|US10|Eu como usuário gostaria de poder responder todas as perguntas disponibilizadas no forum para fins de ajudar outros usuarios| Caracteres especiais devem ser aceitos ao criar respostas;<br><br>Números devem ser aceitos ao criar respostas;<br><br>Respostas devem ter identificações diferentes;<br><br>Uma resposta não poderá existir se não existir um usuário e uma pergunta para criá-la<br><br>O corpo da resposta deve ser obrigatório | Alta
E1|FT03|US11|Eu como usuário gostaria de ser capaz de visualizar as respostas para fins de soluções de dúvidas| Uma lista de respostas deve ser visualizada <br><br> A visualização deve conter o nome e o curso do usuário que fez a pergunta <br><br> As respostas devem ser visualizadas somente em perguntas específicas |Alta
E1|FT03|US12|Eu, como usuário, gostaria de deletar minhas respostas para fim de escrita incorreta | A exclusão pode ser feita a qualquer momento sem limite de tempo após sua publicação<br><br>Somente o autor da resposta pode apagá-la |Alta
E2|FT04|US13|Eu como usuário gostaria de dar nota para os outros usuários para mudar suas posições no ranking | A votação será feita por estrelas |Alta
E2|FT04|US14|Eu como usuário gostaria de visualizar a minha posição no ranking geral para fins de melhora-la| O rankeamento precisa ser em ordem decrescente (do mais votado para o menos votado) |Alta
E2|FT05|US15|Eu como usuário gostaria de visualizar as perguntas do fórum conforme a ordem de rankeamento para saber as perguntas mais e menos relevantes| O rankeamento precisa ser em ordem decrescente (do mais votado para o menos votado) |Alta
E2|FT05|US16|Eu como usuário gostaria de avaliar as perguntas feitas por outros usuários para fins de nivelamento| A votação será feita por estrelas |Alta
E2|FT06|US17|Eu, como usuário, gostaria de avaliar as respostas fornecidas para fim de destaque das melhores respostas| A votação será feita por estrelas |Alta
E2|FT06|US18|Eu, como usuário, gostaria de visualizar as respostas em ordem de rankeamento, para saber as melhores respostas fornecidas| O rankeamento precisa ser em ordem decrescente (do mais votado para o menos votado) |Alta
E2|FT07|US19| Eu, como usuário, gostaria de avaliar os avisos postados para fim de destaque dos mais importantes | A votação será feita por estrelas |Alta
E2|FT07|US20| Eu, como usuário, gostaria de visualizar os avisos em ordem de rankeamento, para saber quais sao os principais avisos da faculdade | O rankeamento precisa ser em ordem decrescente (do mais votado para o menos votado) |Alta
E3|FT08|US21|Eu como usuário gostaria de me cadastrar no sistema para utilizar suas funcionalidades| O cadastro precisa conter: nome completo, curso do aluno, matricula, celular, alem de um email e uma senha <br><br> Não é possivel cadastrar um email existente <br><br> Não é possivel cadastrar uma matricula existente |Alta
E3|FT08|US22|Eu como usuário gostaria de visualizar os meus dados cadastrais em uma aba de perfil para poder conferir se as informações estão corretas| Todas as informações utilizadas no cadastro devem estar disponíveis nesta aba, menos matrícula e senha<br><br>É permitida a visualização de um usuario por vez<br><br>Uma lista de usuários deve ser visualizada |Alta
E3|FT08|US23|Eu como usuário gostaria de ter a possibilidade de buscar outros usuários para poder averiguar as perguntas que um usuário já fez | A busca deve ser feita por nome |Alta
E3|FT08|US24|Eu como usuário gostaria de editar os dados do meu perfil para caso alguma informação tenha sido preenchida incorretamente possa ser mudada | Todos os dados podem ser atualizados a qualquer momento sem limite de quantidade |Alta
E3|FT08|US25|Eu como usuario gostaria de ter a possibilidade de deletar minha conta para caso não deseje mais utilizá-la| Ao excluir a conta, todas as atividades do usuário serão excluídas |Alta
E3|FT09|US26|Eu como usuário gostaria de realizar login com email e senha para adentrar no sistema| O login pode ser feito atraves de email e senha |Alta
E3|FT09|US27|Eu como usuário gostaria de ter a possibilidade de recuperar minha senha através do email caso eu a esqueça| O e-mail deve ser autenticado em até 10 minutos | Alta


# SAFe - Canvas

<iframe width="768" height="432" src="https://miro.com/app/board/uXjVP-ZXHz0=/?share_link_id=277451054040" frameborder="0" scrolling="no" allowfullscreen></iframe>
