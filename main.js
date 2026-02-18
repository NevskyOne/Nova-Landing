const Language = { EN: 'EN', RU: 'RU' };
let lang = Language.EN;
let mobileOpen = false;
let scrolled = false;

const CONTENT = {
  EN: {
    nav: { home: 'Home', projects: 'Projects', contact: 'Contact', about: 'Studio' },
    hero: {
      title: 'In the dark space we shine for you',
      subtitle: 'Nova is a student game studio creating immersive, cozy, and experimental experiences.',
      ctaPrimary: 'Get Warmtail'
    },
    about: {
      title: 'Who We Are',
      description: 'A team of enthusiasts from Russia, born out of the NTO Olympiad. We believe in games that spark curiosity and bring people together.',
      teamTitle: 'Our Team',
      team: [
        { role: 'Team Leader, Game Designer, Programmer, Tech Artist' },
        { role: 'Programmer' },
        { role: 'Programmer' },
        { role: '2D Artist' }
      ]
    },
    projects: { title: 'Our Games', subtitle: 'Experience our latest release.', viewAll: 'View Project', latestRelease: 'Latest Release' },
    contact: { title: 'Get in Touch', subtitle: 'Reach out to us for collaborations or just subscribe to our media', emailLabel: 'Email Us', socialLabel: 'Socials' },
    footer: { copyright: 'Nova Studio', rights: 'All rights reserved.' }
  },
  RU: {
    nav: { home: 'Главная', projects: 'Проекты', contact: 'Контакты', about: 'Студия' },
    hero: { title: 'В темном космосе мы светим для вас', subtitle: 'Nova — студенческая студия, создающая увлекательные и уютные игровые миры.', ctaPrimary: 'Скачать Warmtail' },
    about: {
      title: 'Кто Мы',
      description: 'Команда энтузиастов из России, рождённая из олимпиады НТО. Мы верим в игры, которые пробуждают любопытство.',
      teamTitle: 'Наша Команда',
      team: [
        { role: 'Тимлид, Геймдизайнер, Программист, Тех. Артист' },
        { role: 'Программист' },
        { role: 'Программист' },
        { role: '2D Художник' }
      ]
    },
    projects: { title: 'Наши Игры', subtitle: 'Попробуйте наш последний релиз.', viewAll: 'Смотреть Проект', latestRelease: 'Последний релиз' },
    contact: { title: 'Свяжитесь с нами', subtitle: 'Напишите нам для сотрудничества или подпишитесь на наши соцсети', emailLabel: 'Почта', socialLabel: 'Соцсети' },
    footer: { copyright: 'Nova Studio', rights: 'Все права защищены.' }
  }
};

const PROJECTS_DATA = {
  EN: [{
    id: 'warmtail', title: 'Warmtail',
    description: 'Warmtail is a cozy top-down puzzle-adventure set in a gentle underwater world slowly freezing to death. You play as a small axolotl — a fragment of a fallen star — able to share warmth, melt ice, and heal both the world and its inhabitants.',
    imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
    tags: ['Adventure', 'Cozy', 'Puzzle'],
    links: [
      { label: 'Download for Windows', url: 'https://github.com/NevskyOne/Warmtail/releases/latest', icon: 'download' },
      { label: 'View on Itch.io', url: 'https://nevskyone.itch.io/warmtail', icon: 'itch' }
    ]
  }],
  RU: [{
    id: 'warmtail', title: 'Warmtail',
    description: 'Warmtail - это уютная приключенческая игра-головоломка, действие которой разворачивается в нежном подводном мире, медленно замерзающем до смерти. Вы играете за маленького аксолотля — осколка упавшей звезды, способного делиться теплом, растапливать лед и исцелять мир и его обитателей.',
    imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
    tags: ['Приключение', 'Уют', 'Головоломка'],
    links: [
      { label: 'Скачать для Windows', url: 'https://github.com/NevskyOne/Warmtail/releases/latest', icon: 'download' },
      { label: 'Смотреть на Itch.io', url: 'https://nevskyone.itch.io/warmtail', icon: 'itch' }
    ]
  }]
};

const app = document.getElementById('app');
const icon = {
  arrow: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  globe: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10Z"/></svg>',
  menu: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 6-12 12M6 6l12 12"/></svg>',
  down: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  user: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21a7 7 0 0 0-14 0"/><circle cx="12" cy="7" r="4"/></svg>',
  mail: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>',
  send: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>',
  gamepad: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M8 12h4M10 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="18" cy="13" r="1"/></svg>',
  download: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>'
};

