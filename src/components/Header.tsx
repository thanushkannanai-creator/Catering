import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/#story', label: 'Our Story' },
    { to: '/#services', label: 'Catering Services' },
    { to: '/#menu', label: 'Our Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/#testimonials', label: 'Testimonials' },
    { to: '/blog', label: 'Blog' },
    { to: '/#contact', label: 'Contact Us' },
  ];

  const scrollToSection = (hash: string) => {
    if (hash.startsWith('#')) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex flex-col">
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-amber-700' : 'text-white'
            }`}>
              shanvikcateringevents
            </span>
            <span className={`text-xs transition-colors ${
              isScrolled ? 'text-gray-600' : 'text-gray-200'
            }`}>
              Turning Moments into Memories
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  if (link.to.includes('#')) {
                    e.preventDefault();
                    const hash = link.to.split('#')[1];
                    if (location.pathname !== '/') {
                      window.location.href = `/#${hash}`;
                    } else {
                      scrollToSection(`#${hash}`);
                    }
                  }
                }}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => {
                    if (link.to.includes('#')) {
                      e.preventDefault();
                      const hash = link.to.split('#')[1];
                      if (location.pathname !== '/') {
                        window.location.href = `/#${hash}`;
                      } else {
                        scrollToSection(`#${hash}`);
                      }
                    }
                  }}
                  className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
