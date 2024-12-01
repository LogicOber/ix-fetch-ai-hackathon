import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HealthBoard from "./pages/health-board";
import SocialMediaAnalysis from "./pages/social-media-analysis";
import StoryStrategy from "./pages/analysis-history";
import AudioEmotion from "./pages/audio-emotion";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { ConfirmPage } from "./pages/auth/confirm";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import BillingPage from "./pages/billing";
import SubscribePage from "./pages/subscribe";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/confirm" element={<ConfirmPage />} />
          
          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/health-board" replace />} />
            <Route path="/health-board" element={<HealthBoard />} />
            <Route path="/social-media-analysis" element={<SocialMediaAnalysis />} />
            <Route path="/audio-emotion" element={<AudioEmotion />} />
            <Route path="/analysis-history" element={<StoryStrategy />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/subscribe" element={<SubscribePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;