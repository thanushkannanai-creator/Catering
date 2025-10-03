import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Star } from 'lucide-react';
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
    setCurrentIndex((prev) => (prev + 1) % (displayTestimonials.length || 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (displayTestimonials.length || 1)) % (displayTestimonials.length || 1));
  };

  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      reviewer_name: 'Priya & Raj',
      content: 'Shanvik made our wedding day absolutely perfect! The food was exceptional and the service was impeccable. All our guests are still talking about the delicious spread.',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      reviewer_name: 'Anand Kumar',
      content: 'We hired Shanvik for our corporate event and they exceeded all expectations. Professional, punctual, and the food quality was outstanding. Highly recommended!',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      reviewer_name: 'Lakshmi Reddy',
      content: 'Thank you for making my mother\'s 75th birthday so special. The traditional dishes were authentic and reminded us of home-cooked meals. Personal attention to every detail!',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white via-amber-50 to-white" ref={ref}>
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
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
            >
              <div className="flex items-start gap-6 mb-6">
                {currentTestimonial?.photo_url ? (
                  <img
                    src={currentTestimonial.photo_url}
                    alt={currentTestimonial.reviewer_name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-amber-100">
                    {currentTestimonial?.reviewer_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {currentTestimonial?.reviewer_name}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < (currentTestimonial?.rating || 0) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-6xl text-amber-600 mb-4">"</div>
              <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                {currentTestimonial?.content}
              </p>
            </motion.div>

            {displayTestimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-4 bg-white rounded-full shadow-xl hover:bg-amber-50 hover:scale-110 transition-all hidden md:block"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="text-amber-600" size={28} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-4 bg-white rounded-full shadow-xl hover:bg-amber-50 hover:scale-110 transition-all hidden md:block"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="text-amber-600" size={28} />
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
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber-600 w-10' : 'bg-gray-300 hover:bg-gray-400'
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
          className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-white" size={36} />
            <h3 className="text-3xl font-bold text-white">
              Follow us on Instagram
            </h3>
          </div>
          <p className="text-white/90 mb-6 text-lg">
            @shanvikcateringevents
          </p>
          <a
            href="https://instagram.com/shanvikcateringevents"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 font-semibold shadow-lg"
          >
            Follow Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
