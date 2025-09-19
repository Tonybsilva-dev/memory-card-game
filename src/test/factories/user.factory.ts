import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const createUser = (overrides?: Partial<User>): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  ...overrides,
});

export const createUsers = (count: number, overrides?: Partial<User>): User[] =>
  Array.from({ length: count }, () => createUser(overrides));
