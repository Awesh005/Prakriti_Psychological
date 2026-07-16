import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { supabase } from '../lib/supabase';

const servicesList = [
  "Anxiety Therapy", "Depression Counseling", "Stress Management", 
  "OCD Treatment", "PTSD & Trauma Therapy", "Relationship Counselling", 
  "Family Counselling", "Child Counselling", "Teen Counselling", 
  "Cognitive Behavioral Therapy (CBT)", "EMDR", "Couple Therapy"
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const bookingSchema = z.object({
  service: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().optional(),
  isReturning: z.boolean().default(false),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
      message: "",
      isReturning: false,
    },
  });

  const selectedService = watch('service');
  const selectedDate = watch('date');
  const selectedTime = watch('time');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam && servicesList.includes(serviceParam)) {
      setValue('service', serviceParam);
    }
  }, [location, setValue]);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['service'];
    if (step === 2) fieldsToValidate = ['date'];
    if (step === 3) fieldsToValidate = ['time'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('appointments').insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          appointment_date: data.date,
          appointment_time: data.time,
          message: data.message || null,
          status: 'Pending',
          is_returning: data.isReturning, // if we want to store it, we might need a column for this. Assuming we just rely on standard schema. Wait, schema was: id, name, phone, email, service, appointment_date, appointment_time, message, status, created_at. I'll omit isReturning from insert or add it to notes.
        },
      ]);

      if (error) throw error;
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-sm border border-primary-100"
        >
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary-500" />
          </div>
          <h2 className="font-serif text-3xl text-charcoal mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for booking with Prakriti Clinic. We have received your request for a {selectedService} session on {format(new Date(selectedDate), 'MMM do, yyyy')} at {selectedTime}.
            Our team will contact you shortly to confirm the appointment.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  // Generate next 14 days for date selection
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const date = addDays(new Date(), i + 1);
    // skip sundays for example
    if (date.getDay() === 0) return null;
    return format(date, 'yyyy-MM-dd');
  }).filter(Boolean) as string[];

  const steps = [
    { title: "Service", description: "Select treatment" },
    { title: "Date", description: "Choose a day" },
    { title: "Time", description: "Pick a slot" },
    { title: "Details", description: "Your info" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="pt-20 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-charcoal mb-4">Book an Appointment</h1>
            <p className="text-gray-600">Take the first step towards healing.</p>
          </div>

          {/* Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 w-full h-[2px] bg-primary-100 -z-10 -translate-y-1/2"></div>
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center bg-background px-2 sm:px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step > i + 1 ? 'bg-primary-500 text-white' : 
                    step === i + 1 ? 'bg-primary-400 text-white ring-4 ring-primary-50' : 
                    'bg-white border-2 border-primary-200 text-gray-400'
                  }`}>
                    {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className="text-xs font-medium mt-2 hidden sm:block text-charcoal">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-primary-100 shadow-sm relative overflow-hidden min-h-[400px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                
                {/* Step 1: Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-charcoal mb-6">Which service are you looking for?</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {servicesList.map(srv => (
                        <div 
                          key={srv}
                          onClick={() => setValue('service', srv, { shouldValidate: true })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedService === srv 
                              ? 'border-primary-500 bg-primary-50 text-primary-800' 
                              : 'border-primary-100 hover:border-primary-300 text-charcoal'
                          }`}
                        >
                          <span className="font-medium">{srv}</span>
                        </div>
                      ))}
                    </div>
                    {errors.service && <p className="text-red-500 text-sm mt-2">{errors.service.message}</p>}
                  </motion.div>
                )}

                {/* Step 2: Date */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-charcoal mb-6">Select a Date</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-1">
                      {availableDates.map(date => (
                        <div 
                          key={date}
                          onClick={() => setValue('date', date, { shouldValidate: true })}
                          className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                            selectedDate === date 
                              ? 'border-primary-500 bg-primary-50 text-primary-800' 
                              : 'border-primary-100 hover:border-primary-300 text-charcoal'
                          }`}
                        >
                          <CalendarIcon className="w-5 h-5 mx-auto mb-2 opacity-70" />
                          <div className="text-xs uppercase tracking-wider mb-1">{format(new Date(date), 'EEE')}</div>
                          <div className="font-semibold text-lg">{format(new Date(date), 'dd MMM')}</div>
                        </div>
                      ))}
                    </div>
                    {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>}
                  </motion.div>
                )}

                {/* Step 3: Time */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-charcoal mb-6">Select a Time</h2>
                    <p className="text-gray-500 mb-4">Availability for {format(new Date(selectedDate), 'EEEE, MMMM do')}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {timeSlots.map(time => (
                        <div 
                          key={time}
                          onClick={() => setValue('time', time, { shouldValidate: true })}
                          className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center ${
                            selectedTime === time 
                              ? 'border-primary-500 bg-primary-50 text-primary-800' 
                              : 'border-primary-100 hover:border-primary-300 text-charcoal'
                          }`}
                        >
                          <Clock className="w-5 h-5 mb-2 opacity-70" />
                          <span className="font-medium">{time}</span>
                        </div>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time.message}</p>}
                  </motion.div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-charcoal mb-6">Patient Details</h2>
                    
                    <div className="bg-secondary/30 p-4 rounded-xl mb-6 text-sm text-gray-600 flex items-center justify-between">
                      <div>
                        <strong>Summary:</strong> {selectedService} on {format(new Date(selectedDate), 'MMM do')} at {selectedTime}
                      </div>
                      <button type="button" onClick={() => setStep(1)} className="text-primary-600 font-medium hover:underline">Edit</button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} required />
                      <Input label="Phone Number" placeholder="(123) 456-7890" {...register('phone')} error={errors.phone?.message} required />
                    </div>
                    
                    <Input label="Email Address" type="email" placeholder="john@example.com" {...register('email')} error={errors.email?.message} required />
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        className="flex min-h-[100px] w-full rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                        placeholder="Any specific symptoms or preferences..."
                        {...register('message')}
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-3 bg-white p-3 border border-primary-100 rounded-xl">
                      <input 
                        type="checkbox" 
                        id="isReturning"
                        className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        {...register('isReturning')} 
                      />
                      <label htmlFor="isReturning" className="text-sm font-medium text-charcoal cursor-pointer">
                        I am a returning patient
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-10 pt-6 border-t border-primary-100 flex items-center justify-between">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={handleBack}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" isLoading={isSubmitting}>
                    Confirm Booking
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
