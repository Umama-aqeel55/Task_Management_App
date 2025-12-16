import React from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Task } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { MoreVertical, Plus } from 'lucide-react';
import { useBoard } from '@/context/BoardContext';
import { cn } from '@/lib/utils';

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
        className="opacity-40 w-[350px] h-[500px] bg-slate-900/50 rounded-xl border border-primary/30"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[300px] md:w-[350px] shrink-0 flex flex-col h-full max-h-full"
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="flex items-center justify-between p-3 mb-2 bg-card/30 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing group"
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full",
            column.title === 'To Do' ? "bg-slate-400" :
            column.title === 'In Progress' ? "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" :
            column.title === 'Review' ? "bg-amber-400" :
            "bg-emerald-400"
          )} />
          <h2 className="font-semibold text-sm text-slate-200 uppercase tracking-wide">{column.title}</h2>
          <span className="text-xs text-slate-500 font-mono bg-slate-900/50 px-1.5 py-0.5 rounded border border-white/5">{tasks.length}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => addTask(column.id, {})}
             className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
           >
             <Plus className="h-4 w-4" />
           </button>
           <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors">
             <MoreVertical className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-4 min-h-[100px]">
        <SortableContext items={tasks.map((t) => t.id)}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
        
        <button 
          onClick={() => addTask(column.id, {})}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-primary hover:bg-primary/5 border border-dashed border-slate-800 hover:border-primary/20 rounded-xl transition-all duration-200 mt-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>
    </div>
  );
}
