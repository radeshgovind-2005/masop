import { useClerk, useUser } from '@clerk/clerk-react';
import { useMemo, type ReactNode } from 'react';
import { AuthContext } from '@/ports/auth-context';
import type { AuthPort, AuthUser } from '@/ports/auth-port';

export function ClerkAuthAdapter({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  const value = useMemo<AuthPort>(() => {
    const signOut = () => clerk.signOut();

    if (!isLoaded) {
      return { status: 'loading', user: null, signOut };
    }

    if (!isSignedIn || !user) {
      return { status: 'signed-out', user: null, signOut };
    }

    const authUser: AuthUser = {
      id: user.id,
      displayName: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Account',
      email: user.primaryEmailAddress?.emailAddress ?? null,
      imageUrl: user.imageUrl,
    };

    return { status: 'signed-in', user: authUser, signOut };
  }, [isLoaded, isSignedIn, user, clerk]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
