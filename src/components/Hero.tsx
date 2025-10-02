import { Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-truck.jpg';

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 z-10">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                Transporte de Cargas
                <span className="block text-secondary mt-2">Rápido e Seguro</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed max-w-xl">
                Há quase 30 anos conectando empresas por todo o Brasil com soluções 
                logísticas eficientes. Sua carga em mãos seguras, sempre no prazo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))]/90 text-white font-semibold text-base px-8 group"
              >
                <a href="#orcamento">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground font-semibold"
              >
                <a href="#servicos">
                  Conheça Nossos Serviços
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </div>
                <span className="text-sm md:text-base font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </div>
                <span className="text-sm md:text-base font-medium">Entrega Rápida</span>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[500px] z-10">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage}
                alt="Caminhão MVC Transportes em operação" 
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

export default Hero;