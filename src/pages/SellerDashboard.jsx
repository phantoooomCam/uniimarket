"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Upload, X, Check, Loader2 } from "lucide-react"
import "../styles/Dashboard.css"

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)

  const [sellerProducts, setSellerProducts] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "comida",
    imagen_url: "",
  })
  const [showForm, setShowForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: "" })
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const userData = await response.json()
          setUserInfo(userData)
        } else {
          console.error("No se pudo obtener la información del usuario")
        }
      } catch (err) {
        console.error("Error al obtener información del usuario:", err)
      }
    }

    fetchUserInfo()
  }, [])

  const getUserInitials = (user) => {
    if (!user) return ""
    const firstInitial = user.nombre ? user.nombre.charAt(0) : ""
    const lastInitial = user.apellidos ? user.apellidos.charAt(0) : ""
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  const getProfileColor = (user) => {
    if (!user) return "#6366F1"
    const fullName = `${user.nombre} ${user.apellidos}`
    let hash = 0
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash)
    }
    const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#6366F1", "#14B8A6"]
    return colors[Math.abs(hash) % colors.length]
  }

  useEffect(() => {
    const fetchMisProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productos/mios", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          setSellerProducts(data)
        } else {
          console.error("Error al obtener los productos del vendedor")
        }
      } catch (err) {
        console.error("Error de conexión:", err)
      }
    }

    if (userInfo) fetchMisProductos()
  }, [userInfo])

  // Función para manejar la subida de imágenes al FTP
  const handleImageUpload = async (file) => {
    if (!file) return null

    setIsUploading(true)
    setUploadStatus({ success: false, message: "" })

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("http://localhost:3000/api/upload/image", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al subir la imagen")
      }

      const data = await response.json()

      setNuevoProducto({
        ...nuevoProducto,
        imagen_url: data.imageUrl,
      })

      setUploadStatus({
        success: true,
        message: "Imagen subida correctamente",
      })

      return data.imageUrl
    } catch (error) {
      console.error("Error al subir la imagen:", error)
      setUploadStatus({
        success: false,
        message: "Error al subir la imagen. Intente nuevamente.",
      })
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedImage(file)

    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setNuevoProducto({
      ...nuevoProducto,
      imagen_url: "",
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setUploadStatus({ success: false, message: "" })
  }

  const handleCrearProducto = async (e) => {
    e.preventDefault()

    try {
      let imageUrl = nuevoProducto.imagen_url
      if (selectedImage && !imageUrl) {
        imageUrl = await handleImageUpload(selectedImage)
        if (!imageUrl) {
          alert("Error al subir la imagen. Por favor, intente nuevamente.")
          return
        }
      }

      const productoData = {
        ...nuevoProducto,
        imagen_url: imageUrl,
      }

      const response = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productoData),
      })

      if (response.ok) {
        const creado = await response.json()
        alert("Producto creado correctamente")
        setShowForm(false)
        setNuevoProducto({
          nombre: "",
          descripcion: "",
          precio: "",
          categoria: "comida",
          imagen_url: "",
        })
        setSelectedImage(null)
        setImagePreview(null)
        setUploadStatus({ success: false, message: "" })

        const nuevos = await fetch("http://localhost:3000/api/productos/mios", {
          credentials: "include",
        })
        const data = await nuevos.json()
        setSellerProducts(data)
      } else {
        const error = await response.json()
        alert("Error al crear: " + (error.error || "desconocido"))
      }
    } catch (error) {
      console.error("Error al crear producto:", error)
      alert("Error de red o del servidor.")
    }
  }

  // Datos de ejemplo para órdenes y estadísticas (mantener el código existente)
  const orders = [
    {
      id: 101,
      customer: "Juan Pérez",
      items: 3,
      total: 25.48,
      status: "pending",
      date: "2025-04-20",
    },
    // ... resto de órdenes
  ]

  const stats = {
    totalSales: 1245.67,
    totalOrders: 89,
    pendingOrders: 12,
    topProduct: "Doritos",
  }

  const subscriptionActive = true

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      })

      navigate("/")
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
      alert("No se pudo cerrar sesión correctamente.")
    }
  }

  return (
    <div className="dashboard-container seller-dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="/logo.png" alt="UNIIMarket Logo" />
          <h1>UNIIMarket</h1>
          <span className="seller-badge">Vendedor</span>
        </div>
        <nav className="user-nav">
          <Link to="/notifications" className="nav-item">
            Notificaciones
          </Link>
          <div className="user-profile" ref={profileRef}>
            <button
              className="profile-button"
              onClick={handleProfileClick}
              style={{
                backgroundColor: getProfileColor(userInfo),
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              {userInfo ? getUserInitials(userInfo) : ""}
            </button>
            <div className={`dropdown-menu ${isProfileOpen ? "show" : ""}`}>
              <button className="dropdown-item" onClick={() => console.log("Perfil")}>
                Mi Perfil
              </button>
              <button className="dropdown-item" onClick={() => console.log("Configuración")}>
                Configuración
              </button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>
      </header>

      {!subscriptionActive && (
        <div className="subscription-banner">
          <p>Tu suscripción de vendedor no está activa. Para publicar productos, debes activar tu suscripción.</p>
          <button className="subscribe-button">Activar suscripción</button>
        </div>
      )}

      <div className="seller-tabs">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>
        <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
          Mis Productos
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          Pedidos
        </button>
        <button className={activeTab === "earnings" ? "active" : ""} onClick={() => setActiveTab("earnings")}>
          Ganancias
        </button>
      </div>

      <main className="seller-content">
        {activeTab === "products" && (
          <div className="products-management">
            <div className="section-header">
              <h2>Mis Productos</h2>
              <button className="add-product-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancelar" : "+ Añadir Producto"}
              </button>
            </div>

            {showForm && (
              <div className="add-product-form-container">
                <form className="add-product-form" onSubmit={handleCrearProducto}>
                  <h3>Añadir Nuevo Producto</h3>

                  <div className="form-grid">
                    <div className="form-column">
                      <div className="form-group">
                        <label htmlFor="nombre">Nombre del Producto*</label>
                        <input
                          type="text"
                          id="nombre"
                          placeholder="Nombre del producto"
                          value={nuevoProducto.nombre}
                          onChange={(e) =>
                            setNuevoProducto({
                              ...nuevoProducto,
                              nombre: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                          id="descripcion"
                          placeholder="Descripción del producto"
                          value={nuevoProducto.descripcion}
                          onChange={(e) =>
                            setNuevoProducto({
                              ...nuevoProducto,
                              descripcion: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="precio">Precio*</label>
                          <input
                            type="number"
                            id="precio"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={nuevoProducto.precio}
                            onChange={(e) =>
                              setNuevoProducto({
                                ...nuevoProducto,
                                precio: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="categoria">Categoría*</label>
                          <select
                            id="categoria"
                            value={nuevoProducto.categoria}
                            onChange={(e) =>
                              setNuevoProducto({
                                ...nuevoProducto,
                                categoria: e.target.value,
                              })
                            }
                          >
                            <option value="comida">Comida</option>
                            <option value="snacks">Snacks</option>
                            <option value="material">Material</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-column">
                      <div className="form-group image-upload-container">
                        <label>Imagen del Producto</label>
                        <div className={`image-upload-area ${imagePreview ? "has-image" : ""}`}>
                          {!imagePreview ? (
                            <>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="file-input"
                                id="product-image"
                              />
                              <label htmlFor="product-image" className="upload-label">
                                <Upload size={24} />
                                <span>Seleccionar imagen</span>
                                <span className="upload-hint">JPG, PNG o GIF (Max. 5MB)</span>
                              </label>
                            </>
                          ) : (
                            <div className="image-preview-container">
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Vista previa"
                                className="image-preview"
                              />
                              <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </div>

                        {isUploading && (
                          <div className="upload-status uploading">
                            <Loader2 size={16} className="spinner" />
                            <span>Subiendo imagen...</span>
                          </div>
                        )}

                        {!isUploading && uploadStatus.message && (
                          <div className={`upload-status ${uploadStatus.success ? "success" : "error"}`}>
                            {uploadStatus.success ? <Check size={16} /> : <X size={16} />}
                            <span>{uploadStatus.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowForm(false)
                        setSelectedImage(null)
                        setImagePreview(null)
                        setNuevoProducto({
                          nombre: "",
                          descripcion: "",
                          precio: "",
                          categoria: "comida",
                          imagen_url: "",
                        })
                      }}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="submit-btn" disabled={isUploading}>
                      {isUploading ? "Subiendo..." : "Guardar Producto"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Ventas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>{product.categoria}</td>
                    <td>${Number.parseFloat(product.precio).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status === "active" ? "Activo" : "Sin stock"}
                      </span>
                    </td>
                    <td>{product.sales}</td>
                    <td className="actions">
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Resto de las pestañas del dashboard... */}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 UNIIMarket - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default SellerDashboard
