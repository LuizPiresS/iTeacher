# iTeacher

O **iTeacher** é uma plataforma inovadora que conecta alunos e professores, facilitando o agendamento de aulas presenciais e, futuramente, remotas. O sistema foi projetado para promover a educação personalizada, aproximando quem quer aprender de quem pode ensinar, com foco em qualidade, segurança e experiência do usuário.

A plataforma permite que alunos encontrem professores por proximidade, área de conhecimento, avaliação e especialidade, utilizando recursos de geolocalização para recomendações inteligentes. Professores podem criar perfis detalhados, cadastrar horários disponíveis, definir preços e receber avaliações dos alunos, promovendo um ambiente meritocrático e transparente.

O iTeacher diferencia-se por:
- Sistema de avaliação robusto, com critérios diferenciados para professores verificados e não verificados.
- Busca inteligente baseada em localização e ranking.
- Processo seguro de cadastro e validação de usuários.
- Gestão de agenda e bloqueio automático de horários.
- Foco inicial em aulas presenciais, com arquitetura preparada para expansão para aulas remotas e recursos multimídia.

O público-alvo são estudantes de todas as idades que buscam reforço escolar, aulas particulares ou desenvolvimento de novas habilidades, e professores/autônomos que desejam ampliar sua rede de alunos e profissionalizar seu serviço.

O MVP contempla:
- Cadastro e validação de alunos e professores
- Busca e agendamento de aulas presenciais
- Sistema de avaliação
- Gestão de perfis e agenda
- Geolocalização para recomendações

A visão de futuro inclui integração com plataformas de vídeo, aulas remotas, pagamentos online, notificações e muito mais.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E=18.x-blue)

Sistema backend modular para gestão de usuários, perfis e aulas, baseado em NestJS, Prisma e PostgreSQL, com foco em educação, avaliações e geolocalização. O projeto segue princípios de arquitetura limpa e escalável.

---

## Sumário
- [iTeacher](#iteacher)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Principais Regras de Negócio](#principais-regras-de-negócio)
    - [Fluxos de Aluno](#fluxos-de-aluno)
    - [Fluxos de Professor](#fluxos-de-professor)
  - [Tecnologias](#tecnologias)
  - [Instalação](#instalação)
  - [Como Usar](#como-usar)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Testes](#testes)
  - [Documentação](#documentação)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

---

## Sobre o Projeto
O iTeacher é uma API backend para conectar alunos e professores, permitindo marcação de aulas presenciais, avaliações, busca por proximidade e gerenciamento de perfis. O sistema foi desenhado para ser seguro, escalável e fácil de evoluir, com regras de negócio claras para cada perfil de usuário.

## Principais Regras de Negócio
- **MVP**: Inicialmente, apenas aulas presenciais podem ser marcadas.
- **Cadastro de Aluno**: Inclui endereço (convertido em coordenadas geográficas), telefone, e-mail (com validação via token) e senha hasheada.
- **Cadastro de Professor**: Dois tipos (verificado e não verificado), com envio de documentação para verificação e perfil público detalhado.
- **Sistema de Avaliação**:
  - Notas de 0 a 5 estrelas.
  - Professores verificados: avaliação ponderada (peso extra).
  - Professores não verificados e alunos: média simples.
- **Busca e Listagem**:
  - Alunos podem buscar professores por nome, disciplina, assunto, proximidade e avaliação.
  - Professores listados por proximidade e ranking.
- **Geolocalização**: Endereços são convertidos em coordenadas para recomendações e visualização no mapa.
- **Agenda do Professor**: Professores cadastram horários livres; horários ocupados são bloqueados automaticamente.
- **Avaliação**: Alunos avaliam professores e vice-versa.
- **Desativação e Exclusão de Conta**: Alunos podem desativar (reversível) ou deletar (irreversível) suas contas.
- **Valores monetários**: Sempre salvos como inteiros (ex: centavos).

### Fluxos de Aluno
- Cadastro, validação de e-mail, login, edição de dados, desativação/exclusão de conta.
- Cadastro e edição de perfil (bio, data de nascimento, site, imagem, etc).
- Busca e avaliação de professores.
- Escolha entre professores verificados ou não, filtro por proximidade e avaliação.

### Fluxos de Professor
- Cadastro (verificado ou não), envio de documentação, criação de perfil público.
- Cadastro de agenda e horários disponíveis.
- Cadastro de aulas gravadas (exemplo via YouTube).
- Avaliação de alunos.
- Definição de pontuação mínima de alunos para aceitar aulas.

---

## Tecnologias
- [NestJS](https://nestjs.com/) (v11)
- [Prisma ORM](https://www.prisma.io/) (v6)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (testes)
- [Swagger](https://swagger.io/) (documentação automática)
- ESLint, Prettier, Husky

## Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repo>
   cd iTeacher
   ```
2. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Suba os containers Docker:
   ```bash
   docker compose up -d
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Gere o client do Prisma:
   ```bash
   npx prisma generate
   ```
6. Rode as migrações:
   ```bash
   npx prisma migrate deploy
   ```

## Como Usar
- Inicie a aplicação em modo desenvolvimento:
  ```bash
  npm run start:dev
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api](http://localhost:3000/api)

## Estrutura do Projeto
```
├── src
│   ├── main.ts
│   ├── app.module.ts
│   └── modules
│       ├── users
│       │   ├── domain
│       │   ├── application
│       │   ├── infrastructure
│       │   └── presentation
│       └── profiles
│           ├── domain
│           └── http
├── prisma
│   ├── schema.prisma
│   └── migrations
├── test
├── docs
├── Dockerfile
├── docker-compose.yml
└── ...
```

## Testes
- Para rodar todos os testes:
  ```bash
  npm run test
  ```
- Para rodar testes de cobertura:
  ```bash
  npm run test:cov
  ```

## Documentação
- Gerar documentação automática:
  ```bash
  npm run doc
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api](http://localhost:3000/api)
- [Lean Architecture](./docs/concepts/lean-architecture.md)
- [Padrões de Projeto](./docs/concepts/dtos-pattern.md), [Service](./docs/concepts/service-pattern.md), [Repository](./docs/concepts/repository-pattern.md)
- [Princípios SOLID](./docs/concepts/single-responsibility-principle.md), [Dependency Inversion](./docs/concepts/dependency-inversion-principle.md)
- [Regras de Negócio](./docs/regras-de-negocios.md)

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/nome-feature`)
5. Abra um Pull Request

Consulte os guias internos para:
- [Nova variável de ambiente](./docs/how-to-make/environment-variables.md)
- [Novo módulo](./docs/how-to-make/new-module.md)
- [Novo DTO](./docs/how-to-make/new-dto.md)
- [Novo Controller](./docs/how-to-make/new-controller.md)
- [Novo Service](./docs/how-to-make/new-service.md)
- [Novo Model](./docs/how-to-make/new-model.md)
- [Novo Repository](./docs/how-to-make/new-repository.md)

## Licença
MIT




