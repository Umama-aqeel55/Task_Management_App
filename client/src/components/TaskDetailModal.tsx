import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task, MOCK_USERS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Paperclip, Upload, Plus } from 'lucide-react';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskDetailModal({ task, isOpen, onClose, onUpdate }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!task) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Mock upload
      const fileName = e.target.files[0].name;
      alert(`Simulated upload of: ${fileName}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-white/10 text-slate-200">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <DialogTitle className="text-xl font-display font-bold text-white">
                {task.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>in list</span>
                <span className="text-primary underline decoration-dotted">To Do</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8 mt-4">
          <div className="col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
              <Textarea 
                defaultValue={task.description} 
                className="bg-black/20 border-white/10 min-h-[120px] focus-visible:ring-primary/50"
                placeholder="Add a more detailed description..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Paperclip className="h-3 w-3" />
                Attachments
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 border border-white/10 rounded-lg p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="h-10 w-10 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400 font-bold text-xs">
                    PDF
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-300 truncate">Brief.pdf</div>
                    <div className="text-xs text-slate-500">2.4 MB</div>
                  </div>
                </div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-1 hover:bg-white/5 cursor-pointer transition-colors text-slate-500 hover:text-primary"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-xs">Upload</span>
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignees</label>
              <div className="flex flex-wrap gap-2">
                {task.assignees.map(id => (
                  <div key={id} className="flex items-center gap-2 bg-white/5 rounded-full pl-1 pr-3 py-1 border border-white/5">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={MOCK_USERS[id]?.avatar} />
                      <AvatarFallback>{id}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-300">{MOCK_USERS[id]?.name.split(' ')[0]}</span>
                  </div>
                ))}
                <button className="h-8 w-8 rounded-full border border-dashed border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-400 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Labels</label>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                    {tag}
                  </Badge>
                ))}
                <button className="h-6 w-6 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</label>
              <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-2 rounded border border-white/5">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>Dec 24, 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/10">
           <Button variant="ghost" onClick={onClose} className="hover:bg-white/5 hover:text-white">Close</Button>
           <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
