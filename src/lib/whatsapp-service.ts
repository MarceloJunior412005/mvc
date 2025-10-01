import { COMPANY_INFO } from './constants';

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  cargoType: string;
  weight: string;
  urgency: string;
  description?: string;
}

export const sendWhatsAppQuote = (data: QuoteData) => {
  const message = `Olá! Gostaria de solicitar um orçamento.

📋 *Dados do Solicitante*
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
${data.company ? `Empresa: ${data.company}` : ''}

📍 *Rota*
Origem: ${data.originCity}/${data.originState}
Destino: ${data.destinationCity}/${data.destinationState}

📦 *Detalhes da Carga*
Tipo: ${data.cargoType}
Peso: ${data.weight}kg
Urgência: ${data.urgency}
${data.description ? `\nDescrição: ${data.description}` : ''}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 2) {
    return cleaned;
  }
  
  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  
  if (cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};
