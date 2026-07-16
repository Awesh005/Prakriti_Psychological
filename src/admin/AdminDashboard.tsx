import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, CalendarCheck, CalendarClock, Ban, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: appointments, error } = await supabase
          .from('appointments')
          .select('status, appointment_date');
        
        if (error) throw error;

        const today = new Date().toISOString().split('T')[0];
        
        const newStats = {
          today: appointments.filter(a => a.appointment_date === today).length,
          pending: appointments.filter(a => a.status === 'Pending').length,
          confirmed: appointments.filter(a => a.status === 'Confirmed').length,
          completed: appointments.filter(a => a.status === 'Completed').length,
          cancelled: appointments.filter(a => a.status === 'Cancelled').length,
        };

        setStats(newStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const statCards = [
    { title: "Today's Appointments", value: stats.today, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending", value: stats.pending, icon: CalendarClock, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Confirmed", value: stats.confirmed, icon: CalendarCheck, color: "text-primary-600", bg: "bg-primary-100" },
    { title: "Completed", value: stats.completed, icon: CalendarCheck, color: "text-green-600", bg: "bg-green-100" },
    { title: "Cancelled", value: stats.cancelled, icon: Ban, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-charcoal font-semibold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back to the clinic administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-charcoal mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
