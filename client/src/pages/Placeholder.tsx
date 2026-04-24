import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-72 relative z-10">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <p className="text-slate-400">This page is coming soon. Stay tuned!</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
