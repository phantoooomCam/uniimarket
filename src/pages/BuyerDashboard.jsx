"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"

const BuyerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("food")
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo para productos
  const products = [
    { id: 1, name: "Pizza Familiar", price: 12.99, category: "food", image: "/placeholder.svg?height=180&width=250" },
    { id: 2, name: "Hamburguesa Doble", price: 8.5, category: "food", image: "/placeholder.svg?height=180&width=250" },
    { id: 3, name: "Papas Fritas", price: 3.99, category: "snacks", image: "/placeholder.svg?height=180&width=250" },
    { id: 4, name: "Doritos", price: 2.5, category: "snacks", image: "/placeholder.svg?height=180&width=250" },
    { id: 5, name: "Cuaderno", price: 1.99, category: "material", image: "/placeholder.svg?height=180&width=250" },
    {
      id: 6,
      name: "Bolígrafos (pack)",
      price: 3.25,
      category: "material",
      image: "/placeholder.svg?height=180&width=250",
    },
    { id: 7, name: "Audífonos", price: 15.99, category: "others", image: "/placeholder.svg?height=180&width=250" },
    { id: 8, name: "Cargador USB", price: 7.5, category: "others", image: "/placeholder.svg?height=180&width=250" },
  ]

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <img src="/logo.png" alt="UPIIMarket Logo" />
          <h1>UPIIMarket</h1>
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
          <div className="user-profile">
            <img src="/placeholder.svg?height=40&width=40" alt="Perfil" />
            <div className="dropdown-menu">
              <Link to="/profile">Mi Perfil</Link>
              <Link to="/settings">Configuración</Link>
              <Link to="/logout">Cerrar Sesión</Link>
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
        <p>&copy; 2025 UPIIMarket - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default BuyerDashboard
