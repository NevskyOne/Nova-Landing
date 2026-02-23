const Language = { EN: 'EN', RU: 'RU' };
let lang = navigator.language === "ru-RU" ? Language.RU : Language.EN;
let mobileOpen = false;
let scrolled = false;

let mouseX = 0;
let mouseY = 0;

const CONTENT = {
  EN: {
    nav: { home: 'Home', projects: 'Projects', contact: 'Contact', about: 'Studio' },
    hero: {
      title: 'In the dark space we shine for you',
      subtitle: 'Nova is a game studio creating immersive, cozy, and experimental experiences.',
      ctaPrimary: 'Get our games'
    },
    about: {
      title: 'Who We Are',
      description: 'A team of enthusiasts from Russia, born out of the NTO Olympiad. We believe in games that spark curiosity and bring people together.',
      teamTitle: 'Meet The Core',
      team: [
        { name: 'Valentine', role: 'Team Leader, Game/Narrative Designer, Programmer, Tech. Artist', image: './v.jpg', offset: '50% 10%' },
        { name: 'Diana', role: '2D Artist', image: './d.jpg', offset: '50% 25%' },
        { name: 'Timur', role: 'Unity Programmer', image: './t.jpg', offset: '50% 100%' },
        { name: 'Irina', role: 'Unity Programmer', image: './i.jpg', offset: '50% 20%' },
      ]
    },
    projects: { title: 'Our Games', subtitle: 'Experience our latest releases crafted with passion.', viewAll: 'View Project', latestRelease: 'Latest Release' },
    contact: { title: 'Get in Touch', subtitle: 'Reach out to us for collaborations or just subscribe to our media channels', emailLabel: 'Email Us', socialLabel: 'Socials' },
    footer: { copyright: 'Nova Studio', rights: 'All rights reserved.' }
  },
  RU: {
    nav: { home: 'Главная', projects: 'Проекты', contact: 'Контакты', about: 'Студия' },
    hero: { title: 'В тёмном космосе мы сияем для вас', subtitle: 'Nova — студия энтузиастов, создающая увлекательные и уютные игровые миры.', ctaPrimary: 'Скачать наши игры' },
    about: {
      title: 'Кто Мы',
      description: 'Команда энтузиастов из России, рождённая из олимпиады НТО. Мы верим в игры, которые пробуждают любопытство и объединяют.',
      teamTitle: 'Наша Команда',
      team: [
        { name: 'Валентин', role: 'Тимлид, Геймдизайнер, Сценарист, Программист, Тех. Артист', image: './v.jpg', offset: '50% 10%' },
        { name: 'Диана', role: '2D Художник', image: './d.jpg', offset: '50% 25%' },
        { name: 'Тимур', role: 'Unity Программист', image: './t.jpg', offset: '50% 100%' },
        { name: 'Ирина', role: 'Unity Программист', image: './i.jpg', offset: '50% 20%' },

      ]
    },
    projects: { title: 'Наши Игры', subtitle: 'Попробуйте наш последний релиз, созданный с душой.', viewAll: 'Смотреть Проект', latestRelease: 'Последний релиз' },
    contact: { title: 'Свяжитесь с нами', subtitle: 'Напишите нам для сотрудничества или подпишитесь на наши соцсети', emailLabel: 'Почта', socialLabel: 'Соцсети' },
    footer: { copyright: 'Nova Studio', rights: 'Все права защищены.' }
  }
};

