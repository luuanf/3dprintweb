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
              <img src="/logo.png" alt="Meu Eu 3D" className="footer__logo-image" />
              <span className="footer__logo-text">Meu Eu 3D</span>
            </Link>
            <p className="footer__tagline">
              Transformando memórias em
              <br />miniaturas feitas à mão.
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Produtos</h4>
            <Link to="/funko" className="footer__link">Mini Funko</Link>
            <Link to="/pet" className="footer__link">Mini Pet</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Pedidos</h4>
            <Link to="/pedido/funko" className="footer__link">Pedir Mini Funko</Link>
            <Link to="/pedido/pet" className="footer__link">Pedir Mini Pet</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Contato</h4>
            <a href="mailto:contato@meueu3d.com.br" className="footer__link footer__link--icon">
              <HiOutlineMail /> contato@meueu3d.com.br
            </a>
            <a href="https://www.instagram.com/meueu3d" target="_blank" rel="noopener noreferrer" className="footer__link footer__link--icon">
              <FiInstagram /> @meueu3d
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © {currentYear} Meu Eu 3D. Todos os direitos reservados.
          </span>
          <span className="footer__made">
            Feito com carinho, peça por peça.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
