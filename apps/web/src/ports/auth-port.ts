export interface AuthUser {
  id: string;
  displayName: string;
  email: string | null;
  imageUrl: string | null;
}

export type AuthStatus = 'loading' | 'signed-in' | 'signed-out';

export interface AuthPort {
  status: AuthStatus;
  user: AuthUser | null;
  signOut(): Promise<void>;
}
