import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoriteCard from '../../../Components/Card/FavoriteCard';
import { RecipeContextProviderTest } from '../../TestProps';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <RecipeContextProviderTest>{children}</RecipeContextProviderTest>
    </Router>
  );
}

test('Testa se a pagina contem um card de receitas favoritas', () => {
  const recipe = {
    id: '1',
    type: 'meal',
    nationality: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    name: 'Spaghetti',
    image: 'spaghetti.jpg',
  };

  render(
    <Wrapper>
      <FavoriteCard i={ 0 } recip={ recipe } />
    </Wrapper>,
  );

  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spaghetti');
});

test('Testa se a pagina tem um card de drinks favoritos', () => {
  const recipe = {
    id: '2',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'margarita.jpg',
  };

  render(
    <Wrapper>
      <FavoriteCard i={ 0 } recip={ recipe } />
    </Wrapper>,
  );

  const topTextElements = screen.getAllByTestId('0-horizontal-top-text');

  expect(topTextElements.length).toBeGreaterThanOrEqual(2);

  topTextElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

test('Testa se a pagina remove a receita favorita quando clicamos no remove', () => {
  const recipe = {
    id: '4',
    type: 'drink',
    category: 'Cocktail',
    nationality: 'Italian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Mojito',
    image: 'mojito.jpg',
  };

  render(
    <Wrapper>
      <FavoriteCard i={ 0 } recip={ recipe } />
    </Wrapper>,
  );

  const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');

  expect(favoriteButton).toBeInTheDocument();

  favoriteButton.click();

  expect(screen.getByTestId('0-horizontal-favorite-btn')).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
});
