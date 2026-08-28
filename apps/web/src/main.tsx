import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FakeAuthProvider } from '@/adapters/auth/fake-auth-adapter';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FakeAuthProvider>
        <App />
      </FakeAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
