import { motion } from 'framer-motion';

interface MenuCardProps {
  category: string;
  description: string;
  imageUrl: string;
}

export function MenuCard({ category, description, imageUrl }: MenuCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
    >
      <div className="aspect-square">
        <img
          src={imageUrl}
          alt={category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
