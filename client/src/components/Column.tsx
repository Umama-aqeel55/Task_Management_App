import React from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Task } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { MoreVertical, Plus, MoreHorizontal } from 'lucide-react';
import { useBoard } from '@/context/BoardContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function BoardColumn({ column, tasks, onTaskClick }: Props) {
  const { addTask } = useBoard();
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 w-[300px] md:w-[350px] h-[70vh] bg-white/[0.02] rounded-3xl border-2 border-dashed border-primary/20"
      />
    );
  }

  const columnThemes = {
    'To Do': 'bg-slate-500',
    'In Progress': 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]',
    'Review': 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    'Done': 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[300px] md:w-[380px] shrink-0 flex flex-col h-full max-h-full group"
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="flex items-center justify-between p-4 mb-4 glass-panel rounded-2xl cursor-grab active:cursor-grabbing hover:border-white/20 transition-all border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-3 w-3 rounded-full",
            columnThemes[column.title as keyof typeof columnThemes] || "bg-primary"
          )} />
          <h2 className="font-bold text-sm text-white uppercase tracking-[0.2em]">{column.title}</h2>
          <div className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">{tasks.length}</div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
           <button 
             onClick={() => addTask(column.id, {})}
             className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
           >
             <Plus className="h-4 w-4" />
           </button>
           <button className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
             <MoreHorizontal className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-8 min-h-[200px] space-y-1">
        <SortableContext items={tasks.map((t) => t.id)}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addTask(column.id, {})}
          className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary hover:bg-primary/10 border-2 border-dashed border-white/5 hover:border-primary/30 rounded-2xl transition-all duration-300 mt-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Task</span>
        </motion.button>
      </div>
    </div>
  );
}
