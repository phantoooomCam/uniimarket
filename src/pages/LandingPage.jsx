"use client"

import { useState, useEffect } from "react"
import "../styles/LandingPage.css"
import { Clock, Smartphone, MapPin } from "lucide-react"

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 11,
    minutes: 59,
    seconds: 17,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft((prev) => ({ ...prev, seconds: prev.seconds - 1 }))
      } else if (timeLeft.minutes > 0) {
        setTimeLeft((prev) => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }))
      } else if (timeLeft.hours > 0) {
        setTimeLeft((prev) => ({ ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }))
      } else if (timeLeft.days > 0) {
        setTimeLeft((prev) => ({ ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }))
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-logo">
          <img src="/logo.png" alt="Unimarket Logo" />
          <h1>Unimarket</h1>
        </div>
        <nav className="landing-nav">
          <a href="#about">Acerca de</a>
          <a href="#features">Características</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">¡Próximamente en tu Universidad!</h2>
            <h3 className="hero-subtitle">La nueva forma de pedir tus productos</h3>
            <p className="hero-description">
              Unimarket revolucionará la forma en que pides productos. Más rápido, más fácil y con más opciones que
              nunca.
            </p>
          </div>
          <div className="hero-image">
            <img src="/logo.png" alt="Unimarket Logo Grande" />
          </div>
        </section>

        <section className="countdown-section">
          <h3>Lanzamiento en</h3>
          <div className="countdown-timer">
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.days}</div>
              <div className="countdown-label">Días</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.hours}</div>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.minutes}</div>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.seconds}</div>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="features-title">¿Qué ofrecerá Unimarket?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={24} color="#d94c35" />
              </div>
              <h3>Entrega Rápida</h3>
              <p>Recibe tus pedidos en tiempo récord con nuestro sistema optimizado de entrega.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Smartphone size={24} color="#d94c35" />
              </div>
              <h3>App Web Intuitiva</h3>
              <p>Interfaz fácil de usar que te permite encontrar y pedir tus productos favoritos en segundos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin size={24} color="#d94c35" />
              </div>
              <h3>Amplia Cobertura</h3>
              <p>Llegamos a más lugares para que puedas disfrutar de tus productos favoritos donde estés.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-content">
            <h2>Mantente en contacto</h2>
            <div className="contact-columns">
              <div className="contact-left">
                <p>¿Quieres ser de los primeros en probar Unimarket? Pronto nos contactaremos contigo.</p>
              </div>
              <div className="contact-right">
                <div className="contact-info">
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:contacto@unimarket.com">contacto@unimarket.com</a>
                </div>
                <div className="contact-info">
                  <span className="contact-icon">📍</span>
                  <span>Próximamente en tu Universidad</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="Unimarket Logo" />
            <span>Unimarket</span>
          </div>
          <p className="copyright">© 2025 Unimarket. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
