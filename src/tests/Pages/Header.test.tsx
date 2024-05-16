import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from '../Render';
import { fetchMockData } from '../../Mocks/RecipesMock';
import App from '../../App';
import Header from '../../Pages/Header';

global.fetch = vi.fn(fetchMockData) as unknown as any;

describe('Testa se o header renderiza corretamente os elementos', () => {
  test('Testa toddos os elementos do header', () => {
    renderWithRouter(<Header title="" iconSearch iconProfile />);
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });

  test('Testa se a page FoodsRecipes renderiza corretamente', () => {
    renderWithRouter(<Header title="Meals" iconSearch iconProfile />);
    const title = screen.getByText(/Meals/i);
    expect(title).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('Testa se a page DrinksRecipes renderiza corretamente', () => {
    renderWithRouter(<Header title="Drinks" iconSearch iconProfile />);
    const titleDrink = screen.getByText(/Drinks/i);
    expect(titleDrink).toBeInTheDocument();
    expect(screen.getByAltText('ícone de perfil')).toBeInTheDocument();
  });

  test('Testa se a page FavoritsRecipes renderiza corretamente', () => {
    renderWithRouter(<Header title="Favorite Recipes" iconSearch={ false } iconProfile />);
    const title = screen.getByText(/Favorite Recipes/i);
    expect(title).toBeInTheDocument();
  });

  test('Testa a renderização do header a partir da ação do app', async () => {
    renderWithRouter(<App />);
    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, 'test@test.co');
    await userEvent.type(passwordInput, 'sdwsdasd12!');
    expect(loginButton).not.toBeDisabled();

    await userEvent.click(loginButton);
    expect(screen.getByAltText('ícone de pesquisa')).toBeInTheDocument();
    expect(screen.getByAltText('ícone de perfil')).toBeInTheDocument();

    const searchButton = screen.getByAltText('ícone de pesquisa');
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(searchButton);
    expect(screen.getByText(/ingrediente/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    await userEvent.click(searchButton);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
