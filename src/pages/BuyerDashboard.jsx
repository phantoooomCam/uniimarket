"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"
import hamburguesa from "../assets/hamburguesa.png"
import pizza from "../assets/pizza.jpeg"
import papas from "../assets/papas.jpeg"
import doritos from "../assets/doritos.jpeg"
import cuadernos from "../assets/cuadernos.jpg"
import boligrafos from "../assets/boligrafos.jpg"
import audifonos from "../assets/audifonos.jpg"
import cargador from "../assets/cargador.jpeg"

const BuyerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("food")
  const [searchTerm, setSearchTerm] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Datos de ejemplo para productos
  const products = [
    {
      id: 1,
      name: "Pizza Familiar",
      price: 20,
      category: "food",
      image: pizza,
    },
    {
      id: 2,
      name: "Hamburguesa Doble",
      price: 25,
      category: "food",
      image: hamburguesa,
    },
    {
      id: 3,
      name: "Papas Fritas",
      price: 3.99,
      category: "snacks",
      image: papas,
    },
    {
      id: 4,
      name: "Doritos",
      price: 2.5,
      category: "snacks",
      image: doritos,
    },
    {
      id: 5,
      name: "Cuaderno",
      price: 1.99,
      category: "material",
      image: cuadernos,
    },
    {
      id: 6,
      name: "Bolígrafos (pack)",
      price: 3.25,
      category: "material",
      image: boligrafos,
    },
    {
      id: 7,
      name: "Audífonos",
      price: 15.99,
      category: "others",
      image: audifonos,
    },
    {
      id: 8,
      name: "Cargador USB",
      price: 7.5,
      category: "others",
      image: cargador,
    },
  ]

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Cerrar el menú cuando se hace clic fuera de él
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

  const handleLogout = () => {
    // Aquí irá tu lógica de cierre de sesión
    console.log("Cerrando sesión...")
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <img src="/logo.png" alt="UPIIMarket Logo" />
          <h1>UNIIMarket</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <nav className="user-nav">
          <Link to="/cart" className="nav-item">
            Carrito (0)
          </Link>
          <Link to="/orders" className="nav-item">
            Mis Pedidos
          </Link>
          <div className="user-profile" ref={profileRef}>
            <button className="profile-button" onClick={handleProfileClick}>
              <img src="/placeholder.svg?height=40&width=40" alt="Perfil" />
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

      <div className="category-tabs">
        <button className={activeCategory === "all" ? "active" : ""} onClick={() => setActiveCategory("all")}>
          Todos
        </button>
        <button className={activeCategory === "food" ? "active" : ""} onClick={() => setActiveCategory("food")}>
          Comida
        </button>
        <button className={activeCategory === "snacks" ? "active" : ""} onClick={() => setActiveCategory("snacks")}>
          Snacks
        </button>
        <button className={activeCategory === "material" ? "active" : ""} onClick={() => setActiveCategory("material")}>
          Material
        </button>
        <button className={activeCategory === "others" ? "active" : ""} onClick={() => setActiveCategory("others")}>
          Otros
        </button>
      </div>

      <main className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 UNIIMarket - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default BuyerDashboard
