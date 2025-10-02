import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Clock, Shield, Star, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

const QuoteFormSidebar = () => {
  const benefits = [
    {
      icon: Clock,
      text: 'Resposta em até 30min',
    },
    {
      icon: Shield,
      text: 'Seguro total incluso',
    },
    {
      icon: TrendingUp,
      text: 'Melhor custo-benefício',
    },
  ];



  return (
    <div className="space-y-6">
      <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Contato Direto</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <a
            href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-secondary transition-colors"
          >
            <p className="font-semibold">WhatsApp</p>
            <p className="text-primary-foreground/90">{COMPANY_INFO.phone}</p>
          </a>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="block hover:text-secondary transition-colors"
          >
            <p className="font-semibold">E-mail</p>
            <p className="text-primary-foreground/90 break-words text-sm">
              {COMPANY_INFO.email}
            </p>
          </a>
        </CardContent>
      </Card>

      <Card className="border-secondary/20 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 text-secondary mr-2" />
            Por que escolher a MVC?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <benefit.icon className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">{benefit.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>


    </div>
  );
};

export default QuoteFormSidebar;
