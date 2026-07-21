export interface Profile {
  name: string;
  shortName: string;
  professionalTitle: string;
  location: string;
  email: string;
  introduction: string;
  heroStatement: string;
  availability?: string;
  cvUrl: string;
  portrait: string;
  biography: string;
  yearsExperience: string;
  primaryFocus: string;
  workingStyle: string;
}

export interface NavigationItem {
  id: ChapterId;
  numeral: string;
  label: string;
  shortLabel: string;
}

export type ChapterId = 'introduction' | 'work' | 'experience' | 'skills' | 'about' | 'contact';

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
  placeholder: boolean;
}

export interface ExperienceItem {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  current: boolean;
  order: number;
  placeholder: boolean;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}
