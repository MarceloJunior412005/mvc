import { Shield, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Transporte de Cargas
                <span className="block text-secondary">Rápido e Seguro</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Há mais de 10 anos conectando empresas por todo o Brasil com soluções 
                logísticas eficientes. Sua carga em mãos seguras, sempre no prazo.
              </p>
            </div>

            <div className="relative z-20">
              <a href="#orcamento" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 px-8 font-semibold w-fit">
                Fazer Orçamento Grátis
              </a>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-secondary" />
                <span className="text-sm font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-secondary" />
                <span className="text-sm font-medium">Entrega Rápida</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/41ee31ee-ad60-4284-bbb5-5b0be31145fe.png" 
                alt="MVC Transportes - Logo" 
                className="h-64 w-64 lg:h-80 lg:w-80 mx-auto object-contain opacity-90" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};
export default Hero;