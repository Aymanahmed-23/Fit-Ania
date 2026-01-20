"use client"

import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src="src/silhoulette-bb.jpg" alt="Logo" />
            </div>
          <span className="navbar-title">Fit-Ania</span>
        </div>

        <div className="navbar-links">
          <a href="#features" className="navbar-link">Features</a>
          <a href="#workouts" className="navbar-link">Workouts</a>
          <a href="#about" className="navbar-link">About</a>
        </div>

        <div className="navbar-actions">
          <button className="btn-ghost">Profile</button>
          <button className="btn-primary">Login / Sign Up</button>
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
        <button className="btn-ghost">Profile</button>
        <button className="btn-primary">Login / Sign Up</button>
      </div>
    </>
  )
}
