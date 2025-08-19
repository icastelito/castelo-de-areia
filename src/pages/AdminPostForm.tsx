import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import type { PostType } from '../types/Post';
import './AdminPostForm.css';

interface PostFormData {
  title: string;
  type: PostType;
  content: string;
  declamation: string;
  author: string;
  tags: string[];
  excerpt: string;
  metadata: {
    verses?: number;
    stanzas?: number;
    wordCount?: number;
    genre?: string;
    bpm?: number;
  };
}

export const AdminPostForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createPost, updatePost, getPostById, isWriteAvailable } = usePosts();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    type: 'poem',
    content: '',
    declamation: '',
    author: 'Icaro Castelo',
    tags: [],
    excerpt: '',
    metadata: {}
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      const loadPost = async () => {
        try {
          setLoading(true);
          const post = await getPostById(id);
          if (post) {
            setFormData({
              title: post.title,
              type: post.type,
              content: post.content,
              declamation: post.declamation || '',
              author: post.author,
              tags: post.tags,
              excerpt: post.excerpt || '',
              metadata: post.metadata || {}
            });
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
    }
  }, [isEditing, id, getPostById]);

  const handleInputChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetadataChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const autoCalculateMetadata = () => {
    const lines = formData.content.split('\n').filter(line => line.trim());
    const words = formData.content.split(/\s+/).filter(word => word.trim());
    
    if (formData.type === 'poem') {
      // Calcular versos e estrofes
      const verses = lines.length;
      const stanzas = formData.content.split('\n\n').filter(stanza => stanza.trim()).length;
      
      handleMetadataChange('verses', verses);
      handleMetadataChange('stanzas', stanzas);
    } else {
      // Calcular palavras para outros tipos
      handleMetadataChange('wordCount', words.length);
    }
  };

  const generateExcerpt = () => {
    if (formData.content) {
      const excerpt = formData.content.substring(0, 150) + '...';
      handleInputChange('excerpt', excerpt);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const postData = {
        ...formData,
        metadata: Object.keys(formData.metadata).length > 0 ? formData.metadata : undefined
      };

      if (isEditing && id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }

      navigate('/admin');
    } catch (err) {
      setError(isEditing ? 'Erro ao atualizar post' : 'Erro ao criar post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="admin-post-form">
        <div className="loading">Carregando post...</div>
      </div>
    );
  }

  return (
    <div className="admin-post-form">
      <header className="form-header">
        <h1>{isEditing ? 'Editar Post' : 'Criar Novo Post'}</h1>
        <Link to="/admin" className="back-button">
          ← Voltar ao Dashboard
        </Link>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="post-form glass-morphism">
        <div className="form-section">
          <h2>Informações Básicas</h2>
          
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Digite o título do post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo *</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value as PostType)}
            >
              <option value="poem">Poema</option>
              <option value="story">Conto</option>
              <option value="song">Música</option>
              <option value="thought">Pensamento</option>
              <option value="philosophy">Filosofia</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor</label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Nome do autor"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Conteúdo</h2>
          
          <div className="form-group">
            <label htmlFor="content">Conteúdo *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Digite o conteúdo do post"
              rows={15}
              required
            />
          </div>

          {formData.type === 'poem' && (
            <div className="form-group">
              <label htmlFor="declamation">Declamação (opcional)</label>
              <input
                id="declamation"
                type="text"
                value={formData.declamation}
                onChange={(e) => handleInputChange('declamation', e.target.value)}
                placeholder="Link para áudio de declamação"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="excerpt">Resumo</label>
            <div className="excerpt-controls">
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Resumo do post (será gerado automaticamente se vazio)"
                rows={3}
              />
              <button 
                type="button" 
                onClick={generateExcerpt}
                className="generate-button"
              >
                Gerar automaticamente
              </button>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Tags</h2>
          
          <div className="form-group">
            <label htmlFor="tags">Adicionar tags</label>
            <div className="tag-input-container">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma tag e pressione Enter"
              />
              <button type="button" onClick={addTag} className="add-tag-button">
                Adicionar
              </button>
            </div>
          </div>

          {formData.tags.length > 0 && (
            <div className="tags-display">
              {formData.tags.map(tag => (
                <span key={tag} className="tag-item">
                  #{tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>Metadados</h2>
          
          <button 
            type="button" 
            onClick={autoCalculateMetadata}
            className="generate-button"
          >
            Calcular automaticamente
          </button>

          {formData.type === 'poem' && (
            <div className="metadata-grid">
              <div className="form-group">
                <label htmlFor="verses">Versos</label>
                <input
                  id="verses"
                  type="number"
                  value={formData.metadata.verses || ''}
                  onChange={(e) => handleMetadataChange('verses', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stanzas">Estrofes</label>
                <input
                  id="stanzas"
                  type="number"
                  value={formData.metadata.stanzas || ''}
                  onChange={(e) => handleMetadataChange('stanzas', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          {formData.type === 'story' && (
            <div className="form-group">
              <label htmlFor="wordCount">Número de palavras</label>
              <input
                id="wordCount"
                type="number"
                value={formData.metadata.wordCount || ''}
                onChange={(e) => handleMetadataChange('wordCount', parseInt(e.target.value) || 0)}
              />
            </div>
          )}

          {formData.type === 'song' && (
            <div className="metadata-grid">
              <div className="form-group">
                <label htmlFor="genre">Gênero</label>
                <input
                  id="genre"
                  type="text"
                  value={formData.metadata.genre || ''}
                  onChange={(e) => handleMetadataChange('genre', e.target.value)}
                  placeholder="Ex: Folk, Rock, Pop"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bpm">BPM</label>
                <input
                  id="bpm"
                  type="number"
                  value={formData.metadata.bpm || ''}
                  onChange={(e) => handleMetadataChange('bpm', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          {!isWriteAvailable && (
            <div className="write-warning" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 193, 7, 0.1)', border: '1px solid #ffc107', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#ffc107' }}>
                <strong>Aviso:</strong> A API de desenvolvimento não está disponível. Não é possível salvar alterações.
              </p>
            </div>
          )}
          <Link to="/admin" className="y2k-button secondary">
            Cancelar
          </Link>
          <button 
            type="submit" 
            disabled={loading || !isWriteAvailable}
            className="y2k-button primary"
            style={!isWriteAvailable ? { opacity: 0.6 } : {}}
          >
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Post')}
          </button>
        </div>
      </form>
    </div>
  );
};
