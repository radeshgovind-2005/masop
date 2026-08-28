import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FakeAuthProvider, defaultFakeUser } from '@/adapters/auth/fake-auth-adapter';
import { useAuth } from '@/ports/auth-context';

function AuthProbe() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="status">{auth.status}</span>
      <span data-testid="display-name">{auth.user?.displayName ?? ''}</span>
      <button onClick={() => void auth.signOut()}>Sign out</button>
    </div>
  );
}

describe('FakeAuthProvider', () => {
  it('defaults to a signed-in fake user', () => {
    render(
      <FakeAuthProvider>
        <AuthProbe />
      </FakeAuthProvider>,
    );

    expect(screen.getByTestId('status')).toHaveTextContent('signed-in');
    expect(screen.getByTestId('display-name')).toHaveTextContent(defaultFakeUser.displayName);
  });

  it('transitions to signed-out after signOut()', () => {
    render(
      <FakeAuthProvider>
        <AuthProbe />
      </FakeAuthProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));

    expect(screen.getByTestId('status')).toHaveTextContent('signed-out');
    expect(screen.getByTestId('display-name')).toHaveTextContent('');
  });
});
