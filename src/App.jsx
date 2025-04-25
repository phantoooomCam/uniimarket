import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BuyerDashboard from "./pages/BuyerDashboard"
import SellerDashboard from "./pages/SellerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import LandingPage from "./pages/LandingPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
