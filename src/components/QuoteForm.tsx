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

  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  
  const [quoteResults, setQuoteResults] = useState<{
    truck: number;
    toco: number;
    utilitario: number;
    warnings: string[];
    distance: number;
  } | null>(null);

  // Function to calculate distance using coordinates estimation
  const calculateDistance = async () => {
    if (!formData.originCity || !formData.originState || !formData.destinationCity || !formData.destinationState) {
      return;
    }

    setIsCalculatingDistance(true);
    
    try {
      // Coordenadas aproximadas das capitais e principais cidades brasileiras
      const cityCoords: { [key: string]: { lat: number, lng: number } } = {
        // Região Norte
        "Rio Branco,AC": { lat: -9.97472, lng: -67.81 },
        "Maceió,AL": { lat: -9.62478, lng: -35.7200 },
        "Macapá,AP": { lat: 0.034934, lng: -51.0694 },
        "Manaus,AM": { lat: -3.11904, lng: -60.0212 },
        
        // Região Nordeste
        "Salvador,BA": { lat: -12.9704, lng: -38.5124 },
        "Fortaleza,CE": { lat: -3.71839, lng: -38.5434 },
        "Vitória,ES": { lat: -20.3155, lng: -40.3128 },
        "Goiânia,GO": { lat: -16.6799, lng: -49.2550 },
        "São Luís,MA": { lat: -2.53874, lng: -44.2825 },
        "Cuiabá,MT": { lat: -15.6014, lng: -56.0979 },
        "Campo Grande,MS": { lat: -20.4486, lng: -54.6295 },
        "Belo Horizonte,MG": { lat: -19.9167, lng: -43.9345 },
        "Belém,PA": { lat: -1.45502, lng: -48.5024 },
        "João Pessoa,PB": { lat: -7.11532, lng: -34.8641 },
        "Curitiba,PR": { lat: -25.4244, lng: -49.2654 },
        "Recife,PE": { lat: -8.04666, lng: -34.8771 },
        "Teresina,PI": { lat: -5.08921, lng: -42.8016 },
        "Rio de Janeiro,RJ": { lat: -22.9035, lng: -43.2096 },
        "Natal,RN": { lat: -5.79448, lng: -35.211 },
        "Porto Alegre,RS": { lat: -30.0277, lng: -51.2287 },
        "Porto Velho,RO": { lat: -8.76077, lng: -63.8999 },
        "Boa Vista,RR": { lat: 2.82384, lng: -60.6753 },
        "Florianópolis,SC": { lat: -27.5954, lng: -48.5480 },
        "São Paulo,SP": { lat: -23.5505, lng: -46.6333 },
        "Aracaju,SE": { lat: -10.9472, lng: -37.0731 },
        "Palmas,TO": { lat: -10.1753, lng: -48.2982 },
        "Brasília,DF": { lat: -15.7939, lng: -47.8828 },
        
        // Principais cidades adicionais
        "Guarulhos,SP": { lat: -23.4543, lng: -46.5339 },
        "Campinas,SP": { lat: -22.9099, lng: -47.0626 },
        "Joinville,SC": { lat: -26.3044, lng: -48.8487 },
        "Londrina,PR": { lat: -23.3045, lng: -51.1696 },
        "Maringá,PR": { lat: -23.4205, lng: -51.9331 },
        "Blumenau,SC": { lat: -26.9194, lng: -49.0661 },
        "Jaboatão dos Guararapes,PE": { lat: -8.1127, lng: -35.0148 },
        "Feira de Santana,BA": { lat: -12.2664, lng: -38.9663 },
        "Uberlândia,MG": { lat: -18.9113, lng: -48.2622 },
        "Contagem,MG": { lat: -19.9317, lng: -44.0536 }
      };

      const originKey = `${formData.originCity},${formData.originState}`;
      const destinationKey = `${formData.destinationCity},${formData.destinationState}`;
      
      const originCoords = cityCoords[originKey];
      const destinationCoords = cityCoords[destinationKey];
      
      if (!originCoords || !destinationCoords) {
        // Fallback: estimativa baseada em distância entre estados
        const stateDistances: { [key: string]: number } = {
          "SP-RJ": 350, "SP-MG": 400, "SP-PR": 300, "SP-SC": 450, "SP-RS": 700,
          "RJ-MG": 300, "RJ-ES": 400, "RJ-SP": 350, "RJ-BA": 900,
          "MG-SP": 400, "MG-RJ": 300, "MG-GO": 350, "MG-BA": 600,
          "PR-SP": 300, "PR-SC": 200, "PR-RS": 400, "PR-MG": 600,
          "SC-PR": 200, "SC-RS": 300, "SC-SP": 450,
          "RS-SC": 300, "RS-PR": 400, "RS-SP": 700,
          "GO-MG": 350, "GO-MT": 400, "GO-DF": 200,
          "BA-MG": 600, "BA-PE": 700, "BA-SE": 300,
          "PE-BA": 700, "PE-AL": 200, "PE-PB": 100,
          "CE-PE": 600, "CE-RN": 400, "CE-PB": 500
        };
        
        const stateKey1 = `${formData.originState}-${formData.destinationState}`;
        const stateKey2 = `${formData.destinationState}-${formData.originState}`;
        const estimatedDistance = stateDistances[stateKey1] || stateDistances[stateKey2] || 800;
        
        setCalculatedDistance(estimatedDistance);
        return;
      }
      
      // Calcular distância usando fórmula Haversine
      const toRadians = (degrees: number) => degrees * (Math.PI / 180);
      
      const lat1 = toRadians(originCoords.lat);
      const lat2 = toRadians(destinationCoords.lat);
      const deltaLat = toRadians(destinationCoords.lat - originCoords.lat);
      const deltaLng = toRadians(destinationCoords.lng - originCoords.lng);
      
      const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
      const distance = Math.round(6371 * c); // Raio da Terra em km
      
      setCalculatedDistance(distance);
      
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: "Não foi possível calcular a distância. Usando estimativa padrão.",
        variant: "destructive"
      });
      // Fallback distance
      setCalculatedDistance(500);
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  // Auto-calculate distance when origin and destination are selected
  useEffect(() => {
    if (formData.originCity && formData.originState && formData.destinationCity && formData.destinationState) {
      calculateDistance();
    }
  }, [formData.originCity, formData.originState, formData.destinationCity, formData.destinationState]);

  const calculateFreight = () => {
    const weight = parseFloat(formData.weight);
    const distance = calculatedDistance;
    
    if (!weight || !distance) {
      toast({
        title: "Dados insuficientes",
        description: "É necessário ter peso da carga e distância calculada.",
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

    // Cálculo dos fretes
    const truck = 250 + (4.00 * distance) + (0.05 * weight);
    const toco = 200 + (3.20 * distance) + (0.04 * weight);
    const utilitario = 120 + (2.00 * distance) + (0.03 * weight);

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
      warnings,
      distance
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
- Peso: ${formData.weight}kg
- Distância: ${calculatedDistance}km`
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

                   {/* Distance Display */}
                   {calculatedDistance && (
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                       <div className="flex items-center space-x-2">
                         <MapPin className="h-5 w-5 text-green-600" />
                         <span className="font-semibold text-green-800">
                           Distância calculada: {calculatedDistance} km
                         </span>
                       </div>
                     </div>
                   )}

                   {isCalculatingDistance && (
                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                       <div className="flex items-center space-x-2">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                         <span className="text-blue-800">Calculando distância...</span>
                       </div>
                     </div>
                   )}

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
                     disabled={!calculatedDistance || isCalculatingDistance}
                   >
                     {isCalculatingDistance ? "Calculando distância..." : "Calcular Frete"}
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
                             <TableCell>{quoteResults.distance} km</TableCell>
                             <TableCell className="text-right font-semibold">
                               R$ {quoteResults.truck.toFixed(2).replace('.', ',')}
                             </TableCell>
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium">Toco</TableCell>
                             <TableCell>até 6.000kg</TableCell>
                             <TableCell>{quoteResults.distance} km</TableCell>
                             <TableCell className="text-right font-semibold">
                               R$ {quoteResults.toco.toFixed(2).replace('.', ',')}
                             </TableCell>
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium">Utilitário</TableCell>
                             <TableCell>até 1.500kg</TableCell>
                             <TableCell>{quoteResults.distance} km</TableCell>
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
                  Retornamos seu orçamento em até 2 horas úteis com as melhores 
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