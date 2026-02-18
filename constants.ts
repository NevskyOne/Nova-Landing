import { Content, Language, Project } from './types';

export const CONTENT: Record<Language, Content> = {
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

export const PROJECTS_DATA: Record<Language, Project[]> = {
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