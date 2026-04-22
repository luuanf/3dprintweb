import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import './Footer.css';

const WHATSAPP_NUMBER_DISPLAY = '(11) 96842-8139';
const WHATSAPP_URL = 'https://wa.me/5511968428139';

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
            <Link to="/boneco" className="footer__link">Mini Boneco</Link>
            <Link to="/pet" className="footer__link">Mini Pet</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Pedidos</h4>
            <Link to="/pedido/boneco" className="footer__link">Pedir Mini Boneco</Link>
            <Link to="/pedido/pet" className="footer__link">Pedir Mini Pet</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Contato</h4>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link footer__link--icon"
            >
              <FaWhatsapp /> {WHATSAPP_NUMBER_DISPLAY}
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
