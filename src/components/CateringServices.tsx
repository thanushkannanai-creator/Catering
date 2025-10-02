import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Briefcase, Users, Sparkles } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export function CateringServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'Wedding Catering',
      description: 'Make your special day unforgettable with our bespoke wedding catering services.',
      icon: <Heart size={48} />,
      features: [
        'Customized menu planning',
        'Traditional & contemporary cuisines',
        'Elegant presentation and service',
        'Complete event coordination',
        'Special dietary accommodations'
      ]
    },
    {
      title: 'Corporate Events',
      description: 'Professional catering solutions for business gatherings and corporate functions.',
      icon: <Briefcase size={48} />,
      features: [
        'Business lunch packages',
        'Conference & seminar catering',
        'Office celebrations',
        'Networking event solutions',
        'Timely and efficient service'
      ]
    },
    {
      title: 'Private Parties',
      description: 'Celebrate life\'s moments with our personalized party catering services.',
      icon: <Users size={48} />,
      features: [
        'Birthday celebrations',
        'Anniversary parties',
        'Family reunions',
        'Intimate gatherings',
        'Themed menu options'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Catering Services
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we create memorable culinary experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-amber-50 rounded-lg p-8 md:p-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-amber-600" size={40} />
          </div>
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <h4 className="font-semibold text-lg text-amber-700 mb-3">
                  Individual & Personal Attention
                </h4>
                <p className="text-gray-600 text-sm">
                  Every event receives our undivided attention and personalized service
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <h4 className="font-semibold text-lg text-amber-700 mb-3">
                  Fresh, Local Ingredients
                </h4>
                <p className="text-gray-600 text-sm">
                  We source the finest local ingredients to ensure quality and freshness
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md h-full">
                <h4 className="font-semibold text-lg text-amber-700 mb-3">
                  Experienced Professionals
                </h4>
                <p className="text-gray-600 text-sm">
                  Our skilled team brings decades of culinary expertise to every event
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
