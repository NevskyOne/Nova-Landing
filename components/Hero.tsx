import React from 'react';
import { Content } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

interface HeroProps {
  content: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Subtle star glow behind text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-nova-primary/10 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Big Main Logo */}
        <FadeIn delay={100} direction="up" className="w-full flex justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-12 animate-float">
             {/* Glow effect behind the logo */}
             <div className="absolute inset-0 bg-nova-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div>
             <img 
               src="./logo.png" 
               alt="Nova Studio Logo" 
               className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]"
               onError={(e) => {
                 console.error("Logo failed to load at ./logo.png");
                 // Fallback to text if image fails
                 e.currentTarget.style.display = 'none';
               }}
             />
          </div>
        </FadeIn>

        <FadeIn delay={200} direction="up">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              {content.title}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={300} direction="up">
          <p className="text-lg sm:text-xl text-nova-primary/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {content.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={400} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/projects"
              className="w-full sm:w-auto px-10 py-4 bg-white text-nova-bg rounded-full font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
            >
              <span>{content.ctaPrimary}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-nova-muted/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;