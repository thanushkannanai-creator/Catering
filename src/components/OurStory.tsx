import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-white to-amber-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            A Culinary Legacy
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Inspired by the culinary finesse of <strong>SMT. Chirla Pushpaveni Reddy</strong>,
                Pushpa's Kitchen emerged as a venture of Hanu Reddy Odyssey. Our mission is to extend
                the love and flavours of her kitchen to every table, enriching lives through the art
                of cooking.
              </p>
              <p>
                With decades of experience in crafting memorable dining experiences, we bring together
                traditional recipes passed down through generations with modern culinary techniques.
                Each dish tells a story of heritage, passion, and dedication to excellence.
              </p>
              <p>
                Our commitment to quality, hygiene, and personalized service has made us the preferred
                choice for celebrations across the region. From intimate gatherings to grand celebrations,
                we pour our heart into every event we cater.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Traditional cooking"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-lg overflow-hidden shadow-lg mt-8"
            >
              <img
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Catering event"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-lg overflow-hidden shadow-lg col-span-2"
            >
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Food preparation"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl font-bold text-amber-600 mb-2">20+</div>
            <div className="text-gray-700">Years of Experience</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl font-bold text-amber-600 mb-2">1000+</div>
            <div className="text-gray-700">Events Catered</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
            <div className="text-gray-700">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
