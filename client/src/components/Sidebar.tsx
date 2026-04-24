import React from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Users, 
  Settings, 
  Plus, 
  LogOut,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SidebarContent() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: KanbanSquare, label: 'Boards', href: '/board/b1' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: Activity, label: 'Activity', href: '/activity' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const projects = [
    { label: 'Product Launch', color: 'bg-emerald-400' },
    { label: 'Website Redesign', color: 'bg-blue-400' },
    { label: 'Q4 Marketing', color: 'bg-orange-400' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-float">
          <KanbanSquare className="text-white h-5 w-5" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">TaskFlow</span>
      </div>

      <div className="px-4 py-2 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-500 px-4 uppercase tracking-[0.2em]">General</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  )}
                  <item.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-4">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">My Projects</div>
            <button className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-md">
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <div key={project.label} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer group transition-all duration-300">
                <div className={cn("h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125", project.color, project.color === 'bg-emerald-400' && "shadow-[0_0_8px_rgba(52,211,153,0.5)]")} />
                <span className="flex-1">{project.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="glass-panel rounded-2xl p-3 flex items-center gap-3 border-white/5 bg-white/[0.02]">
          <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
            <AvatarImage src={user?.avatar} className="rounded-full" />
            <AvatarFallback className="bg-slate-800 text-xs">ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
            <div className="text-[10px] text-slate-500 truncate">{user?.email}</div>
          </div>
          <button 
            onClick={logout} 
            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all duration-300"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="h-screen w-72 glass-panel border-r border-white/5 flex flex-col hidden md:flex fixed left-0 top-0 z-50">
      <SidebarContent />
    </aside>
  );
}

