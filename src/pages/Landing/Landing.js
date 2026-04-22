import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineCheck,
  HiOutlineGift,
  HiOutlineClock,
  HiOutlineChatAlt2,
} from 'react-icons/hi';
import { FIXED_PRICE_CENTS } from '../../data/pricing';
import './Landing.css';

const FORMATTED_PRICE = `R$${(FIXED_PRICE_CENTS / 100)
  .toFixed(2)
  .replace('.', ',')}`;

const FUNKO_IMAGES = ['/media/funko/5.jpg', '/media/funko/6.jpg', '/media/funko/2.jpg'];
const PET_IMAGES = ['/media/pet/4.jpg', '/media/pet/2.jpg', '/media/pet/1.jpg'];

const GALLERY = [
  '/media/funko/1.jpg',
  '/media/pet/1.jpg',
  '/media/funko/3.jpg',
  '/media/pet/3.jpg',
  '/media/funko/4.jpg',
  '/media/pet/4.jpg',
  '/media/funko/5.jpg',
  '/media/pet/2.jpg',
];

const BENEFITS = [
  {
    icon: <HiOutlineSparkles />,
    title: 'Peça única, só sua',
    text: 'Cada miniatura é impressa e pintada à mão, exclusivamente pra você.',
  },
  {
    icon: <HiOutlineHeart />,
    title: 'Feito com carinho',
    text: 'A gente se dedica pros detalhes que fazem a peça ser realmente sua.',
  },
  {
    icon: <HiOutlineGift />,
    title: 'Pronta pra presentear',
    text: 'Chega na sua casa já em caixinha de apresentação caprichada.',
  },
  {
    icon: <HiOutlineCheck />,
    title: 'Durabilidade real',
    text: 'Impressão 3D em PLA de alta definição com verniz protetor.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Faz seu pedido',
    text: 'Escolhe o estilo e envia seus dados — sem pagamento online agora.',
  },
  {
    num: '02',
    title: 'A gente te chama',
    text: 'Pelo WhatsApp, pedimos suas fotos e alinhamos cada detalhe.',
  },
  {
    num: '03',
    title: 'Produção artesanal',
    text: 'Impressão 3D em PLA e pintura feita à mão.',
  },
  {
    num: '04',
    title: 'Recebe em casa',
    text: 'Embalagem caprichada e envio pra todo o Brasil.',
  },
];

const FAQ = [
  {
    q: 'Como funciona o pagamento?',
    a: 'Sem pagamento online aqui. A gente combina tudo no WhatsApp: forma de pagamento, prazo e detalhes da peça.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'Em média, de 5 a 15 dias depois que a gente alinha os detalhes da sua peça com você.',
  },
  {
    q: 'Preciso mandar quantas fotos?',
    a: 'Uma foto boa já é o suficiente. A gente analisa e, se precisar de mais algum ângulo, solicita pelo WhatsApp depois do pedido.',
  },
  {
    q: 'Qual o tamanho e o material?',
    a: 'Todas as peças têm 12 cm, feitas em PLA de alta qualidade com pintura à mão e verniz protetor.',
  },
];

