import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Search, Edit2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { format } from 'date-fns';

type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
};

export default function AppointmentsModule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState('');

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false });
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: editingStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Status updated');
      setEditingId(null);
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(search.toLowerCase()) || 
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search);
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'Confirmed': 'bg-primary-100 text-primary-800 border-primary-200',
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-charcoal font-semibold">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage patient bookings and schedules.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-64">
            <Input 
              placeholder="Search name, email, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select 
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Confirmed', label: 'Confirmed' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-primary-100">
              <tr>
                <th scope="col" className="px-6 py-4">Patient</th>
                <th scope="col" className="px-6 py-4">Service</th>
                <th scope="col" className="px-6 py-4">Date & Time</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="bg-white border-b border-primary-50 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-charcoal">{app.name}</div>
                    <div className="text-xs">{app.email}</div>
                    <div className="text-xs">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4">{app.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{format(new Date(app.appointment_date), 'MMM do, yyyy')}</div>
                    <div className="text-xs">{app.appointment_time}</div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === app.id ? (
                      <select 
                        className="text-sm border rounded p-1"
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[app.status] || 'bg-gray-100'}`}>
                        {app.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === app.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateStatus(app.id)} className="text-green-600 hover:text-green-800">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(app.id); setEditingStatus(app.status); }} 
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
