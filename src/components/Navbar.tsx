import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UserRound } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-primary-100 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-400 text-white">
                <UserRound className="h-6 w-6" />
              </div>
              <span className="font-serif text-2xl font-semibold text-primary-700">Prakriti</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary-400',
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-charcoal'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <Button variant="outline" className="hidden lg:flex" asChild>
                  <a href="tel:+1234567890">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us
                  </a>
                </Button>
                <Button asChild>
                  <Link to="/book">Book Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-700 hover:bg-primary-50 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-primary-100">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium',
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-charcoal hover:bg-primary-50 hover:text-primary-600'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-4 pb-2 space-y-3">
              <Button className="w-full justify-center" variant="outline" asChild>
                <a href="tel:+1234567890">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
              <Button className="w-full justify-center" asChild>
                <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