function LandingHero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero__bg" />
      <div className="lp-hero__inner container">
        <motion.div
          className="lp-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="lp-hero__tag">Edição artesanal · peças limitadas por mês</span>
          <h1 className="lp-hero__title">
            Transforme uma foto em <em>miniatura pra vida toda.</em>
          </h1>
          <p className="lp-hero__desc">
            Miniaturas personalizadas do seu jeito ou do seu pet — impressas em
            3D e pintadas à mão, peça por peça. Um presente que ninguém mais
            vai ter igual.
          </p>
          <div className="lp-hero__price-row">
            <span className="lp-hero__price">{FORMATTED_PRICE}</span>
            <span className="lp-hero__price-note">· 12 cm · peça única</span>
          </div>
          <div className="lp-hero__actions">
            <a href="#escolha" className="lp-btn lp-btn--primary">
              Quero a minha <HiOutlineArrowRight />
            </a>
            <a href="#como-funciona" className="lp-btn lp-btn--ghost">
              Como funciona
            </a>
          </div>
          <div className="lp-hero__meta">
            <span><HiOutlineClock /> Produção em 5 a 15 dias</span>
            <span><HiOutlineChatAlt2 /> Atendimento no WhatsApp</span>
          </div>
        </motion.div>

        <motion.div
          className="lp-hero__gallery"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="lp-hero__gallery-big">
            <img src="/media/funko/5.jpg" alt="Mini Funko personalizado" loading="eager" />
          </div>
          <div className="lp-hero__gallery-small">
            <img src="/media/pet/4.jpg" alt="Mini Pet personalizado" loading="eager" />
          </div>
          <div className="lp-hero__gallery-tiny">
            <img src="/media/funko/3.jpg" alt="Mini Funko detalhe" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChoiceSection() {
  const options = [
    {
      slug: 'funko',
      kicker: 'Mini Funko',
      title: 'Sua cara em miniatura',
      text: 'Uma versão colecionável de quem você quiser. Personagem, você mesmo, alguém especial.',
      bullets: ['Cabeça no estilo Funko', 'Roupa e acessórios à sua escolha', 'Base com nome (se quiser)'],
      images: FUNKO_IMAGES,
      cta: 'Quero o Mini Funko',
    },
    {
      slug: 'pet',
      kicker: 'Mini Pet',
      title: 'Seu melhor amigo, sempre ali',
      text: 'Uma réplica em miniatura do seu bichinho — pelagem certa, olhar certo, aquele jeitinho.',
      bullets: ['Pelagem pintada à mão', 'Pose escolhida por você', 'Ótima pra presentear'],
      images: PET_IMAGES,
      cta: 'Quero o Mini Pet',
    },
  ];

  return (
    <section className="lp-choice" id="escolha">
      <div className="container">
        <motion.div
          className="lp-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="lp-section__label">Escolhe o estilo</span>
          <h2 className="lp-section__title">
            Qual a sua <em>miniatura?</em>
          </h2>
          <p className="lp-section__subtitle">
            Dois estilos, a mesma dedicação. Clica na que mais combina com você
            pra começar seu pedido.
          </p>
        </motion.div>

        <div className="lp-choice__grid">
          {options.map((opt, i) => (
            <motion.div
              key={opt.slug}
              className="lp-choice__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="lp-choice__images">
                <div className="lp-choice__image lp-choice__image--main">
                  <img src={opt.images[0]} alt={opt.kicker} loading="lazy" />
                </div>
                <div className="lp-choice__image lp-choice__image--side">
                  <img src={opt.images[1]} alt={opt.kicker} loading="lazy" />
                </div>
                <div className="lp-choice__image lp-choice__image--tiny">
                  <img src={opt.images[2]} alt={opt.kicker} loading="lazy" />
                </div>
              </div>
              <div className="lp-choice__body">
                <span className="lp-choice__kicker">{opt.kicker}</span>
                <h3 className="lp-choice__title">{opt.title}</h3>
                <p className="lp-choice__desc">{opt.text}</p>
                <ul className="lp-choice__bullets">
                  {opt.bullets.map((b) => (
                    <li key={b}>
                      <HiOutlineCheck /> {b}
                    </li>
                  ))}
                </ul>
                <div className="lp-choice__cta-row">
                  <span className="lp-choice__price">{FORMATTED_PRICE}</span>
                  <Link to={`/pedido/${opt.slug}`} className="lp-btn lp-btn--primary">
                    {opt.cta} <HiOutlineArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="lp-benefits">
      <div className="container">
        <motion.div
          className="lp-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="lp-section__label">Por que a Meu Eu 3D</span>
          <h2 className="lp-section__title">
            Mais que uma miniatura, <em>uma memória.</em>
          </h2>
        </motion.div>
        <div className="lp-benefits__grid">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className="lp-benefits__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="lp-benefits__icon">{b.icon}</div>
              <h4 className="lp-benefits__title">{b.title}</h4>
              <p className="lp-benefits__text">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="lp-steps" id="como-funciona">
      <div className="container">
        <motion.div
          className="lp-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="lp-section__label">Como funciona</span>
          <h2 className="lp-section__title">
            Em 4 passos <em>a peça é sua.</em>
          </h2>
        </motion.div>
        <div className="lp-steps__grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="lp-steps__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="lp-steps__num">{s.num}</span>
              <h4 className="lp-steps__title">{s.title}</h4>
              <p className="lp-steps__text">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="lp-gallery">
      <div className="container">
        <motion.div
          className="lp-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="lp-section__label">Portfólio</span>
          <h2 className="lp-section__title">
            Algumas <em>saídas do ateliê.</em>
          </h2>
        </motion.div>
        <div className="lp-gallery__grid">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              className="lp-gallery__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            >
              <img src={src} alt="Miniatura personalizada" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="lp-faq" ref={ref}>
      <div className="container">
        <motion.div
          className="lp-section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="lp-section__label">Dúvidas</span>
          <h2 className="lp-section__title">
            Tá na dúvida? <em>A gente responde.</em>
          </h2>
        </motion.div>
        <div className="lp-faq__list">
          {FAQ.map((item, i) => (
            <motion.div
              key={item.q}
              className="lp-faq__item"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="lp-final">
      <div className="container">
        <motion.div
          className="lp-final__inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="lp-section__label lp-section__label--light">
            Vagas limitadas por mês
          </span>
          <h2 className="lp-final__title">
            Sua miniatura está a <em>um clique de ser feita.</em>
          </h2>
          <p className="lp-final__text">
            Por {FORMATTED_PRICE}, você leva uma peça única, feita à mão, com o
            carinho de quem se importa com os detalhes. Escolha o estilo e
            começa agora.
          </p>
          <div className="lp-final__actions">
            <Link to="/pedido/funko" className="lp-btn lp-btn--primary">
              Quero o Mini Funko <HiOutlineArrowRight />
            </Link>
            <Link to="/pedido/pet" className="lp-btn lp-btn--secondary">
              Quero o Mini Pet <HiOutlineArrowRight />
            </Link>
          </div>
          <p className="lp-final__note">
            Sem pagamento online · combinamos tudo pelo WhatsApp após o pedido.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="lp-page">
      <LandingHero />
      <ChoiceSection />
      <BenefitsSection />
      <StepsSection />
      <GallerySection />
      <FaqSection />
      <FinalCta />
    </div>
  );
}

export default Landing;
