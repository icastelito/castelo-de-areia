import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface DevOnlyRouteProps {
  children: ReactNode;
}

export const DevOnlyRoute = ({ children }: DevOnlyRouteProps) => {
  // Verifica se está em ambiente de desenvolvimento
  if (!import.meta.env.DEV) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