function hashPath() {
  const hash = window.location.hash.replace('#', '') || '/';
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function projectCard(project) {
  return `<div class="glass-panel rounded-3xl overflow-hidden p-1 group hover:border-nova-primary/30 transition-colors duration-500">
    <div class="relative rounded-[20px] overflow-hidden aspect-[16/9] mb-6">
      <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
      <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">${project.tags.map(tag => `<span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10">${tag}</span>`).join('')}</div>
    </div>
    <div class="px-5 pb-6">
      <h3 class="text-3xl font-display font-bold text-white mb-3">${project.title}</h3>
      <p class="text-gray-400 text-base mb-8 leading-relaxed">${project.description}</p>
      <div class="flex flex-col sm:flex-row gap-3">
        ${project.links.map((link, idx) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${idx === 0 ? 'bg-gradient-to-r from-nova-primary to-nova-secondary text-white hover:shadow-lg hover:shadow-nova-primary/25 hover:-translate-y-0.5' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'}">${link.icon === 'download' ? icon.download : icon.gamepad}<span>${link.label}</span></a>`).join('')}
      </div>
    </div>
  </div>`;
}

function render() {
  const content = CONTENT[lang];
  const projects = PROJECTS_DATA[lang];
  const path = hashPath();
  const isProjects = path.startsWith('/projects');

  app.innerHTML = `
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-nova-primary/10 rounded-full blur-[80px] animate-morph mix-blend-screen"></div>
    <div class="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-nova-accent/10 rounded-full blur-[90px] animate-morph mix-blend-screen" style="animation-delay:-5s"></div>
    <div class="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-nova-secondary/10 rounded-full blur-[70px] animate-morph mix-blend-screen" style="animation-delay:-10s"></div>
  </div>

  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
    <div class="w-full max-w-5xl transition-all duration-500 ease-in-out border rounded-full ${scrolled ? 'glass-panel shadow-lg shadow-nova-primary/5 py-3 px-6 border-white/10' : 'bg-transparent border-transparent py-4 px-4'}">
      <div class="flex items-center justify-between">
        <a href="#/" class="flex items-center space-x-3 group"><div class="relative w-10 h-10 logo-shine-container rounded-lg flex-shrink-0"><img src="./logo.png" alt="Nova Logo" class="w-full h-full object-contain relative z-10" /></div><span class="font-display font-bold text-xl tracking-tight text-white group-hover:text-nova-primary transition-colors duration-300 uppercase">NOVA</span></a>
        <div class="hidden md:flex items-center space-x-8">
          <div class="flex space-x-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
            <a href="#/" class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isProjects ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-nova-muted hover:text-white hover:bg-white/5'}">${content.nav.home}</a>
            <a href="#/projects" class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isProjects ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-nova-muted hover:text-white hover:bg-white/5'}">${content.nav.projects}</a>
            <button data-contact class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-nova-muted hover:text-white hover:bg-white/5">${content.nav.contact}</button>
          </div>
          <button data-lang class="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-medium text-nova-muted hover:text-white uppercase tracking-wide backdrop-blur-sm">${icon.globe}<span>${lang}</span></button>
        </div>
        <div class="md:hidden"><button data-mobile-toggle class="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/5">${mobileOpen ? icon.close : icon.menu}</button></div>
      </div>
    </div>
    <div class="md:hidden absolute top-24 left-4 right-4 glass-panel rounded-3xl overflow-hidden transition-all duration-300 origin-top ${mobileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}">
      <div class="px-6 py-8 space-y-6 text-center">
        <a href="#/" class="block text-lg font-medium text-gray-300 hover:text-white">${content.nav.home}</a>
        <a href="#/projects" class="block text-lg font-medium text-gray-300 hover:text-white">${content.nav.projects}</a>
        <button data-contact class="block w-full text-lg font-medium text-gray-300 hover:text-white">${content.nav.contact}</button>
        <div class="pt-6 border-t border-white/10 flex justify-center"><button data-lang class="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg bg-white/5">${icon.globe}<span>${lang}</span></button></div>
      </div>
    </div>
  </nav>

  <main class="flex-grow relative z-10">
    ${isProjects ? `<div class="min-h-screen pt-32">
      <div class="max-w-7xl mx-auto px-6 mb-20 text-center fade-section fade-up"><h1 class="text-4xl md:text-6xl font-display font-bold text-white mb-6">${content.projects.title}</h1><p class="text-xl text-gray-400 max-w-2xl mx-auto">${content.projects.subtitle}</p></div>
      <div class="max-w-5xl mx-auto px-6 mb-32 fade-section fade-up" style="transition-delay:100ms">${projects.map(projectCard).join('')}</div>
      ${contactSection(content)}
    </div>` : `<div class="overflow-x-hidden">
      <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-nova-primary/10 rounded-[100%] blur-[100px] pointer-events-none"></div>
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div class="w-full flex justify-center fade-section fade-up" style="transition-delay:100ms"><div class="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-12 animate-float"><div class="absolute inset-0 bg-nova-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div><img src="./logo.png" alt="Nova Studio Logo" class="relative z-10 w-full h-full object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]"></div></div>
          <div class="fade-section fade-up" style="transition-delay:200ms"><h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-[1.1]"><span class="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">${content.hero.title}</span></h1></div>
          <div class="fade-section fade-up" style="transition-delay:300ms"><p class="text-lg sm:text-xl text-nova-primary/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">${content.hero.subtitle}</p></div>
          <div class="fade-section fade-up" style="transition-delay:400ms"><a href="#/projects" class="w-full sm:w-auto px-10 py-4 bg-white text-nova-bg rounded-full font-bold text-lg inline-flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group"><span>${content.hero.ctaPrimary}</span>${icon.arrow}</a></div>
        </div>
        <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-nova-muted/50">${icon.down}</div>
      </section>
      <section class="py-20 relative"><div class="max-w-5xl mx-auto px-6"><div class="fade-section fade-up"><div class="flex justify-between items-end mb-10 px-2"><h2 class="text-3xl font-display font-bold text-white">${content.projects.latestRelease}</h2><a href="#/projects" class="flex items-center space-x-2 text-nova-primary hover:text-white transition-colors text-sm font-medium"><span>${content.projects.viewAll}</span>${icon.arrow}</a></div></div><div class="fade-section fade-up">${projects.map(projectCard).join('')}</div></div></section>
      <section id="about" class="py-24 relative"><div class="max-w-7xl mx-auto px-6"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"><div class="fade-section fade-right"><div class="glass-panel rounded-[2rem] p-10 lg:p-12 relative overflow-hidden"><div class="absolute top-0 right-0 w-64 h-64 bg-nova-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div><h2 class="text-3xl sm:text-4xl font-display font-bold text-white mb-6 relative z-10">${content.about.title}</h2><div class="prose prose-lg prose-invert text-gray-300 mb-8 leading-relaxed relative z-10"><p>${content.about.description}</p></div></div></div><div class="fade-section fade-left" style="transition-delay:200ms"><div class="relative"><h3 class="text-2xl font-display font-bold text-white mb-8 pl-4 border-l-4 border-nova-primary">${content.about.teamTitle}</h3><div class="grid gap-4">${content.about.team.map(member => `<div class="flex items-center p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-nova-primary/30 hover:bg-white/10 transition-all duration-300 group"><div class="w-10 h-10 rounded-full bg-nova-secondary/20 flex items-center justify-center text-nova-secondary mr-4 group-hover:scale-110 transition-transform">${icon.user}</div><div><div class="font-medium text-white text-lg">${member.role}</div></div></div>`).join('')}</div></div></div></div></div></section>
      ${contactSection(content)}
    </div>`}
  </main>

  <footer class="bg-nova-bg border-t border-white/5 py-12 relative z-10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row justify-between items-center gap-6"><div class="flex items-center space-x-2"><div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-nova-primary">${icon.gamepad}</div><span class="text-xl font-display font-bold text-white tracking-tight">NOVA</span></div><div class="text-center md:text-right text-sm text-nova-muted">&copy; ${new Date().getFullYear()} ${content.footer.copyright}. ${content.footer.rights}</div></div></div></footer>`;

  app.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => {
    lang = lang === Language.EN ? Language.RU : Language.EN;
    render();
  }));

  app.querySelector('[data-mobile-toggle]')?.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    render();
  });

  app.querySelectorAll('[data-contact]').forEach(btn => btn.addEventListener('click', () => {
    if (hashPath().startsWith('/projects')) {
      window.location.hash = '/';
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 30);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    mobileOpen = false;
  }));

  mobileOpen = false;
  activateFadeIn();
}

