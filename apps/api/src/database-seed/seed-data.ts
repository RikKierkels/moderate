import { TagEntity, UserEntity } from '../app/database/database-entities';

export const tagsToSeed: Partial<TagEntity>[] = [
  { name: 'Backend', color: '#000000' },
  { name: 'Frontend', color: '#29abe2' },
  { name: 'Full Stack', color: '#00d2ba' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'React', color: '#f1e05a' },
  { name: 'Vue.js', color: '#41B783' }
];

// TODO: Generate data with Faker.
export const usersToSeed: Partial<UserEntity>[] = [
  {
    id: 'github:1',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  },
  {
    id: 'github:2',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  },
  {
    id: 'github:3',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  },
  {
    id: 'github:4',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  },
  {
    id: 'github:5',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  },
  {
    id: 'github:6',
    username: 'John Doe',
    picture: 'https://avatars2.githubusercontent.com/u/9414573?v=4'
  }
];
