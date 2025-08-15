import React from 'react';
import { Link } from 'react-router-dom';
import type { PostPreview } from '../../types/Post';
import './PostCard.css';

interface PostCardProps {
  post: PostPreview;
  onClick?: (id: string) => void;
  linkTo?: string;
}

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

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, linkTo }) => {
  const cardContent = (
    <>
      <div className="post-card-header">
        <span className="post-type">{getPostTypeLabel(post.type)}</span>
        <time className="post-date">
          {post.date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </time>
      </div>
      
      <h2 className="post-title">{post.title}</h2>
      
      <p className="post-excerpt">{post.excerpt}</p>
      
      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="post-tag">#{tag}</span>
          ))}
          {post.tags.length > 3 && (
            <span className="post-tag-more">+{post.tags.length - 3}</span>
          )}
        </div>
      )}
      
      <div className="post-card-footer">
        <span className="read-more">Ler mais →</span>
      </div>
    </>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="post-card">
        {cardContent}
      </Link>
    );
  }

  return (
    <article 
      className="post-card"
      onClick={() => onClick?.(post.id)}
    >
      {cardContent}
    </article>
  );
};
