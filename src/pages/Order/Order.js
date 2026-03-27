import React, { useState, useRef, useCallback } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineUpload,
  HiOutlineSparkles,
  HiOutlinePhotograph,
  HiOutlineRefresh,
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
} from 'react-icons/hi';
import { getCategoryBySlug } from '../../data/products';
import { getPriceForSize, PIECE_SIZES_CM, supportsPieceSize } from '../../data/pricing';
import { useCart } from '../../context/CartContext';
import './Order.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Order() {
  const { slug } = useParams();
  const product = getCategoryBySlug(slug);
  const { addItem, formatPrice } = useCart();
  const navigate = useNavigate();

  const [selectedSizeCm, setSelectedSizeCm] = useState(10);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [notes, setNotes] = useState('');

  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Por favor, envie apenas imagens.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 10MB.');
      return;
    }
    setError(null);
    setPreviewImage(null);
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleGenerate = async () => {
    if (!uploadedFile) return;
    setIsGenerating(true);
    setError(null);
    setPreviewImage(null);

    try {
      const fd = new FormData();
      fd.append('image', uploadedFile);
      fd.append('category', product.id);

      const response = await fetch(`${API_BASE_URL}/api/generate-preview`, {
        method: 'POST',
        body: fd,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || 'Erro ao gerar preview.');
      }

      const data = await response.json();
      setPreviewImage(data.image_url.startsWith('http') ? data.image_url : `${API_BASE_URL}${data.image_url}`);
    } catch (err) {
      setError(err.message || 'Erro de conexão com o servidor.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setPreviewImage(null);
    setError(null);
  };

  const handleAddToCart = () => {
    addItem({
      category: product.id,
      notes,
      photoDataUrl: uploadedImage || '',
      previewUrl: previewImage || '',
      ...(supportsPieceSize(product.id) ? { sizeCm: selectedSizeCm } : {}),
    });
    navigate('/carrinho');
  };

  if (!product) return <Navigate to="/" replace />;

  const piecePrice = supportsPieceSize(product.id)
    ? getPriceForSize(product.id, selectedSizeCm)
    : null;
  const priceDisplay = piecePrice != null ? formatPrice(piecePrice) : product.price;

  return (
    <div className="order-page">
      <section className="order-header-section">
        <div className="container">
          <Link to={`/${product.slug}`} className="order-back">
            <HiOutlineArrowLeft /> Voltar para {product.name}
          </Link>

          <motion.div
            className="order-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="order-header__tag">{product.heroSubtitle}</span>
            <h1 className="order-header__title">
              Personalizar <em>{product.name}</em>
            </h1>
            <p className="order-header__price">{priceDisplay}</p>
          </motion.div>
        </div>
      </section>

      <section className="order-content">
        <div className="container">
          <div className="order-grid">
            {/* Left: Upload + AI Preview */}
            <motion.div
              className="order-preview-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="order-step">
                <span className="order-step__num">01</span>
                <span className="order-step__label">Envie sua foto</span>
              </div>

              <div
                className={`order-dropzone ${dragActive ? 'order-dropzone--active' : ''} ${uploadedImage ? 'order-dropzone--has-image' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploadedImage && fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="order-dropzone__uploaded">
                    <img src={uploadedImage} alt="Uploaded" />
                    <button
                      className="order-dropzone__reset"
                      onClick={(e) => { e.stopPropagation(); handleReset(); }}
                    >
                      <HiOutlineRefresh /> Trocar foto
                    </button>
                  </div>
                ) : (
                  <div className="order-dropzone__empty">
                    <HiOutlineUpload className="order-dropzone__icon" />
                    <span className="order-dropzone__title">Arraste sua foto aqui</span>
                    <span className="order-dropzone__hint">ou clique para selecionar · JPG, PNG até 10MB</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="order-step" style={{ marginTop: '2rem' }}>
                <span className="order-step__num">02</span>
                <span className="order-step__label">Pré-visualize com IA</span>
                <span className="order-step__badge">✦ Opcional</span>
              </div>

              <div className="order-ai-section">
                <button
                  className="order-ai-btn"
                  onClick={handleGenerate}
                  disabled={!uploadedImage || isGenerating}
                >
                  <HiOutlineSparkles />
                  {isGenerating ? 'Gerando prévia...' : 'Gerar prévia com IA'}
                </button>
                <p className="order-ai-hint">
                  Veja como ficará sua miniatura antes de adicionar ao carrinho.
                </p>

                <div className="order-ai-result">
                  {isGenerating ? (
                    <div className="order-ai-loading">
                      <div className="order-ai-spinner" />
                      <span>Gerando sua miniatura...</span>
                      <span className="order-ai-loading-hint">Isso pode levar alguns segundos</span>
                    </div>
                  ) : previewImage ? (
                    <div className="order-ai-preview">
                      <img src={previewImage} alt="AI Preview" />
                      <p className="order-ai-disclaimer">
                        * Prévia gerada por IA. O produto final pode ter pequenas variações.
                      </p>
                    </div>
                  ) : (
                    <div className="order-ai-empty">
                      <HiOutlinePhotograph />
                      <span>A prévia aparecerá aqui</span>
                    </div>
                  )}
                </div>
              </div>

              {error && <div className="order-error">{error}</div>}
            </motion.div>

            {/* Right: Notes + Add to Cart */}
            <motion.div
              className="order-form-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="order-step">
                <span className="order-step__num">03</span>
                <span className="order-step__label">Detalhes do pedido</span>
              </div>

              <div className="order-details">
                {supportsPieceSize(product.id) && (
                  <div className="order-form__group">
                    <label className="order-form__label">Tamanho da peça</label>
                    <div className="order-size-picker" role="group" aria-label="Tamanho da peça em centímetros">
                      {PIECE_SIZES_CM.map((cm) => {
                        const cents = getPriceForSize(product.id, cm);
                        const active = selectedSizeCm === cm;
                        return (
                          <button
                            key={cm}
                            type="button"
                            className={`order-size-picker__btn ${active ? 'order-size-picker__btn--active' : ''}`}
                            onClick={() => setSelectedSizeCm(cm)}
                            aria-pressed={active}
                          >
                            <span className="order-size-picker__cm">{cm} cm</span>
                            <span className="order-size-picker__price">{formatPrice(cents)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="order-form__group">
                  <label className="order-form__label">Observações</label>
                  <textarea
                    className="order-form__textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Descreva detalhes como pose, roupas, acessórios ou qualquer preferência..."
                    rows={5}
                  />
                </div>

                <div className="order-summary-box">
                  <div className="order-summary-box__row">
                    <span>Produto</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="order-summary-box__row">
                    <span>Preço</span>
                    <span className="order-summary-box__price">{priceDisplay}</span>
                  </div>
                  {supportsPieceSize(product.id) && (
                    <div className="order-summary-box__row">
                      <span>Tamanho</span>
                      <span>{selectedSizeCm} cm</span>
                    </div>
                  )}
                  <div className="order-summary-box__row">
                    <span>Foto enviada</span>
                    <span>{uploadedImage ? 'Sim ✓' : 'Pendente'}</span>
                  </div>
                  <div className="order-summary-box__row">
                    <span>Prévia IA</span>
                    <span>{previewImage ? 'Gerada ✓' : 'Não gerada'}</span>
                  </div>
                </div>

                <button
                  className="order-add-cart"
                  onClick={handleAddToCart}
                  disabled={!uploadedImage}
                >
                  <HiOutlineShoppingBag /> Adicionar ao carrinho
                </button>

                <p className="order-form__note">
                  Após adicionar ao carrinho, você poderá revisar e finalizar
                  o pagamento na página de checkout.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Order;