const PROJECTS_DATA = {
  EN: [{
    id: 'warmtail',
    title: 'Warmtail',
    description: 'Warmtail is a cozy top-down puzzle-adventure set in a gentle underwater world slowly freezing to death. You play as a small axolotl — a fragment of a fallen star — able to share warmth, melt ice, and heal both the world and its inhabitants.',
    imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
    tags: ['Adventure', 'Cozy', 'Puzzle'],
    links: [
      { label: 'Download for Windows', url: 'https://zws.im/󠁦󠁷󠁵󠁹‌󠁰󠁨', icon: 'download' },
      { label: 'View on Itch.io', url: 'https://nevskyone.itch.io/warmtail', icon: 'itch' }
    ]
  }],
  RU: [{
    id: 'warmtail',
    title: 'Warmtail',
    description: 'Warmtail - это уютная приключенческая игра-головоломка, действие которой разворачивается в нежном подводном мире, медленно замерзающем до смерти. Вы играете за маленького аксолотля — осколка упавшей звезды, способного делиться теплом, растапливать лед и исцелять мир и его обитателей.',
    imageUrl: 'https://img.itch.zone/aW1nLzI1NDkyNTk1LnBuZw==/original/cyjCIM.png',
    tags: ['Приключение', 'Уютная', 'Головоломка'],
    links: [
      { label: 'Скачать для Windows', url: 'https://zws.im/󠁦󠁷󠁵󠁹‌󠁰󠁨', icon: 'download' },
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
  mail: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>',
  send: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>',
  gamepad: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M8 12h4M10 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="18" cy="13" r="1"/></svg>',
  download: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  star: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="m12 3.5 2.6 5.27 5.82.85-4.2 4.1.99 5.79L12 16.8l-5.21 2.71.99-5.79-4.2-4.1 5.82-.85L12 3.5z"/></svg>',
  sparkles: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m5.64 5.64 2.83 2.83"/><path d="m15.53 15.53 2.83 2.83"/><path d="m5.64 18.36 2.83-2.83"/><path d="m15.53 8.47 2.83-2.83"/></svg>',
  circle: '<svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/></svg>',
  chevronLeft: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>'
};

function hashPath() {
  const hash = window.location.hash.replace('#', '') || '/';
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function navShellClass() {
  return `w-full transition-all duration-700 ease-fluid border rounded-full ${scrolled ? 'glass-panel py-3 px-6 border-white/10 shadow-lg shadow-black/50' : 'bg-transparent border-transparent py-4 px-4'}`;
}

function updateNavbarScrolled() {
  const shell = document.getElementById('nav-shell');
  if (shell) shell.className = navShellClass();
}

let rafId = null;
window.addEventListener('mousemove', (e) => {
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.documentElement.style.setProperty('--mouse-x', x.toFixed(2));
      document.documentElement.style.setProperty('--mouse-y', y.toFixed(2));
      rafId = null;
    });
  }
});

function backgroundElements() {
  return `
  <div class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div class="parallax-layer absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-nova-primary/10 rounded-full blur-[80px] mix-blend-screen" data-speed="1.5"></div>
    <div class="parallax-layer absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-nova-accent/10 rounded-full blur-[90px] mix-blend-screen" style="animation-delay:-5s" data-speed="-1"></div>
    <div class="parallax-layer absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-nova-secondary/10 rounded-full blur-[70px] mix-blend-screen" style="animation-delay:-10s" data-speed="2"></div>
    <div class="parallax-layer absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-nova-accent/10 rounded-full blur-[120px] mix-blend-screen" data-speed="1"></div>

    <div class="parallax-layer absolute top-[15%] right-[15%] text-nova-primary/20 animate-float" data-speed="-2">${icon.gamepad.replace('w-5 h-5', 'w-14 h-14')}</div>
    <div class="parallax-layer absolute bottom-[25%] left-[10%] text-nova-secondary/20 animate-float-delayed" data-speed="1.2"><div class="w-16 h-16 rounded-2xl border-4 border-current opacity-50 transform -rotate-12 backdrop-blur-sm"></div></div>
    <div class="parallax-layer absolute top-[20%] left-[10%] text-nova-accent/20 animate-float" style="animation-duration:10s" data-speed="2">${icon.circle}</div>

    <div class="absolute top-[30%] left-[20%] star-drift star-drift-slow text-white/40"><span class="animate-twinkle block">${icon.star.replace('w-3 h-3', 'w-3 h-3')}</span></div>
    <div class="absolute top-[60%] right-[25%] star-drift star-drift-fast text-white/30"><span class="animate-twinkle block" style="animation-delay:1s">${icon.star.replace('w-3 h-3', 'w-2 h-2')}</span></div>
    <div class="absolute bottom-[40%] left-[40%] star-drift star-drift-mid text-white/50"><span class="animate-twinkle block" style="animation-delay:2s">${icon.sparkles}</span></div>
    <div class="absolute top-[10%] left-[50%] star-drift star-drift-slow text-white/20"><span class="animate-twinkle block" style="animation-delay:1.5s">${icon.star.replace('w-3 h-3', 'w-1.5 h-1.5')}</span></div>
  </div>`;
}

function projectCard(project) {
  return `
  <div class="glass-panel glass-panel-hover rounded-[2rem] overflow-hidden p-2 group relative">
    <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] pointer-events-none"></div>
    <div class="relative rounded-[1.5rem] overflow-hidden aspect-[16/9] mb-6 shadow-lg">
      <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-fluid" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
      <div class="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 z-10">
        ${project.tags.map(tag => `<span class="text-xs font-bold px-4 py-1.5 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 shadow-lg tracking-wide uppercase">${tag}</span>`).join('')}
      </div>
    </div>
    <div class="px-6 pb-6 relative z-10">
      <h3 class="text-3xl md:text-4xl font-display font-bold text-white mb-3 group-hover:text-nova-primary transition-colors tracking-tight">${project.title}</h3>
      <p class="text-gray-400 text-base mb-8 leading-relaxed">${project.description}</p>
      <div class="flex flex-col sm:flex-row gap-4">
        ${project.links.map((link, idx) => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 ease-fluid active:scale-95 ${idx === 0 ? 'bg-gradient-to-r from-nova-primary to-nova-secondary text-white shadow-lg shadow-nova-primary/20 hover:shadow-nova-primary/40 hover:-translate-y-1' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/30'}">
            ${link.icon === 'download' ? icon.download : icon.gamepad}
            <span>${link.label}</span>
          </a>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function renderTeamCarousel(content) {
  return `
  <div class="relative w-full mt-10 group/carousel">
    <!-- Desktop Specific Arrows -->
    <div class="absolute -left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
      <button id="btn-prev" class="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 hover:text-nova-primary hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        ${icon.chevronLeft}
      </button>
    </div>
    <div class="absolute -right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
      <button id="btn-next" class="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 hover:text-nova-primary hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        ${icon.chevronRight}
      </button>
    </div>

    <!-- M3 Track -->
    <div id="team-carousel-track" class="m3-carousel-track hide-scrollbar pb-10 pt-4">
      ${content.about.team.map((member, i) => `
        <div class="m3-card relative rounded-[2.5rem] group/card bg-nova-bg/50 fade-section fade-up select-none h-[380px] sm:h-[450px]">
          
          <img src="${member.image}" 
               style="object-position: ${member.offset || 'center center'};"
               alt="${member.name}" 
               class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
               
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90 pointer-events-none"></div>
          
          <div class="info-box absolute bottom-5 left-5 right-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 p-5 shadow-2xl pointer-events-none">
            <h4 class="text-2xl font-display font-bold text-white mb-1 tracking-wide truncate">${member.name}</h4>
            <p class="text-sm text-gray-300 font-medium leading-snug line-clamp-2 uppercase tracking-wider text-nova-primary/90">${member.role}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

let currentActiveIndex = 0;

function initCarousel() {
  const track = document.getElementById('team-carousel-track');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.m3-card'));
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const N = cards.length;

  function updateCarousel(activeIndex) {
    currentActiveIndex = activeIndex;
    const startIndex = Math.max(0, Math.min(activeIndex - 1, N - 3));

    cards.forEach((card, index) => {
      card.classList.remove('is-active', 'is-side', 'is-hidden');
      if (index >= startIndex && index <= startIndex + 2) {
        if (index === activeIndex) {
          card.classList.add('is-active');
        } else {
          card.classList.add('is-side');
        }
      } else {
        card.classList.add('is-hidden');
      }
    });

    if (btnPrev) {
      btnPrev.style.opacity = currentActiveIndex === 0 ? '0.3' : '1';
      btnPrev.style.pointerEvents = currentActiveIndex === 0 ? 'none' : 'auto';
    }
    if (btnNext) {
      btnNext.style.opacity = currentActiveIndex === N - 1 ? '0.3' : '1';
      btnNext.style.pointerEvents = currentActiveIndex === N - 1 ? 'none' : 'auto';
    }
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (window.innerWidth >= 768) updateCarousel(index);
    });
  });

  if (btnNext) btnNext.addEventListener('click', () => { if (currentActiveIndex < N - 1) updateCarousel(currentActiveIndex + 1); });
  if (btnPrev) btnPrev.addEventListener('click', () => { if (currentActiveIndex > 0) updateCarousel(currentActiveIndex - 1); });

  updateCarousel(currentActiveIndex);
}

function contactSection(content) {
  return `
  <section id="contact" class="py-24 relative z-10">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <div class="fade-section fade-zoom">
        <h2 class="text-5xl sm:text-6xl font-display font-bold text-white mb-6 tracking-tight">${content.contact.title}</h2>
        <p class="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">${content.contact.subtitle}</p>
      </div>
      <div class="fade-section fade-up" style="transition-delay:150ms">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="mailto:nova.gamedev.studio@gmail.com" class="glass-panel glass-panel-hover p-10 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group active:scale-95 transition-transform">
            <div class="absolute inset-0 bg-nova-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="w-16 h-16 rounded-2xl bg-nova-primary/20 text-nova-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ease-fluid shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              ${icon.mail}
            </div>
            <h3 class="text-2xl font-display text-white mb-2 relative z-10 tracking-wide">${content.contact.emailLabel}</h3>
            <span class="text-nova-primary font-bold tracking-wider relative z-10">nova.gamedev.studio@gmail.com</span>
          </a>
          <a href="https://t.me/GameDevNova" target="_blank" rel="noopener noreferrer" class="glass-panel glass-panel-hover p-10 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group active:scale-95 transition-transform">
            <div class="absolute inset-0 bg-nova-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="w-16 h-16 rounded-2xl bg-nova-secondary/20 text-nova-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ease-fluid shadow-[0_0_20px_rgba(129,140,248,0.2)]">
              ${icon.send}
            </div>
            <h3 class="text-2xl font-display text-white mb-2 relative z-10 tracking-wide">Telegram</h3>
            <span class="text-nova-secondary font-bold tracking-wider relative z-10">@GameDevNova</span>
          </a>
        </div>
      </div>
    </div>
  </section>`;
}

function render() {
  const content = CONTENT[lang];
  const projects = PROJECTS_DATA[lang];
  const path = hashPath();
  const isProjects = path.startsWith('/projects');

  app.innerHTML = `
  ${backgroundElements()}
  
  <div class="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-[100]">
    <nav id="nav-shell" class="${navShellClass()}">
      <div class="flex items-center justify-between">
        <a href="#/" class="nav-link flex items-center space-x-3 group active:scale-95 transition-transform">
          <div class="relative w-10 h-10 logo-shine-container rounded-lg flex-shrink-0">
            <img src="./logo.png" alt="Nova Logo" class="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
          </div>
          <span class="font-display font-bold text-xl tracking-tight text-white group-hover:text-nova-primary transition-colors duration-300 uppercase">NOVA</span>
        </a>
        <div class="hidden md:flex items-center space-x-8">
          <div class="flex space-x-1 bg-white/5 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-lg">
            <a href="#/" class="nav-link px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ease-fluid active:scale-95 ${!isProjects ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-nova-muted hover:text-white hover:bg-white/5'}">${content.nav.home}</a>
            <a href="#/projects" class="nav-link px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ease-fluid active:scale-95 ${isProjects ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-nova-muted hover:text-white hover:bg-white/5'}">${content.nav.projects}</a>
            <button type="button" data-contact class="px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ease-fluid active:scale-95 text-nova-muted hover:text-white hover:bg-white/5">${content.nav.contact}</button>
          </div>
          <button type="button" data-lang class="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wide backdrop-blur-sm shadow-md">${icon.globe}<span>${lang}</span></button>
        </div>
        <div class="md:hidden">
          <button type="button" id="mobile-toggle-btn" class="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
             <span id="mobile-toggle-icon">${mobileOpen ? icon.close : icon.menu}</span>
          </button>
        </div>
      </div>
    </nav>

    <div id="mobile-menu" class="md:hidden absolute top-20 left-4 right-4 glass-panel rounded-3xl overflow-hidden transition-all duration-500 ease-fluid origin-top opacity-0 scale-95 -translate-y-4 pointer-events-none">
      <div class="px-6 py-8 space-y-6 text-center">
        <a href="#/" class="nav-link block text-xl font-bold tracking-wide text-gray-300 hover:text-white">${content.nav.home}</a>
        <a href="#/projects" class="nav-link block text-xl font-bold tracking-wide text-gray-300 hover:text-white">${content.nav.projects}</a>
        <button type="button" data-contact class="block w-full text-xl font-bold tracking-wide text-gray-300 hover:text-white">${content.nav.contact}</button>
        <div class="pt-6 border-t border-white/10 flex justify-center">
          <button type="button" data-lang class="flex items-center space-x-2 text-gray-300 hover:text-white px-6 py-3 rounded-full bg-white/10 font-bold tracking-wide">${icon.globe}<span>${lang}</span></button>
        </div>
      </div>
    </div>
  </div>

  <main class="flex-grow relative z-10">
    ${isProjects ? `
    <div class="min-h-screen pt-40">
      <div class="max-w-7xl mx-auto px-6 mb-20 text-center fade-section fade-up">
        <h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">${content.projects.title}</h1>
        <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">${content.projects.subtitle}</p>
      </div>
      <div class="max-w-5xl mx-auto px-6 mb-20 fade-section fade-up" style="transition-delay:150ms">
        ${projects.map(projectCard).join('')}
      </div>
      ${contactSection(content)}
    </div>` : `
    <div class="overflow-x-hidden">
      <!-- Hero -->
      <section class="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
        <div class="parallax-layer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-nova-primary/10 rounded-[100%] blur-[120px] pointer-events-none" data-speed="0.5"></div>
        <div class="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div class="w-full flex justify-center fade-section fade-zoom" style="transition-delay:50ms">
            <div class="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-8 animate-float group cursor-pointer">
              <div class="absolute inset-0 bg-nova-primary/20 blur-[80px] rounded-full animate-pulse-slow group-hover:bg-nova-primary/30 transition-colors duration-500"></div>
              <img src="./logo.png" alt="Nova Studio Logo" class="relative z-10 w-full h-full object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.5)] transform group-hover:scale-105 transition-transform duration-700 ease-fluid">
            </div>
          </div>
          
          <div class="fade-section fade-up" style="transition-delay:150ms">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
              <span class="block py-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">${content.hero.title}</span>
            </h1>
          </div>
          
          <div class="fade-section fade-up" style="transition-delay:250ms">
            <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-14 leading-relaxed font-light">${content.hero.subtitle}</p>
          </div>
          
          <!-- Animated Gradient CTA Button -->
          <div class="fade-section fade-up" style="transition-delay:350ms">
            <a href="#/projects" class="relative inline-flex group active:scale-95 transition-transform">
              <div class="absolute -inset-1 bg-gradient-to-r from-nova-primary via-nova-accent to-nova-primary rounded-full blur opacity-40 group-hover:opacity-100 animate-gradient-xy transition duration-1000 group-hover:duration-200"></div>
              <div class="relative w-full sm:w-auto px-10 py-4 bg-white text-nova-bg rounded-full font-bold text-lg inline-flex items-center justify-center space-x-3 transition-all">
                <span>${content.hero.ctaPrimary}</span>
                <span class="transform group-hover:translate-x-1 transition-transform">${icon.arrow}</span>
              </div>
            </a>
          </div>
        </div>
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30 hover:text-white transition-colors cursor-pointer" onclick="document.getElementById('latest-release').scrollIntoView({behavior:'smooth'})">
          ${icon.down}
        </div>
      </section>

      <!-- Latest Projects -->
      <section id="latest-release" class="pt-20 pb-0 relative z-10">
        <div class="max-w-5xl mx-auto px-6">
          <div class="fade-section fade-up">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4 px-2 border-b border-white/10 pb-6">
              <h2 class="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">${content.projects.latestRelease}</h2>
              <a href="#/projects" class="flex items-center space-x-2 text-nova-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider group">
                <span>${content.projects.viewAll}</span>
                <span class="transform group-hover:translate-x-1 transition-transform">${icon.arrow}</span>
              </a>
            </div>
          </div>
          <div class="fade-section fade-up mb-10" style="transition-delay:100ms">
            ${projects.map(projectCard).join('')}
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="pt-0 pb-20 relative z-10">
        <div class="max-w-7xl mx-auto px-0 md:px-6">
          <div class="text-center max-w-3xl mx-auto mb-16 px-6 fade-section fade-up">
            <h2 class="text-5xl sm:text-6xl font-display font-bold text-white mb-6 tracking-tight">${content.about.title}</h2>
            <p class="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">${content.about.description}</p>
          </div>
          
          <div class="fade-section fade-up w-full">
            <div class="flex items-center justify-between mb-2 px-10">
              <h3 class="text-3xl font-display font-bold text-white pl-4 border-l-4 border-nova-primary tracking-tight">${content.about.teamTitle}</h3>
            </div>
            ${renderTeamCarousel(content)}
          </div>
        </div>
      </section>

      ${contactSection(content)}
    </div>`}
  </main>

  <footer class="bg-black/50 backdrop-blur-md border-t border-white/5 py-12 relative z-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-nova-primary shadow-inner">
            ${icon.gamepad}
          </div>
          <span class="text-2xl font-display font-bold text-white tracking-tight">NOVA</span>
        </div>
        <div class="text-center md:text-right text-sm text-gray-500 font-bold tracking-wide">
          &copy; ${new Date().getFullYear()} ${content.footer.copyright}. ${content.footer.rights}
        </div>
      </div>
    </div>
  </footer>`;

  bindInteractions();
  if (!isProjects) setTimeout(initCarousel, 10);
  activateFadeIn();
  updateNavbarScrolled();
}

function toggleMobileMenu() {
  mobileOpen = !mobileOpen;
  const menu = document.getElementById('mobile-menu');
  const toggleIcon = document.getElementById('mobile-toggle-icon');

  if(mobileOpen) {
      menu.classList.remove('opacity-0', 'scale-95', '-translate-y-4', 'pointer-events-none');
      menu.classList.add('opacity-100', 'scale-100', 'translate-y-0', 'pointer-events-auto');
      toggleIcon.innerHTML = icon.close;
  } else {
      menu.classList.add('opacity-0', 'scale-95', '-translate-y-4', 'pointer-events-none');
      menu.classList.remove('opacity-100', 'scale-100', 'translate-y-0', 'pointer-events-auto');
      toggleIcon.innerHTML = icon.menu;
  }
}

function bindInteractions() {
  document.getElementById('mobile-toggle-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMobileMenu();
  });

  app.querySelectorAll('[data-contact]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    if (mobileOpen) toggleMobileMenu();
  }));

  app.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    lang = lang === Language.EN ? Language.RU : Language.EN;
    mobileOpen = false;
    render();
  }));

  app.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHash = link.getAttribute('href');
      const currentHash = window.location.hash || '#/';
      if (targetHash === currentHash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (mobileOpen) toggleMobileMenu();
      } else {
        if (mobileOpen) toggleMobileMenu();
      }
    });
  });
}

function activateFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  setTimeout(() => { document.querySelectorAll('.fade-section').forEach(el => observer.observe(el)); }, 0);
}

let currentPath = hashPath();
window.addEventListener('hashchange', () => {
  const newPath = hashPath();
  if (currentPath !== newPath) {
    currentPath = newPath;
    mobileOpen = false;
    window.scrollTo(0,0);
    render();
  }
});

let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      const newScrolled = window.scrollY > 20;
      if (newScrolled !== scrolled) {
        scrolled = newScrolled;
        updateNavbarScrolled();
      }
      scrollTimeout = null;
    }, 100);
  }
});

if (!window.location.hash) window.location.hash = '/';
scrolled = window.scrollY > 20;
render();