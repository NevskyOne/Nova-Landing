import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Gamepad2, Mail, Send, ArrowRight, ChevronDown, User, Star, Sparkles, Circle, Download, ExternalLink, Github } from 'lucide-react';

console.log('Nova Studio: Initializing unified application module...');

// --- TYPES ---
enum Language {
  EN = 'EN',
  RU = 'RU'
}

interface NavLinkType {
  label: string;
  path: string;
}

interface ProjectLink {
  label: string;
  url: string;
  icon: 'download' | 'github' | 'steam' | 'itch';
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
}

interface TeamMember {
  role: string;
  count?: number;
}

interface Content {
  nav: {
    home: string;
    projects: string;
    contact: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
  };
  about: {
    title: string;
    description: string;
    teamTitle: string;
    team: TeamMember[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    latestRelease: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
    socialLabel: string;
  };
  footer: {
    copyright: string;
    rights: string;
  };
}

// --- CONSTANTS ---
const CONTENT: Record<Language, Content> = {
  [Language.EN]: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
      about: 'Studio',
    },
    hero: {
      title: 'In the dark space we shine for you',
      subtitle: 'Nova is a student game studio creating immersive, cozy, and experimental experiences.',
      ctaPrimary: 'Get Warmtail',
    },
    about: {
      title: 'Who We Are',
      description: 'A team of enthusiasts from Russia, born out of the NTO Olympiad. We believe in games that spark curiosity and bring people together.',
      teamTitle: 'Our Team',
      team: [
        { role: 'Team Leader, Game Designer, Programmer, Tech Artist' },
        { role: 'Programmer' },
        { role: 'Programmer' },
        { role: '2D Artist' },
      ],
    },
    projects: {
      title: 'Our Games',
      subtitle: 'Experience our latest release.',
      viewAll: 'View Project',
      latestRelease: 'Latest Release',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Reach out to us for collaborations or just subscribe to our media',
      emailLabel: 'Email Us',
      socialLabel: 'Socials',
    },
    footer: {
      copyright: 'Nova Studio',
      rights: 'All rights reserved.',
    },
  },
  [Language.RU]: {
    nav: {
      home: 'Главная',
      projects: 'Проекты',
      contact: 'Контакты',
      about: 'Студия',
    },
    hero: {
      title: 'В темном космосе мы светим для вас',
      subtitle: 'Nova — студенческая студия, создающая увлекательные и уютные игровые миры.',
      ctaPrimary: 'Скачать Warmtail',
    },
    about: {
      title: 'Кто Мы',
      description: 'Команда энтузиастов из России, рождённая из олимпиады НТО. Мы верим в игры, которые пробуждают любопытство.',
      teamTitle: 'Наша Команда',
      team: [
        { role: 'Тимлид, Геймдизайнер, Программист, Тех. Артист' },
        { role: 'Программист' },
        { role: 'Программист' },
        { role: '2D Художник' },
      ],
    },
    projects: {
      title: 'Наши Игры',
      subtitle: 'Попробуйте наш последний релиз.',
      viewAll: 'Смотреть Проект',
      latestRelease: 'Последний релиз',
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Напишите нам для сотрудничества или подпишитесь на наши соцсети',
      emailLabel: 'Почта',
      socialLabel: 'Соцсети',
    },
    footer: {
      copyright: 'Nova Studio',
      rights: 'Все права защищены.',
    },
  },
};

const PROJECTS_DATA: Record<Language, Project[]> = {
  [Language.EN]: [
    {
      id: 'warmtail',
      title: 'Warmtail',
      description: 'Warmtail is a cozy top-down puzzle-adventure set in a gentle underwater world slowly freezing to death. You play as a small axolotl — a fragment of a fallen star — able to share warmth, melt ice, and heal both the world and its inhabitants.',
      imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
      tags: ['Adventure', 'Cozy', 'Puzzle'],
      links: [
        { label: 'Download for Windows', url: 'https://github.com/NevskyOne/Warmtail/releases/latest', icon: 'download' },
        { label: 'View on Itch.io', url: 'https://nevskyone.itch.io/warmtail', icon: 'itch' },
      ],
      featured: true,
    },
  ],
  [Language.RU]: [
    {
      id: 'warmtail',
      title: 'Warmtail',
      description: 'Warmtail - это уютная приключенческая игра-головоломка, действие которой разворачивается в нежном подводном мире, медленно замерзающем до смерти. Вы играете за маленького аксолотля — осколка упавшей звезды, способного делиться теплом, растапливать лед и исцелять мир и его обитателей.',
      imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
      tags: ['Приключение', 'Уют', 'Головоломка'],
      links: [
        { label: 'Скачать для Windows', url: 'https://github.com/NevskyOne/Warmtail/releases/latest', icon: 'download' },
        { label: 'Смотреть на Itch.io', url: 'https://nevskyone.itch.io/warmtail', icon: 'itch' },
      ],
      featured: true,
    },
  ],
};

// --- COMPONENTS ---

