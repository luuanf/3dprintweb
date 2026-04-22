import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { categories } from '../../data/products';
import { FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappOrderUrl } from '../../config/contact';
import { formatPromoLabel } from '../../data/pricing';
import PriceTag from '../../components/common/PriceTag';
import Gallery from '../../components/common/Gallery';
import { HOME_GALLERY_ITEMS } from '../../data/gallery';
import SEO from '../../components/common/SEO';
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD, absoluteUrl } from '../../config/seo';
import './Home.css';

function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero__video-container">
        <div className="home-hero__video-area">
          <video
            className="home-hero__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/media/hero/hero.mp4" type="video/mp4" />
          </video>
          <div className="home-hero__video-fallback" />
        </div>
        <div className="home-hero__overlay" />
      </div>

      <div className="home-hero__content container">
        <motion.div
          className="home-hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="home-hero__title">
            Suas memórias,
            <br />
            <em>em miniatura.</em>
          </h1>
          <p className="home-hero__subtitle">
            A gente imprime em 3D e pinta à mão — tudo pra caber na sua estante.
          </p>
        </motion.div>

        <motion.div
          className="home-hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="home-hero__scroll-line" />
        </motion.div>
      </div>
    </section>
  );
}

function CategoryShowcase({ category, index, reversed }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const featuredImage = category.portfolio?.find((p) => p.image)?.image;

  return (
    <motion.section
      ref={ref}
      className={`home-showcase ${reversed ? 'home-showcase--reversed' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="home-showcase__inner container">
        <div className="home-showcase__image">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={category.name}
              className="home-showcase__image-photo"
              loading="lazy"
            />
          ) : (
            <div className="home-showcase__image-placeholder">
              <span className="home-showcase__image-num">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="home-showcase__image-label">{category.name}</span>
            </div>
          )}
        </div>

        <div className="home-showcase__content">
          <span className="home-showcase__tag">{category.heroSubtitle}</span>
          <h2 className="home-showcase__title">{category.name}</h2>
          <p className="home-showcase__tagline">{category.tagline}</p>
          <p className="home-showcase__desc">{category.shortDescription}</p>
          <PriceTag size="md" className="home-showcase__price" />
          <div className="home-showcase__actions">
            <Link to={`/${category.slug}`} className="home-showcase__btn home-showcase__btn--primary">
              Saiba mais
            </Link>
            <a
              href={whatsappOrderUrl(category.name, formatPromoLabel())}
              target="_blank"
              rel="noopener noreferrer"
              className="home-showcase__btn home-showcase__btn--secondary"
            >
              <FaWhatsapp /> Fazer pedido
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { num: '01', title: 'Escolhe o estilo', desc: 'Mini Boneco ou Mini Pet — cada um com seu jeito.' },
    { num: '02', title: 'Manda o pedido', desc: 'Conta os detalhes da peça e envia pra gente.' },
    { num: '03', title: 'A gente combina tudo', desc: 'Chamamos no WhatsApp pra pedir as fotos, alinhar detalhes e combinar o pagamento.' },
    { num: '04', title: 'Modelagem e entrega', desc: 'Criamos sua peça do zero, imprimimos, pintamos à mão e mandamos pra sua casa.' },
  ];

  return (
    <section className="home-process" ref={ref}>
      <div className="container">
        <motion.div
          className="home-process__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="home-process__label">Como funciona</span>
          <h2 className="home-process__title">
            Da foto à miniatura,
            <br /><em>em 4 passos.</em>
          </h2>
        </motion.div>

        <div className="home-process__grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="home-process__step"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <span className="home-process__step-num">{step.num}</span>
              <h3 className="home-process__step-title">{step.title}</h3>
              <p className="home-process__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSTAGRAM_URL = 'https://www.instagram.com/meueu3d';
const INSTAGRAM_HANDLE = '@meueu3d';
const INSTAGRAM_PHOTOS = [
  '/media/funko/5.jpg',
  '/media/pet/4.jpg',
  '/media/funko/3.jpg',
  '/media/pet/2.jpg',
];

function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="home-insta" ref={ref}>
      <div className="container">
        <motion.div
          className="home-insta__inner"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="home-insta__content">
            <span className="home-insta__label">
              <FiInstagram /> {INSTAGRAM_HANDLE}
            </span>
            <h2 className="home-insta__title">
              Acompanhe os bastidores
              <br />
              <em>no Instagram.</em>
            </h2>
            <p className="home-insta__text">
              A gente posta cada peça saindo do ateliê, bastidores da pintura
              e ideias pra sua próxima miniatura. Dá aquele follow lá.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="home-insta__btn"
            >
              <FiInstagram /> Seguir no Instagram
            </a>
          </div>

          <div className="home-insta__gallery" aria-hidden="true">
            {INSTAGRAM_PHOTOS.map((src, i) => (
              <motion.a
                key={src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="home-insta__tile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <img src={src} alt="" loading="lazy" />
                <span className="home-insta__tile-overlay">
                  <FiInstagram />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmotionBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      className="home-emotion"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <div className="home-emotion__content">
          <h2 className="home-emotion__title">
            A gente não vende objeto.
            <br />
            A gente entrega <em>memória.</em>
          </h2>
          <p className="home-emotion__text">
            Cada miniatura do Meu Eu 3D tem uma história por trás — o pet que virou parte da família,
            aquela viagem que ninguém esquece, o presente feito sob medida pra alguém especial.
            A peça fica, e a lembrança junto.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function Home() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/${cat.slug}`),
      name: cat.name,
    })),
  };

  return (
    <div className="home">
      <SEO
        title="Miniaturas personalizadas em 3D e pintadas à mão"
        description="Bonecos personalizados e miniaturas do seu pet feitos sob encomenda: um boneco com a sua cara ou uma miniatura do seu bichinho. Impressão 3D em PLA de alta definição e pintura à mão, com envio pra todo o Brasil."
        path="/"
        jsonLd={[ORGANIZATION_JSONLD, WEBSITE_JSONLD, itemListJsonLd]}
      />
      <HeroSection />
      {categories.map((cat, i) => (
        <CategoryShowcase key={cat.id} category={cat} index={i} reversed={i % 2 !== 0} />
      ))}
      <ProcessSection />
      <Gallery
        label="Galeria"
        title={<>Uma olhadinha no que <em>já saiu do ateliê.</em></>}
        subtitle="Cada peça é feita com cuidado — impressa e pintada por nós. Dá uma passada de olho em alguns trabalhos."
        items={HOME_GALLERY_ITEMS}
      />
      <InstagramSection />
      <EmotionBanner />
    </div>
  );
}

export default Home;
