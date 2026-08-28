import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ClerkAuthAdapter } from '@/adapters/auth/clerk-auth-adapter';
import './index.css';
import App from './App.tsx';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY — see apps/web/.env.example');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
      <BrowserRouter>
        <ClerkAuthAdapter>
          <App />
        </ClerkAuthAdapter>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
