import React from 'react';
import { Star, Gamepad2, Sparkles, Circle } from 'lucide-react';

const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Pastel Morphing Blobs - Updated with Cyan/Purple accents */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-nova-primary/10 rounded-full blur-[80px] animate-morph mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-nova-accent/10 rounded-full blur-[90px] animate-morph mix-blend-screen" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-nova-secondary/10 rounded-full blur-[70px] animate-morph mix-blend-screen" style={{ animationDelay: '-10s' }} />
      
      {/* Floating Material Shapes */}
      <div className="absolute top-[15%] right-[15%] text-nova-primary/20 animate-float">
        <Gamepad2 size={56} className="transform rotate-12 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
      </div>
      <div className="absolute bottom-[25%] left-[10%] text-nova-secondary/20 animate-float-delayed">
        <div className="w-16 h-16 rounded-2xl border-4 border-current opacity-50 transform -rotate-12 backdrop-blur-sm" />
      </div>
      <div className="absolute top-[20%] left-[10%] text-nova-accent/20 animate-float" style={{ animationDuration: '10s' }}>
         <Circle size={48} strokeWidth={3} />
      </div>
      
      {/* Stars - Simple Space */}
      <div className="absolute top-[30%] left-[20%] text-white/40 animate-twinkle" style={{ animationDelay: '0s' }}>
        <Star size={12} fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[25%] text-white/30 animate-twinkle" style={{ animationDelay: '1s' }}>
        <Star size={8} fill="currentColor" />
      </div>
      <div className="absolute bottom-[40%] left-[40%] text-white/50 animate-twinkle" style={{ animationDelay: '2s' }}>
        <Sparkles size={20} />
      </div>
      <div className="absolute top-[10%] left-[50%] text-white/20 animate-twinkle" style={{ animationDelay: '1.5s' }}>
        <Star size={6} fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] right-[40%] text-white/20 animate-twinkle" style={{ animationDelay: '0.5s' }}>
        <Star size={10} fill="currentColor" />
      </div>
      <div className="absolute top-[80%] right-[10%] text-white/30 animate-twinkle" style={{ animationDelay: '3s' }}>
        <Star size={14} fill="currentColor" />
      </div>
    </div>
  );
};

export default BackgroundElements;