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
    <section id="clientes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empresas que confiam em nossos serviços de transporte e logística
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-center">
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full h-24 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                title={`Visitar site da ${client.name}`}
              >
                <img
                  src={client.logo}
                  alt={`Logo da ${client.name}`}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    // Fallback para quando a imagem não existir
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-gray-500 text-sm font-medium text-center';
                      fallback.textContent = client.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Quer fazer parte desta lista? 
            <a href="#orcamento" className="text-primary hover:text-primary/80 font-medium ml-1">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;