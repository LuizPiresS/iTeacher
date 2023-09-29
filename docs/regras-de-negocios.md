**O MVP apenas será possível marcar aulas presenciais.**

Valores monetários deverão ser salvos como inteiros

Sistema de avaliação
O sistema de avaliação será baseado em notas de 0-5 estrelas

* Professores
  * Verificados: média + peso 0.13 (Média ponderada) Média Ponderada = (Valor1 *Peso1 + Valor2* Peso2 + ... + ValorN * PesoN) / (Peso1 + Peso2 + ... + PesoN)
    
    Didática

    Qualidade do material 
  * Não verificados: Média simples
* Alunos
  * Média simples

Alunos

Regras de negócios

> **Eu como aluno preciso me cadastrar na plataforma**

```JSON
{
  "name": "Random Name",
  "email": "random@random.com",
  "password": "P4$sword",
  "confirmPassword": "P4$sword",
  "cellPhone": "(99)999999999"
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  },
}
```

**O endereço deverá ser convertido em coordenadas geográficas**
(<https://www.youtube.com/watch?v=2Su-935B6jU>)

> A senha deve ser "hasheada"

> **Eu como aluno preciso validar o meu e-mail**
>
> Para isso o aluno precisa receber um e-mail com um token de 4 números com um link para validação

> **Eu como Aluno preciso poder editar meus dados na plataforma**
>
> Caso o email seja trocado o mesmo deve ser revalidado (ver cadastro de novo aluno)

```JSON
{
  "name": "Random Name",
  "email": "random@random.com",
  "password": "P4$sword",
  "confirmPassword": "P4$sword",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  },
  "cellPhone": "(99)999999999"
}
```

**O endereço deverá ser convertido em coordenadas geográficas**
(<https://www.youtube.com/watch?v=2Su-935B6jU>)

Eu como Aluno preciso me conectar na plataforma

```JSON
{
  "email": "random@random.com",
  "password": "P4$sword"
}
```

Eu como Aluno preciso que seja possível desativar minha conta (pode reativar quando desejar)

Eu como Aluno preciso que seja possível deletar minha conta (irreversível perderá todos os registros associados a esta
conta)

Eu como Aluno preciso cadastrar meu profile na plataforma

```JSON
{
  "dateOfBirth": "06/04/1981",
  "bio": "Random bio",
  "website": "random.com",
  "joinDate": "05/08/2022",
  "profileImage": "random.jpg"
}
```

Eu como Aluno preciso conseguir atualizar os dados do meu profile

```JSON
{
  "dateOfBirth": "06/04/1981",
  "bio": "Random bio",
  "website": "random.com",
  "joinDate": "05/08/2022",
  "profileImage": "random.jpg"
}
```

Alunos

Regras de negócios

* Os alunos poderão optar por listar apenas professores reconhecidos
* Os alunos poderão optar por aulas presenciais ou remotas
  * Quando a opção for presencial as recomendações serão por proximidade
  * A plataforma deverá conseguir pegar a localização do Aluno
  * <https://www.youtube.com/watch?v=2Su-935B6jU>
* Os alunos poderão avaliar os professores
* Os alunos poderão buscar por professores usando como filtro:
  * nome
  * disciplina (Matemática)
  * assuntos específicos (Algebra linear)
* Os professores serão listados por proximidade e avaliação (o professor mais próximo e com melhor avaliação)
  * Será criado uma rota entre a casa do aluno e do professor e será mostrado na tela a localização
    * O Aluno poderá selecionar o professor pelo mapa

Professores

Regras de negócios

* As aulas podem ser presenciais ou remotas
  * Para aulas presenciais a recomendação será feita por proximidade e por número de estrelas
  * O professor poderá cadastrar aulas gravadas de amosta (YouTube)
* Existirão dois tipos de professores na plataforma:
  * Professor verificado:
    * Deverá enviar documentação que comprove sua formação e identidade para a análise
  * Professor não verificado:
    * Qualquer Aluno poderá ofertar aulas particulares na plataforma, mas a plataforma não se responsabilizará
          pelas informações fornecidas no perfil e seu perfil terá um ranking menor que um professor verificado mesmo se
          o mesmo tiver uma pontuação menor
* Os professores poderão avaliar os alunos
* Os professores poderão cadastrar um perfil publico onde listará suas competências

```JSON
{
  "name": "Random Name",
  "bio": "Random bio",
  "email": "random@random.com",
  "academicEducation": "Random Academic Education",
  "schoolSubject": "Random School Subject",
  "specialty": "Random Specialty",
  "pricePerHour": 1000,
  "documentation": "Random links to documentation",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name",
  }
}
```

**O endereço deverá ser convertido em coordenadas geográficas**
(<https://www.youtube.com/watch?v=2Su-935B6jU>)

* O professor poderá setar qual# ENV
.env

#DATABASE
.docker/postgres/data a pontuação minima de um aluno para que aceite dar aulas ao mesmo (todos os alunos acima
  desta pontuação serão aceitos automaticamente)
* Os professores poderão cadastrar sua agenda com seus horários livres para a aula
  * A agenda deverá apresentar apenas os horários em que o professor estiver livre. Quando um horário for marcado por
      um aluno o mesmo não deve mais aparecer para outro aluno

```JSON
{
  "dayOfRheWeek": "Mondays",
  "startTime": "14:00",
  "endTime": "15:00",
  "address": {
    "street": "Random Street Name",
    "number": "123",# ENV
.env

#DATABASE
.docker/postgres/data
    "neighborhood": "Random Neighborhood Name"
  },
  "observation": "Random Observation",
  "pricePerHour": 1000
}
```

## Ambiente de desenvolvimento (BoilerPlate)

- [x] Criando o projeto
  * [x] Nest (<https://nestjs.com/>)
    * [x] git-commit-msg-linter ( <https://www.npmjs.com/package/git-commit-msg-linter> )
    * [x] Instalando e configurando o docker
    * [x] Remover arquivos desnecessários
    * [x] initial commit
  * [x] Qualidade de software
    * [x] huskyjs (<https://github.com/typicode/husky>)
    * [x] lint-staged (<https://github.com/okonet/lint-staged>)
    * [x] commit
  * [ ] Validation
    * [ ] <https://docs.nestjs.com/techniques/validation>
  * [ ] Módulo de configuração
    * [ ] <https://docs.nestjs.com/techniques/configuration>
  * [ ] Swagger
    * [ ] <https://docs.nestjs.com/openapi/introduction>
    * [ ] Referencia do projeto artisan-backend (<https://docs.nestjs.com/techniques/logger>)
  * [ ] Banco de dados
    * [ ] Prisma
      * [ ] Instalar prisma (<https://docs.nestjs.com/recipes/prisma>)
        * [ ] npm install prisma --save-dev
      * [ ] Inicializar
        * [ ] npx prisma init
      * [ ] Desenvolver o model Aluno
        * [ ] Editar arquivo schema.prisma
        * [ ] Criar a primeira migration
          * [ ] npx prisma migrate dev --name init
      * [ ] Desenvolver service de conexão (explicar onModuleInit)
      * [ ] Desenvolver o repositório base da plataforma (explicar generics)
  * [ ] Desenvolver módulo de envio de e-mail
  * [ ] Desenvolver módulo de hashing
  * [ ] Desenvolver módulo de Logger
  * [ ] Desenvolver módulo de users (dividir em duas camadas domain e http)
    * [ ] Desenvolver repository
      * [ ] criar interface
      * [ ] desenvolver o users.repository
    * [ ] Desenvolver users.service
      * [ ] criar interface
      * [ ] desenvolver método createUser
      * [ ] desenvolver testes
    * [ ] Desenvolver dtos
    * [ ] Desenvolver users.controller
      * [ ] Desenvolver o método createUser
      * [ ] Desenvolver testes
  * [ ] Instalar compodoc
    * [ ] npm i -D @compodoc/compodoc
    * [ ] gerar documentação
    * [ ] npx @compodoc/compodoc -p tsconfig.json -s (criar comando no package.json)

## Plataforma

- [ ] Refatorar módulo de student para aplicar regras de negócios
  * [ ] Desenvolver método createStudent
    * [ ] Desenvolver repository
      * [ ] Desenvolver interface
      * [ ] Desenvolver método de create
      * [ ] Commit
    * [ ] Desenvolver service
      * [ ] Desenvolver interface
      * [ ] Desenvolver método de createStudent
      * [ ] Desenvolver testes para o método createStudent
      * [ ] Commit
* [ ] Desenvolver módulo Twitch
  * [ ] Desenvolver interface
