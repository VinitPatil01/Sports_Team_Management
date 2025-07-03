import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UsersListPage from "./pages/UsersListPage";
import TeamsPage from "./pages/TeamsPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import AttendancePage from "./pages/AttendancePage";
import PlayerAttendancePage from "./pages/PlayerAttendancePage";
import PlayerStatsPage from "./pages/PlayerStatsPage";
import TeamStatsPage from "./pages/TeamStatsPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailsPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/matches/:id" element={<MatchDetailsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/attendance/player/:playerId" element={<PlayerAttendancePage />} />
            <Route path="/stats/player/:id" element={<PlayerStatsPage />} />
            <Route path="/stats/team" element={<TeamStatsPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact" element={<AboutUs />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
