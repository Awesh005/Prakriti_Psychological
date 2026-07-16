import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    { title: "Anxiety Therapy", desc: "Overcome constant worry and panic with evidence-based techniques.", icon: "🌿" },
    { title: "Depression Counseling", desc: "Find your way back to joy and purpose with compassionate support.", icon: "🌅" },
    { title: "Couples Therapy", desc: "Rebuild trust, improve communication, and strengthen your bond.", icon: "🤝" },
  ];

  const processSteps = [
    { step: "01", title: "Reach Out", desc: "Book your initial consultation online or give us a call." },
    { step: "02", title: "Assessment", desc: "We discuss your needs and match you with the right approach." },
    { step: "03", title: "Therapy", desc: "Begin your customized treatment plan in a safe environment." },
    { step: "04", title: "Growth", desc: "Experience positive changes and improved well-being." },
  ];

  const faqs = [
    { q: "How long is a typical session?", a: "A standard therapy session lasts 50 minutes." },
    { q: "Do you offer online therapy?", a: "Yes, we offer secure, confidential telehealth sessions." },
    { q: "What should I expect in the first session?", a: "The first session is an opportunity for us to get to know you, understand your concerns, and discuss how we can help." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl lg:text-7xl font-serif font-medium text-charcoal mb-6 leading-tight"
            >
              Find peace and <span className="text-primary-400 italic">balance</span> in your life.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Premium psychological care tailored to your unique journey. We provide a safe space for healing, growth, and self-discovery.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" asChild>
                <Link to="/book">Book an Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+1234567890">Call (123) 456-7890</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white border-y border-primary-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-100">
            {[
              { icon: Star, label: "15+ Years", sub: "Experience" },
              { icon: Users, label: "5000+", sub: "Patients Served" },
              { icon: Shield, label: "100%", sub: "Confidential" },
              { icon: Clock, label: "Flexible", sub: "Scheduling" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="h-8 w-8 text-primary-400 mb-3" />
                <h4 className="font-serif text-2xl font-semibold text-charcoal">{stat.label}</h4>
                <p className="text-sm text-gray-500 mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-serif text-4xl text-charcoal mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive psychological care designed for your specific needs.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-3xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-charcoal group-hover:text-primary-500 transition-colors">{service.title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-serif text-4xl text-charcoal mb-4">Your Journey to Wellness</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A simple, transparent process to get you the help you need.</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="text-5xl font-serif text-secondary mb-4">{step.step}</div>
                <h3 className="font-medium text-lg text-charcoal mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[1px] bg-primary-100" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-4xl text-charcoal mb-4">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-primary-100"
              >
                <h4 className="font-medium text-charcoal flex items-start">
                  <MessageCircle className="h-5 w-5 text-primary-400 mr-3 shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="mt-3 text-gray-500 pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518113401568-1294fc6b6379?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 {...fadeInUp} className="font-serif text-4xl md:text-5xl mb-6">Ready to start your journey?</motion.h2>
          <motion.p {...fadeInUp} className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step towards a healthier, more balanced life. Our team is here to support you every step of the way.
          </motion.p>
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary-800 hover:bg-gray-100" asChild>
              <Link to="/book">Book an Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
