## Responsabilidade Única (Single Responsibility Principle - SRP)

O Princípio de Responsabilidade Única (Single Responsibility Principle - SRP) é um dos cinco princípios do SOLID, um conjunto de diretrizes de design de software que visam criar sistemas mais compreensíveis, flexíveis e fáceis de manter. O SRP foi introduzido por Robert C. Martin e destaca a importância de um componente (classe, módulo, função, etc.) ter uma única responsabilidade.

Em essência, o SRP afirma que:

> Um componente deve ter uma única razão para mudar.

Isso significa que uma classe ou módulo deve ter uma única responsabilidade funcional bem definida, e essa responsabilidade deve ser encapsulada nesse componente. Se uma classe possui várias responsabilidades, ela se torna mais difícil de compreender, manter e reutilizar, pois as mudanças em uma responsabilidade podem afetar inadvertidamente outras partes do sistema.

Os benefícios do Princípio de Responsabilidade Única incluem:

1. **Facilita a Manutenção:** Componentes com uma única responsabilidade são mais fáceis de entender, depurar e corrigir, pois cada responsabilidade está contida em um único lugar.

2. **Promove a Reutilização:** Componentes mais especializados são mais propensos a serem reutilizados em diferentes partes do sistema.

3. **Aumenta a Flexibilidade:** Se uma mudança for necessária em uma única responsabilidade, não afetará outras partes do sistema, reduzindo o risco de efeitos colaterais.

4. **Melhora a Testabilidade:** Componentes mais focados são mais fáceis de testar, pois os cenários de teste estão mais delimitados.

5. **Colaboração Mais Clara:** Quando os componentes têm uma única responsabilidade, a colaboração entre desenvolvedores se torna mais clara, já que cada componente é mais especializado.

Por exemplo, considere um sistema de gerenciamento de pedidos. O SRP sugere que as classes envolvidas nesse sistema, como "Pedido", "Cliente" e "Estoque", devem ter apenas a responsabilidade relacionada a essas entidades específicas. Separar as responsabilidades em diferentes classes facilita a manutenção e evita que mudanças em uma parte afetem as outras.

Em resumo, o Princípio de Responsabilidade Única é uma diretriz fundamental de design de software que ajuda a criar componentes mais coesos, mais fáceis de manter e mais flexíveis, contribuindo para um código de melhor qualidade e um sistema mais robusto.