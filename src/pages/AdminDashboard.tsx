import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { postService } from '../services/PostService';
import './AdminDashboard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const AdminDashboard = () => {
  const { posts, loading, error, deletePost, refreshPosts } = usePosts();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Erro ao deletar post:', err);
    }
  };

  const handleExport = () => {
    const data = postService.exportPosts();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `posts-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleImport = async () => {
    try {
      const success = await postService.importPosts(importData);
      if (success) {
        refreshPosts();
        setShowImportModal(false);
        setImportData('');
        alert('Posts importados com sucesso!');
      } else {
        alert('Erro ao importar posts. Verifique o formato do arquivo.');
      }
    } catch (err) {
      console.error('Erro ao importar:', err);
      alert('Erro ao importar posts.');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Carregando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <section className="dashboard-header">
          <h1>Dashboard Administrativo</h1>
          <p className="dashboard-subtitle">Gerencie seus posts e conteúdo</p>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card glass-morphism">
            <h3>Total de Posts</h3>
            <span className="stat-number">{posts.length}</span>
          </div>
          <div className="stat-card glass-morphism">
            <h3>Poemas</h3>
            <span className="stat-number">
              {posts.filter(p => p.type === 'poem').length}
            </span>
          </div>
          <div className="stat-card glass-morphism">
            <h3>Contos</h3>
            <span className="stat-number">
              {posts.filter(p => p.type === 'story').length}
            </span>
          </div>
          <div className="stat-card glass-morphism">
            <h3>Outros</h3>
            <span className="stat-number">
              {posts.filter(p => !['poem', 'story'].includes(p.type)).length}
            </span>
          </div>
        </section>

        <section className="dashboard-actions">
          <div className="action-buttons">
            <Link to="/admin/create" className="y2k-button primary">
               Criar Novo Post
            </Link>
            <button 
              onClick={() => setShowExportModal(true)}
              className="y2k-button secondary"
            >
              Exportar Posts
            </button>
            <button 
              onClick={() => setShowImportModal(true)}
              className="y2k-button secondary"
            >
               Importar Posts
            </button>
          </div>
        </section>

        <section className="posts-management">
          <h2>Gerenciar Posts</h2>
          <div className="posts-table">
            {posts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>
                        <Link to={`/post/${post.id}`} className="post-link">
                          {post.title}
                        </Link>
                      </td>
                      <td>
                        <span className="type-badge">{getPostTypeLabel(post.type)}</span>
                      </td>
                      <td>
                        {post.date.toLocaleDateString('pt-BR')}
                      </td>
                      <td>
                        <div className="action-buttons-row">
                          <Link 
                            to={`/admin/edit/${post.id}`}
                            className="action-button edit"
                          >
                            <FaEdit />
                          </Link>
                          <button 
                            onClick={() => setShowDeleteConfirm(post.id)}
                            className="action-button delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-posts">
                <p>Nenhum post encontrado.</p>
                <Link to="/admin/create" className="y2k-button">
                  Criar o primeiro post
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-modal glass-morphism">
            <h3>Confirmar exclusão</h3>
            <p>Tem certeza que deseja deletar este post?</p>
            <p className="warning">Esta ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="y2k-button secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="y2k-button danger"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exportação */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="export-modal glass-morphism">
            <h3>Exportar Posts</h3>
            <p>Isso irá baixar um arquivo JSON com todos os posts.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowExportModal(false)}
                className="y2k-button secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={handleExport}
                className="y2k-button primary"
              >
                Baixar Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de importação */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="import-modal glass-morphism">
            <h3>Importar Posts</h3>
            <p>Cole o conteúdo JSON dos posts para importar:</p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Cole aqui o JSON dos posts..."
              rows={10}
            />
            <div className="modal-actions">
              <button 
                onClick={() => {
                  setShowImportModal(false);
                  setImportData('');
                }}
                className="y2k-button secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={handleImport}
                className="y2k-button primary"
                disabled={!importData.trim()}
              >
                Importar
              </button>
            </div>
          </div>
        </div>
      )}
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
