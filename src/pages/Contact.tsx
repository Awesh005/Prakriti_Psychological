import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_queries').insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      ]);

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="pt-20 pb-16 bg-white border-b border-primary-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            {...fadeInUp} transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            We're here to help. Reach out to us with any questions, or to schedule an appointment.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-xl mr-4 shrink-0">
                      <MapPin className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Clinic Address</h4>
                      <p className="text-gray-500">123 Wellness Avenue, Suite 200<br />New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-xl mr-4 shrink-0">
                      <Phone className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Phone Number</h4>
                      <p className="text-gray-500">(123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-xl mr-4 shrink-0">
                      <Mail className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Email Address</h4>
                      <p className="text-gray-500">hello@prakriticlinic.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-xl mr-4 shrink-0">
                      <Clock className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Working Hours</h4>
                      <p className="text-gray-500">Mon - Fri: 9:00 AM - 7:00 PM<br />Sat: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-primary-100 h-64 shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89c259af18391785%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border border-primary-100 shadow-sm"
            >
              <h2 className="font-serif text-3xl text-charcoal mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Full Name" 
                    placeholder="John Doe" 
                    {...register('name')} 
                    error={errors.name?.message} 
                    required 
                  />
                  <Input 
                    label="Phone Number" 
                    placeholder="(123) 456-7890" 
                    {...register('phone')} 
                    error={errors.phone?.message} 
                    required 
                  />
                </div>
                
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register('email')} 
                  error={errors.email?.message} 
                  required 
                />
                
                <Input 
                  label="Subject" 
                  placeholder="How can we help?" 
                  {...register('subject')} 
                  error={errors.subject?.message} 
                  required 
                />
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-charcoal">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`flex min-h-[120px] w-full rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder="Tell us a little about what's going on..."
                    {...register('message')}
                  ></textarea>
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
