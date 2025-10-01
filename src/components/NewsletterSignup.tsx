import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Inscrição realizada!',
        description: 'Você receberá nossas atualizações em breve.',
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
      <div className="flex items-center space-x-2 mb-3">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Newsletter</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Receba novidades e ofertas especiais
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Assinar'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
