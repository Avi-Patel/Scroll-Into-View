import { faker } from '@faker-js/faker';

export const getNewMessage = () => ({
  id: faker.string.uuid(),
  body: faker.random.words(10),
  user: { name: faker.internet.userName() },
});
