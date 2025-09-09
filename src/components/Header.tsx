import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-topbar">
        <div className="header-topbar-content">
          <div className="header-topbar-info">
            <div className="flex-contact-info">
              <div className="header-contact-item">
                <Phone className="h-4 w-4" />
                <span>(11) 98206-6490</span>
              </div>
              <div className="header-contact-item">
                <Mail className="h-4 w-4" />
                <span>mvctransportestaboao@gmail.com</span>
              </div>
            </div>
            <div className="flex-contact-info">
              <div className="header-contact-item">
                <Clock className="h-4 w-4" />
                <span>Seg-Sex: 8h às 18h</span>
              </div>
              <div className="header-contact-item">
                <MapPin className="h-4 w-4" />
                <span>Taboão da Serra - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="header-main-content">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/41ee31ee-ad60-4284-bbb5-5b0be31145fe.png" 
              alt="MVC Transportes - Logotipo" 
              className="header-logo" 
            />
          </div>

          <nav className="header-nav">
            <a href="#inicio" className="header-nav-link">Início</a>
            <a href="#servicos" className="header-nav-link">Serviços</a>
            <a href="#sobre" className="header-nav-link">Sobre Nós</a>
            <a href="#contato" className="header-nav-link">Contato</a>
          </nav>

          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;