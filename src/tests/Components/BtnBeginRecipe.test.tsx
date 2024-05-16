import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import { renderWithRouter } from '../Render';
import { fetchMockData } from '../../Mocks/RecipesMock';
import ScreenFoods from '../../Pages/ScreenFoods';
import ScreenDrinks from '../../Pages/ScreenDrinks';
import BtnBeginRecipe from '../../Components/BtnBeginRecipe';

const startRecipeBtn = 'start-recipe-btn';

global.fetch = vi.fn(fetchMockData) as unknown as any;

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  vi.spyOn(router, 'useParams').mockImplementation(() => ({ id: '00000' }));
});

const localStorageWithoutRecipeInProgress = {
  getItem: vi.fn(() => {
    return null;
  }),
};

const localStorageWithRecipeInProgress = {
  getItem: vi.fn((key) => {
    if (key === 'inProgressRecipes') {
      return JSON.stringify({ meals: { '00000': 'in-progress' } });
    }
    return null;
  }),
};

describe('ButtonRecipeStart', () => {
  it('Testa os eventos de clik na pagina meals', () => {
    renderWithRouter(<ScreenFoods />, {
      initialEntries: ['/meals/52977'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/00000/in-progress');
    });
  });

  it('Testa os eventos de clik na pagina drink', () => {
    renderWithRouter(<ScreenDrinks />, {
      initialEntries: ['/drinks/17222'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/17222/in-progress');
    });
  });
});

describe('ButtonRecipeStart', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageWithRecipeInProgress,
      writable: true,
    });
  });

  it('Testa se continuar receita esta funcionando e  direciona para a pagina meals', () => {
    render(<BtnBeginRecipe page="Meal" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/00000/in-progress');
    });
  });

  it('Testa se continuar receita esta funcionando e  direciona para a pagina drink', () => {
    render(<BtnBeginRecipe page="Drink" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/00000/in-progress');
    });
  });
});

describe('ButtonRecipeStart', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageWithoutRecipeInProgress,
      writable: true,
    });
  });

  it('Testa se o butao de iniciar aparece na tela', () => {
    render(<BtnBeginRecipe page="Meal" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Start Recipe');
  });
});
