import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminPostForm } from './pages/AdminPostForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DevOnlyRoute } from './components/auth/DevOnlyRoute';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles/y2k-theme.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route path="admin/login" element={
              <DevOnlyRoute>
                <AdminLoginPage />
              </DevOnlyRoute>
            } />
            <Route path="admin" element={
              <DevOnlyRoute>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </DevOnlyRoute>
            } />
            <Route path="admin/create" element={
              <DevOnlyRoute>
                <ProtectedRoute>
                  <AdminPostForm />
                </ProtectedRoute>
              </DevOnlyRoute>
            } />
            <Route path="admin/edit/:id" element={
              <DevOnlyRoute>
                <ProtectedRoute>
                  <AdminPostForm />
                </ProtectedRoute>
              </DevOnlyRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
