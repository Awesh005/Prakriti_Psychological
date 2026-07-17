import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <img src="/logo.png" alt="Prakriti Logo" className="h-12 w-auto object-contain mb-2" />
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Providing compassionate, evidence-based psychological care to help you find balance, healing, and personal growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">About Clinic</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/book" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Anxiety Therapy</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Depression Counseling</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Relationship Therapy</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Trauma & PTSD</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500">
                  123 Wellness Avenue, Suite 200<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary-400 shrink-0" />
                <a href="tel:+1234567890" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary-400 shrink-0" />
                <a href="mailto:hello@prakriticlinic.com" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
                  hello@prakriticlinic.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Prakriti Psychological Wellness Clinic. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="mx-1 h-4 w-4 text-primary-400" /> for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}
