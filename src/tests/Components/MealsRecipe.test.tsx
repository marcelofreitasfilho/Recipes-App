import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import { fetchMockData } from '../../Mocks/RecipesMock';
import RecipeList from '../../Components/MealsList';

global.fetch = vi.fn(fetchMockData) as unknown as any;

describe('Meals Recipe', () => {
  it('Testa se aparece a lista de receitas', () => {
    const recipes = [
      {
        idMeal: '1',
        strMeal: 'Recipe 1',
        strMealThumb: 'recipe1.jpg',
      },
      {
        idMeal: '2',
        strMeal: 'Recipe 2',
        strMealThumb: 'recipe2.jpg',
      },
    ];

    render(
      <Router>
        <RecipeList recipes={ recipes } />
      </Router>,
    );

    const recipeLinks = screen.getAllByRole('link');

    expect(recipeLinks).toHaveLength(2);

    expect(recipeLinks[0]).toHaveAttribute('href', '/meals/1');
    expect(recipeLinks[0]).toHaveTextContent('Recipe 1');
    expect(recipeLinks[1]).toHaveAttribute('href', '/meals/2');
    expect(recipeLinks[1]).toHaveTextContent('Recipe 2');
  });
});
