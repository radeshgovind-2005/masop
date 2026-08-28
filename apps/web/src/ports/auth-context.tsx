import { createContext, useContext } from 'react';
import type { AuthPort } from '@/ports/auth-port';

export const AuthContext = createContext<AuthPort | undefined>(undefined);

export function useAuth(): AuthPort {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext.Provider');
  }
  return context;
}
