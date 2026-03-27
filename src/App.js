import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import ScrollToTop from './components/common/ScrollToTop';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <WhatsAppFloat />
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/rastreio" element={<TrackOrder />} />
              <Route path="/pedido/:slug" element={<Order />} />
              <Route path="/:slug" element={<ProductPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
