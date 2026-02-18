import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Gamepad2 } from 'lucide-react';
import { Language, Content } from '../types';

interface NavbarProps {
  content: Content['nav'];
  currentLang: Language;
  onToggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ content, currentLang, onToggleLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: content.home },
    { path: '/projects', label: content.projects },
  ];

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        // If not on home, we can't just scroll. In a simple setup, we use standard link
        // but for reliability in restricted envs, we'll navigate home and then scroll
        window.location.hash = '#/';
        setTimeout(() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <div 
        className={`w-full max-w-5xl transition-all duration-500 ease-in-out border rounded-full
          ${scrolled 
            ? 'glass-panel shadow-lg shadow-nova-primary/5 py-3 px-6 border-white/10' 
            : 'bg-transparent border-transparent py-4 px-4'
          }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo with Fallback */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 logo-shine-container rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
               {!logoError ? (
                 <img 
                   src="logo.png" 
                   alt="Nova Logo"
                   className="w-full h-full object-contain relative z-10"
                   onError={() => setLogoError(true)}
                 />
               ) : (
                 <Gamepad2 size={24} className="text-nova-primary relative z-10" />
               )}
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-nova-primary transition-colors duration-300 uppercase">NOVA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
                {navLinks.map((link) => (
                <RouterNavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                    `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-nova-muted hover:text-white hover:bg-white/5'}`
                    }
                >
                    {link.label}
                </RouterNavLink>
                ))}
                <button
                    onClick={handleScrollToContact}
                    className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-nova-muted hover:text-white hover:bg-white/5"
                >
                    {content.contact}
                </button>
            </div>
            
            <button
              onClick={onToggleLang}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-medium text-nova-muted hover:text-white uppercase tracking-wide backdrop-blur-sm"
            >
              <Globe size={14} />
              <span>{currentLang}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/5"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-24 left-4 right-4 glass-panel rounded-3xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
        <div className="px-6 py-8 space-y-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-lg font-medium text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleScrollToContact}
            className="block w-full text-lg font-medium text-gray-300 hover:text-white"
          >
            {content.contact}
          </button>
          <div className="pt-6 border-t border-white/10 flex justify-center">
            <button
              onClick={onToggleLang}
              className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg bg-white/5"
            >
              <Globe size={18} />
              <span>{currentLang}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;