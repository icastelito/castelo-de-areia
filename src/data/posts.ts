import type { Post } from '../types/Post';

// Dados de exemplo - você pode substituir por seus próprios poemas
export const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Soneto perdido entre cachos vermelhos',
    type: 'poem',
    content: `Não sei onde andam meus pensamentos
Os perdi em meio a teus cachos rubros
Um rio de brasas rompendo o escuro
Da solidão que me priva de um acalento

Não te desejo por um mero momento
Pois é em meus desejos que te descubro
Em meus versos escondo alguns sussurros
De um ardor que já te espera há tempos

Tempo que insiste em ser arrastado
Para que deuses loucos possam desfrutar
Do nosso anseio que os deixa embriagados

Com medo do toque entre o céu e o mar
Não desejam ver um beijo incendiado
Invejosos que não deixarei nos atrapalhar`,
declamation: '',
    author: 'Icaro Castelo',
    date: new Date('2025-08-13T12:00:00'),
    tags: ['amor', 'poesia', 'soneto', 'cachos'],
    excerpt: 'Não sei onde andam meus pensamentos / Os perdi em meio a teus cachos rubros...',
    metadata: {
      verses: 14,
      stanzas: 4
    }
  },
  {
    id: '2',
    title: 'Museu de ti',
    type: 'poem',
    content: `Meus pensamentos podem até me pertencer,
mas, em cada quadro deles,
o que reside é uma pintura de você.

Um museu das tuas curvas,
dos teus risos,
da tua cintura,
do teu olhar,
da tua doçura.

É você,
impressa, esculpida, desenhada, descrita
na minha mente toda.
Em cada canto, em cada esquina,
só registros de ti.`,
    author: 'Icaro Castelo',
    date: new Date('2025-07-04T12:00:00'),
    tags: ['museu', 'memória', 'recomeço'],
    excerpt: 'Meus pensamentos podem até me pertencer, mas, em cada quadro deles, o que reside é uma pintura de você.',
    metadata: {
      verses: 13,
      stanzas: 3
    }
  },
  {
    id: '3',
    title: 'Musa',
    type: 'poem',
    content: `Tu me atiça poesia,
preenche meus pensamentos
com simples palavras do dia a dia.

Tu me inspiras música,
quando eu já esqueci o ritmo e a melodia.
Tua lembrança acelera o batuque do meu coração.

Tu me respiras literatura,
quando minha mente perde o fio.
São tuas palavras que me guiam
de volta pra aventura.

Tu me transpires arte,
porque teu sorriso me invade
sempre que te vejo, minha musa.`,
    author: 'Icaro Castelo',
    date: new Date('2025-08-10T12:00:00'),
    tags: ['musa', 'melodia', 'arte', 'inspiração'],
    excerpt: 'Há palavras que pesam como pedras no peito. Outras que voam como pássaros libertos...',
metadata: {
    verses: 13,
    stanzas: 4
  }
  },
  
];

// Função para buscar posts por tipo
export const getPostsByType = (type: string): Post[] => {
  return samplePosts.filter(post => post.type === type);
};

// Função para buscar posts por tag
export const getPostsByTag = (tag: string): Post[] => {
  return samplePosts.filter(post => post.tags.includes(tag));
};

// Função para buscar post por ID
export const getPostById = (id: string): Post | undefined => {
  return samplePosts.find(post => post.id === id);
};

// Função para obter todos os posts ordenados por data
export const getAllPosts = (): Post[] => {
  return [...samplePosts].sort((a, b) => b.date.getTime() - a.date.getTime());
};
