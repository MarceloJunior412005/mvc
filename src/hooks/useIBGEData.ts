import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECity {
  id: number;
  nome: string;
}

export const useIBGEData = () => {
  const { toast } = useToast();
  const [ufs, setUfs] = useState<string[]>([]);
  const [citiesByUf, setCitiesByUf] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  // Load UFs on mount
  useEffect(() => {
    const cached = localStorage.getItem('ibge_ufs');
    if (cached) {
      try {
        setUfs(JSON.parse(cached));
        return;
      } catch {
        // Continue to fetch
      }
    }

    const loadUfs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        );
        const data = (await res.json()) as IBGEState[];
        const siglas = data.map((e) => e.sigla);
        setUfs(siglas);
        localStorage.setItem('ibge_ufs', JSON.stringify(siglas));
      } catch (e) {
        toast({
          title: 'Erro ao carregar estados',
          description: 'Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadUfs();
  }, [toast]);

  const fetchCitiesForUf = async (uf: string) => {
    if (!uf) return;

    // Check cache first
    const cacheKey = `ibge_cities_${uf}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as string[];
        setCitiesByUf((prev) => ({ ...prev, [uf]: parsed }));
        return;
      } catch {
        // Continue to fetch
      }
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`
      );
      const data = (await res.json()) as IBGECity[];
      const names = data.map((c) => c.nome);
      setCitiesByUf((prev) => ({ ...prev, [uf]: names }));
      localStorage.setItem(cacheKey, JSON.stringify(names));
    } catch (e) {
      toast({
        title: `Erro ao carregar cidades de ${uf}`,
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { ufs, citiesByUf, fetchCitiesForUf, loading };
};
