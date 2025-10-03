import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";

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
- Email: ${formData.email}
- Telefone: ${formData.phone}
- Empresa: ${formData.company}
- Origem: ${formData.originCity}/${formData.originState}
- Destino: ${formData.destinationCity}/${formData.destinationState}
- Tipo de carga: ${formData.cargoType}
- Peso: ${formData.weight}kg
- Urgência: ${formData.urgency}
- Descrição: ${formData.description}`
    );
    
    window.open(`https://wa.me/5511982066490?text=${message}`, '_blank');
  };

  const handleInputChange = (field: string, value: string) => {
    // Validação para telefone - apenas números, parênteses, espaços e hífens
    if (field === 'phone') {
      const phoneRegex = /^[\d\s\(\)\-\+]*$/;
      if (!phoneRegex.test(value)) {
        return; // Não permite caracteres inválidos
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove caracteres não numéricos para validação
    const cleanPhone = phone.replace(/\D/g, '');
    // Aceita telefones com 10 ou 11 dígitos (com ou sem DDD)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  return (
    <section id="orcamento" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
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
                        placeholder="exemplo@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={formData.email && !validateEmail(formData.email) ? "border-red-500" : ""}
                        required
                      />
                      {formData.email && !validateEmail(formData.email) && (
                        <p className="text-red-500 text-sm">Por favor, insira um email válido</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input 
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={formData.phone && !validatePhone(formData.phone) ? "border-red-500" : ""}
                        required
                      />
                      {formData.phone && !validatePhone(formData.phone) && (
                        <p className="text-red-500 text-sm">Por favor, insira um telefone válido (10-11 dígitos)</p>
                      )}
                    </div>
                  </div>

                   <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-4">
                       <h3 className="font-semibold text-foreground">Origem *</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-2">
                           <Label>Estado</Label>
                           <Combobox
                             options={(ufs.length ? ufs : Object.keys(citiesByUf)).map(uf => ({ value: uf, label: uf }))}
                             value={formData.originState}
                             onChange={(value) => {
                               handleInputChange("originState", value);
                               handleInputChange("originCity", ""); // Reset city when state changes
                             }}
                             placeholder="Digite para buscar UF"
                             searchPlaceholder="Digite para buscar..."
                             emptyMessage="Nenhuma UF encontrada"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Cidade</Label>
                           {formData.originState && citiesByUf[formData.originState]?.length > 0 ? (
                             <Combobox
                               options={citiesByUf[formData.originState].map(city => ({ value: city, label: city }))}
                               value={formData.originCity}
                               onChange={(value) => handleInputChange("originCity", value)}
                               placeholder={formData.originState ? "Digite para buscar a cidade" : "Primeiro selecione o estado"}
                               searchPlaceholder="Digite para buscar..."
                               emptyMessage="Nenhuma cidade encontrada"
                               disabled={!formData.originState}
                             />
                           ) : (
                             <Select disabled value="">
                               <SelectTrigger className="bg-background">
                                 <SelectValue placeholder={formData.originState ? "Carregando cidades..." : "Primeiro selecione o estado"} />
                               </SelectTrigger>
                               <SelectContent />
                             </Select>
                           )}
                         </div>
                       </div>
                     </div>
                     <div className="space-y-4">
                       <h3 className="font-semibold text-foreground">Destino *</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-2">
                           <Label>Estado</Label>
                           <Combobox
                             options={(ufs.length ? ufs : Object.keys(citiesByUf)).map(uf => ({ value: uf, label: uf }))}
                             value={formData.destinationState}
                             onChange={(value) => {
                               handleInputChange("destinationState", value);
                               handleInputChange("destinationCity", ""); // Reset city when state changes
                             }}
                             placeholder="Digite para buscar UF"
                             searchPlaceholder="Digite para buscar..."
                             emptyMessage="Nenhuma UF encontrada"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Cidade</Label>
                           {formData.destinationState && citiesByUf[formData.destinationState]?.length > 0 ? (
                             <Combobox
                               options={citiesByUf[formData.destinationState].map(city => ({ value: city, label: city }))}
                               value={formData.destinationCity}
                               onChange={(value) => handleInputChange("destinationCity", value)}
                               placeholder={formData.destinationState ? "Digite para buscar a cidade" : "Primeiro selecione o estado"}
                               searchPlaceholder="Digite para buscar..."
                               emptyMessage="Nenhuma cidade encontrada"
                               disabled={!formData.destinationState}
                             />
                           ) : (
                             <Select disabled value="">
                               <SelectTrigger className="bg-background">
                                 <SelectValue placeholder={formData.destinationState ? "Carregando cidades..." : "Primeiro selecione o estado"} />
                               </SelectTrigger>
                               <SelectContent />
                             </Select>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cargoType">Tipo de Carga *</Label>
                      <Select 
                        value={formData.cargoType} 
                        onValueChange={(value) => handleInputChange("cargoType", value)}
                        required
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Selecione o tipo de carga" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="Carga Seca">Carga Seca</SelectItem>
                          <SelectItem value="Carga Batida(Solta)">Carga Batida (Solta)</SelectItem>
                          <SelectItem value="Carga Paletizada">Carga Paletizada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg) *</Label>
                      <Input 
                        id="weight"
                        type="number"
                        placeholder="Ex: 1000"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgência *</Label>
                      <Select 
                        value={formData.urgency} 
                        onValueChange={(value) => handleInputChange("urgency", value)}
                        required
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Selecione a urgência" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="Urgente">Urgente</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Agendada">Agendada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
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