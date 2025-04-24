"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import "../styles/Auth.css"

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contraseña: "",
    confirmPassword: "",
    rol: "cliente",
    telefono: "",
    escuela: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son obligatorios"
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido"
    }

    if (!formData.contraseña) {
      newErrors.contraseña = "La contraseña es obligatoria"
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.contraseña !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio"
    }

    if (!formData.escuela.trim()) {
      newErrors.escuela = "La escuela es obligatoria"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            correo: formData.correo,
            contraseña: formData.contraseña,
            rol: formData.rol,
            telefono: formData.telefono,
            escuela: formData.escuela,
          }),
        })

        if (response.ok) {
          setNotification({
            show: true,
            message: "Registro exitoso",
            type: "success",
          })
          setTimeout(() => {
            navigate("/")
          }, 1500)
        } else {
          const data = await response.json()
          setNotification({
            show: true,
            message: data.error || "Error en el registro",
            type: "error",
          })
        }
      } catch (err) {
        console.error(err)
        setNotification({
          show: true,
          message: "Error al conectar con el servidor",
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="UPIIMarket Logo" />
        </div>
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Ingresa tus apellidos"
            />
            {errors.apellidos && <span className="error">{errors.apellidos}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingresa tu número de teléfono"
            />
            {errors.telefono && <span className="error">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="escuela">Escuela</label>
            <select id="escuela" name="escuela" value={formData.escuela} onChange={handleChange}>
              <option value="">Selecciona una escuela</option>
              <option value="UPIITA">UPIITA</option>
              <option value="UPIICSA">UPIICSA</option>
              <option value="ESIME">ESIME</option>
              <option value="UPIIBI">UPIIBI</option>
              <option value="ESIA">ESIA</option>
              <option value="ESCA">ESCA</option>
            </select>
            {errors.escuela && <span className="error">{errors.escuela}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="contraseña"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rol">Tipo de usuario</label>
            <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
              <option value="cliente">Comprador</option>
              <option value="vendedor">Vendedor</option>
            </select>
          </div>

          <button type="submit" className="auth-button">
            Registrarse
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
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

export default Register