// FadeIn
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 }); 

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0';
    switch (direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return 'translate-x-10';
      case 'right': return '-translate-x-10';
      default: return '';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransformClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// BackgroundElements
const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-nova-primary/10 rounded-full blur-[80px] animate-morph mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-nova-accent/10 rounded-full blur-[90px] animate-morph mix-blend-screen" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-nova-secondary/10 rounded-full blur-[70px] animate-morph mix-blend-screen" style={{ animationDelay: '-10s' }} />
      
      <div className="absolute top-[15%] right-[15%] text-nova-primary/20 animate-float">
        <Gamepad2 size={56} className="transform rotate-12 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
      </div>
      <div className="absolute bottom-[25%] left-[10%] text-nova-secondary/20 animate-float-delayed">
        <div className="w-16 h-16 rounded-2xl border-4 border-current opacity-50 transform -rotate-12 backdrop-blur-sm" />
      </div>
      <div className="absolute top-[20%] left-[10%] text-nova-accent/20 animate-float" style={{ animationDuration: '10s' }}>
         <Circle size={48} strokeWidth={3} />
      </div>
      
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

// ProjectCard
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'download': return <Download size={20} />;
      case 'github': return <Github size={20} />;
      case 'itch': return <Gamepad2 size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden p-1 group hover:border-nova-primary/30 transition-colors duration-500">
      <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] mb-6">
         <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10">
                {tag}
              </span>
            ))}
          </div>
      </div>

      <div className="px-5 pb-6">
        <h3 className="text-3xl font-display font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-base mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {project.links.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              className={`flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                idx === 0 
                  ? 'bg-gradient-to-r from-nova-primary to-nova-secondary text-white hover:shadow-lg hover:shadow-nova-primary/25 hover:-translate-y-0.5' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {getIcon(link.icon)}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Navbar
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
  const navigate = useNavigate();

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
        navigate('/');
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    } else {
        const el = document.getElementById('contact');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
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
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 logo-shine-container rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
               {!logoError ? (
                 <img 
                   src="logo.png" 
                   alt="Nova Logo"
                   className="w-full h-full object-contain relative z-10"
                   onError={() => {
                     setLogoError(true);
                   }}
                 />
               ) : (
                 <Gamepad2 size={24} className="text-nova-primary relative z-10" />
               )}
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-nova-primary transition-colors duration-300 uppercase">NOVA</span>
          </Link>

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

// Footer
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

// Hero
interface HeroProps {
  content: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-nova-primary/10 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <FadeIn delay={100} direction="up" className="w-full flex justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-12 animate-float flex items-center justify-center">
             <div className="absolute inset-0 bg-nova-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div>
             
             {!logoError ? (
               <img 
                 src="logo.png" 
                 alt="Nova Studio Logo" 
                 className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]"
                 onError={() => {
                   setLogoError(true);
                 }}
               />
             ) : (
               <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-nova-primary">
                 <Gamepad2 size={120} className="sm:size-[160px] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                 <span className="mt-4 font-display font-bold text-4xl tracking-[0.2em] text-white">NOVA</span>
               </div>
             )}
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
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-nova-muted/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

// About
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

// Contact
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

// Home Page
interface HomeProps {
  content: Content;
  featuredProjects: Project[];
}

const Home: React.FC<HomeProps> = ({ content, featuredProjects }) => {
  return (
    <div className="overflow-x-hidden">
      <Hero content={content.hero} />
      
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn direction="up">
             <div className="flex justify-between items-end mb-10 px-2">
                <h2 className="text-3xl font-display font-bold text-white">{content.projects.latestRelease}</h2>
                <Link to="/projects" className="flex items-center space-x-2 text-nova-primary hover:text-white transition-colors text-sm font-medium">
                  <span>{content.projects.viewAll}</span>
                  <ArrowRight size={16} />
                </Link>
             </div>
          </FadeIn>

          {featuredProjects.map((project) => (
             <FadeIn key={project.id} direction="up">
                <ProjectCard project={project} />
             </FadeIn>
          ))}
        </div>
      </section>
      
      <About content={content.about} />

      <Contact content={content.contact} />
    </div>
  );
};

// Projects Page
interface ProjectsProps {
  content: Content;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ content, projects }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{content.projects.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{content.projects.subtitle}</p>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto px-6 mb-32">
        {projects.map((project) => (
          <FadeIn key={project.id} delay={100} direction="up">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <Contact content={content.contact} />
    </div>
  );
};

// --- APP ---

function App() {
  const [lang, setLang] = useState<Language>(Language.EN);

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.RU : Language.EN);
  };

  const currentContent = CONTENT[lang];
  const currentProjects = PROJECTS_DATA[lang];

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-nova-bg text-gray-100 font-sans selection:bg-nova-primary selection:text-white relative">
        <BackgroundElements />
        
        <Navbar 
          content={currentContent.nav} 
          currentLang={lang} 
          onToggleLang={toggleLang} 
        />
        
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home content={currentContent} featuredProjects={currentProjects} />} />
            <Route path="/projects" element={<Projects content={currentContent} projects={currentProjects} />} />
          </Routes>
        </main>

        <Footer content={currentContent.footer} />
      </div>
    </HashRouter>
  );
}

// --- MOUNT ---
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Nova Studio: Render loop established.');
  } catch (err) {
    console.error('Nova Studio: Mount failed', err);
    rootElement.innerHTML = `
      <div style="padding: 2rem; color: #22D3EE; background: #0B0D12; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
        <div style="max-width: 400px; text-align: center;">
          <h1 style="color: white;">Initialization Error</h1>
          <p style="color: #94A3B8;">The studio interface failed to initialize. Please check the connection or refresh the page.</p>
          <pre style="text-align: left; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-size: 0.8rem; overflow: auto; color: #ef4444;">${err}</pre>
        </div>
      </div>
    `;
  }
}