import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Trash2, CheckCircle, MailOpen, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/Card';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';

type Query = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function ContactQueriesModule() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_queries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setQueries(data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch queries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleMarkRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_queries')
        .update({ is_read: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast.success(currentStatus ? 'Marked as unread' : 'Marked as read');
      fetchQueries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_queries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Query deleted');
      fetchQueries();
    } catch (error) {
      toast.error('Failed to delete query');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-charcoal font-semibold">Contact Queries</h1>
        <p className="text-gray-500 mt-1">View and manage messages from the website contact form.</p>
      </div>

      <div className="grid gap-6">
        {queries.map((query) => (
          <motion.div
            key={query.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={query.is_read ? 'bg-gray-50 opacity-80' : 'bg-white border-primary-200'}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-charcoal flex items-center gap-2">
                          {query.is_read ? <MailOpen className="w-5 h-5 text-gray-400" /> : <Mail className="w-5 h-5 text-primary-500" />}
                          {query.subject}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          From <span className="font-medium text-charcoal">{query.name}</span> &middot; {query.email} &middot; {query.phone}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(query.created_at), 'MMM do, yyyy h:mm a')}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-gray-700 text-sm whitespace-pre-wrap">
                      {query.message}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkRead(query.id, query.is_read)}
                    >
                      <CheckCircle className={`w-4 h-4 mr-2 ${query.is_read ? 'text-gray-400' : 'text-green-500'}`} />
                      {query.is_read ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(query.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {queries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-primary-100 border-dashed">
            <MailOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-charcoal">No Queries</h3>
            <p className="text-gray-500">You don't have any contact queries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
