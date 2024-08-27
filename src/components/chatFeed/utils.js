import { faker } from '@faker-js/faker';

export const getNewMessage = () => ({
  id: faker.string.uuid(),
  body: faker.random.words(10),
  user: { name: faker.internet.userName() },
});

export const scrollToLast = (
  setIsProgrammaticScroll,
  programmaticScrollTimeoutRef
) => {
  const listContainer = document.querySelector('#list-container');

  clearTimeout(programmaticScrollTimeoutRef.current);
  setIsProgrammaticScroll(true);
  listContainer.lastChild.scrollIntoView({ behavior: 'smooth' });
  programmaticScrollTimeoutRef.current = setTimeout(
    () => setIsProgrammaticScroll(false),
    1000
  );
};
