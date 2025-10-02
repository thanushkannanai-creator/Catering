import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length || 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length || 1)) % (testimonials.length || 1));
  };

  const defaultTestimonials = [
    {
      id: '1',
      reviewer_name: 'Priya & Raj',
      content: 'Shanvik made our wedding day absolutely perfect! The food was exceptional and the service was impeccable. All our guests are still talking about the delicious spread.',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      reviewer_name: 'Anand Kumar',
      content: 'We hired Shanvik for our corporate event and they exceeded all expectations. Professional, punctual, and the food quality was outstanding. Highly recommended!',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      reviewer_name: 'Lakshmi Reddy',
      content: 'Thank you for making my mother\'s 75th birthday so special. The traditional dishes were authentic and reminded us of home-cooked meals. Personal attention to every detail!',
      created_at: new Date().toISOString()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-amber-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl p-8 md:p-12"
            >
              <div className="text-6xl text-amber-600 mb-4">"</div>
              <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                {displayTestimonials[currentIndex]?.content}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-amber-700">
                  {displayTestimonials[currentIndex]?.reviewer_name}
                </p>
              </div>
            </motion.div>

            {displayTestimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors hidden md:block"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="text-amber-600" size={24} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors hidden md:block"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="text-amber-600" size={24} />
                </button>
              </>
            )}
          </div>

          {displayTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-pink-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-800">
              Follow us on Instagram
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            @shanvikcateringevents
          </p>
          <a
            href="https://instagram.com/shanvikcateringevents"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Follow Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
