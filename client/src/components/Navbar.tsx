import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './Sidebar';

export function Navbar() {
  return (
    <header className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40 ml-0 md:ml-72 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-background border-r border-white/10">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search tasks, boards, or members..." 
            className="pl-10 bg-black/20 border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-primary/50 rounded-full h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
          Pro Plan
        </div>
      </div>
    </header>
  );
}

