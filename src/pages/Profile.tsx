import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const Profile = () => {
  // Mock user data - replace with actual user data from your backend
  const userData = {
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@example.com',
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar />
      
      <div className="ml-16 transition-all duration-300">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Perfil do Usuário</h1>
        </header>

        {/* Content */}
        <main className="p-8 flex justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Informações Pessoais</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p className="text-lg text-foreground">{userData.nome}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Sobrenome</p>
                    <p className="text-lg text-foreground">{userData.sobrenome}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg text-foreground">{userData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Profile;
