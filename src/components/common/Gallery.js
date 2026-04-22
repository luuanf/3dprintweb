import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Gallery.css';

// Paletas para os placeholders enquanto não há fotos reais
const PALETTES = [
  ['#f2ece3', '#d8c6a6'],
  ['#e9d8c4', '#b99477'],
  ['#d9cbb7', '#a47b56'],
  ['#ece3d5', '#c8a775'],
  ['#efe6d6', '#b1845b'],
  ['#dccfb9', '#8d7a5d'],
  ['#e6d3be', '#a67c52'],
  ['#f4e9d8', '#caa27a'],
  ['#e0d4c3', '#6f5a42'],
];

const FIXED_GALLERY_ASPECT = '3 / 4';

function Placeholder({ index }) {
  const [from, to] = PALETTES[index % PALETTES.length];
  const gradient = `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
  return <div className="gallery__placeholder" style={{ background: gradient }} />;
}

function GalleryItem({ item, index }) {
  return (
    <motion.div
      className="gallery__item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <div className="gallery__item-image" style={{ aspectRatio: FIXED_GALLERY_ASPECT }}>
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <Placeholder index={index} />
        )}
      </div>
    </motion.div>
  );
}

function Gallery({ label, title, subtitle, items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {label && <span className="gallery__label">{label}</span>}
          {title && <h2 className="gallery__title">{title}</h2>}
          {subtitle && <p className="gallery__subtitle">{subtitle}</p>}
        </motion.div>

        <div className="gallery__grid">
          {items.map((item, i) => (
            <GalleryItem key={item.id ?? i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
