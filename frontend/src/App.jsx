import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesCarousel from "./components/FeaturesCarousel";
import WorkoutDashboard from "./components/WorkoutDashboard";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Auth from "./components/Auth";

import { useState } from "react";
import "./App.css";

function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      <Hero onGetStarted={() => setShowDashboard(true)} />
      <FeaturesCarousel />
      {showDashboard && (
        <WorkoutDashboard onClose={() => setShowDashboard(false)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route 
        path="/sign-in"
        element={<Auth />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}
