import React, { useState } from 'react';
import { Home, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import menuIcon from '@/assets/menu-icon.png';

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Pesquisa', path: '/search' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-secondary transition-all duration-300 ease-in-out z-50 flex flex-col"
      style={{ width: isExpanded ? '240px' : '64px' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        <img src={menuIcon} alt="Menu" className="w-14 h-14" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-4 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Atalhos adicionais */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          className="w-full flex items-center gap-4 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors rounded"
        >
          <LogOut className="w-6 h-6 text-primary flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 w-0'
            }`}
          >
            Atalhos
          </span>
        </button>
      </div>
    </aside>
  );
};
