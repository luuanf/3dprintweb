import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppFloat.css';

const WHATSAPP_URL = 'https://wa.me/5511968428139';

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp className="whatsapp-float__icon" aria-hidden />
    </a>
  );
}

export default WhatsAppFloat;
