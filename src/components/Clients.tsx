import React from 'react';

interface Client {
  id: string;
  name: string;
  logo: string;
  website: string;
}

const Clients = () => {
  const clients: Client[] = [
    {
      id: 'legal',
      name: 'Legal Embalagens',
      logo: '/logo_clientes/logo_legal.png',
      website: 'https://legalembalagens.com.br/'
    },
    {
      id: 'ave-maria',
      name: 'Ave Maria',
      logo: '/logo_clientes/logo_ave_maria.png',
      website: 'https://www.avemaria.com.br/'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      logo: '/logo_clientes/logo_advanced.png',
      website: 'https://advancedpolymers.com.br/'
    },
    {
      id: 'ricargraf',
      name: 'Ricargraf',
      logo: '/logo_clientes/logo_ricargraf.png',
      website: 'https://www.ricargraf.com.br/'
    },
    {
      id: 'paratudo',
      name: 'Paratudo',
      logo: '/logo_clientes/logo_paratudo.jpg',
      website: 'https://paratudo.com.br/'
    },
    {
      id: 'altacoppo',
      name: 'AltaCoppo',
      logo: '/logo_clientes/logo_AltaCoppo.png',
      website: 'https://www.altacoppo.com.br/'
    },
    {
      id: 'frw',
      name: 'FRW',
      logo: '/logo_clientes/logo_frw.jpg',
      website: 'https://www.frwtech.com.br/'
    },
    {
      id: 'planmar',
      name: 'Planmar',
      logo: '/logo_clientes/logo_planmar.png',
      website: 'https://www.planmar.com.br/'
    },
    {
      id: 'boreau',
      name: 'Boreau',
      logo: '/logo_clientes/logo_boreau.png',
      website: 'http://boreau.com.br/'
    },
    {
      id: 'litocomp',
      name: 'Litocomp',
      logo: '/logo_clientes/logo_litocomp.png',
      website: 'https://litocomp.com.br/'
    },
    {
      id: 'logfy',
      name: 'LogFy',
      logo: '/logo_clientes/logo_LogFy.png',
      website: 'https://logfytransportes.com.br/'
    }
  ];

  return (
    <section id="clientes" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Empresas que Confiam
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Parceiros que crescem conosco através de soluções logísticas eficientes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <div 
              key={client.id} 
              className="flex items-center justify-center"
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` 
              }}
            >
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full h-28 flex items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-secondary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-secondary/10"
                title={`Visitar site da ${client.name}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <img
                  src={client.logo}
                  alt={`Logo da ${client.name}`}
                  className="relative max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-muted-foreground text-sm font-medium text-center';
                      fallback.textContent = client.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground text-lg">
            Quer fazer parte desta lista? {' '}
            <a href="#orcamento" className="text-secondary hover:text-secondary/80 font-semibold underline decoration-secondary/30 underline-offset-4 transition-colors">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;