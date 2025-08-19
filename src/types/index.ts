export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Sales' | 'GTM' | 'Platforms' | 'AI';
  proficiency: number;
  description?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  skills: string[];
  featured?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}