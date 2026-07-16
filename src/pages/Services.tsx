import { motion } from 'motion/react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Services() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const services = [
    {
      title: "Anxiety Therapy",
      desc: "Learn to manage overwhelming worry, panic attacks, and generalized anxiety through proven therapeutic techniques.",
      duration: "50 mins",
      who: "Adults, Teens",
      icon: "🌿"
    },
    {
      title: "Depression Counseling",
      desc: "Find a supportive path through feelings of sadness, hopelessness, and loss of interest in daily life.",
      duration: "50 mins",
      who: "Adults, Teens",
      icon: "🌅"
    },
    {
      title: "Stress Management",
      desc: "Develop effective coping strategies to handle work, personal, and life transitions without burning out.",
      duration: "50 mins",
      who: "Adults",
      icon: "⚖️"
    },
    {
      title: "OCD Treatment",
      desc: "Specialized exposure and response prevention (ERP) therapy to break the cycle of obsessions and compulsions.",
      duration: "60 mins",
      who: "Adults, Teens, Children",
      icon: "🔄"
    },
    {
      title: "PTSD & Trauma Therapy",
      desc: "Safe, paced healing from past traumatic events to reduce flashbacks and emotional numbness.",
      duration: "60 mins",
      who: "Adults, Teens",
      icon: "🛡️"
    },
    {
      title: "Relationship Counselling",
      desc: "Navigate conflicts, improve communication, and understand relational patterns with your partner or peers.",
      duration: "60 mins",
      who: "Couples, Individuals",
      icon: "💬"
    },
    {
      title: "Family Counselling",
      desc: "Address family dynamics, resolve deep-seated conflicts, and foster a more supportive home environment.",
      duration: "75 mins",
      who: "Families",
      icon: "🏡"
    },
    {
      title: "Child Counselling",
      desc: "Play-based and developmental approaches to help children express emotions and overcome behavioral challenges.",
      duration: "45 mins",
      who: "Children (4-12)",
      icon: "🧸"
    },
    {
      title: "Teen Counselling",
      desc: "A safe, non-judgmental space for adolescents to discuss identity, academic pressure, and peer relationships.",
      duration: "50 mins",
      who: "Teens (13-18)",
      icon: "🌱"
    },
    {
      title: "Cognitive Behavioral Therapy (CBT)",
      desc: "A structured approach to identify and change negative thought patterns and behaviors.",
      duration: "50 mins",
      who: "Adults, Teens",
      icon: "🧠"
    },
    {
      title: "EMDR",
      desc: "Eye Movement Desensitization and Reprocessing to help the brain reprocess traumatic memories.",
      duration: "60-90 mins",
      who: "Adults",
      icon: "👁️"
    },
    {
      title: "Couple Therapy",
      desc: "Dedicated sessions to rebuild trust, enhance intimacy, and strengthen your romantic partnership.",
      duration: "60 mins",
      who: "Couples",
      icon: "🤝"
    }
  ];

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
            Specialized Psychological Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Comprehensive, evidence-based care tailored to your unique mental health needs. Explore our areas of expertise below.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 border border-primary-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
              >
                <div className="text-4xl mb-6 bg-secondary/50 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {service.icon}
                </div>
                
                <h3 className="font-serif text-2xl text-charcoal font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="space-y-3 mb-8 pt-6 border-t border-primary-50">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-3 text-primary-400" />
                    <span className="font-medium text-charcoal mr-2">Duration:</span> {service.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-3 text-primary-400" />
                    <span className="font-medium text-charcoal mr-2">Who it helps:</span> {service.who}
                  </div>
                </div>
                
                <Button className="w-full justify-between group-hover:bg-primary-500" asChild>
                  <Link to={`/book?service=${encodeURIComponent(service.title)}`}>
                    Book Appointment
                    <ArrowRight className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 {...fadeInUp} className="font-serif text-3xl text-charcoal mb-4">Unsure which service is right for you?</motion.h2>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book an initial consultation, and our experts will help determine the best therapeutic approach for your unique situation.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
