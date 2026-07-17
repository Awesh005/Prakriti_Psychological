import { motion } from 'motion/react';
import { Award, Heart, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="pt-20 pb-16 bg-white border-b border-primary-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-6"
          >
            About Prakriti Clinic
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            A sanctuary for mental wellness where compassion meets evidence-based psychological care. We believe in nurturing the mind to heal the whole self.
          </motion.p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="/image.png" 
                  alt="Dr Prakriti Sinha" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-primary-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-primary-400" />
                  <span className="font-serif font-semibold text-charcoal">Ph.D. in Clinical Psychology</span>
                </div>
                <p className="text-sm text-gray-500">Board Certified Clinical Psychologist with 15+ years experience.</p>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} className="space-y-6">
              <h2 className="text-3xl font-serif text-charcoal">Dr Prakriti Sinha</h2>
              <h3 className="text-primary-600 font-medium">Founder & Lead Clinical Psychologist</h3>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over 15 years of clinical experience, Dr. Jenkins founded Prakriti Clinic with a singular vision: to create a premium, safe, and deeply compassionate space for psychological healing.
                </p>
                <p>
                  Her approach integrates cognitive-behavioral therapies (CBT) with mindfulness and person-centered techniques, ensuring that every treatment plan is as unique as the individual receiving it.
                </p>
              </div>
              
              <div className="pt-6 border-t border-primary-100">
                <h4 className="font-medium text-charcoal mb-4">Core Qualifications</h4>
                <ul className="space-y-3">
                  {[
                    "Ph.D. in Clinical Psychology, Stanford University",
                    "Licensed Clinical Psychologist (NY State)",
                    "Specialized training in EMDR and Trauma Therapy",
                    "Member of the American Psychological Association"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-400 mr-3 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary-200" />
              </div>
              <h2 className="text-3xl font-serif">Our Mission</h2>
              <p className="text-primary-100 leading-relaxed">
                To empower individuals to overcome life's challenges, heal from past traumas, and achieve enduring mental and emotional well-being through accessible, premium psychological care.
              </p>
            </motion.div>
            
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-primary-200" />
              </div>
              <h2 className="text-3xl font-serif">Therapy Philosophy</h2>
              <p className="text-primary-100 leading-relaxed">
                We believe that you are the expert of your own life. Our role is to provide the tools, insights, and safe environment needed to unlock your natural capacity for healing and growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic Images */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-serif text-charcoal mb-4">The Clinic Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Designed to promote calm, comfort, and confidentiality from the moment you walk through our doors.</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div {...fadeInUp} className="col-span-2 md:col-span-2 aspect-video rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" alt="Clinic Reception" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="aspect-square md:aspect-auto rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop" alt="Therapy Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/contact">Visit Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
