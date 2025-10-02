import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, Clock, Shield, Zap, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from './ScrollReveal';

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: 'Transporte Rodoviário',
      description: 'Transporte de cargas por todo território nacional com frota própria e parceiros qualificados.',
      features: ['Carga Batida', 'Carga Paletizada', 'Transporte especial'],
    },
    {
      icon: MapPin,
      title: 'Entrega Expressa',
      description: 'Serviço de entrega rápida para cargas urgentes com rastreamento em tempo real.',
      features: ['Mesmo dia', 'Dia seguinte', 'Rastreamento'],
    },
    {
      icon: Clock,
      title: 'Coleta Programada',
      description: 'Agendamento de coletas conforme sua necessidade com horários flexíveis.',
      features: ['Horário fixo', 'Sob demanda', 'Emergencial'],
    },
    {
      icon: Shield,
      title: 'Seguro Total',
      description: 'Cobertura completa para sua carga desde a coleta até a entrega final.',
      features: ['Seguro obrigatório', 'Seguro adicional', 'Cobertura ampla'],
    },
    {
      icon: Zap,
      title: 'Tecnologia Avançada',
      description: 'Sistema de rastreamento e monitoramento em tempo real para total controle.',
      features: ['Rastreador', 'Monitoramento', 'Alertas'],
    },
    {
      icon: Package,
      title: 'Armazenamento',
      description: 'Soluções de armazenagem segura para sua carga com controle total de estoque.',
      features: ['Curta duração', 'Longa duração', 'Segurança'],
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Nossos Serviços
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas em transporte e logística para atender todas as
              necessidades do seu negócio.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Card className="group border-0 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 h-full bg-card hover:bg-card/95">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-500">
                    <service.icon className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-muted-foreground min-h-[60px]">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {service.features.map((feature, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;