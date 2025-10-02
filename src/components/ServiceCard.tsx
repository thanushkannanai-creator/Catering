import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

export function ServiceCard({ title, description, icon, features }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-lg shadow-lg p-6 transition-shadow hover:shadow-xl"
    >
      <div className="text-amber-600 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 mb-4 text-center">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full mt-6 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
        Request Quote
      </button>
    </motion.div>
  );
}
