import React from 'react';
import { Content } from '../types';
import FadeIn from './FadeIn';
import { User } from 'lucide-react';

interface AboutProps {
  content: Content['about'];
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <FadeIn direction="right">
            <div className="glass-panel rounded-[2rem] p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-nova-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 relative z-10">
                {content.title}
              </h2>
              <div className="prose prose-lg prose-invert text-gray-300 mb-8 leading-relaxed relative z-10">
                <p>{content.description}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={200}>
            <div className="relative">
              <h3 className="text-2xl font-display font-bold text-white mb-8 pl-4 border-l-4 border-nova-primary">
                {content.teamTitle}
              </h3>
              
              <div className="grid gap-4">
                {content.team.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-nova-primary/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-nova-secondary/20 flex items-center justify-center text-nova-secondary mr-4 group-hover:scale-110 transition-transform">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-white text-lg">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default About;