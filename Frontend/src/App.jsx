import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Order from "./pages/Order"
import { useState } from "react"
import FilterData from "./pages/FilterData"
import ProductDetail from "./pages/ProductDetail"
import Contact from "./pages/Contact"
import AboutUs from "./pages/AboutUs"
import LibreriaAPI from "./pages/LibreriaAPI"
import Admin from "./pages/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PaymentMethods from "./pages/PaymentMethods"
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [order, setOrder] = useState(null)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/order-confirmation" element={<Order order={order} />} />
        <Route path="/filter-data" element={<FilterData />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/libreriaapi" element={<LibreriaAPI />} />
        <Route
          path="/admin" element={
          <ProtectedAdminRoute>
              <Admin />
          </ProtectedAdminRoute>
          }
        />

      <Route
          path="/admin/payment-methods"
          element={
            <ProtectedAdminRoute>
              <PaymentMethods />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout setOrder={setOrder} />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
