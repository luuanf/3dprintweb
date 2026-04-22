/**
 * Número oficial de contato e utilitários de links do WhatsApp.
 *
 * Toda a comunicação de pedidos/atendimento passa pelo WhatsApp.
 * Centralizamos aqui pra evitar duplicação de números e mensagens.
 */

export const WHATSAPP_NUMBER_E164 = '5511968428139';
export const WHATSAPP_NUMBER_DISPLAY = '(11) 96842-8139';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

function buildWhatsAppUrl(message) {
  if (!message) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * URL de WhatsApp para pedir um produto específico, já com mensagem
 * sugerida. O cliente pode editar antes de enviar.
 */
export function whatsappOrderUrl(productName, priceLabel) {
  const name = productName?.trim() || 'miniatura personalizada';
  const priceSuffix = priceLabel ? ` (${priceLabel})` : '';
  const message =
    `Oi! Tenho interesse no ${name}${priceSuffix} e quero fazer um pedido. ` +
    `Pode me passar os próximos passos?`;
  return buildWhatsAppUrl(message);
}

/**
 * URL de WhatsApp para dúvidas/atendimento geral.
 */
export function whatsappGeneralUrl() {
  return buildWhatsAppUrl(
    'Oi! Vim pelo site do Meu Eu 3D e queria tirar uma dúvida.'
  );
}
