import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import QuoteFormNew from "@/components/QuoteFormNew";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Clients />
        <QuoteFormNew />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
