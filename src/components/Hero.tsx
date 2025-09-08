import { Button } from "@/components/ui/button";
import { Truck, Shield, Clock, Star } from "lucide-react";

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

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
                Fazer Orçamento Grátis
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Rastrear Carga
              </Button>
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
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-secondary" />
                <span className="text-sm font-medium">Nota 4.9/5</span>
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

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;