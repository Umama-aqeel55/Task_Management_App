import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { Activity, CheckCircle2, Clock, ListTodo } from 'lucide-react';

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

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <Card className="glass-card border-white/5">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatCard title="Total Tasks" value="42" sub="+12% from last week" icon={ListTodo} color="text-slate-400" />
              <StatCard title="In Progress" value="8" sub="3 tasks due today" icon={Clock} color="text-indigo-400" />
              <StatCard title="Completed" value="128" sub="+24% completion rate" icon={CheckCircle2} color="text-emerald-400" />
              <StatCard title="Activity" value="2.4h" sub="Average daily time" icon={Activity} color="text-rose-400" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="glass-card border-white/5 col-span-4">
                <CardHeader>
                  <CardTitle className="text-slate-200">Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <XAxis 
                          dataKey="name" 
                          stroke="#475569" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <YAxis 
                          stroke="#475569" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `${value}`} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="completed" fill="#34d399" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="added" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5 col-span-3">
                <CardHeader>
                  <CardTitle className="text-slate-200">Task Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 text-xs text-slate-400 mt-2">
                    {pieData.map((item) => (
                      <div key={item.name} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
