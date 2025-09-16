import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SUPABASE_URL = 'https://cvjxfedmojojgqgzrqhk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2anhmZWRtb2pvamRxZ3pycWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NDQ1NzEsImV4cCI6MjA0MjAyMDU3MX0.0YnpFBP6C2QzCBKV5F1uVbOJFXKYKZEY2IuBLEtUj4c'

const QuoteForm = () => {
  const { toast } = useToast();
  
  // Form state must be declared before effects that reference it
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    originState: "",
    originCity: "",
    destinationState: "",
    destinationCity: "",
    cargoType: "",
    weight: "",
    urgency: "",
    description: ""
  });
  
  // IBGE: lista de UFs e cidades por UF (cache em localStorage)
  const [ufs, setUfs] = useState<string[]>([]);
  const [citiesByUf, setCitiesByUf] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const cached = localStorage.getItem('ibge_ufs');
    if (cached) {
      try { setUfs(JSON.parse(cached)); } catch { /* ignore */ }
    }
    const loadUfs = async () => {
      try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await res.json() as Array<{ id: number; sigla: string; nome: string }>;
        const siglas = data.map((e) => e.sigla);
        setUfs(siglas);
        localStorage.setItem('ibge_ufs', JSON.stringify(siglas));
      } catch (e) {
        toast({ title: 'Erro ao carregar UFs', description: 'Tente novamente mais tarde.', variant: 'destructive' });
      }
    };
    if (!cached) loadUfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCitiesForUf = async (uf: string) => {
    if (!uf) return;
    const cacheKey = `ibge_cities_${uf}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as string[];
        setCitiesByUf((prev) => ({ ...prev, [uf]: parsed }));
        return;
      } catch { /* ignore and refetch */ }
    }
    try {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`);
      const data = await res.json() as Array<{ id: number; nome: string }>;
      const names = data.map((c) => c.nome);
      setCitiesByUf((prev) => ({ ...prev, [uf]: names }));
      localStorage.setItem(cacheKey, JSON.stringify(names));
    } catch (e) {
      toast({ title: `Erro ao carregar cidades de ${uf}`, description: 'Tente novamente mais tarde.', variant: 'destructive' });
    }
  };

  // Carregar cidades quando uma UF for selecionada
  useEffect(() => { if (formData.originState) fetchCitiesForUf(formData.originState); }, [formData.originState]);
  useEffect(() => { if (formData.destinationState) fetchCitiesForUf(formData.destinationState); }, [formData.destinationState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cargoType) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione o tipo de carga.",
        variant: "destructive"
      });
      return;
    }
    
    handleWhatsAppContact();
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de contratar o serviço de transporte.
      
Dados do orçamento:
- Nome: ${formData.name}
- Origem: ${formData.originCity}/${formData.originState}
- Destino: ${formData.destinationCity}/${formData.destinationState}
- Tipo de carga: ${formData.cargoType}
- Peso: ${formData.weight}kg`
    );
    
    window.open(`https://wa.me/5511982066490?text=${message}`, '_blank');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="orcamento" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Solicite seu Orçamento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário abaixo e receba uma cotação personalizada 
            para suas necessidades de transporte.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>Formulário de Orçamento</span>
                </CardTitle>
                <CardDescription>
                  Preencha todos os campos para receber um orçamento preciso
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <form onSubmit={handleSubmit} className="space-y-6">

                   <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input 
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                   <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-4">
                       <h3 className="font-semibold text-foreground">Origem *</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-2">
                           <Label>Estado</Label>
                           <Select 
                             value={formData.originState} 
                             onValueChange={(value) => {
                               handleInputChange("originState", value);
                               handleInputChange("originCity", ""); // Reset city when state changes
                             }}
                           >
                             <SelectTrigger className="bg-background">
                               <SelectValue placeholder="UF" />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {(ufs.length ? ufs : Object.keys(citiesByUf)).map((uf) => (
                                 <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                         <div className="space-y-2">
                           <Label>Cidade</Label>
                           <Select 
                             value={formData.originCity} 
                             onValueChange={(value) => handleInputChange("originCity", value)}
                             disabled={!formData.originState}
                           >
                             <SelectTrigger className="bg-background">
                               <SelectValue placeholder={formData.originState ? "Selecione a cidade" : "Primeiro selecione o estado"} />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {formData.originState && citiesByUf[formData.originState]?.length > 0
                                 ? citiesByUf[formData.originState].map((city) => (
                                     <SelectItem key={city} value={city}>{city}</SelectItem>
                                   ))
                                 : formData.originState ? (
                                     <SelectItem disabled value="__no_cities__">Nenhuma cidade encontrada</SelectItem>
                                   ) : (
                                     <SelectItem disabled value="__select_state__">Selecione um estado primeiro</SelectItem>
                                   )}
                             </SelectContent>
                           </Select>
                         </div>
                       </div>
                     </div>
                     <div className="space-y-4">
                       <h3 className="font-semibold text-foreground">Destino *</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-2">
                           <Label>Estado</Label>
                           <Select 
                             value={formData.destinationState} 
                             onValueChange={(value) => {
                               handleInputChange("destinationState", value);
                               handleInputChange("destinationCity", ""); // Reset city when state changes
                             }}
                           >
                             <SelectTrigger className="bg-background">
                               <SelectValue placeholder="UF" />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {(ufs.length ? ufs : Object.keys(citiesByUf)).map((uf) => (
                                 <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                         <div className="space-y-2">
                           <Label>Cidade</Label>
                           <Select 
                             value={formData.destinationCity} 
                             onValueChange={(value) => handleInputChange("destinationCity", value)}
                             disabled={!formData.destinationState}
                           >
                             <SelectTrigger className="bg-background">
                               <SelectValue placeholder={formData.destinationState ? "Selecione a cidade" : "Primeiro selecione o estado"} />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {formData.destinationState && citiesByUf[formData.destinationState]?.length > 0
                                 ? citiesByUf[formData.destinationState].map((city) => (
                                     <SelectItem key={city} value={city}>{city}</SelectItem>
                                   ))
                                 : formData.destinationState ? (
                                     <SelectItem disabled value="__no_cities__">Nenhuma cidade encontrada</SelectItem>
                                   ) : (
                                     <SelectItem disabled value="__select_state__">Selecione um estado primeiro</SelectItem>
                                   )}
                             </SelectContent>
                           </Select>
                         </div>
                       </div>
                     </div>
                   </div>


                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Carga</Label>
                    <Textarea 
                      id="description"
                      placeholder="Descreva detalhes importantes sobre a carga..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      Enviar pelo WhatsApp
                    </Button>
                 </form>
              </CardContent>
            </Card>
         </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Contato Direto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-primary-foreground/90">(11) 98206-6490</p>
                </div>
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="text-primary-foreground/90">mvctransportestaboao@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary text-secondary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Resposta Rápida</h3>
                <p className="text-sm">
                  Retornamos seu orçamento em até 30 minutos úteis com as melhores 
                  condições do mercado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;