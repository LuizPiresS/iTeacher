# Regras de negócio

**Versão 0.0.1**

- Nesta versão o sistema não oferece suporte a salas de aula virtuais, apenas aulas presenciais (o professor deverá ter o local ou já ter uma infraestrutura para aulas online como discord).
- O sistema não oferecerá meios de pagamento o aluno deverá pagar o valor da aula diretamente ao professor.

-[ ] Todo novo usuário quando se cadastra no sistema, deve ser cadastrado com o status de "Aluno" e com o perfil de "Aluno". V0

-[ ] O sistema deve permitir que o usuário altere seu perfil para "Professor" assim o mesmo poderá ofertar suas aulas na plataforma. V0

-[ ] O sistema deve permitir que o "Professor" faça requisição para se tornar "Professor verificado".
Para isso o mesmo deve enviar uma foto de sua carteira de identidade e uma foto de seu comprovante de residência e a documentação para comprovar sua formação(nas áreas em que isso é necessário). V0

-[ ] O sistema deve permitir que um "Professor" possa ofertar aulas para qualquer "Aluno" que esteja cadastrado na plataforma. V0

-[ ] O sistema deve permitir que um "Aluno" possa se matricular em aulas de qualquer "Professor" que esteja cadastrado na plataforma. V0

> Regras de negócio para o usuário
>
> 1- A senha deve ter no mínimo 8 caracteres e conter letras maiúsculas, minúsculas, números e caracteres especiais.
> 2- O usuário deve ativar sua conta via e-mail ou celular (sms).

- [ ] Usuário

  - [x] Pode se registar
    - [x] Nome
    - [x] Email (login)
    - [x] Senha
    - [x] Telefone (opcional)
    - [x] Data de nascimento (opcional)
    - [x] Foto (opcional)
    - [x] Endereço (opcional)
    - [x] Cidade (opcional)
    - [x] Estado (opcional)
    - [x] País (opcional)
    - [x] CEP (opcional)
    - [ ] status (Aluno)
    - [x] Pode se logar
    - [x] Pode se deslogar
    - [x] Pode ver seu perfil
    - [x] Pode editar seu perfil
    - [x] Pode resetar sua senha
    - [ ] Pode deletar sua conta
    - [ ] Pode requisitar a mudança de seu perfil para "Professor" ou "Professor verificado"

- [ ] Aluno

  - [ ] Pode listar todos os professores cadastrados
    - [ ] Pode ver o perfil de um professor
    - [ ] Pode contratar um professor
    - [ ] Pode escolher o dia e horario da aula (o professor deve ter disponibilidade para aquele dia e horario (agenda))
  - [ ] Pode ver seus professores
    - [ ] Pode ver os detalhes de uma aula
    - [ ] Pode ver os detalhes de um exercício

- [ ] Professor
  - [ ] Pode tornar seu perfil publico (para que os alunos possam ver seu perfil)
  - [ ] Pode cadastrar sua área de atuação (Ex: Matemática, Física, Química, etc)
  - [ ] Pode ver seus alunos
  - [ ] Pode cadastrar aulas de apoio (Ex: videos de aulas no youtube)
  - [ ] Pode cadastrar exercicios para seus alunos
  - [ ] Pode cadastrar aulas pre-gravadas
  - [ ] Pode cadastrar uma agenda com seus horarios disponives para aulas
  - [ ] Pode cadastrar um valor para cada aula (e as formas de pagamento)
  - [ ] Pode cadastrar o endereço de sua aula (para que os alunos possam ver onde será a aula)
