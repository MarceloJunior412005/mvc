import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Phone, MessageCircle, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SUPABASE_URL = 'https://cvjxfedmojojgqgzrqhk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2anhmZWRtb2pvamRxZ3pycWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NDQ1NzEsImV4cCI6MjA0MjAyMDU3MX0.0YnpFBP6C2QzCBKV5F1uVbOJFXKYKZEY2IuBLEtUj4c'

const QuoteForm = () => {
  const { toast } = useToast();
  
  // Estados e cidades do Brasil
  const brasilData = {
    "AC": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá"],
    "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo"],
    "AP": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"],
    "AM": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru"],
    "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus"],
    "CE": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
    "DF": ["Brasília", "Taguatinga", "Ceilândia", "Planaltina"],
    "ES": ["Vitória", "Vila Velha", "Serra", "Cariacica", "Linhares"],
    "GO": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia"],
    "MA": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias"],
    "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
    "MS": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
    "MG": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros"],
    "PA": ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal"],
    "PB": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
    "PR": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais"],
    "PE": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
    "PI": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano"],
    "RJ": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Campos dos Goytacazes"],
    "RN": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba"],
    "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí"],
    "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"],
    "RR": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre"],
    "SC": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó"],
    "SP": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba"],
    "SE": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância"],
    "TO": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins"]
  };

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

  const [quoteResults, setQuoteResults] = useState<{
    truck: number;
    toco: number;
    utilitario: number;
    warnings: string[];
  } | null>(null);

  const calculateFreight = () => {
    const weight = parseFloat(formData.weight);
    
    if (!weight) {
      toast({
        title: "Dados insuficientes",
        description: "É necessário informar o peso da carga.",
        variant: "destructive"
      });
      return;
    }

    // Capacidades dos veículos
    const capacities = {
      truck: 12000,
      toco: 6000,
      utilitario: 1500
    };

    // Valores base fixos para orçamento (sem cálculo automático)
    const truck = 1200;
    const toco = 800;
    const utilitario = 500;

    // Verificação de capacidade
    const warnings: string[] = [];
    if (weight > capacities.truck) {
      warnings.push("Truck: Carga acima da capacidade do veículo escolhido.");
    }
    if (weight > capacities.toco) {
      warnings.push("Toco: Carga acima da capacidade do veículo escolhido.");
    }
    if (weight > capacities.utilitario) {
      warnings.push("Utilitário: Carga acima da capacidade do veículo escolhido.");
    }

    setQuoteResults({
      truck,
      toco,
      utilitario,
      warnings
    });
  };

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
    
    calculateFreight();
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
                               {Object.keys(brasilData).map((uf) => (
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
                               <SelectValue placeholder="Cidade" />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {formData.originState && brasilData[formData.originState as keyof typeof brasilData]?.map((city) => (
                                 <SelectItem key={city} value={city}>{city}</SelectItem>
                               ))}
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
                               {Object.keys(brasilData).map((uf) => (
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
                               <SelectValue placeholder="Cidade" />
                             </SelectTrigger>
                             <SelectContent className="bg-background border border-border z-50">
                               {formData.destinationState && brasilData[formData.destinationState as keyof typeof brasilData]?.map((city) => (
                                 <SelectItem key={city} value={city}>{city}</SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                       </div>
                     </div>
                   </div>


                   <div className="grid md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                       <Label>Tipo de Carga *</Label>
                       <Select value={formData.cargoType} onValueChange={(value) => handleInputChange("cargoType", value)}>
                         <SelectTrigger className="bg-background">
                           <SelectValue placeholder="Selecione" />
                         </SelectTrigger>
                         <SelectContent className="bg-background border border-border z-50">
                           <SelectItem value="seca">Carga Seca</SelectItem>
                           <SelectItem value="refrigerada">Refrigerada</SelectItem>
                           <SelectItem value="perigosa">Perigosa</SelectItem>
                           <SelectItem value="fragil">Frágil</SelectItem>
                           <SelectItem value="especial">Especial</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="weight">Peso (kg) *</Label>
                       <Input 
                         id="weight"
                         type="number"
                         placeholder="0"
                         value={formData.weight}
                         onChange={(e) => handleInputChange("weight", e.target.value)}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Urgência</Label>
                       <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                         <SelectTrigger className="bg-background">
                           <SelectValue placeholder="Selecione" />
                         </SelectTrigger>
                         <SelectContent className="bg-background border border-border z-50">
                           <SelectItem value="normal">Normal</SelectItem>
                           <SelectItem value="urgente">Urgente</SelectItem>
                           <SelectItem value="expressa">Expressa</SelectItem>
                         </SelectContent>
                       </Select>
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
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    >
                      Calcular Frete
                    </Button>
                 </form>

                 {quoteResults && (
                   <div className="mt-8 space-y-4">
                     <h3 className="text-xl font-semibold">Orçamento Calculado</h3>
                     
                     {quoteResults.warnings.length > 0 && (
                       <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4">
                         <h4 className="font-semibold mb-2">Atenção:</h4>
                         <ul className="list-disc list-inside space-y-1">
                           {quoteResults.warnings.map((warning, index) => (
                             <li key={index} className="text-sm">{warning}</li>
                           ))}
                         </ul>
                       </div>
                     )}

                     <div className="border rounded-lg overflow-hidden">
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead>Tipo de Veículo</TableHead>
                             <TableHead>Capacidade</TableHead>
                             <TableHead>Distância</TableHead>
                             <TableHead className="text-right">Valor do Frete</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Truck</TableCell>
                              <TableCell>até 12.000kg</TableCell>
                              <TableCell>A consultar</TableCell>
                              <TableCell className="text-right font-semibold">
                                R$ {quoteResults.truck.toFixed(2).replace('.', ',')}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Toco</TableCell>
                              <TableCell>até 6.000kg</TableCell>
                              <TableCell>A consultar</TableCell>
                              <TableCell className="text-right font-semibold">
                                R$ {quoteResults.toco.toFixed(2).replace('.', ',')}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Utilitário</TableCell>
                              <TableCell>até 1.500kg</TableCell>
                              <TableCell>A consultar</TableCell>
                              <TableCell className="text-right font-semibold">
                                R$ {quoteResults.utilitario.toFixed(2).replace('.', ',')}
                              </TableCell>
                            </TableRow>
                         </TableBody>
                       </Table>
                     </div>

                     <Button 
                       onClick={handleWhatsAppContact}
                       className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                     >
                       <MessageCircle className="h-4 w-4 mr-2" />
                       Entrar em contato
                     </Button>
                   </div>
                 )}
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