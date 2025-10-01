import { z } from 'zod';
import { VALIDATION } from './constants';

export const quoteFormSchema = z.object({
  name: z.string()
    .trim()
    .min(VALIDATION.name.min, { message: 'Nome deve ter no mínimo 2 caracteres' })
    .max(VALIDATION.name.max, { message: 'Nome muito longo' }),
  
  email: z.string()
    .trim()
    .email({ message: 'Email inválido' })
    .max(VALIDATION.email.max, { message: 'Email muito longo' }),
  
  phone: z.string()
    .trim()
    .min(1, { message: 'Telefone obrigatório' })
    .refine(
      (val) => {
        const clean = val.replace(/\D/g, '');
        return clean.length >= VALIDATION.phone.min && clean.length <= VALIDATION.phone.max;
      },
      { message: 'Telefone deve ter 10 ou 11 dígitos' }
    ),
  
  company: z.string().trim().max(100).optional(),
  
  originState: z.string().min(2, { message: 'Selecione o estado de origem' }),
  originCity: z.string().min(1, { message: 'Selecione a cidade de origem' }),
  
  destinationState: z.string().min(2, { message: 'Selecione o estado de destino' }),
  destinationCity: z.string().min(1, { message: 'Selecione a cidade de destino' }),
  
  cargoType: z.string().min(1, { message: 'Selecione o tipo de carga' }),
  
  weight: z.string()
    .min(1, { message: 'Informe o peso' })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= VALIDATION.weight.min && num <= VALIDATION.weight.max;
      },
      { message: 'Peso deve estar entre 1 e 50000 kg' }
    ),
  
  urgency: z.string().min(1, { message: 'Selecione a urgência' }),
  
  description: z.string()
    .trim()
    .max(VALIDATION.message.max, { message: 'Descrição muito longa' })
    .optional()
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
