import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { JokesControl, JokesList, JokesPagination } from '../components/index';
import { StyledJokesPage } from '../styled/JokesPage';

import { JOKES } from '../redux/ducks/jokes';
import { Joke } from '../types';

const ALL = 'ALL';
const JOKES_ON_PAGE = 12;

const JokesPage = (): JSX.Element => {
  const [filter, setFilter] = useState<string>(ALL);
  const [page, setPage] = useState<number>(1);
  const jokes: Joke[] = useSelector((state: any) => state.jokes) ?? [];

  useEffect(() => {
    localStorage.setItem(JOKES, JSON.stringify(jokes));
  }, [jokes]);

  const filterJokes = (): Joke[] =>
    filter === ALL
      ? jokes
      : jokes.filter((joke: Joke) => joke.category === filter);

  const getUniqueCategories = (): string[] =>
    Array.from(new Set(jokes.map((joke: Joke) => joke.category)));

  const pageJokes = (filteredJokes: Joke[]): Joke[] => {
    const dividedArrays = [];
    for (let i = 0; i < filteredJokes.length; i += JOKES_ON_PAGE) {
      const chunk = filteredJokes.slice(i, i + JOKES_ON_PAGE);
      dividedArrays.push(chunk);
    }
    if (!dividedArrays[page - 1]) {
      if (page !== 1) {
        setPage(page - 1);
        return [];
      }
    }
    return dividedArrays[page - 1] || [];
  };

  return (
    <StyledJokesPage>
      <JokesControl
        jokesLength={jokes.length}
        setFilter={setFilter}
        categories={getUniqueCategories()}
        jokesLastID={
          jokes.length === 0 ? 0 : Math.max(...jokes.map((joke) => joke.id)) + 1
        }
        all={ALL}
        setPage={setPage}
      />
      <JokesList jokes={pageJokes(filterJokes())} />
      <JokesPagination
        page={page}
        jokesLength={filterJokes().length}
        setPage={setPage}
        JOKES_ON_PAGE={JOKES_ON_PAGE}
      />
    </StyledJokesPage>
  );
};

export default JokesPage;
