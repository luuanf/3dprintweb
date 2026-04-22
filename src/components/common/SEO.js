import React from 'react';
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../../config/seo';

/**
 * Componente de SEO que se apoia no hoisting nativo do React 19 para
 * `<title>`, `<meta>` e `<link>` dentro de qualquer componente.
 *
 * Props:
 * - title: título da página (sem o sufixo do site)
 * - description: meta description
 * - path: caminho relativo (ex.: "/funko") usado para canonical e OG url
 * - image: URL absoluta ou relativa pra imagem de preview
 * - keywords: array de palavras-chave
 * - type: "website" | "product" | "article" ...
 * - noIndex: se true, aplica robots noindex,nofollow
 * - jsonLd: objeto ou array de objetos JSON-LD (schema.org)
 */
function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  type = 'website',
  noIndex = false,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  const canonical = absoluteUrl(path);
  const ogImage = image?.startsWith('http') ? image : absoluteUrl(image);
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title || SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title || SITE_NAME} />

      {jsonLdArray.map((data, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <meta name="author" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <link rel="alternate" hrefLang="pt-BR" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
    </>
  );
}

export default SEO;
