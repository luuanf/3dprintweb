import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { categories } from '../../data/products';
import { HiOutlineArrowRight } from 'react-icons/hi';
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
            {/* <source src="/path-to-your-video.mp4" type="video/mp4" /> */}
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
            Miniaturas personalizadas, impressas em 3D e pintadas à mão.
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
          <div className="home-showcase__image-placeholder">
            <span className="home-showcase__image-num">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="home-showcase__image-label">{category.name}</span>
          </div>
        </div>

        <div className="home-showcase__content">
          <span className="home-showcase__tag">{category.heroSubtitle}</span>
          <h2 className="home-showcase__title">{category.name}</h2>
          <p className="home-showcase__tagline">{category.tagline}</p>
          <p className="home-showcase__desc">{category.shortDescription}</p>
          <span className="home-showcase__price">{category.price}</span>
          <div className="home-showcase__actions">
            <Link to={`/${category.slug}`} className="home-showcase__btn home-showcase__btn--primary">
              Saiba mais
            </Link>
            <Link to={`/pedido/${category.slug}`} className="home-showcase__btn home-showcase__btn--secondary">
              Fazer pedido <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FeatureBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      className="home-feature"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="home-feature__inner">
          <div className="home-feature__badge">✦ Novo</div>
          <h2 className="home-feature__title">
            Pré-visualize com <em>Inteligência Artificial</em>
          </h2>
          <p className="home-feature__text">
            Antes de fazer seu pedido, veja como ficará sua miniatura.
            Nossa IA transforma sua foto em uma prévia realista do produto final.
          </p>
          <Link to="/funko" className="home-feature__cta">
            Experimentar agora <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { num: '01', title: 'Escolha a categoria', desc: 'Funko, Pet ou Chaveiro — cada um com seu estilo único.' },
    { num: '02', title: 'Envie sua foto', desc: 'Veja a prévia com IA antes de confirmar o pedido.' },
    { num: '03', title: 'Modelagem 3D', desc: 'Nossa equipe cria um modelo exclusivo do zero.' },
    { num: '04', title: 'Receba em casa', desc: 'Impresso, pintado e entregue com todo cuidado.' },
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
            Não vendemos objetos.
            <br />
            Vendemos <em>emoções.</em>
          </h2>
          <p className="home-emotion__text">
            Cada miniatura LOGO carrega uma história. Seja a lembrança de um pet amado,
            a celebração de uma conquista ou o presente perfeito para alguém especial.
          </p>
          <div className="home-emotion__stats">
            <div className="home-emotion__stat">
              <span className="home-emotion__stat-value">500+</span>
              <span className="home-emotion__stat-label">Miniaturas criadas</span>
            </div>
            <div className="home-emotion__stat">
              <span className="home-emotion__stat-value">4.9</span>
              <span className="home-emotion__stat-label">Avaliação média</span>
            </div>
            <div className="home-emotion__stat">
              <span className="home-emotion__stat-value">100%</span>
              <span className="home-emotion__stat-label">Artesanal</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Home() {
  return (
    <div className="home">
      <HeroSection />
      {categories.map((cat, i) => (
        <CategoryShowcase key={cat.id} category={cat} index={i} reversed={i % 2 !== 0} />
      ))}
      <FeatureBanner />
      <ProcessSection />
      <EmotionBanner />
    </div>
  );
}

export default Home;
