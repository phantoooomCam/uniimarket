"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);

  // Efecto para cargar la información del usuario al montar el componente
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Llamada a la API para obtener la información del usuario
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include", // Para incluir cookies en la solicitud
        });

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          console.error("No se pudo obtener la información del usuario");
        }
      } catch (err) {
        console.error("Error al obtener información del usuario:", err);
      }
    };

    fetchUserInfo();
  }, []);

  // Función para obtener las iniciales del nombre
  const getUserInitials = (user) => {
    if (!user) return "";

    // Obtener la inicial del nombre y del apellido
    const firstInitial = user.nombre ? user.nombre.charAt(0) : "";
    const lastInitial = user.apellidos ? user.apellidos.charAt(0) : "";

    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  // Generar un color basado en el nombre (para tener un color consistente para cada usuario)
  const getProfileColor = (user) => {
    if (!user) return "#6366F1"; // Color por defecto

    const fullName = `${user.nombre} ${user.apellidos}`;
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
      "#EF4444", // Rojo
      "#F59E0B", // Ámbar
      "#10B981", // Esmeralda
      "#3B82F6", // Azul
      "#8B5CF6", // Violeta
      "#EC4899", // Rosa
      "#6366F1", // Índigo
      "#14B8A6", // Turquesa
    ];

    // Seleccionar un color basado en el hash
    return colors[Math.abs(hash) % colors.length];
  };

  // Fetch para ver productors del vendedor

  useEffect(() => {
    const fetchMisProductos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/productos/mios",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSellerProducts(data);
        } else {
          console.error("Error al obtener los productos del vendedor");
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      }
    };

    if (userInfo) fetchMisProductos();
  }, [userInfo]);

  // Datos de ejemplo para órdenes
  const orders = [
    {
      id: 101,
      customer: "Juan Pérez",
      items: 3,
      total: 25.48,
      status: "pending",
      date: "2025-04-20",
    },
    {
      id: 102,
      customer: "María López",
      items: 1,
      total: 12.99,
      status: "delivered",
      date: "2025-04-19",
    },
    {
      id: 103,
      customer: "Carlos Ruiz",
      items: 2,
      total: 11.0,
      status: "in_progress",
      date: "2025-04-18",
    },
  ];

  // Datos de ejemplo para estadísticas
  const stats = {
    totalSales: 1245.67,
    totalOrders: 89,
    pendingOrders: 12,
    topProduct: "Doritos",
  };

  // Verificar si la suscripción está activa
  const subscriptionActive = true;

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("No se pudo cerrar sesión correctamente.");
    }
  };

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
              <button
                className="dropdown-item"
                onClick={() => console.log("Perfil")}
              >
                Mi Perfil
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Configuración")}
              >
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
          <p>
            Tu suscripción de vendedor no está activa. Para publicar productos,
            debes activar tu suscripción.
          </p>
          <button className="subscribe-button">Activar suscripción</button>
        </div>
      )}

      <div className="seller-tabs">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Mis Productos
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Pedidos
        </button>
        <button
          className={activeTab === "earnings" ? "active" : ""}
          onClick={() => setActiveTab("earnings")}
        >
          Ganancias
        </button>
      </div>

      <main className="seller-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Ventas Totales</h3>
              <p className="stat-value">${stats.totalSales.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Pedidos Totales</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Pedidos Pendientes</h3>
              <p className="stat-value">{stats.pendingOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Producto Más Vendido</h3>
              <p className="stat-value">{stats.topProduct}</p>
            </div>

            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <ul>
                <li>Nuevo pedido recibido - 10 minutos atrás</li>
                <li>Pedido #102 entregado - 2 horas atrás</li>
                <li>Nuevo comentario en "Pizza Familiar" - 5 horas atrás</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="products-management">
            <div className="section-header">
              <h2>Mis Productos</h2>
              <button className="add-product-btn">+ Añadir Producto</button>
            </div>

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
                    <td>${parseFloat(product.precio).toFixed(2)}</td>

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

        {activeTab === "orders" && (
          <div className="orders-management">
            <h2>Pedidos</h2>

            <div className="order-filters">
              <select defaultValue="all">
                <option value="all">Todos los pedidos</option>
                <option value="pending">Pendientes</option>
                <option value="in_progress">En proceso</option>
                <option value="delivered">Entregados</option>
              </select>
            </div>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Artículos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status === "pending"
                          ? "Pendiente"
                          : order.status === "in_progress"
                          ? "En proceso"
                          : "Entregado"}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td className="actions">
                      <button className="view-btn">Ver</button>
                      <button className="update-btn">Actualizar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="earnings-section">
            <h2>Mis Ganancias</h2>

            <div className="earnings-summary">
              <div className="summary-card">
                <h3>Este mes</h3>
                <p className="amount">$458.75</p>
              </div>
              <div className="summary-card">
                <h3>Último mes</h3>
                <p className="amount">$623.90</p>
              </div>
              <div className="summary-card">
                <h3>Total</h3>
                <p className="amount">$1,245.67</p>
              </div>
            </div>

            <div className="earnings-history">
              <h3>Historial de pagos</h3>
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-04-01</td>
                    <td>$623.90</td>
                    <td>
                      <span className="status-badge completed">Completado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2025-03-01</td>
                    <td>$512.45</td>
                    <td>
                      <span className="status-badge completed">Completado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2025-02-01</td>
                    <td>$109.32</td>
                    <td>
                      <span className="status-badge completed">Completado</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 UNIIMarket - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default SellerDashboard;
