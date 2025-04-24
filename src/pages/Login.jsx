"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import "../styles/Auth.css"

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es obligatorio"
    }

    if (!formData.contraseña) {
      newErrors.contraseña = "La contraseña es obligatoria"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: formData.correo,
            contraseña: formData.contraseña,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const userRole = data.usuario.rol

          // Redirección según el rol
          if (userRole === "cliente") {
            navigate("/buyer-dashboard")
          } else if (userRole === "vendedor") {
            navigate("/seller-dashboard")
          } else if (userRole === "admin") {
            navigate("/admin-dashboard")
          }
        } else {
          const data = await response.json()
          setNotification({
            show: true,
            message: data.error || "Error al iniciar sesión",
            type: "error",
          })
        }
      } catch (err) {
        console.error(err)
        setNotification({
          show: true,
          message: "Error de conexión con el servidor",
          type: "error",
        })
      }
    } else {
      setErrors(newErrors)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.contraseña && <span className="error">{errors.contraseña}</span>}
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
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button className="notification-close" onClick={() => setNotification({ ...notification, show: false })}>
            ×
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
