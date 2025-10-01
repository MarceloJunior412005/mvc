// Company contact information
export const COMPANY_INFO = {
  name: 'MVC Transportes',
  phone: '(11) 98206-6490',
  phoneRaw: '5511982066490',
  email: 'mvctransportestaboao@gmail.com',
  address: {
    street: 'Rua João Antônio da Fonseca, 995',
    city: 'Taboão da Serra',
    state: 'SP',
    zip: '06770-230'
  },
  workingHours: {
    weekdays: 'Seg-Sex: 8h às 18h',
    saturday: 'Sáb: 8h às 12h'
  },
  founded: 2000,
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  }
} as const;

// Form validation constants
export const VALIDATION = {
  name: {
    min: 2,
    max: 100
  },
  phone: {
    min: 10,
    max: 11
  },
  email: {
    max: 255
  },
  message: {
    max: 1000
  },
  weight: {
    min: 1,
    max: 50000
  }
} as const;

// Stats for hero section
export const COMPANY_STATS = [
  { value: 30, label: 'Anos de Experiência', suffix: '+' },
  { value: 5000, label: 'Entregas Realizadas', suffix: '+' },
  { value: 100, label: 'Clientes Ativos', suffix: '+' }
] as const;
