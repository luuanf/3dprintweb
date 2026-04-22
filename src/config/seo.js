/**
 * Configuração centralizada de SEO do site.
 *
 * Para trocar o domínio em produção, defina REACT_APP_SITE_URL no .env
 * (ex.: REACT_APP_SITE_URL=https://meueu3d.com.br). Sem o env, usamos
 * o domínio padrão do Firebase Hosting.
 */

export const SITE_URL = (
  process.env.REACT_APP_SITE_URL || 'https://meueu3d.com.br'
).replace(/\/$/, '');

export const SITE_NAME = 'Meu Eu 3D';

export const DEFAULT_TITLE = 'Meu Eu 3D — Miniaturas personalizadas em impressão 3D';

export const DEFAULT_DESCRIPTION =
  'Bonecos personalizados e miniaturas do seu pet feitos sob encomenda: impressão 3D em PLA de alta definição e pintura à mão. Transformamos fotos suas e do seu bichinho em peças únicas pra guardar pra sempre.';

export const DEFAULT_KEYWORDS = [
  'miniatura personalizada',
  'boneco personalizado',
  'boneco 3d personalizado',
  'boneco com a sua cara',
  'impressão 3D',
  'miniatura de pet',
  'miniatura do meu cachorro',
  'miniatura do meu gato',
  'presente personalizado',
  'topo de bolo casamento',
  'impressão 3D em PLA',
  'pintura à mão',
  'meu eu 3d',
];

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    'https://www.instagram.com/meueu3d',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+55-11-96842-8139',
      url: 'https://wa.me/5511968428139',
      availableLanguage: ['Portuguese'],
    },
  ],
};

export const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'pt-BR',
};

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
