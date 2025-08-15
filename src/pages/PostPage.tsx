import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PoemRenderer } from '../components/posts/PoemRenderer';
import { usePosts } from '../hooks/usePosts';
import type { Post } from '../types/Post';
import './PostPage.css';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError('ID do post não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const foundPost = await getPostById(id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, getPostById]);

  if (loading) {
    return (
      <div className="post-page">
        <div className="loading">Carregando post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-page">
        <div className="error">
          {error || 'Post não encontrado'}
          <Link to="/" className="y2k-button">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <nav className="post-nav">
        <Link to="/" className="nav-button">
          ← Voltar
        </Link>
      </nav>

      <main className="post-content">
        {post.type === 'poem' ? (
          <PoemRenderer post={post} />
        ) : (
          <article className="post-article glass-morphism">
            <header className="post-header">
              <div className="post-type-badge">
                {getPostTypeLabel(post.type)}
              </div>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-author">por {post.author}</span>
                <time className="post-date">
                  {post.date.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
              {post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="post-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </header>
            
            <div className="post-body">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {post.metadata && (
              <footer className="post-metadata">
                <h3>Informações adicionais</h3>
                <div className="metadata-grid">
                  {post.metadata.wordCount && (
                    <div className="metadata-item">
                      <span>Palavras:</span>
                      <span>{post.metadata.wordCount}</span>
                    </div>
                  )}
                  {post.metadata.genre && (
                    <div className="metadata-item">
                      <span>Gênero:</span>
                      <span>{post.metadata.genre}</span>
                    </div>
                  )}
                  {post.metadata.bpm && (
                    <div className="metadata-item">
                      <span>BPM:</span>
                      <span>{post.metadata.bpm}</span>
                    </div>
                  )}
                </div>
              </footer>
            )}
          </article>
        )}
      </main>
    </div>
  );
};

const getPostTypeLabel = (type: string): string => {
  const labels = {
    poem: 'Poema',
    story: 'Conto',
    song: 'Música',
    thought: 'Pensamento',
    philosophy: 'Filosofia'
  };
  return labels[type as keyof typeof labels] || type;
};
