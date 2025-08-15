import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { PostCard } from './components/posts/PostCard';
import { PoemRenderer } from './components/posts/PoemRenderer';
import { FloatingElements } from './components/ui/FloatingElements';
import { getAllPosts, getPostById } from './data/posts';
import type { PostPreview } from './types/Post';
import './styles/y2k-theme.css';
import './App.css';

function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const allPosts = getAllPosts();
  
  // Converte posts para previews
  const postPreviews: PostPreview[] = allPosts.map(post => ({
    id: post.id,
    title: post.title,
    type: post.type,
    excerpt: post.excerpt || post.content.substring(0, 150) + '...',
    date: post.date,
    tags: post.tags
  }));

  const selectedPost = selectedPostId ? getPostById(selectedPostId) : null;

  return (
    <ThemeProvider>
      <div className="app">
        <FloatingElements />
        <Header />
        
        <main className="main-content">
          {selectedPost ? (
            <div className="post-view">
              <button 
                className=" y2k-button"
                onClick={() => setSelectedPostId(null)}
              >
                ← Voltar
              </button>
              
              {selectedPost.type === 'poem' ? (
                <PoemRenderer post={selectedPost} />
              ) : (
                <article className="post-article glass-morphism">
                  <header className="post-header">
                    <h1>{selectedPost.title}</h1>
                    <div className="post-meta">
                      <span>por {selectedPost.author}</span>
                      <time>
                        {selectedPost.date.toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </header>
                  <div className="post-content">
                    {selectedPost.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )}
            </div>
          ) : (
            <div className="posts-grid">
              <div className="posts-header">
                <h2>Últimas Publicações</h2>
              </div>
              
              <div className="posts-container">
                {postPreviews.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={setSelectedPostId}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
