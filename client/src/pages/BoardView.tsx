import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { KanbanBoard } from '@/components/Board';
import { BoardProvider, useBoard } from '@/context/BoardContext';
import { Users, Filter, Share2, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/lib/types';

function BoardHeader() {
  const { activeBoard } = useBoard();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          {activeBoard.title}
          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full border border-primary/20 font-medium">Active</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">{activeBoard.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 mr-2">
          {activeBoard.members.map(memberId => (
            <Avatar key={memberId} className="h-8 w-8 border-2 border-background cursor-pointer hover:scale-110 transition-transform">
              <AvatarImage src={MOCK_USERS[memberId]?.avatar} />
              <AvatarFallback>{memberId}</AvatarFallback>
            </Avatar>
          ))}
          <button className="h-8 w-8 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-400 transition-colors text-xs">
            +2
          </button>
        </div>

        <div className="h-8 w-px bg-white/10 mx-1 hidden md:block" />

        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-300 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default function BoardView() {
  return (
    <BoardProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64 relative">
          <Navbar />
          <main className="flex-1 overflow-hidden p-6 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="h-full flex flex-col relative z-10">
              <BoardHeader />
              <div className="flex-1 min-h-0 overflow-x-auto pb-2">
                <KanbanBoard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BoardProvider>
  );
}
