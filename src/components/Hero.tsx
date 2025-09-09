import { Shield, Clock, Star } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transporte de Cargas
                <span className="hero-subtitle">Rápido e Seguro</span>
              </h1>
              <p className="hero-description">
                Há mais de 10 anos conectando empresas por todo o Brasil com soluções 
                logísticas eficientes. Sua carga em mãos seguras, sempre no prazo.
              </p>
            </div>

            <div className="hero-cta">
              <a href="#orcamento" className="hero-cta-button">
                Fazer Orçamento Grátis
              </a>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <Shield className="hero-feature-icon" />
                <span className="hero-feature-text">100% Seguro</span>
              </div>
              <div className="hero-feature">
                <Clock className="hero-feature-icon" />
                <span className="hero-feature-text">Entrega Rápida</span>
              </div>
              <div className="hero-feature">
                <Star className="hero-feature-icon" />
                <span className="hero-feature-text">Nota 4.9/5</span>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-image">
              <img 
                src="/lovable-uploads/41ee31ee-ad60-4284-bbb5-5b0be31145fe.png" 
                alt="MVC Transportes - Logo" 
                className="hero-logo" 
              />
            </div>
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </div>

      <div className="hero-background">
        <div className="hero-decoration-1"></div>
        <div className="hero-decoration-2"></div>
      </div>
    </section>
  );
};
export default Hero;