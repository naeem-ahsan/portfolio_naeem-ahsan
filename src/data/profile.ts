import type { Profile } from './types';

// Personal copy and unresolved links marked as placeholders must be reviewed before publication.
export const profile: Profile = {
  name: 'Naeem Ahsan',
  shortName: 'Naeem',
  professionalTitle: 'Web Application Developer',
  location: 'Kuala Lumpur, Malaysia',
  email: 'naeem30kbw@gmail.com',
  phone: '+60167030375',
  introduction:
    'Web application developer specialising in WordPress, Shopify, PHP and modern frontend technologies. I build maintainable, content-driven websites focused on performance, usability and clean implementation.',
  heroStatement: 'Building digital experiences that perform.',
  availability: 'Availability to be confirmed',
  cvUrl: '/resume/naeem-ahsan-CV.pdf',
  portrait: '/images/placeholders/portrait-placeholder.svg',
  biography:
    'Professional biography placeholder: replace this text with an approved account of Naeem’s experience, interests and approach to web development.',
  yearsExperience: 'To be confirmed',
  primaryFocus: 'CMS, e-commerce and content-driven web applications',
  workingStyle: 'Maintainable systems, clear collaboration and pragmatic delivery',
};

export const placeholderChecklist = [
  'Portrait and portrait alt text',
  'GitHub URL',
  'Professional biography',
  'Years of experience',
  'Availability statement',
  'Project descriptions, outcomes, links and screenshots',
  'Canonical domain and Open Graph image',
] as const;
