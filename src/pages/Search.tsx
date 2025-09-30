import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Search as SearchIcon, Bookmark, BookmarkCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axios';

interface Signal {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [otherSignals, setOtherSignals] = useState<Signal[]>([]);
  const [savedSignalIds, setSavedSignalIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadOtherSignals();
    loadSavedSignals();
  }, []);

  const loadSavedSignals = () => {
    const saved = JSON.parse(localStorage.getItem('savedSignals') || '[]');
    const ids = saved.map((s: Signal) => s.id);
    setSavedSignalIds(ids);
  };

  const loadOtherSignals = async () => {
    try {
      const response = await api.get('/api/signals/random?limit=8');
      setOtherSignals(response.data);
    } catch (error) {
      console.error('Erro ao carregar outros sinais:', error);
      // Dados mock para desenvolvimento
      setOtherSignals([
        { id: '5', title: 'Olá', description: 'Saudação básica', imageUrl: 'https://via.placeholder.com/300x200?text=Ola' },
        { id: '6', title: 'Obrigado', description: 'Expressão de gratidão', imageUrl: 'https://via.placeholder.com/300x200?text=Obrigado' },
        { id: '7', title: 'Sim', description: 'Afirmação', imageUrl: 'https://via.placeholder.com/300x200?text=Sim' },
        { id: '8', title: 'Não', description: 'Negação', imageUrl: 'https://via.placeholder.com/300x200?text=Nao' },
        { id: '9', title: 'Por favor', description: 'Pedido educado', imageUrl: 'https://via.placeholder.com/300x200?text=Por+favor' },
        { id: '10', title: 'Desculpa', description: 'Pedido de desculpas', imageUrl: 'https://via.placeholder.com/300x200?text=Desculpa' },
        { id: '11', title: 'Bom dia', description: 'Saudação matinal', imageUrl: 'https://via.placeholder.com/300x200?text=Bom+dia' },
        { id: '12', title: 'Boa noite', description: 'Saudação noturna', imageUrl: 'https://via.placeholder.com/300x200?text=Boa+noite' },
      ]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSaveSignal = (signal: Signal, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const saved = JSON.parse(localStorage.getItem('savedSignals') || '[]');
    const isAlreadySaved = saved.some((s: Signal) => s.id === signal.id);

    if (isAlreadySaved) {
      const updatedSaved = saved.filter((s: Signal) => s.id !== signal.id);
      localStorage.setItem('savedSignals', JSON.stringify(updatedSaved));
      setSavedSignalIds(updatedSaved.map((s: Signal) => s.id));
      toast({
        title: 'Sinal removido',
        description: `"${signal.title}" foi removido dos salvos`,
      });
    } else {
      const updatedSaved = [signal, ...saved];
      localStorage.setItem('savedSignals', JSON.stringify(updatedSaved));
      setSavedSignalIds(updatedSaved.map((s: Signal) => s.id));
      toast({
        title: 'Sinal salvo',
        description: `"${signal.title}" foi adicionado aos seus sinais`,
      });
    }
  };

  const handleSignalClick = (signal: Signal) => {
    toast({
      title: signal.title,
      description: signal.description,
    });
  };

  const renderSignalCard = (signal: Signal) => {
    const isSaved = savedSignalIds.includes(signal.id);
    
    return (
      <Card 
        key={signal.id} 
        className="hover:shadow-lg transition-shadow cursor-pointer relative"
        onClick={() => handleSignalClick(signal)}
      >
        <CardContent className="p-6">
          <Button
            onClick={(e) => handleSaveSignal(signal, e)}
            size="sm"
            variant={isSaved ? "default" : "outline"}
            className="absolute top-4 right-4 z-10"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
          <div className="aspect-video bg-accent/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {signal.imageUrl ? (
              <img src={signal.imageUrl} alt={signal.title} className="w-full h-full object-cover" />
            ) : (
              <SearchIcon className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <h3 className="font-semibold text-foreground mb-2">{signal.title}</h3>
          <p className="text-sm text-muted-foreground">{signal.description}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar />
      
      <div className="ml-16 transition-all duration-300">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Página de Busca</h1>
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar sinais, anotações ou categorias..."
                  className="pl-12 py-6 text-lg rounded-full border-2 border-border focus:border-primary"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full px-8">
                Buscar
              </Button>
            </form>
          </div>

          {/* Instruções */}
          <div className="text-center py-12 mb-12">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Buscar Sinais em Libras</h2>
            <p className="text-muted-foreground">
              Digite uma palavra ou frase para encontrar o sinal correspondente em Libras
            </p>
          </div>

          {/* Outros Sinais */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">Outros Sinais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherSignals.map((signal) => renderSignalCard(signal))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Search;