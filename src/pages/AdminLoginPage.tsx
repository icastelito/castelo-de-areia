import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLoginPage.css';

export const AdminLoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Se já está autenticado, redireciona para o admin
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = login(username, password);
    
    if (!success) {
      setError('Usuário ou senha incorretos');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="login-container glass-morphism">
        <header className="login-header">
          <h1>Área Administrativa</h1>
          <p>Acesso restrito para gerenciamento de posts</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button y2k-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-info">
          <p>Esta área é protegida e requer autenticação.</p>
          <p>Apenas administradores podem acessar o sistema de gerenciamento de posts.</p>
        </div>
      </div>
    </div>
  );
};
