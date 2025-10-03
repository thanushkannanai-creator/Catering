import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuCard } from './MenuCard';

export function OurMenus() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuCategories = [
    {
      category: 'Vegetarian Delights',
      description: 'Fresh seasonal vegetables prepared with aromatic spices and traditional techniques',
      imageUrl: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      category: 'Non-Vegetarian Specialties',
      description: 'Tender meats and seafood, expertly grilled and marinated with signature spices',
      imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      category: 'Exquisite Desserts',
      description: 'Traditional sweets and contemporary desserts to end your meal on a sweet note',
      imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      category: 'Appetizers & Starters',
      description: 'An array of savory bites to begin your culinary journey',
      imageUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      category: 'Beverages',
      description: 'Refreshing drinks and traditional beverages to complement your meal',
      imageUrl: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % menuCategories.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + menuCategories.length) % menuCategories.length);
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-amber-50 to-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Menus
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse menu offerings crafted to delight every palate
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {menuCategories.slice(currentIndex, currentIndex + 3).map((menu, index) => (
              <div key={index}>
                <MenuCard {...menu} />
              </div>
            ))}
            {currentIndex + 3 > menuCategories.length &&
              menuCategories.slice(0, (currentIndex + 3) % menuCategories.length).map((menu, index) => (
                <div key={`wrap-${index}`}>
                  <MenuCard {...menu} />
                </div>
              ))}
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prev}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors"
              aria-label="Previous menu"
            >
              <ChevronLeft className="text-amber-600" size={24} />
            </button>
            <div className="flex gap-2">
              {menuCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors"
              aria-label="Next menu"
            >
              <ChevronRight className="text-amber-600" size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
