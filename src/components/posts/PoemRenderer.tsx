import React from 'react';
import type { Post } from '../../types/Post';
import './PoemRenderer.css';

interface PoemRendererProps {
  post: Post;
}

export const PoemRenderer: React.FC<PoemRendererProps> = ({ post }) => {
  // Divide o conteúdo em estrofes (separadas por linha em branco)
  const stanzas = post.content.split('\n\n').filter(stanza => stanza.trim());

  return (
    <article className="poem-container">
      <header className="poem-header">
        <h1 className="poem-title">{post.title}</h1>
        <div className="poem-meta">
          <span className="poem-author">por {post.author}</span>
          <time className="poem-date">
            {post.date.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </div>
        {post.tags.length > 0 && (
          <div className="poem-tags">
            {post.tags.map(tag => (
              <span key={tag} className="poem-tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>
      
      <div className="poem-content">
        {stanzas.map((stanza, stanzaIndex) => (
          <div key={stanzaIndex} className="stanza">
            {stanza.split('\n').map((verse, verseIndex) => (
              <div key={verseIndex} className="verse">
                {verse || '\u00A0'} {/* Non-breaking space para linhas vazias */}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {post.metadata && (
        <footer className="poem-footer">
          {post.metadata.stanzas && (
            <span className="poem-stat">{post.metadata.stanzas} estrofes</span>
          )}
          {post.metadata.verses && (
            <span className="poem-stat">{post.metadata.verses} versos</span>
          )}
        </footer>
      )}
    </article>
  );
};
