import { Navigate } from 'react-router-dom';
import { useAuth } from '@/ports/auth-context';
import type { ReactNode } from 'react';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (status === 'signed-out') {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