function contactSection(content) {
  return `<section id="contact" class="py-32 relative z-10"><div class="max-w-4xl mx-auto px-6 text-center"><div class="fade-section fade-up"><h2 class="text-3xl sm:text-5xl font-display font-bold text-white mb-6">${content.contact.title}</h2><p class="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">${content.contact.subtitle}</p></div><div class="fade-section fade-up" style="transition-delay:100ms"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href="mailto:wvwvalli@gmail.com" class="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all group flex flex-col items-center justify-center border border-white/5 hover:border-nova-primary/30"><div class="w-14 h-14 rounded-full bg-nova-primary/20 text-nova-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">${icon.mail}</div><h3 class="text-lg font-semibold text-white mb-1">${content.contact.emailLabel}</h3><span class="text-gray-400 font-mono text-sm">wvwvalli@gmail.com</span></a><a href="https://t.me/GameDevNova" target="_blank" rel="noopener noreferrer" class="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all group flex flex-col items-center justify-center border border-white/5 hover:border-nova-secondary/30"><div class="w-14 h-14 rounded-full bg-nova-secondary/20 text-nova-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">${icon.send}</div><h3 class="text-lg font-semibold text-white mb-1">Telegram</h3><span class="text-gray-400 font-mono text-sm">@GameDevNova</span></a></div></div></div></section>`;
}

function activateFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
}

window.addEventListener('hashchange', render);
window.addEventListener('scroll', () => {
  const newScrolled = window.scrollY > 20;
  if (newScrolled !== scrolled) {
    scrolled = newScrolled;
    render();
  }
});

if (!window.location.hash) window.location.hash = '/';
render();
