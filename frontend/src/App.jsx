"use client"

import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesCarousel from './components/FeaturesCarousel'
import WorkoutDashboard from './components/WorkoutDashboard'
import Footer from './components/Footer'
import './App.css'

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <main className="main-container">
      <Navbar />
      <Hero onGetStarted={() => setShowDashboard(true)} />
      <FeaturesCarousel />
      {showDashboard && (
        <WorkoutDashboard onClose={() => setShowDashboard(false)} />
      )}
      <Footer />
    </main>
  )
}
