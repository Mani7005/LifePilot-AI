import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import JourneyPage from "./pages/JourneyPage.jsx";
import AgentDashboard from "./pages/AgentDashboard.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import GoalPlannerPage from "./pages/GoalPlannerPage.jsx";
import FraudGuardianPage from "./pages/FraudGuardianPage.jsx";
import AboutAgenticPage from "./pages/AboutAgenticPage.jsx";
import FinalCtaPage from "./pages/FinalCtaPage.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/agents" element={<AgentDashboard />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/goal-planner" element={<GoalPlannerPage />} />
          <Route path="/fraud-guardian" element={<FraudGuardianPage />} />
          <Route path="/about-agentic-ai" element={<AboutAgenticPage />} />
          <Route path="/get-started" element={<FinalCtaPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
