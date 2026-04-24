import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { KanbanBoard } from '@/components/Board';
import { BoardProvider, useBoard } from '@/context/BoardContext';
import { Users, Filter, Share2, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/lib/types';
import { motion } from 'framer-motion';

function BoardHeader() {
  const { activeBoard } = useBoard();
  
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {activeBoard.title}
          </h1>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full border border-primary/20 font-bold uppercase tracking-widest">
              Live
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">
              Production
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl leading-relaxed">{activeBoard.description}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-wrap items-center gap-4"
      >
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
          <button className="p-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 transition-all">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <List className="h-4 w-4" />
          </button>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

        <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
          {activeBoard.members.map((memberId, idx) => (
            <Avatar key={memberId} className="h-8 w-8 md:h-9 md:w-9 border-2 border-background cursor-pointer hover:scale-110 transition-all shadow-xl">
              <AvatarImage src={MOCK_USERS[memberId]?.avatar} />
              <AvatarFallback className="bg-slate-800 text-[10px] font-bold">{memberId}</AvatarFallback>
            </Avatar>
          ))}
          <button className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-500 transition-colors text-xs font-bold">
            +3
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 transition-all">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20">
            <Share2 className="h-4 w-4" />
            <span>Invite</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}


export default function BoardView() {
  return (
    <BoardProvider>
      <div className="flex h-screen bg-background overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-72 relative z-10">
          <Navbar />
          <main className="flex-1 overflow-hidden p-4 md:p-8 relative">
            <div className="h-full flex flex-col relative z-10 max-w-[1600px] mx-auto">
              <BoardHeader />
              <div className="flex-1 min-h-0 overflow-x-auto custom-scrollbar pb-6">
                <KanbanBoard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BoardProvider>
  );
}

