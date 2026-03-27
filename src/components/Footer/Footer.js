import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FiInstagram } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">LOGO</span>
            </Link>
            <p className="footer__tagline">
              Transformando memórias em
              <br />miniaturas artesanais.
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Produtos</h4>
            <Link to="/funko" className="footer__link">Mini Funko</Link>
            <Link to="/pet" className="footer__link">Mini Pet</Link>
            <Link to="/chaveiros" className="footer__link">Chaveiros</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Pedidos</h4>
            <Link to="/pedido/funko" className="footer__link">Pedir Mini Funko</Link>
            <Link to="/pedido/pet" className="footer__link">Pedir Mini Pet</Link>
            <Link to="/pedido/chaveiros" className="footer__link">Pedir Chaveiro</Link>
            <Link to="/rastreio" className="footer__link">Rastrear pedido</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Contato</h4>
            <a href="mailto:contato@logo.com.br" className="footer__link footer__link--icon">
              <HiOutlineMail /> contato@logo.com.br
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--icon">
              <FiInstagram /> @logo
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © {currentYear} LOGO. Todos os direitos reservados.
          </span>
          <span className="footer__made">
            Feito com dedicação, à mão.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
