"use client"

import { useState ,useEffect} from 'react';
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";






export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("authToken");
  setIsAuthenticated(!!token);
}, []);

useEffect(() => {
  const syncAuth = () => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  };

  window.addEventListener("storage", syncAuth);
  syncAuth();

  return () => window.removeEventListener("storage", syncAuth);
}, []);



  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src="src/silhoulette-bb.jpg" alt="Logo" />
            </div>
          <Link to="/" className="navbar-title">
  Fit-Ania
</Link>

        </div>

        <div className="navbar-links">
          <a href="#features" className="navbar-link">Features</a>
          <a href="#workouts" className="navbar-link">Workouts</a>
          <a href="#about" className="navbar-link">About</a>
        </div>
<div className="navbar-actions">
  {isAuthenticated ? (
    <>
      <Link to="/profile" className="btn-ghost">Profile</Link>
      <button className="btn-primary" onClick={logout}>Logout</button>
    </>
  ) : (
    <Link to="/sign-in" className="btn-primary">Login / Sign Up</Link>
  )}
</div>


        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
      </nav>

   <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
  <a href="#features" className="navbar-link">Features</a>
  <a href="#workouts" className="navbar-link">Workouts</a>
  <a href="#about" className="navbar-link">About</a>

  {isAuthenticated ? (
    <>
      <Link
        to="/profile"
        className="btn-ghost"
        onClick={() => setMobileMenuOpen(false)}
      >
        Profile
      </Link>

      <button
        className="btn-primary"
        onClick={() => {
          setMobileMenuOpen(false);
          logout();
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      to="/sign-in"
      className="btn-primary"
      onClick={() => setMobileMenuOpen(false)}
    >
      Login / Sign Up
    </Link>
  )}
</div>

    </>
  )
}
