import { useState, useEffect } from 'react';
import { PostCard } from '../components/posts/PostCard';
import { usePosts } from '../hooks/usePosts';
import type { PostPreview, PostType } from '../types/Post';
import './HomePage.css';

export const HomePage = () => {
  const { posts, loading, error, searchPosts, getPostsByType } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      try {
        const results = await searchPosts(query);
        setFilteredPosts(results);
      } catch (err) {
        console.error('Erro na busca:', err);
      }
    }
  };

  const handleTypeFilter = async (type: PostType | 'all') => {
    setSelectedType(type);
    if (type === 'all') {
      setFilteredPosts(posts);
    } else {
      try {
        const results = await getPostsByType(type);
        setFilteredPosts(results);
      } catch (err) {
        console.error('Erro no filtro:', err);
      }
    }
  };

  // Converte posts para previews
  const postPreviews: PostPreview[] = filteredPosts.map(post => ({
    id: post.id,
    title: post.title,
    type: post.type,
    excerpt: post.excerpt || post.content.substring(0, 150) + '...',
    date: post.date,
    tags: post.tags
  }));

  if (loading) {
    return (
      <div className="homepage">
        <div className="loading">Carregando posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="error">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="homepage">

      <section className="posts-section">
        <div className="posts-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="type-filters">
            <button 
              className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-button ${selectedType === 'poem' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('poem')}
            >
              Poemas
            </button>
            <button 
              className={`filter-button ${selectedType === 'story' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('story')}
            >
              Contos
            </button>
            <button 
              className={`filter-button ${selectedType === 'song' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('song')}
            >
              Músicas
            </button>
            <button 
              className={`filter-button ${selectedType === 'thought' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('thought')}
            >
              Reflexões
            </button>
            <button 
              className={`filter-button ${selectedType === 'philosophy' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('philosophy')}
            >
              Filosofia
            </button>
          </div>
        </div>

        <div className="posts-grid">
          {postPreviews.length > 0 ? (
            postPreviews.map(post => (
              <PostCard
                key={post.id}
                post={post}
                linkTo={`/post/${post.id}`}
              />
            ))
          ) : (
            <div className="no-posts">
              <p>Nenhum post encontrado.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
