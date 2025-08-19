import { Profile, Experience, Skill, Award, Certification } from '@/types';

import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import awardsData from '@/data/awards.json';
import certificationsData from '@/data/certifications.json';

export const getProfile = (): Profile => profileData as Profile;

export const getExperience = (): Experience[] => experienceData as Experience[];

export const getSkills = (): Skill[] => skillsData as Skill[];

export const getSkillsByCategory = (category: string): Skill[] => 
  skillsData.filter(skill => skill.category === category) as Skill[];

export const getAwards = (): Award[] => awardsData as Award[];

export const getCertifications = (): Certification[] => certificationsData as Certification[];

export const getCurrentRole = (): Experience | null => {
  const experience = getExperience();
  return experience.find(exp => exp.endDate === null) || experience[0] || null;
};

export const getYearsOfExperience = (): number => {
  const experience = getExperience();
  if (experience.length === 0) return 0;
  
  const oldestRole = experience[experience.length - 1];
  const startYear = new Date(oldestRole.startDate).getFullYear();
  const currentYear = new Date().getFullYear();
  
  return currentYear - startYear;
};