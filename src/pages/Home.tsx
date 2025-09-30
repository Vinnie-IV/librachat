import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Bell, User, Plus, Edit2, Trash2, Save, X, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Signal {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Home = () => {
  const { toast } = useToast();
  const [savedSignals, setSavedSignals] = useState<Signal[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    loadSavedSignals();
    loadNotes();
  }, []);

  const loadSavedSignals = () => {
    const saved = JSON.parse(localStorage.getItem('savedSignals') || '[]');
    setSavedSignals(saved);
  };

  const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  };

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: 'Erro',
        description: 'Preencha título e descrição da anotação',
        variant: 'destructive',
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNewNote({ title: '', content: '' });
    setIsCreatingNote(false);

    toast({
      title: 'Anotação criada',
      description: 'Sua anotação foi salva com sucesso',
    });
  };

  const handleEditNote = (noteId: string) => {
    const noteToEdit = notes.find(n => n.id === noteId);
    if (noteToEdit) {
      setNewNote({ title: noteToEdit.title, content: noteToEdit.content });
      setEditingNoteId(noteId);
      setIsCreatingNote(true);
    }
  };

  const handleUpdateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: 'Erro',
        description: 'Preencha título e descrição da anotação',
        variant: 'destructive',
      });
      return;
    }

    const updatedNotes = notes.map(note => 
      note.id === editingNoteId 
        ? { ...note, title: newNote.title, content: newNote.content }
        : note
    );

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNewNote({ title: '', content: '' });
    setIsCreatingNote(false);
    setEditingNoteId(null);

    toast({
      title: 'Anotação atualizada',
      description: 'Suas alterações foram salvas',
    });
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    toast({
      title: 'Anotação excluída',
      description: 'A anotação foi removida',
    });
  };

  const handleCancelNote = () => {
    setNewNote({ title: '', content: '' });
    setIsCreatingNote(false);
    setEditingNoteId(null);
  };

  const handleUnsaveSignal = (signalId: string) => {
    const updatedSignals = savedSignals.filter(signal => signal.id !== signalId);
    setSavedSignals(updatedSignals);
    localStorage.setItem('savedSignals', JSON.stringify(updatedSignals));

    toast({
      title: 'Sinal removido',
      description: 'O sinal foi removido dos salvos',
    });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar />
      
      <div className="ml-16 transition-all duration-300">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground font-sodo">
            Libra Chat
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seus Sinais */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-xl font-bold text-foreground">Seus Sinais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {savedSignals.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">sem sinais salvos</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSignals.map((signal) => (
                      <div
                        key={signal.id}
                        className="group relative p-4 bg-accent/10 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                      >
                        <button
                          onClick={() => handleUnsaveSignal(signal.id)}
                          className="absolute top-2 right-2 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                          title="Remover dos salvos"
                        >
                          <Bookmark className="w-4 h-4 text-destructive fill-destructive" />
                        </button>
                        <h3 className="font-semibold text-foreground mb-1 pr-10">{signal.title}</h3>
                        <p className="text-sm text-muted-foreground">{signal.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Suas Anotações */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">Suas Anotações</CardTitle>
                  {!isCreatingNote && (
                    <Button
                      onClick={() => setIsCreatingNote(true)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Anotação
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {isCreatingNote && (
                  <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-border">
                    <Input
                      placeholder="Título da anotação"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      className="mb-3"
                    />
                    <Textarea
                      placeholder="Descrição da anotação"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      className="mb-3"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={editingNoteId ? handleUpdateNote : handleCreateNote}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      <Button
                        onClick={handleCancelNote}
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                {notes.length === 0 && !isCreatingNote ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Nenhuma anotação criada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-accent/10 rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{note.title}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditNote(note.id)}
                              className="p-1 hover:bg-accent/20 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-primary" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1 hover:bg-accent/20 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;