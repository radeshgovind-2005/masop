import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard-page';
import { SignInPage } from '@/pages/sign-in-page';
import { SignUpPage } from '@/pages/sign-up-page';
import { RequireAuth } from '@/routes/require-auth';
import { useAuth } from '@/ports/auth-context';

function RootRedirect() {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  return <Navigate to={status === 'signed-in' ? '/dashboard' : '/sign-in'} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
