import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, MOCK_USERS } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreHorizontal, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        className="opacity-30 bg-card border border-primary/50 h-[150px] rounded-xl shadow-2xl cursor-grabbing"
      />
    );
  }

  const priorityColors = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when dragging
    if (isDragging) return;
    onClick?.(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className="group bg-card/40 hover:bg-card/60 backdrop-blur-sm border border-white/5 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider h-5 px-2 border", priorityColors[task.priority])}>
          {task.priority}
        </Badge>
        <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <h3 className="font-medium text-slate-200 mb-1 leading-snug">{task.title}</h3>
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 font-light">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {task.tags.map(tag => (
          <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <div className="flex -space-x-2">
          {task.assignees.map((userId) => (
            <Avatar key={userId} className="h-6 w-6 border-2 border-card">
              <AvatarImage src={MOCK_USERS[userId]?.avatar} />
              <AvatarFallback className="text-[8px] bg-slate-800 text-slate-400">{userId}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1 text-xs hover:text-slate-300">
            <Paperclip className="h-3 w-3" />
            <span>2</span>
          </div>
          <div className="flex items-center gap-1 text-xs hover:text-slate-300">
            <Calendar className="h-3 w-3" />
            <span>Dec 24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
