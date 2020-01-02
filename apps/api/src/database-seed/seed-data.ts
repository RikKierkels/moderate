import { TagEntity, UserEntity } from '../app/database/database-entities';

export const tagsToSeed: Partial<TagEntity>[] = [
  { name: 'Backend', color: '#000000' },
  { name: 'Frontend', color: '#29abe2' },
  { name: 'Full Stack', color: '#00d2ba' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'React', color: '#f1e05a' },
  { name: 'Vue.js', color: '#41B783' }
];

export const usersToSeed: Partial<UserEntity>[] = [
  { id: 'github:1' },
  { id: 'github:2' },
  { id: 'github:3' },
  { id: 'github:4' },
  { id: 'github:5' },
  { id: 'github:6' }
];
