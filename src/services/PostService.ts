import type { Post, PostType } from '../types/Post';

class PostService {
  private readonly baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';

  // Verifica se está em desenvolvimento e se a API está disponível
  private async isApiAvailable(): Promise<boolean> {
    if (!import.meta.env.DEV) return false;
    
    try {
      const response = await fetch(`${this.baseUrl}/posts`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // Fallback para carregar do arquivo estático quando a API não está disponível
  private async loadFromStaticFile(): Promise<Post[]> {
    try {
      const response = await fetch('/posts.json');
      const data = await response.json();
      return (data.posts || data).map((post: any) => ({
        ...post,
        date: new Date(post.date)
      }));
    } catch (error) {
      console.error('Erro ao carregar posts do arquivo estático:', error);
      return [];
    }
  }

  // Gera um novo ID único
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Métodos públicos do CRUD
  
  async getAllPosts(): Promise<Post[]> {
    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        const response = await fetch(`${this.baseUrl}/posts`);
        const data = await response.json();
        return data.map((post: any) => ({
          ...post,
          date: new Date(post.date)
        })).sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime());
      } catch (error) {
        console.error('Erro ao carregar posts da API:', error);
      }
    }
    
    return this.loadFromStaticFile();
  }

  async getPostById(id: string): Promise<Post | undefined> {
    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/${id}`);
        if (response.ok) {
          const post = await response.json();
          return {
            ...post,
            date: new Date(post.date)
          };
        }
      } catch (error) {
        console.error('Erro ao buscar post da API:', error);
      }
    }
    
    const allPosts = await this.loadFromStaticFile();
    return allPosts.find(post => post.id === id);
  }

  async getPostsByType(type: PostType): Promise<Post[]> {
    const allPosts = await this.getAllPosts();
    return allPosts.filter(post => post.type === type);
  }

  async getPostsByTag(tag: string): Promise<Post[]> {
    const allPosts = await this.getAllPosts();
    return allPosts.filter(post => post.tags.includes(tag));
  }

  async createPost(postData: Omit<Post, 'id' | 'date'>): Promise<Post> {
    const newPost: Post = {
      ...postData,
      id: this.generateId(),
      date: new Date()
    };

    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        const response = await fetch(`${this.baseUrl}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });
        
        if (response.ok) {
          const createdPost = await response.json();
          return {
            ...createdPost,
            date: new Date(createdPost.date)
          };
        }
      } catch (error) {
        console.error('Erro ao criar post na API:', error);
      }
    }
    
    // Fallback: não faz nada em produção se a API não estiver disponível
    throw new Error('API não disponível para criação de posts');
  }

  async updatePost(id: string, postData: Partial<Omit<Post, 'id' | 'date'>>): Promise<Post | null> {
    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        
        if (response.ok) {
          const updatedPost = await response.json();
          return {
            ...updatedPost,
            date: new Date(updatedPost.date)
          };
        }
      } catch (error) {
        console.error('Erro ao atualizar post na API:', error);
      }
    }
    
    // Fallback: não faz nada em produção se a API não estiver disponível
    throw new Error('API não disponível para atualização de posts');
  }

  async deletePost(id: string): Promise<boolean> {
    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/${id}`, {
          method: 'DELETE',
        });
        
        return response.ok;
      } catch (error) {
        console.error('Erro ao deletar post na API:', error);
      }
    }
    
    // Fallback: não faz nada em produção se a API não estiver disponível
    throw new Error('API não disponível para exclusão de posts');
  }

  // Métodos utilitários
  
  async getAllTags(): Promise<string[]> {
    const allPosts = await this.getAllPosts();
    const allTags = allPosts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
  }

  async searchPosts(query: string): Promise<Post[]> {
    const allPosts = await this.getAllPosts();
    const lowerQuery = query.toLowerCase();
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      post.author.toLowerCase().includes(lowerQuery)
    );
  }

  // Método para exportar dados (backup)
  async exportPosts(): Promise<string> {
    const allPosts = await this.getAllPosts();
    return JSON.stringify(allPosts, null, 2);
  }

  // Método para verificar se as operações de escrita estão disponíveis
  async isWriteAvailable(): Promise<boolean> {
    return import.meta.env.DEV && await this.isApiAvailable();
  }
}

// Instância singleton do serviço
export const postService = new PostService();
