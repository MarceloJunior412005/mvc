import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background shadow-sm">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>(11) 98206-6490</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>mvctransportestaboao@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Seg-Sex: 8h às 18h</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Taboão da Serra - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/41ee31ee-ad60-4284-bbb5-5b0be31145fe.png" 
              alt="MVC Transportes - Logotipo" 
              className="h-16 w-auto" 
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Início</a>
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors">Serviços</a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors">Sobre Nós</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
          </nav>

          <a
            href="https://wa.me/5511982066490?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20transporte."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold">
              Solicitar Orçamento no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;