import ScrollReveal from './ScrollReveal';
import MultiStepForm from './MultiStepForm';
import QuoteFormSidebar from './QuoteFormSidebar';

const QuoteFormNew = () => {
  return (
    <section id="orcamento" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Solicite seu Orçamento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha o formulário e receba uma cotação personalizada em minutos
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScrollReveal delay={100}>
              <MultiStepForm />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={200}>
              <QuoteFormSidebar />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteFormNew;
