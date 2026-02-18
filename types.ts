export enum Language {
  EN = 'EN',
  RU = 'RU'
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: 'download' | 'github' | 'steam' | 'itch';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export interface TeamMember {
  role: string;
  count?: number;
}

export interface Content {
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