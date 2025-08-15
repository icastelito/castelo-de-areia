import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Castelo de Areia" }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Não mostrar o header na página de login do admin
  if (location.pathname === '/admin/login') {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">  
         <div></div>
         <div></div>
          
          <Link to="/" className="site-title-link">
            <h1 className="site-title">{title}</h1>
            <p className="site-description">Um espaço para guardar pedaços da minha alma</p>
          </Link>
          
          <nav className="main-nav">
            <Link to="/" className="nav-link glass-morphism admin-link">
              Início
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="nav-link glass-morphism admin-link">
                  Admin
                </Link>
                <button onClick={logout} className="nav-link glass-morphism logout-button">
                  Sair
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="nav-link glass-morphism admin-link">
                Admin
              </Link>
            )}
            <button onClick={toggleTheme} className="nav-link glass-morphism admin-link">
              {theme === 'light' ? <FaMoon color='black'/> : <FaSun />}
            </button>
          </nav>
      </div>
    </header>
  );
};
