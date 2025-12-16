import React from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Users, 
  Settings, 
  Plus, 
  LogOut,
  Activity
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Sidebar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: KanbanSquare, label: 'Boards', href: '/board/b1' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: Activity, label: 'Activity', href: '/activity' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="h-screen w-64 glass-panel border-r border-white/10 flex flex-col hidden md:flex fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <KanbanSquare className="text-white h-5 w-5" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">TaskFlow</span>
      </div>

      <div className="px-4 py-2">
        <div className="text-xs font-medium text-slate-400 px-4 mb-2 uppercase tracking-wider">Menu</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}>
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 px-4 py-2">
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Projects</div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg cursor-pointer">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            Product Launch
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg cursor-pointer">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
            Website Redesign
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg cursor-pointer">
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            Q4 Marketing
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs text-slate-400 truncate">{user?.email}</div>
          </div>
          <button onClick={logout} className="text-slate-400 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
