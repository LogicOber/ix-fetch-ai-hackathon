import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HealthBoard from "./pages/health-board";
import SocialMediaAnalysis from "./pages/social-media-analysis";
import StoryStrategy from "./pages/story-strategy";
import AudioEmotion from "./pages/audio-emotion";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import "./App.css";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/health-board" replace />} />
          <Route path="/health-board" element={<HealthBoard />} />
          <Route path="/social-media-analysis" element={<SocialMediaAnalysis />} />
          <Route path="/audio-emotion" element={<AudioEmotion />} />
          <Route path="/story-strategy" element={<StoryStrategy />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;