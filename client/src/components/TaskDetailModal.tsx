import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task, MOCK_USERS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Paperclip, Upload, Plus, Trash2, Save } from 'lucide-react';
import { useBoard } from '@/context/BoardContext';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => Promise<void>;
}

export function TaskDetailModal({ task, isOpen, onClose, onUpdate }: Props) {
  const { deleteTask } = useBoard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  if (!task) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(task.id, { title, description });
    setIsSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0B1120] border-white/10 text-slate-200 rounded-3xl overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-display font-bold text-white bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-slate-600"
                placeholder="Task Title"
              />
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>in list</span>
                <span className="text-primary font-bold uppercase tracking-widest">{task.columnId.replace('c-', 'Column ')}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
              className="text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Description</label>
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/[0.03] border-white/5 min-h-[150px] focus:border-primary/50 rounded-2xl transition-all resize-none placeholder:text-slate-700"
                placeholder="Add a more detailed description..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Paperclip className="h-3 w-3" />
                Attachments
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-card p-3 flex items-center gap-3 hover:border-white/20 cursor-pointer transition-all">
                  <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-[10px]">
                    PDF
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-300 truncate">System_Spec.pdf</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">2.4 MB</div>
                  </div>
                </div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 hover:bg-white/5 cursor-pointer transition-all text-slate-500 hover:text-primary hover:border-primary/20"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                  <input type="file" className="hidden" ref={fileInputRef} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Assignees</label>
              <div className="flex flex-wrap gap-2">
                {task.assignees.map(id => (
                  <div key={id} className="flex items-center gap-2 bg-white/5 rounded-full pl-1 pr-3 py-1 border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={MOCK_USERS[id]?.avatar} />
                      <AvatarFallback className="text-[8px] font-bold">{id}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-bold text-slate-300">{MOCK_USERS[id]?.name.split(' ')[0]}</span>
                  </div>
                ))}
                <button className="h-8 w-8 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/20 transition-all">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Labels</label>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/10 hover:bg-primary/20 transition-all font-bold text-[9px] uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
                <button className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-primary transition-all">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Due Date</label>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300 glass-card p-3">
                <Calendar className="h-4 w-4 text-primary" />
                <span>APR 28, 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
           <Button variant="ghost" onClick={onClose} className="hover:bg-white/5 text-slate-400 font-bold text-xs uppercase tracking-widest">Cancel</Button>
           <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 font-bold px-6 rounded-xl flex gap-2"
           >
            {isSaving ? <span className="animate-pulse">Saving...</span> : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
