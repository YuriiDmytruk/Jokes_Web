import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import JokesPagination from '../../components/JokesPagination';

import { jokesReducer } from '../../redux/ducks/jokes';
import { JokesPaginationProps } from '../../types';

test('should render JokesList component and match snapshot', () => {
  const store = createStore(jokesReducer, { jokes: [] });

  const props: JokesPaginationProps = {
    setPage: () => {},
    jokesLength: 0,
    JOKES_ON_PAGE: 12,
    page: 1,
  };

  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <JokesPagination
          setPage={props.setPage}
          jokesLength={props.jokesLength}
          JOKES_ON_PAGE={props.JOKES_ON_PAGE}
          page={props.page}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
