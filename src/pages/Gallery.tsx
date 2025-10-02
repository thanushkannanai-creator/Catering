import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase, GalleryImage } from '../lib/supabase';

const categories = ['All', 'Wedding', 'Corporate', 'Private', 'Outdoor', 'Luxury'];

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Wedding Event',
    alt_text: 'Wedding catering setup',
    image_url: 'https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Corporate Lunch',
    alt_text: 'Corporate event catering',
    image_url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Birthday Party',
    alt_text: 'Private party catering',
    image_url: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Outdoor Event',
    alt_text: 'Outdoor catering setup',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Luxury Dining',
    alt_text: 'Luxury event catering',
    image_url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Wedding Reception',
    alt_text: 'Wedding reception catering',
    image_url: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Business Meeting',
    alt_text: 'Corporate meeting catering',
    image_url: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Anniversary',
    alt_text: 'Anniversary celebration',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Garden Party',
    alt_text: 'Outdoor garden party',
    image_url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Gala Dinner',
    alt_text: 'Luxury gala dinner',
    image_url: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    created_at: new Date().toISOString()
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setImages(data);
    } else {
      setImages(defaultImages);
    }
  };

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-amber-100">
            Explore our memorable events and celebrations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => setLightboxImage(image)}
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{image.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImage.image_url}
            alt={lightboxImage.alt_text}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
