import type { Post, PostType } from '../types/Post';

class PostService {
  private posts: Post[] = [];
  private readonly storageKey = 'posts-data';

  constructor() {
    this.loadPosts();
  }

  // Carrega posts do localStorage ou arquivo JSON
  private async loadPosts(): Promise<void> {
    try {
      // Primeiro tenta carregar do localStorage
      const storedPosts = localStorage.getItem(this.storageKey);
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts).map((post: any) => ({
          ...post,
          date: new Date(post.date)
        }));
        return;
      }

      // Se não tem no localStorage, carrega do arquivo JSON
      const response = await fetch('/posts.json');
      const data = await response.json();
      this.posts = data.map((post: any) => ({
        ...post,
        date: new Date(post.date)
      }));
      
      // Salva no localStorage para futuras modificações
      this.savePosts();
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      this.posts = [];
    }
  }

  // Salva posts no localStorage
  private savePosts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.posts));
  }

  // Gera um novo ID único
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Métodos públicos do CRUD
  
  async getAllPosts(): Promise<Post[]> {
    if (this.posts.length === 0) {
      await this.loadPosts();
    }
    return [...this.posts].sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getPostById(id: string): Promise<Post | undefined> {
    if (this.posts.length === 0) {
      await this.loadPosts();
    }
    return this.posts.find(post => post.id === id);
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

    this.posts.push(newPost);
    this.savePosts();
    return newPost;
  }

  async updatePost(id: string, postData: Partial<Omit<Post, 'id' | 'date'>>): Promise<Post | null> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return null;
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...postData
    };

    this.savePosts();
    return this.posts[postIndex];
  }

  async deletePost(id: string): Promise<boolean> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    this.savePosts();
    return true;
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
  exportPosts(): string {
    return JSON.stringify(this.posts, null, 2);
  }

  // Método para importar dados
  async importPosts(jsonData: string): Promise<boolean> {
    try {
      const importedPosts = JSON.parse(jsonData);
      this.posts = importedPosts.map((post: any) => ({
        ...post,
        date: new Date(post.date)
      }));
      this.savePosts();
      return true;
    } catch (error) {
      console.error('Erro ao importar posts:', error);
      return false;
    }
  }
}

// Instância singleton do serviço
export const postService = new PostService();
