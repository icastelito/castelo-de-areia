import { useState, useEffect, useCallback } from 'react';
import { postService } from '../services/PostService';
import type { Post, PostType } from '../types/Post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWriteAvailable, setIsWriteAvailable] = useState(false);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allPosts = await postService.getAllPosts();
      setPosts(allPosts);
      
      // Verifica se operações de escrita estão disponíveis
      const writeAvailable = await postService.isWriteAvailable();
      setIsWriteAvailable(writeAvailable);
    } catch (err) {
      setError('Erro ao carregar posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const createPost = useCallback(async (postData: Omit<Post, 'id' | 'date'>) => {
    try {
      if (!isWriteAvailable) {
        throw new Error('Operações de escrita não estão disponíveis neste ambiente');
      }
      
      const newPost = await postService.createPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar post';
      setError(errorMessage);
      throw err;
    }
  }, [isWriteAvailable]);

  const updatePost = useCallback(async (id: string, postData: Partial<Omit<Post, 'id' | 'date'>>) => {
    try {
      if (!isWriteAvailable) {
        throw new Error('Operações de escrita não estão disponíveis neste ambiente');
      }
      
      const updatedPost = await postService.updatePost(id, postData);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
        return updatedPost;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar post';
      setError(errorMessage);
      throw err;
    }
  }, [isWriteAvailable]);

  const deletePost = useCallback(async (id: string) => {
    try {
      if (!isWriteAvailable) {
        throw new Error('Operações de escrita não estão disponíveis neste ambiente');
      }
      
      const success = await postService.deletePost(id);
      if (success) {
        setPosts(prev => prev.filter(post => post.id !== id));
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar post';
      setError(errorMessage);
      throw err;
    }
  }, [isWriteAvailable]);

  const getPostById = useCallback(async (id: string) => {
    try {
      return await postService.getPostById(id);
    } catch (err) {
      setError('Erro ao buscar post');
      throw err;
    }
  }, []);

  const searchPosts = useCallback(async (query: string) => {
    try {
      return await postService.searchPosts(query);
    } catch (err) {
      setError('Erro ao buscar posts');
      throw err;
    }
  }, []);

  const getPostsByType = useCallback(async (type: PostType) => {
    try {
      return await postService.getPostsByType(type);
    } catch (err) {
      setError('Erro ao buscar posts por tipo');
      throw err;
    }
  }, []);

  const getPostsByTag = useCallback(async (tag: string) => {
    try {
      return await postService.getPostsByTag(tag);
    } catch (err) {
      setError('Erro ao buscar posts por tag');
      throw err;
    }
  }, []);

  const getAllTags = useCallback(async () => {
    try {
      return await postService.getAllTags();
    } catch (err) {
      setError('Erro ao buscar tags');
      throw err;
    }
  }, []);

  const refreshPosts = useCallback(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    error,
    isWriteAvailable,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    searchPosts,
    getPostsByType,
    getPostsByTag,
    getAllTags,
    refreshPosts
  };
};
