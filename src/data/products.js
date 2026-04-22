import { formatStartingPrice } from './pricing';

export const categories = [
  {
    id: 'boneco',
    slug: 'boneco',
    name: 'Mini Boneco',
    tagline: 'Sua cara, em miniatura.',
    shortDescription: 'Boneco personalizado feito a partir de uma foto sua — impresso em 3D e pintado à mão.',
    heroSubtitle: 'Bonecos personalizados',
    heroTitle: 'Sua cara em\nminiatura.',
    heroDescription: 'A partir de uma foto sua (ou de quem você quer presentear), a gente cria um boneco personalizado em miniatura, imprime em 3D de alta resolução e finaliza tudo à mão. Sai uma peça só sua.',
    price: formatStartingPrice('boneco'),
    sections: [
      {
        id: 'detail',
        label: 'Detalhes',
        title: 'Cada detalhe\nconta.',
        description: 'Do formato do rosto ao corte do cabelo, a gente cuida de cada detalhe pra capturar o jeito de quem é retratado. Nenhuma miniatura sai igual à outra.',
        features: [
          'Tamanho padrão de 12 cm',
          'Cabeça estilizada com traços marcantes',
          'Olhos expressivos e personalidade',
          'Roupa e acessórios do jeito que você pedir',
        ],
      },
      {
        id: 'process',
        label: 'Processo',
        title: 'Da foto pra\nestante.',
        description: 'Tudo começa com a preparação da peça e termina com a pintura à mão. Cada miniatura passa por várias etapas entre imprimir, lixar e pintar.',
        features: [
          'Impressão 3D em PLA de alta definição',
          'Pintura à mão, com tintas acrílicas de qualidade',
          'Verniz protetor pra peça durar',
        ],
      },
      {
        id: 'finish',
        label: 'Acabamento',
        title: 'Feito à mão.\nCom calma.',
        description: 'A pintura é o que dá vida pra miniatura. Cada camada é aplicada à mão, devagar — é o tipo de coisa que máquina nenhuma faz igual.',
        features: [
          'Base personalizada com nome (se você quiser)',
          'Caixinha de apresentação inclusa',
          'Certificado de autenticidade',
          'Embalagem caprichada, pronta pra presentear',
        ],
      },
    ],
    portfolio: [
      { id: 1, title: 'Casal', description: 'Topo de bolo de casamento', image: '/media/funko/5.jpg' },
      { id: 2, title: 'Noivos', description: 'Presente surpresa de aniversário', image: '/media/funko/6.jpg' },
      { id: 3, title: 'Formatura', description: 'Pra marcar uma conquista grande', image: '/media/funko/4.jpg' },
      { id: 4, title: 'Família inteira', description: 'Todo mundo junto numa base só', image: '/media/funko/3.jpg' },
      { id: 5, title: 'Cosplay', description: 'Seu personagem favorito em miniatura', image: '/media/funko/2.jpg' },
      { id: 6, title: 'Com uniforme', description: 'Miniatura com a profissão', image: '/media/funko/1.jpg' },
    ],
    faq: [
      { q: 'Qual é o prazo?', a: 'Em média, de 5 a 15 dias depois que a gente alinha os detalhes com você. Se tiver uma data específica em mente, é só avisar na hora do pedido.' },
      { q: 'Consigo pedir ajustes no modelo?', a: 'Pode! Antes de imprimir, a gente manda uma prévia digital. Tem direito a 2 rodadas de ajuste sem custo.' },
      { q: 'De que material é feito?', a: 'PLA de alta qualidade. Ele permite ótimo acabamento e excelente durabilidade na peça.' },
    ],
  },
  {
    id: 'pet',
    slug: 'pet',
    name: 'Mini Pet',
    tagline: 'Seu melhor amigo, pra sempre ali.',
    shortDescription: 'Miniatura realista do seu pet, com todos aqueles detalhes que só quem convive enxerga.',
    heroSubtitle: 'Miniaturas de pets',
    heroTitle: 'Pra ter seu melhor\namigo sempre por perto.',
    heroDescription: 'A gente cria uma réplica em miniatura do seu pet — com a pelagem certa, a pose do jeitinho dele e aquela cara que você conhece de cor. Tudo feito à mão, peça única.',
    price: formatStartingPrice('pet'),
    sections: [
      {
        id: 'detail',
        label: 'Fidelidade',
        title: 'Cada detalhe\nimporta.',
        description: 'A mancha diferente, o olhar, a forma da orelha. Esses são os detalhes que a gente faz questão de capturar — porque é isso que faz a peça lembrar ele de verdade.',
        features: [
          'Cores e padrões reproduzidos fielmente',
          'Expressão do rosto característica',
          'Pose escolhida por você',
          'Textura de pelagem trabalhada à mão',
        ],
      },
      {
        id: 'process',
        label: 'Processo',
        title: 'Arte que\nhonra vidas.',
        description: 'A gente sabe o lugar que um pet ocupa. Por isso tratamos cada miniatura como um retrato — um jeito de manter a presença dele por perto.',
        features: [
          'Análise cuidadosa das fotos que você manda',
          'Definição dos detalhes com você antes da produção',
          'Impressão 3D em PLA de alta resolução',
          'Pintura feita à mão, com tintas acrílicas de qualidade',
        ],
      },
      {
        id: 'finish',
        label: 'Apresentação',
        title: 'Uma memória\nque se toca.',
        description: 'A entrega é com base com o nome dele se você quiser. Fica pronto pra exibir — em casa, no escritório, onde fizer sentido.',
        features: [
          'Base em PLA com o nome gravado',
          'Caixa de apresentação',
          'Fica uma homenagem ou presente perfeito',
        ],
      },
    ],
    portfolio: [
      { id: 1, title: 'Golden Retriever', description: 'Pelagem dourada em detalhe', image: '/media/pet/4.jpg' },
      { id: 2, title: 'Siamês', description: 'Olhos azuis e pose elegante', image: '/media/pet/2.jpg' },
      { id: 3, title: 'Bulldog Francês', description: 'Aquela cara carismática', image: '/media/pet/1.jpg' },
      { id: 4, title: 'Border Collie', description: 'Pelagem bicolor trabalhada', image: '/media/pet/3.jpg' }
    ],
    faq: [
      { q: 'Quantas fotos preciso mandar?', a: 'Uma foto boa já é o suficiente pra gente começar. A gente analisa e, se precisar de mais algum ângulo, pede diretamente pra você.' },
      { q: 'Vocês fazem qualquer bichinho?', a: 'Sim! Já fizemos cachorro, gato, coelho, ave e até réptil. Se for um pet, a gente dá um jeito.' },
      { q: 'Posso escolher a pose?', a: 'Pode. Você escolhe a pose ou deixa a gente sugerir uma que combine com ele.' },
    ],
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
