## Inversão de dependência (Dependency Inversion Principle - DIP)

O conceito de "Inversão de Dependência" é um princípio fundamental da programação orientada a objetos e do design de software, introduzido por Robert C. Martin. Também é conhecido pelo acrônimo "DIP" (Dependency Inversion Principle). O objetivo desse princípio é reduzir o acoplamento entre componentes de um sistema, promovendo um design mais flexível, reutilizável e fácil de manter.

A Inversão de Dependência envolve duas diretrizes principais:

1. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
2. Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Em outras palavras, em vez de depender de implementações concretas (detalhes), os módulos de alto nível devem depender de interfaces ou abstrações genéricas, permitindo a substituição das implementações sem afetar o funcionamento dos módulos de alto nível.

Vantagens da Inversão de Dependência:

1. **Flexibilidade e Manutenção:** A separação das dependências facilita a alteração e a substituição de componentes sem afetar o resto do sistema.
2. **Testabilidade:** Componentes dependentes podem ser facilmente substituídos por mock objects ou stubs durante os testes.
3. **Reutilização:** As abstrações podem ser compartilhadas por diferentes partes do sistema, promovendo a reutilização de código.
4. **Acoplamento Reduzido:** A dependência é direcionada para interfaces, reduzindo o acoplamento entre componentes.
5. **Escalabilidade:** O design orientado a abstrações facilita a adição de novos componentes ou funcionalidades ao sistema.

Um exemplo prático da aplicação da Inversão de Dependência é o uso de injeção de dependência (Dependency Injection) em que as dependências de um objeto são injetadas nele em vez de serem criadas internamente. Isso permite que as dependências sejam substituídas facilmente, promovendo a flexibilidade e a modularidade.

Em resumo, a Inversão de Dependência é um princípio importante que busca quebrar o acoplamento rígido entre componentes de software, promovendo um design mais flexível, adaptável e de fácil manutenção.
