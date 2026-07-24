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
    'Web Application Developer @ Valiram specialising in WordPress, Shopify, PHP, JavaScript, and modern frontend development. I build maintainable, performance-focused websites and e-commerce experiences for brands and businesses across APAC.',
  heroStatement: 'Building digital experiences that perform.',
  availability: 'Open to freelance engagements and full-time opportunities.',
  cvUrl: '/resume/naeem-ahsan-CV.pdf',
  portrait: '/images/portrait/portrait-naeem.png',
  biography:
    `I'm a Web Application Developer based in Malaysia with around six years of experience building and improving content-driven websites, e-commerce platforms, and business applications.

    My work spans WordPress, Shopify, PHP, JavaScript, TypeScript, Vue, and modern frontend development. I specialise in turning business and campaign requirements into fast, maintainable digital experiences—from custom themes and plugins to Shopify enhancements, campaign registration systems, reusable components, and automated testing workflows.

    I currently work at Valiram, where I support digital platforms across luxury retail and e-commerce brands, including Swiss Watch, Godiva, Steve Madden, and Valiram 247. Previously, I worked on regional digital initiatives for brands such as DIOR, Jo Malone, Estée Lauder, Clinique, and MAC across Asia-Pacific markets.

    I care about clean implementation, practical architecture, performance, usability, and building systems that remain manageable for both developers and content teams.`,
  yearsExperience: '5+ years',
  primaryFocus: 'CMS, e-commerce and content-driven web applications',
  workingStyle: 'Maintainable systems, clear collaboration and pragmatic delivery',
};

export const placeholderChecklist = [
  'Portrait and portrait alt text',
  'Professional biography',
  'Years of experience',
  'Availability statement',
  'Project descriptions, outcomes, links and screenshots',
  'Canonical domain and Open Graph image',
] as const;
