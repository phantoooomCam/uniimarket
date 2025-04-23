"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Auth.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Datos de inicio de sesión:", formData)

      // Simulación de inicio de sesión
      // En un caso real, esto vendría del backend
      const userType = "buyer" // Esto sería determinado por la respuesta del servidor

      // Redireccionar según el tipo de usuario
      if (userType === "buyer") {
        window.location.href = "/buyer-dashboard"
      } else if (userType === "seller") {
        window.location.href = "/seller-dashboard"
      } else if (userType === "admin") {
        window.location.href = "/admin-dashboard"
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="UPIIMarket Logo" />
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="auth-button">
            Iniciar sesión
          </button>
        </form>

        <div className="auth-footer">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
