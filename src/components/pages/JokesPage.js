import React, { useState } from 'react';
import { JokesList, JokesControl, JokePopUp } from '../index';
import { fetchJokes } from '../../api';
import { useSelector } from 'react-redux';

const ALL = 'ALL';

export default function JokesPage(props) {
  const [filter, setFilter] = useState(ALL);
  const jokes = useSelector((state) => state.jokes);

  const filterJokes = () =>
    filter === ALL ? jokes : jokes.filter((e) => e.category === filter);

  const getUniqueCategoris = () => [...new Set(jokes.map((e) => e.category))];

  return (
    <>
      <JokesControl
        fetchJokes={fetchJokes}
        jokesLength={jokes.length}
        setFilter={setFilter}
        categories={getUniqueCategoris()}
        all={ALL}
      />
      <JokesList jokes={filterJokes()} />
    </>
  );
}
