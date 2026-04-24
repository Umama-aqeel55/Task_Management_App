import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KanbanSquare, Loader2, Github, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For this demo, we'll use the Google login as the primary real-time connection
    await login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-panel rounded-3xl relative z-10 mx-4 border-white/5"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-primary/40 mb-6 animate-float"
          >
            <KanbanSquare className="text-white h-9 w-9" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Welcome to <span className="text-primary">TaskFlow</span></h1>
          <p className="text-slate-400 text-sm">Experience real-time collaboration like never before.</p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={login}
            className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold rounded-xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-12 border-white/10 hover:bg-white/5 hover:text-white text-slate-300 rounded-xl font-bold transition-all"
          >
            <Github className="mr-2 h-5 w-5" />
            Github
          </Button>
        </div>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="bg-[#040814] px-4 text-slate-500">Or use email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <Input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 bg-white/[0.03] border-white/5 text-slate-200 placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-primary/50 h-12 rounded-xl transition-all"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 bg-white/[0.03] border-white/5 text-slate-200 placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-primary/50 h-12 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In to TaskFlow'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          New to TaskFlow? <span className="text-primary hover:underline cursor-pointer font-bold">Create an account</span>
        </p>
      </motion.div>

      {/* Decorative footer text */}
      <div className="absolute bottom-8 text-slate-600 text-[10px] uppercase tracking-[0.4em] font-bold">
        Secure & Real-time Persistence
      </div>
    </div>
  );
}
