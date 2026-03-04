"use client"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo"> <img src="src/silhoulette-bb.jpg" alt="Logo" /></div>
          <span className="footer-title">Fit-Ania</span>
        </div>

        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Support</a>
        </div>

        <div className="footer-copyright">
          2026 Fit-Ania. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
