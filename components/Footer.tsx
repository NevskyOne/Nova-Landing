import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Content } from '../types.ts';

interface FooterProps {
  content: Content['footer'];
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-nova-bg border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-nova-primary">
              <Gamepad2 size={18} />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tight">NOVA</span>
          </div>
          
          <div className="text-center md:text-right text-sm text-nova-muted">
            &copy; {new Date().getFullYear()} {content.copyright}. {content.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;