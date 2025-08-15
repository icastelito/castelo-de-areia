import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Castelo de Areia" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <button 
            className="theme-toggle y2k-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <h1 className="site-title">{title}</h1>
          <nav className="main-nav">
            <a href="/" className="nav-link glass-morphism">Poemas</a>
            <a href='/' className="nav-link glass-morphism">Sobre o autor</a>
            {/* <a href="#" className="nav-link glass-morphism">Contos</a> */}
            {/* <a href="#" className="nav-link glass-morphism">Músicas</a> */}
            {/* <a href="#" className="nav-link glass-morphism">Pensamentos</a> */}
            {/* <a href="#" className="nav-link glass-morphism">Filosofia</a> */}
          </nav>
        </div>
      </div>
    </header>
  );
};
