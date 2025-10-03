import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isNonHomePage = location.pathname !== '/';

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

  const leftLinks = [
    { to: '/#story', label: 'Our Story' },
    { to: '/#services', label: 'Catering Services' },
    { to: '/#menu', label: 'Our Menu' },
  ];

  const rightLinks = [
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

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    if (to.includes('#')) {
      e.preventDefault();
      const hash = to.split('#')[1];
      if (location.pathname !== '/') {
        window.location.href = `/#${hash}`;
      } else {
        scrollToSection(`#${hash}`);
      }
    }
  };

  const textColor = isScrolled || isNonHomePage ? 'text-gray-700' : 'text-white';
  const bgColor = isScrolled || isNonHomePage ? 'bg-white shadow-md' : 'bg-transparent';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${bgColor}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-between h-24">
          <div className="flex items-center gap-8 flex-1 justify-end">
            {leftLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(link.to, e)}
                className={`text-sm font-medium transition-all hover:text-amber-600 hover:scale-105 ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 px-8 group"
          >
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold transition-colors group-hover:text-amber-600 ${
                isScrolled || isNonHomePage ? 'text-amber-700' : 'text-white'
              }`}>
                shanvikcateringevents
              </span>
              <span className={`text-xs transition-colors ${
                isScrolled || isNonHomePage ? 'text-gray-600' : 'text-gray-200'
              }`}>
                Turning Moments into Memories
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-8 flex-1">
            {rightLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(link.to, e)}
                className={`text-sm font-medium transition-all hover:text-amber-600 hover:scale-105 ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold transition-colors ${
                isScrolled || isNonHomePage ? 'text-amber-700' : 'text-white'
              }`}>
                shanvikcateringevents
              </span>
              <span className={`text-xs transition-colors ${
                isScrolled || isNonHomePage ? 'text-gray-600' : 'text-gray-200'
              }`}>
                Turning Moments into Memories
              </span>
            </div>
          </Link>

          <button
            className={`p-2 transition-colors ${textColor}`}
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
            className="lg:hidden bg-white border-t shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {[...leftLinks, ...rightLinks].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleNavClick(link.to, e)}
                  className="block py-3 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all font-medium"
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
