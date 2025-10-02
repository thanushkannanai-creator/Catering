import { Instagram, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">shanvikcateringevents</h3>
            <p className="text-gray-400 text-sm">
              Turning Moments into Memories
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#story" className="text-gray-400 hover:text-amber-500 transition-colors">Our Story</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-amber-500 transition-colors">Services</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-amber-500 transition-colors">Gallery</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-amber-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/shanvikcateringevents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} shanvikcateringevents, All Rights Reserved</p>
          <p className="mt-4 md:mt-0">made by Thanush, Santhosh, Kathick</p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="/privacy" className="hover:text-amber-500 transition-colors mx-2">Privacy</a>
          <a href="/terms" className="hover:text-amber-500 transition-colors mx-2">Terms</a>
          <a href="/cookies" className="hover:text-amber-500 transition-colors mx-2">Cookie Notice</a>
        </div>
      </div>
    </footer>
  );
}
