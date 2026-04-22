import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiX, HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import './Header.css';

const navLinks = [
  { label: 'Mini Funko', to: '/funko' },
  { label: 'Mini Pet', to: '/pet' },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const showBg = scrolled || !isHome;
  const minimal = isHome && !scrolled;

  return (
    <header className={`header ${showBg ? 'header--solid' : ''} ${minimal ? 'header--minimal' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <img src="/logo.png" alt="Meu Eu 3D" className="header__logo-image" />
          <span className="header__logo-text">Meu Eu 3D</span>
        </Link>

        <nav className="header__nav header__nav--desktop">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`header__nav-link ${location.pathname === to ? 'header__nav-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <Link to="/carrinho" className="header__cart" aria-label="Carrinho">
            <HiOutlineShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="header__cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>

        <button
          className="header__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt4 size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="header__mobile-nav">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <Link to="/" className="header__mobile-link">Início</Link>
              </motion.div>
              {navLinks.map(({ label, to }, i) => (
                <motion.div key={to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.08 }}>
                  <Link to={to} className="header__mobile-link">{label}</Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Link to="/carrinho" className="header__mobile-link">
                  Carrinho {totalItems > 0 && `(${totalItems})`}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
