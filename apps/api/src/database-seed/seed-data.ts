import { TagEntity } from '../app/database/database-entities';

export const tagsToSeed: Partial<TagEntity>[] = [
  { name: 'Backend', color: '#000000' },
  { name: 'Frontend', color: '#29abe2' },
  { name: 'Full Stack', color: '#00d2ba' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'React', color: '#f1e05a' },
  { name: 'Vue.js', color: '#41B783' }
];
