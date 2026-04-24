import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, MOCK_USERS } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreHorizontal, Paperclip, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  task: Task;
  onClick?: (task: Task) => void;
}

export function TaskCard({ task, onClick }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-primary/10 border-2 border-primary/50 h-[150px] rounded-2xl shadow-2xl cursor-grabbing"
      />
    );
  }

  const priorityColors = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    onClick?.(task);
  };

  return (
    <motion.div
      layoutId={task.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className="group glass-card p-4 rounded-2xl cursor-grab active:cursor-grabbing mb-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-[0.15em] h-5 px-2.5 rounded-full border", priorityColors[task.priority])}>
          {task.priority}
        </Badge>
        <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-all p-1 hover:bg-white/5 rounded-lg">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <h3 className="font-semibold text-white mb-2 leading-tight group-hover:text-primary transition-colors text-sm">{task.title}</h3>
      {task.description && (
        <p className="text-[11px] text-slate-400 line-clamp-2 mb-4 font-normal leading-relaxed">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {task.tags.map(tag => (
          <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/10 tracking-wider">
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <div className="flex -space-x-2">
          {task.assignees.map((userId) => (
            <Avatar key={userId} className="h-7 w-7 border-2 border-[#0F172A] hover:scale-110 transition-transform cursor-pointer">
              <AvatarImage src={MOCK_USERS[userId]?.avatar} />
              <AvatarFallback className="text-[8px] bg-slate-800 text-slate-400 font-bold">{userId}</AvatarFallback>
            </Avatar>
          ))}
          <div className="h-7 w-7 rounded-full bg-white/5 border-2 border-[#0F172A] flex items-center justify-center text-[8px] text-slate-500 font-bold">+2</div>
        </div>
        
        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1 text-[10px] hover:text-slate-300 font-bold">
            <MessageSquare className="h-3 w-3" />
            <span>5</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] hover:text-slate-300 font-bold">
            <Paperclip className="h-3 w-3" />
            <span>2</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
