import { useState, useEffect } from 'react';
import { Phone, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center space-x-1 hover:text-secondary transition-colors"
            >
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span className="whitespace-nowrap">{COMPANY_INFO.phone}</span>
            </a>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span className="whitespace-nowrap">{COMPANY_INFO.workingHours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center">
            <img 
              src="/arquivos_site/logo_site.png" 
              alt={`${COMPANY_INFO.name} - Logotipo`}
              className="h-16 md:h-20 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium relative group">
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors font-medium relative group">
              Serviços
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#clientes" className="text-foreground hover:text-primary transition-colors font-medium relative group">
              Clientes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#orcamento" className="text-foreground hover:text-primary transition-colors font-medium relative group">
              Orçamento
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;