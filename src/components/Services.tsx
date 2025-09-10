import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock, Shield, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Transporte Rodoviário",
      description: "Transporte de cargas por todo território nacional com frota própria e parceiros qualificados.",
      features: ["Carga seca", "Carga refrigerada", "Transporte especial"]
    },
    {
      icon: MapPin,
      title: "Entrega Expressa",
      description: "Serviço de entrega rápida para cargas urgentes com rastreamento em tempo real.",
      features: ["Same day", "Next day", "Rastreamento"]
    },
    {
      icon: Clock,
      title: "Coleta Programada",
      description: "Agendamento de coletas conforme sua necessidade com horários flexíveis.",
      features: ["Horário fixo", "Sob demanda", "Emergencial"]
    },
    {
      icon: Shield,
      title: "Seguro Total",
      description: "Cobertura completa para sua carga desde a coleta até a entrega final.",
      features: ["Seguro obrigatório", "Seguro adicional", "Cobertura ampla"]
    },
    {
      icon: Zap,
      title: "Tecnologia Avançada",
      description: "Sistema de rastreamento e monitoramento em tempo real para total controle.",
      features: ["GPS tracking", "App mobile", "Alertas automáticos"]
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em transporte e logística para atender 
            todas as necessidades do seu negócio.
          </p>
        </div>

        <div className="space-y-8">
          {/* Primeira linha com 3 itens */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Segunda linha com 2 itens centralizados */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {services.slice(3, 5).map((service, index) => (
                <Card key={index + 3} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;