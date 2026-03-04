"use client"

export default function Hero({ onGetStarted }) {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">
      { /* <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        <span> Inactive currently</span>
      </div> */}

      <h1 className="hero-title">
        Build Your Perfect
        <br />
        <span className="hero-title-highlight">Workout Plan</span>
      </h1>

      <p className="hero-description">
        Generate personalized workouts tailored to your target muscle groups and 
        fitness level. No more guessing, just results.
      </p>

      <div className="hero-actions">
        <button 
          className="btn-primary btn-large"
          onClick={onGetStarted}
        >
          Generate Workout
        </button>
        <button className="btn-secondary btn-large">
          Learn More
        </button>
      </div>
      </div>
      <div className="hero-image">
      <img src="src\hrithik_roshan_grayscale_4k.jpg" alt="Fitness" />
      {/* Or a card with content */}
    </div>
    </div>

<div className="quote-banners">


   <div className="quote-banner" style={{backgroundImage: 'url(src/ronaldo.jpg)'}}>
    <p className="quote-text">""Work hard, focus on the everyday goals, enjoy the moments with your friends."</p>
    <span className="quote-author">- Cristiano Ronaldo</span>
    </div>

    
  <div className="quote-banner" style={{backgroundImage: 'url(src/arnold.jpg)'}}>
    <p className="quote-text">"The last three or four reps is what makes the muscle grow."</p>
    <span className="quote-author">- Arnold Schwarzenegger</span>
  </div>
  

 

  <div className="quote-banner" style={{backgroundImage: 'url(src/serene.png)', backgroundPosition: 'center 35%' }}>
    <p className="quote-text">"Think of all the girls who could become top athletes but quit sports because they’re afraid of having too many defined muscles and being made fun of or called unattractive."</p>
    <span className="quote-author">- Serena Williams</span>
  </div>
      </div>



      <div className="training-cards">
  <div className="training-card" style={{backgroundImage: 'url(src/cardio.jpg)'}}>
    <div className="training-card-content">
      <h3 className="training-card-title">Cardio</h3>
      <p className="training-card-desc">Boost your endurance and burn calories with high-intensity cardiovascular training. Perfect for heart health and fat loss.</p>
    </div>
  </div>
  
  <div className="training-card" style={{backgroundImage: 'url(src/gym.jpg)'}}>
    <div className="training-card-content">
      <h3 className="training-card-title">Weightlifting</h3>
      <p className="training-card-desc">Build raw strength and muscle mass through progressive overload. The foundation of any serious training program.</p>
    </div>
  </div>
  
  <div className="training-card" style={{backgroundImage: 'url(src/cali.png)'}}>
    <div className="training-card-content">
      <h3 className="training-card-title">Calisthenics</h3>
      <p className="training-card-desc">Master your bodyweight with functional movements. Develop strength, flexibility, and complete body control.</p>
    </div>
  </div>
</div>
    </section>
  )
}
