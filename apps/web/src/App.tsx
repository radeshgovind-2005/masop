import { Navigate, Route, Routes } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import { DashboardPage } from '@/pages/dashboard-page';
import { LandingPage } from '@/pages/landing-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <AppSidebar>
            <DashboardPage />
          </AppSidebar>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
