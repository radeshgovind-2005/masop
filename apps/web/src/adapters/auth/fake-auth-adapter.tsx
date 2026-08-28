import { useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from '@/ports/auth-context';
import type { AuthPort, AuthUser } from '@/ports/auth-port';

export const defaultFakeUser: AuthUser = {
  id: 'fake-user-1',
  displayName: 'Jordan Smith',
  email: 'jordan@example.com',
  imageUrl: null,
};

export function FakeAuthProvider({
  children,
  initialUser = defaultFakeUser,
}: {
  children: ReactNode;
  initialUser?: AuthUser | null;
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const value = useMemo<AuthPort>(
    () => ({
      status: user ? 'signed-in' : 'signed-out',
      user,
      signOut: async () => {
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
