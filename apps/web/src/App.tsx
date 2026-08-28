import { Navigate, Route, Routes } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import { DashboardPage } from '@/pages/dashboard-page';
import { LandingPage } from '@/pages/landing-page';
import { SignInPage } from '@/pages/sign-in-page';
import { SignUpPage } from '@/pages/sign-up-page';
import { RequireAuth } from '@/routes/require-auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <AppSidebar>
              <DashboardPage />
            </AppSidebar>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
