import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { Progress } from '@/components/ui/progress';
import { Calculator, ArrowRight, ArrowLeft, User, MapPin, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIBGEData } from '@/hooks/useIBGEData';
import { sendWhatsAppQuote, formatPhoneNumber } from '@/lib/whatsapp-service';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validation';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const { ufs, citiesByUf, fetchCitiesForUf } = useIBGEData();

  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    originState: '',
    originCity: '',
    destinationState: '',
    destinationCity: '',
    cargoType: '',
    weight: '',
    urgency: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepFields: Record<number, (keyof QuoteFormData)[]> = {
      1: ['name', 'email', 'phone'],
      2: ['originState', 'originCity', 'destinationState', 'destinationCity'],
      3: ['cargoType', 'weight', 'urgency'],
    };

    const fieldsToValidate = stepFields[currentStep];
    const stepData = Object.fromEntries(
      fieldsToValidate.map((key) => [key, formData[key]])
    );

    const result = quoteFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof QuoteFormData;
        // Only show errors for fields in the current step
        if (fieldsToValidate.includes(field)) {
          newErrors[field] = err.message;
        }
      });
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
      }
    }

    return true;
  };

  const nextStep = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (validateStep(step)) {
      if (step === 2) {
        // Trigger city fetch for both states before moving to step 3
        fetchCitiesForUf(formData.originState);
        fetchCitiesForUf(formData.destinationState);
      }
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = quoteFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof QuoteFormData;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);

      toast({
        title: 'Erro no formulário',
        description: 'Por favor, corrija os erros antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    // Now result.data is fully validated QuoteFormData
    sendWhatsAppQuote(result.data as Required<QuoteFormData>);
  };

  const progress = (step / 3) * 100;

  const stepIcons = [User, MapPin, Package];
  const StepIcon = stepIcons[step - 1];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center space-x-2">
            <StepIcon className="h-5 w-5 text-primary" />
            <span>
              {step === 1 && 'Seus Dados'}
              {step === 2 && 'Rota'}
              {step === 3 && 'Detalhes da Carga'}
            </span>
          </CardTitle>
          <span className="text-sm text-muted-foreground">Passo {step} de 3</span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardDescription className="mt-2">
          {step === 1 && 'Informe seus dados de contato'}
          {step === 2 && 'Defina a origem e destino da carga'}
          {step === 3 && 'Forneça os detalhes da sua carga'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            // Prevent Enter key from submitting the form in steps 1 and 2
            if (e.key === 'Enter' && step < 3) {
              e.preventDefault();
            }
          }}
          className="space-y-6"
        >
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Route */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Origem *
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Combobox
                      options={ufs.map((uf) => ({ value: uf, label: uf }))}
                      value={formData.originState}
                      onChange={(value) => {
                        handleInputChange('originState', value);
                        handleInputChange('originCity', '');
                        fetchCitiesForUf(value);
                      }}
                      placeholder="UF"
                      searchPlaceholder="Buscar..."
                      emptyMessage="Nenhuma UF encontrada"
                    />
                    {errors.originState && (
                      <p className="text-destructive text-sm">{errors.originState}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Cidade</Label>
                    {formData.originState && citiesByUf[formData.originState]?.length > 0 ? (
                      <Combobox
                        options={citiesByUf[formData.originState].map((city) => ({
                          value: city,
                          label: city,
                        }))}
                        value={formData.originCity}
                        onChange={(value) => handleInputChange('originCity', value)}
                        placeholder="Cidade"
                        searchPlaceholder="Buscar..."
                        emptyMessage="Nenhuma cidade encontrada"
                        disabled={!formData.originState}
                      />
                    ) : (
                      <Select disabled value="">
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder={
                              formData.originState
                                ? 'Carregando cidades...'
                                : 'Selecione o estado primeiro'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent />
                      </Select>
                    )}
                    {errors.originCity && (
                      <p className="text-destructive text-sm">{errors.originCity}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Destino *
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Combobox
                      options={ufs.map((uf) => ({ value: uf, label: uf }))}
                      value={formData.destinationState}
                      onChange={(value) => {
                        handleInputChange('destinationState', value);
                        handleInputChange('destinationCity', '');
                        fetchCitiesForUf(value);
                      }}
                      placeholder="UF"
                      searchPlaceholder="Buscar..."
                      emptyMessage="Nenhuma UF encontrada"
                    />
                    {errors.destinationState && (
                      <p className="text-destructive text-sm">{errors.destinationState}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Cidade</Label>
                    {formData.destinationState &&
                    citiesByUf[formData.destinationState]?.length > 0 ? (
                      <Combobox
                        options={citiesByUf[formData.destinationState].map((city) => ({
                          value: city,
                          label: city,
                        }))}
                        value={formData.destinationCity}
                        onChange={(value) => handleInputChange('destinationCity', value)}
                        placeholder="Cidade"
                        searchPlaceholder="Buscar..."
                        emptyMessage="Nenhuma cidade encontrada"
                        disabled={!formData.destinationState}
                      />
                    ) : (
                      <Select disabled value="">
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder={
                              formData.destinationState
                                ? 'Carregando cidades...'
                                : 'Selecione o estado primeiro'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent />
                      </Select>
                    )}
                    {errors.destinationCity && (
                      <p className="text-destructive text-sm">{errors.destinationCity}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Cargo Details */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="cargoType">Tipo de Carga *</Label>
                <Select
                  value={formData.cargoType}
                  onValueChange={(value) => handleInputChange('cargoType', value)}
                >
                  <SelectTrigger className={`bg-background ${errors.cargoType ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="Carga Seca">Carga Seca</SelectItem>
                    <SelectItem value="Carga Batida(Solta)">Carga Batida (Solta)</SelectItem>
                    <SelectItem value="Carga Paletizada">Carga Paletizada</SelectItem>
                  </SelectContent>
                </Select>
                {errors.cargoType && <p className="text-destructive text-sm">{errors.cargoType}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 1000"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={errors.weight ? 'border-destructive' : ''}
                  />
                  {errors.weight && <p className="text-destructive text-sm">{errors.weight}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgência *</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange('urgency', value)}
                  >
                    <SelectTrigger className={`bg-background ${errors.urgency ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="Urgente">Urgente</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Agendada">Agendada</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.urgency && <p className="text-destructive text-sm">{errors.urgency}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição da Carga (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhes importantes..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault();
                  prevStep(e);
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            )}
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  nextStep(e);
                }}
                className="ml-auto"
              >
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))]/90 text-white font-semibold"
              >
                Enviar pelo WhatsApp
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;
