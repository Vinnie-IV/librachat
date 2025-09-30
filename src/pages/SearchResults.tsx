import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Signal {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<Signal[]>([]);
  const [otherSignals, setOtherSignals] = useState<Signal[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSignalIds, setSavedSignalIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) {
      searchSignals(query);
      addToHistory(query);
    }
    loadOtherSignals();
    loadSearchHistory();
    loadSavedSignals();
  }, [query]);

  const loadSavedSignals = () => {
    const saved = JSON.parse(localStorage.getItem('savedSignals') || '[]');
    const ids = saved.map((s: Signal) => s.id);
    setSavedSignalIds(ids);
  };

  const addToHistory = (searchQuery: string) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    if (!history.includes(searchQuery)) {
      const updatedHistory = [searchQuery, ...history].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    }
  };

  const loadSearchHistory = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  };

  const searchSignals = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/signals/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar sinais:', error);
      // Dados mock para desenvolvimento
      setSearchResults([
        {
          id: '1',
          title: `Resultado para "${searchQuery}"`,
          description: 'Descrição do sinal encontrado',
          imageUrl: 'https://via.placeholder.com/300x200?text=Sinal+1',
        },
      ]);
    } finally {
      setLoading(false);
    }
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
      ]);
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
          <h1 className="text-2xl font-bold text-foreground">Pesquisa</h1>
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Resultados da Busca Atual */}
          {searchResults.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">Resultados Encontrados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((signal) => renderSignalCard(signal))}
              </div>
            </section>
          )}

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

export default SearchResults;