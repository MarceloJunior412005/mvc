import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background shadow-sm">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span className="whitespace-nowrap">(11) 98206-6490</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span className="break-all">mvctransportestaboao@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="whitespace-nowrap">Seg-Sex: 8h às 18h</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="whitespace-nowrap">Taboão da Serra - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex items-center justify-center w-full md:w-auto md:mr-8">
            <img 
              src="/lovable-uploads/41ee31ee-ad60-4284-bbb5-5b0be31145fe.png" 
              alt="MVC Transportes - Logotipo" 
              className="h-16 w-auto" 
            />
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-12 mx-auto">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">Início</a>
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors font-medium">Serviços</a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">Sobre Nós</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;