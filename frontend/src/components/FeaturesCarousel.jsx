"use client"

import { useState } from 'react'

const features = [
  {
    id: 1,
    title: 'Choose Your Muscle Group',
    description: 'Select from a comprehensive list of muscle groups to target. Whether you want to build chest, back, legs, or focus on specific areas, we have you covered.',
    list: ['Chest & Triceps', 'Back & Biceps', 'Legs & Glutes', 'Shoulders & Core'],
    visual: 'muscles'
  },
  {
    id: 2,
    title: 'Select Your Difficulty',
    description: 'Pick a difficulty level that matches your fitness journey. From beginner-friendly routines to advanced challenges, progress at your own pace.',
    list: ['Beginner Friendly', 'Intermediate Challenge', 'Advanced Intensity', 'Expert Level'],
    visual: 'difficulty'
  },
  {
    id: 3,
    title: 'Generate Custom Workouts',
    description: 'Get AI-powered workout plans instantly. Each workout is tailored to your selections with proper sets, reps, and rest times.',
    list: ['Instant Generation', 'Detailed Instructions', 'Rest Time Guidance', 'Progress Tracking'],
    visual: 'workout'
  }
]

export default function FeaturesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }

  const renderVisual = (type) => {
    switch (type) {
      case 'muscles':
        return (
          <div className="visual-content">
            <div className="visual-grid">
              {['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Shoulders'].map((muscle) => (
                <div key={muscle} className="visual-grid-item">
                  {muscle}
                </div>
              ))}
            </div>
          </div>
        )
      case 'difficulty':
        return (
          <div className="visual-content">
            <div className="visual-difficulty">
              <div className="difficulty-bar">
                <span className="difficulty-label">Beginner</span>
                <div className="difficulty-track">
                  <div className="difficulty-fill easy"></div>
                </div>
              </div>
              <div className="difficulty-bar">
                <span className="difficulty-label">Intermediate</span>
                <div className="difficulty-track">
                  <div className="difficulty-fill medium"></div>
                </div>
              </div>
              <div className="difficulty-bar">
                <span className="difficulty-label">Advanced</span>
                <div className="difficulty-track">
                  <div className="difficulty-fill hard"></div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'workout':
        return (
          <div className="visual-content">
            <div className="visual-workout">
              <div className="workout-preview-card">
                <div className="workout-preview-title">Sample Workout</div>
                <div className="workout-preview-exercises">
                  <div className="workout-preview-exercise">
                    <span>Bench Press</span>
                    <span>4 x 8</span>
                  </div>
                  <div className="workout-preview-exercise">
                    <span>Incline Dumbbell</span>
                    <span>3 x 10</span>
                  </div>
                  <div className="workout-preview-exercise">
                    <span>Cable Flyes</span>
                    <span>3 x 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        
      </div>

      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {features.map((feature) => (
            <div key={feature.id} className="carousel-slide">
              <div className="feature-card">
                <div className="feature-card-content">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {feature.visual === 'muscles' && (
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      )}
                      {feature.visual === 'difficulty' && (
                        <>
                          <path d="M12 20V10" />
                          <path d="M18 20V4" />
                          <path d="M6 20v-4" />
                        </>
                      )}
                      {feature.visual === 'workout' && (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </>
                      )}
                    </svg>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-list">
                    {feature.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="feature-card-visual">
                  <div className="feature-visual-placeholder">
                    {renderVisual(feature.visual)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-nav">
          <button 
            className="carousel-btn" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="carousel-dots">
            {features.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className="carousel-btn" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
