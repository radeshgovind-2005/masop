import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { RequireAuth } from '@/routes/require-auth';
import { AuthContext } from '@/ports/auth-context';
import type { AuthPort } from '@/ports/auth-port';

function renderWithAuth(auth: AuthPort) {
  return render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/sign-in" element={<div>Sign in page</div>} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <div>Protected content</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe('RequireAuth', () => {
  it('renders nothing while auth is loading', () => {
    renderWithAuth({ status: 'loading', user: null, signOut: async () => {} });

    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in page')).not.toBeInTheDocument();
  });

  it('redirects to sign-in when signed out', () => {
    renderWithAuth({ status: 'signed-out', user: null, signOut: async () => {} });

    expect(screen.getByText('Sign in page')).toBeInTheDocument();
  });

  it('renders children when signed in', () => {
    renderWithAuth({
      status: 'signed-in',
      user: { id: '1', displayName: 'Jordan', email: null, imageUrl: null },
      signOut: async () => {},
    });

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });
});
