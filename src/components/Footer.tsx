import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/arquivos_site/logo_site.png"
              alt={COMPANY_INFO.name}
              className="h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-primary-foreground/80 text-sm">
              Há quase 30 anos oferecendo soluções completas em transporte de cargas por todo o
              Brasil com segurança e pontualidade.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#servicos"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Transporte Rodoviário
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Entrega Expressa
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Coleta Programada
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Seguro de Cargas
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#clientes"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Clientes
                </a>
              </li>
              <li>
                <a
                  href="#orcamento"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Orçamento
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-secondary flex-shrink-0" />
                <div>
                  <p>{COMPANY_INFO.address.street}</p>
                  <p>
                    {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}
                  </p>
                  <p>CEP: {COMPANY_INFO.address.zip}</p>
                </div>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center space-x-3 hover:text-secondary transition-colors"
              >
                <Phone className="h-4 w-4 text-secondary" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center space-x-3 min-w-0 hover:text-secondary transition-colors"
              >
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="break-words">{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p>{COMPANY_INFO.workingHours.weekdays}</p>
                  <p>{COMPANY_INFO.workingHours.saturday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {COMPANY_INFO.founded} - {currentYear} {COMPANY_INFO.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;