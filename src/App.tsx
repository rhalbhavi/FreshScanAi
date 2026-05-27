import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ModeSelectPage from './pages/ModeSelectPage';
import ScannerPage from './pages/ScannerPage';
import AnalysisDashboard from './pages/AnalysisDashboard';
import MarketMapPage from './pages/MarketMapPage';
import ResultsPage from './pages/ResultsPage';
import PostHogPageView from './components/PostHogPageView';

export default function App() {
  return (
    <BrowserRouter>
      {/* Fires a $pageview event to PostHog on every SPA route change */}
      <PostHogPageView />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/mode" element={<ModeSelectPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/analysis" element={<AnalysisDashboard />} />
          <Route path="/map" element={<MarketMapPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
