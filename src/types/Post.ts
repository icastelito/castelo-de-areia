export type PostType = 'poem' | 'story' | 'song' | 'thought' | 'philosophy';

export interface Post {
  id: string;
  title: string;
  type: PostType;
  content: string;
  declamation?: string;
  author: string;
  date: Date;
  tags: string[];
  excerpt?: string;
  metadata?: {
    // Para poemas - informações sobre forma, métrica, etc.
    verses?: number;
    stanzas?: number;
    // Para contos - informações sobre narrativa
    wordCount?: number;
    // Para músicas - informações musicais
    genre?: string;
    bpm?: number;
  };
}

export interface PostPreview {
  id: string;
  title: string;
  type: PostType;
  excerpt: string;
  date: Date;
  tags: string[];
}
