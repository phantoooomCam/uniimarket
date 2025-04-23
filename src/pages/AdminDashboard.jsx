"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Datos de ejemplo para usuarios
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", type: "buyer", status: "active", joined: "2025-01-15" },
    { id: 2, name: "María López", email: "maria@example.com", type: "seller", status: "active", joined: "2025-02-10" },
    {
      id: 3,
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      type: "buyer",
      status: "inactive",
      joined: "2025-03-05",
    },
    { id: 4, name: "Ana Gómez", email: "ana@example.com", type: "seller", status: "active", joined: "2025-03-20" },
  ]

  // Datos de ejemplo para productos
  const products = [
    { id: 1, name: "Pizza Familiar", seller: "María López", category: "food", price: 12.99, status: "approved" },
    { id: 2, name: "Hamburguesa Doble", seller: "María López", category: "food", price: 8.5, status: "approved" },
    { id: 3, name: "Papas Fritas", seller: "Ana Gómez", category: "snacks", price: 3.99, status: "pending" },
    { id: 4, name: "Doritos", seller: "Ana Gómez", category: "snacks", price: 2.5, status: "approved" },
    { id: 5, name: "Cuaderno", seller: "Pedro Sánchez", category: "material", price: 1.99, status: "rejected" },
  ]

  // Datos de ejemplo para estadísticas
  const stats = {
    totalUsers: 156,
    totalSellers: 42,
    totalProducts: 287,
    totalOrders: 1243,
    revenue: 15678.9,
  }

  return (
    <div className="dashboard-container admin-dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="/logo.png" alt="UPIIMarket Logo" />
          <h1>UPIIMarket</h1>
          <span className="admin-badge">Administrador</span>
        </div>
        <nav className="user-nav">
          <Link to="/notifications" className="nav-item">
            Notificaciones
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

      <div className="admin-sidebar">
        <ul>
          <li>
            <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
              Vista General
            </button>
          </li>
          <li>
            <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
              Usuarios
            </button>
          </li>
          <li>
            <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
              Productos
            </button>
          </li>
          <li>
            <button className={activeTab === "categories" ? "active" : ""} onClick={() => setActiveTab("categories")}>
              Categorías
            </button>
          </li>
          <li>
            <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
              Pedidos
            </button>
          </li>
          <li>
            <button className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}>
              Reportes
            </button>
          </li>
          <li>
            <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
              Configuración
            </button>
          </li>
        </ul>
      </div>

      <main className="admin-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2>Vista General</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>Usuarios Totales</h3>
                <p className="stat-value">{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Vendedores</h3>
                <p className="stat-value">{stats.totalSellers}</p>
              </div>
              <div className="stat-card">
                <h3>Productos</h3>
                <p className="stat-value">{stats.totalProducts}</p>
              </div>
              <div className="stat-card">
                <h3>Pedidos</h3>
                <p className="stat-value">{stats.totalOrders}</p>
              </div>
              <div className="stat-card wide">
                <h3>Ingresos Totales</h3>
                <p className="stat-value">${stats.revenue.toFixed(2)}</p>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <ul>
                <li>Nuevo vendedor registrado - 30 minutos atrás</li>
                <li>Producto rechazado "Cuaderno" - 2 horas atrás</li>
                <li>5 nuevos pedidos realizados - 4 horas atrás</li>
                <li>Nuevo producto pendiente de aprobación - 1 día atrás</li>
              </ul>
            </div>

            <div className="pending-approvals">
              <h3>Pendientes de Aprobación</h3>
              <div className="approval-cards">
                <div className="approval-card">
                  <h4>Productos</h4>
                  <p className="count">3</p>
                  <button className="view-btn">Ver todos</button>
                </div>
                <div className="approval-card">
                  <h4>Vendedores</h4>
                  <p className="count">2</p>
                  <button className="view-btn">Ver todos</button>
                </div>
                <div className="approval-card">
                  <h4>Reportes</h4>
                  <p className="count">5</p>
                  <button className="view-btn">Ver todos</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-section">
            <div className="section-header">
              <h2>Gestión de Usuarios</h2>
              <div className="actions">
                <button className="add-product-btn">+ Añadir Usuario</button>
                <input type="text" placeholder="Buscar usuarios..." className="search-input" />
              </div>
            </div>

            <div className="filter-options">
              <select defaultValue="all">
                <option value="all">Todos los usuarios</option>
                <option value="buyer">Compradores</option>
                <option value="seller">Vendedores</option>
                <option value="admin">Administradores</option>
              </select>
              <select defaultValue="all_status">
                <option value="all_status">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>

            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-type ${user.type}`}>
                        {user.type === "buyer" ? "Comprador" : user.type === "seller" ? "Vendedor" : "Admin"}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                    <td className="actions">
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button>&laquo; Anterior</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>Siguiente &raquo;</button>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="products-section">
            <div className="section-header">
              <h2>Gestión de Productos</h2>
              <div className="actions">
                <input type="text" placeholder="Buscar productos..." className="search-input" />
              </div>
            </div>

            <div className="filter-options">
              <select defaultValue="all">
                <option value="all">Todas las categorías</option>
                <option value="food">Comida</option>
                <option value="snacks">Snacks</option>
                <option value="material">Material</option>
                <option value="others">Otros</option>
              </select>
              <select defaultValue="all_status">
                <option value="all_status">Todos los estados</option>
                <option value="approved">Aprobados</option>
                <option value="pending">Pendientes</option>
                <option value="rejected">Rechazados</option>
              </select>
            </div>

            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Vendedor</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.seller}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status === "approved"
                          ? "Aprobado"
                          : product.status === "pending"
                            ? "Pendiente"
                            : "Rechazado"}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="view-btn">Ver</button>
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button>&laquo; Anterior</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>Siguiente &raquo;</button>
            </div>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 UPIIMarket - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default AdminDashboard
