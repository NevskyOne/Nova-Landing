import React from 'react';
import { Content } from '../types.ts';
import { Mail, Send } from 'lucide-react';
import FadeIn from './FadeIn.tsx';

interface ContactProps {
  content: Content['contact'];
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <FadeIn direction="up">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email Card */}
            <a 
              href="mailto:wvwvalli@gmail.com" 
              className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all group flex flex-col items-center justify-center border border-white/5 hover:border-nova-primary/30"
            >
              <div className="w-14 h-14 rounded-full bg-nova-primary/20 text-nova-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{content.emailLabel}</h3>
              <span className="text-gray-400 font-mono text-sm">wvwvalli@gmail.com</span>
            </a>

            {/* Telegram Card */}
            <a 
              href="https://t.me/GameDevNova" 
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all group flex flex-col items-center justify-center border border-white/5 hover:border-nova-secondary/30"
            >
              <div className="w-14 h-14 rounded-full bg-nova-secondary/20 text-nova-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Send size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Telegram</h3>
              <span className="text-gray-400 font-mono text-sm">@GameDevNova</span>
            </a>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;