import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import FoodsRecipe from '../../Pages/FoodsRecipes';
import { renderWithRouter } from '../Render';
import { RecipeProvider } from '../../Search/Results';
import Profile from '../../Pages/Profile';
import { fetchMockData } from '../../Mocks/RecipesMock';

global.fetch = vi.fn(fetchMockData) as unknown as any;

test('Testa se aparece na tela a lista de receitas por categoria', async () => {
  renderWithRouter(
    <RecipeProvider>
      <FoodsRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
});

test('Testa se quando clica em all aparece todas as receitas', async () => {
  renderWithRouter(
    <RecipeProvider>
      <FoodsRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  const allButton = screen.getByTestId('All-category-filter');
  expect(allButton).toBeInTheDocument();

  fireEvent.click(allButton);
});

test('Testa se aparece a mensagem de receita não encontrada', async () => {
  const emptyResults = {
    meals: [],
  };

  renderWithRouter(
    <RecipeProvider>
      <FoodsRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  const noResultsMessage = screen.getByText('Nenhum resultado encontrado para comidas.');
  expect(noResultsMessage).toBeInTheDocument();
});

test('Testa se limpa o local storage quando clica em login ou logout', () => {
  const mockUser = { email: 'test@example.com' };
  localStorage.setItem('user', JSON.stringify(mockUser));

  renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

  const logoutButton = screen.getByTestId('profile-logout-btn');
  fireEvent.click(logoutButton);

  waitFor(() => {
    expect(localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toBe('/');
  });
});
