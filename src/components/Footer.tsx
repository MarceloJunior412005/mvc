import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.4fr] gap-8">
          <div className="space-y-4">
            <img 
              src="/arquivos_site/logo_site.png" 
              alt="MVC Transportes" 
              className="h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-primary-foreground/80 text-sm">
              Há mais de 20 anos oferecendo soluções completas em transporte de cargas 
              por todo o Brasil com segurança e pontualidade.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-secondary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-secondary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-secondary cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Transporte Rodoviário</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Logística Integrada</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Entrega Expressa</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Coleta Programada</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Seguro de Cargas</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="text-primary-foreground/80 hover:text-secondary transition-colors">Início</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="text-primary-foreground/80 hover:text-secondary transition-colors">Sobre Nós</a></li>
              <li><a href="#orcamento" className="text-primary-foreground/80 hover:text-secondary transition-colors">Orçamento</a></li>
              <li><a href="#contato" className="text-primary-foreground/80 hover:text-secondary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-secondary flex-shrink-0" />
                <div>
                  <p>Rua João Antônio da Fonseca, 995</p>
                  <p>Taboão da Serra - SP</p>
                  <p>CEP: 06770-230</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span>(11) 98206-6490</span>
              </div>
              <div className="flex items-center space-x-3 min-w-0">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="break-words">mvctransportestaboao@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p>Seg-Sex: 8h às 18h</p>
                  <p>Sáb: 8h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2000 - {new Date().getFullYear()} MVC Transportes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;