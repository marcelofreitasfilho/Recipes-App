import React from 'react';
import { render } from '@testing-library/react';
import DrinkCard from '../../../Components/Card/DrinkCard';
import MealsCard from '../../../Components/Card/MealsCard';

describe('Recomendation cards', () => {
  test('Testa se a pagina Card Drinks tem um titulo e uma imagem', () => {
    const recommendation = {
      idDrink: '1',
      strDrink: 'Test Drink',
      strDrinkThumb: 'test-image.jpg',
    };
    const { getByTestId } = render(
      <DrinkCard
        recommendation={ recommendation }
        index={ 0 }
        image="test-image.jpg"
      />,
    );

    const recommendationCard = getByTestId('0-recommendation-card');
    const recommendationTitle = getByTestId('0-recommendation-title');

    expect(recommendationCard).toBeInTheDocument();
    expect(recommendationTitle).toBeInTheDocument();
    expect(recommendationTitle.textContent).toBe('Test Drink');
  });

  test('Testa se a pagina Card Meals tem um titulo e uma imagem ', () => {
    const recipe = {
      idMeal: '1',
      strMeal: 'Test Meal',
      strMealThumb: 'test-image.jpg',
    };
    const { getByTestId } = render(
      <MealsCard
        recipe={ recipe }
        index={ 0 }
        image="test-image.jpg"
      />,
    );
    const recommendationCard = getByTestId('0-recommendation-card');
    const recommendationTitle = getByTestId('0-recommendation-title');

    expect(recommendationCard).toBeInTheDocument();
    expect(recommendationTitle).toBeInTheDocument();
    expect(recommendationTitle.textContent).toBe('Test Meal');
  });
});
