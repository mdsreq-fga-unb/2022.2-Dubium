# PBB & BDD Canvas

<iframe width="768" height="432" src="https://miro.com/app/board/uXjVP5R0Pa0=/?share_link_id=614337566623" frameborder="0" scrolling="no" allowfullscreen></iframe>

# Product Backlog Building 

## Problemas

* Falta de centralização das dúvidas da comunidade FGA.
* Dificuldade dos professores de saber os principais pontos de dúvidas dos alunos nas matérias
* Dificuldade em conseguir marcar um horário de tiradas de dúvidas
* Dificuldade de encontrar respostas para suas dúvidas
* Falta de motivação para os alunos na hora de ajudar seus colegas

## Expectativas

* Encontrar em um único lugar questões relacionadas as disciplinas da FGA.
* Rankeamento das perguntas mais votadas em cada área  nas matérias específicas
* Poder avisar um horário para tirar dúvidas
* Postagem de respostas para perguntas de pessoas que dominam assuntos de interesse. 
* Incentivo através de um rankeamento para os outros alunos

## Personas
### Iracema: 43 anos, formada em Engenharia Ambiental, professora de Desenvolvimento Sustentavel
#### FAZ:
* TIRAR DÚVIDAS DE ALUNOS PRESENCIALMENTE
* CRIAR FORMULÁRIOS PARA RECEBER FEEDBACKS DAS MATÉRIAS
#### ESPERA;
* VER DÚVIDAS MAIS FREQUENTES DOS ALUNOS NAS MATÉRIAS

### Julio Carlos: 20 anos, estudante de engenharia de software e monitor
#### FAZ:
* MANDAR PERGUNTAS NOS MEIOS DE COMUNICAÇÃO
* MARCAR MOMENTO DE TIRAR DUVIDAS
#### ESPERA:
* FAZER PERGUNTAS EM UM SÓ AMBIENTE
* AVISAR MENTORIA
* AJUDAR OUTROS ALUNOS RESPONDENDO PERGUNTAS
* AUMENTAR SEU NÍVEL NO RANKING GERAL

## Funcionalidades

### VER DÚVIDAS MAIS FREQUENTES DOS ALUNOS NAS MATÉRIAS
* PROBLEMAS: Dificuldade dos professores de saber os principais pontos de dúvidas dos alunos nas matérias
* BENEFÍCIOS: Rankeamento das perguntas mais votadas em cada área  nas matérias específicas

### FAZER PERGUNTAS EM UM SÓ AMBIENTE
* PROBLEMAS: Falta de centralização das dúvidas da comunidade FGA.
* BENEFÍCIOS: Encontrar em um único lugar questões relacionadas as disciplinas da FGA.

### AVISAR MENTORIA
* PROBLEMAS: Dificuldade em conseguir marcar um horário de tiradas de dúvidas
* BENEFÍCIOS: Poder avisar um horário para tirar dúvidas

### AJUDAR OUTROS ALUNOS RESPONDENDO PERGUNTAS
* PROBLEMAS: Dificuldade de encontrar respostas para suas dúvidas
* BENEFÍCIOS: Postagem de respostas para perguntas de pessoas que dominam assuntos de interesse.

### AUMENTAR SEU NÍVEL NO RANKING GERAL
* PROBLEMAS: Falta de motivação para os alunos na hora de ajudar seus colegas
* BENEFÍCIOS: Incentivo através de um rankeamento para os outros alunos

## PBIs

### VER DÚVIDAS MAIS VOTADAS DOS ALUNOS NAS MATÉRIAS
* US01: Eu, como professora, quero filtrar perguntas por matéria no fórum de dúvidas, parar conseguir encontrar mais facilmente as dúvidas referentes a minha matéria
* US02: Eu, como professora, quero visualizar perguntas mais votadas na página de cada engenharia, para ter um feedback sobre quais os principais tópicos de dúvidas na minha matéria

### FAZER PERGUTAS
 EM UM SÓ AMBIENTE
* US03: Eu, como estudante gostaria de visualizar as perguntas existentes nos fóruns desejados, para tentar solucionar minhas dúvidas mais rapidamente
* US04: Eu, como estudante gostaria de criar uma nova pergunta no fórum desejado, para tirar minha dúvida caso não a encontre anteriormente
* US05: Eu, como estudante gostaria de apagar minhas próprias perguntas no fórum de dúvidas, para caso eu note que elas já haviam sido feitas ou perceba que esteja escrita

### AVISAR MONITORIA
* US06: Eu, como estudante gostaria de criar mensagens no fórum de avisos de cada matéria, para facilitar minha comunicação caso deseje avisar um horário de monitoria
* US07: Eu, como estudante gostaria de apagar minhas mensagens no fórum de avisos de cada matéria, para caso a data colocado no aviso já tenha expirado ou caso eu tenha escrito o aviso errado

### AJUDAR OUTROS ALUNOS RESPONDENDO PERGUNTAS
* US08: Eu, como estudante gostaria de selecionar perguntas a serem respondidas na página da engenharia, para ter a possibilidade de responder as dúvidas existentes
* US09: Eu, como estudante gostaria de responder as perguntas na página da engenharia, para auxiliar outros alunos na tirada de dúvidas
* US10: Eu, como estudante gostaria de apagar as minhas próprias respostas na página da engenharia, para caso a minha resposta esteja equivocada ou tenha

### AUMENTAR SEU NÍVEL NO RANKING GERAL
* US11: Eu, como estudante gostaria de votar no perfil de outro estudante do site, para classificar este usuário como bom
* US12: Eu, como estudante gostaria de tirar meu voto no perfil de outro estudante do site, para caso eu tenha votado equivocadamente ou não ache que ele solucionou minha dúvida

# Behavior Driven Development

## CENÁRIO 1: US08
### TÍTULO: Dúvida a ser respondida
Dado que a pergunta feita possui caracteres válidos e até 1000 caracteres.
Quando o aluno enviar sua pergunta
Então, a pergunta deverá ser subida para o fórum

## CENÁRIO 2: US09
### TÍTULO: Resposta da pergunta feita
Dado que a resposta feita possui caracteres válidos e até 1000 caracteres Quando o aluno enviar sua resposta Então, a resposta deverá ser subida para o fórum abaixo da pergunta feita

## CENÁRIO 3: US03
### TÍTULO: Visualizar pergunta disponível
Dado que a pergunta feita faz parte de uma lista e seja aberta sozinha numa nova página
Quando o aluno clicar na pergunta
Então, o sistema deverá exibir a pergunta que o aluno selecionar

## CENÁRIO 4: US01
### TÍTULO: Perguntas mais votadas
Dado que as perguntas estejam na tag correspondente e dentro do seu respectivo tema
Quando o professor clicar para buscar perguntas por tema de matéria
Então, o sistema deve exibir as perguntas mais votadas feitas pelos alunos


## CENÁRIO 5: US06
### TÍTULO: Criar aviso de monitoria
Dado que o aviso tenha até 1000 caracteres e possua um filtro para notificar que é um aviso
Quando o aluno monitor escrever um aviso
Então, o sistema deverá postar no fórum o aviso criad

