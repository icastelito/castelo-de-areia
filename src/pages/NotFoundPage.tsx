import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <p>Talvez você tenha digitado o endereço incorretamente, ou a página foi removida.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="y2k-button primary">
            🏠 Voltar ao início
          </Link>
          <Link to="/admin" className="y2k-button secondary">
            🔧 Área administrativa
          </Link>
        </div>
        
        <div className="not-found-suggestions">
          <h3>Você pode tentar:</h3>
          <ul>
            <li>Verificar se o endereço está correto</li>
            <li>Voltar à página inicial</li>
            <li>Procurar pelos posts mais recentes</li>
            <li>Entrar em contato se o problema persistir</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
