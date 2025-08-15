import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { Header } from './Header';
import { FloatingElements } from '../ui/FloatingElements';

export const Layout = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <FloatingElements />
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};
