import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { Activity, CheckCircle2, Clock, ListTodo, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', completed: 4, added: 6 },
  { name: 'Tue', completed: 3, added: 4 },
  { name: 'Wed', completed: 7, added: 5 },
  { name: 'Thu', completed: 5, added: 8 },
  { name: 'Fri', completed: 9, added: 4 },
  { name: 'Sat', completed: 2, added: 1 },
  { name: 'Sun', completed: 1, added: 1 },
];

const pieData = [
  { name: 'To Do', value: 12, color: '#94a3b8' },
  { name: 'In Progress', value: 8, color: '#818cf8' },
  { name: 'Review', value: 4, color: '#fbbf24' },
  { name: 'Done', value: 16, color: '#34d399' },
];

const StatCard = ({ title, value, sub, icon: Icon, color, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="glass-card border-white/5 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity ${color.replace('text-', 'bg-')}`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3 text-emerald-400" />
          <p className="text-[10px] text-emerald-400 font-medium">{sub}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-72 relative z-10">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-bold text-white tracking-tight"
                >
                  Welcome back, <span className="text-primary">{user?.name || 'User'}</span>
                </motion.h1>
                <p className="text-slate-400 mt-1">Here's what's happening with your projects today.</p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group">
                <span>View Analytics</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Tasks" value="42" sub="+12% this week" icon={ListTodo} color="text-slate-400" index={0} />
              <StatCard title="In Progress" value="8" sub="3 tasks due today" icon={Clock} color="text-indigo-400" index={1} />
              <StatCard title="Completed" value="128" sub="+24% conversion" icon={CheckCircle2} color="text-emerald-400" index={2} />
              <StatCard title="Activity" value="2.4h" sub="Active time today" icon={Activity} color="text-rose-400" index={3} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-4"
              >
                <Card className="glass-card border-white/5 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-200">Performance Over Time</CardTitle>
                      <select className="bg-white/5 border border-white/10 text-xs text-slate-400 rounded-lg px-2 py-1 outline-none focus:border-primary/50 transition-colors">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-0">
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                              <stop offset="100%" stopColor="#34d399" stopOpacity={0.4} />
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="name" 
                            stroke="#475569" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                          />
                          <YAxis 
                            stroke="#475569" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value) => `${value}`} 
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                          />
                          <Bar dataKey="completed" fill="url(#barGradient2)" radius={[4, 4, 0, 0]} barSize={30} />
                          <Bar dataKey="added" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-3"
              >
                <Card className="glass-card border-white/5 h-full">
                  <CardHeader>
                    <CardTitle className="text-slate-200">Task Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {pieData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">{item.name}</span>
                            <span className="text-sm font-bold text-white">{item.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

