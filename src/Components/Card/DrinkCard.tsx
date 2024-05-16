import React from 'react';
import { Drink } from '../../Search/Results';

interface CardDrinkProps {
  recommendation: Drink;
  image: string;
  index: number;
}

function DrinkCard({ recommendation,
  index, image }: CardDrinkProps) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        src={ image }
        alt={ recommendation.strDrink }
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recommendation.strDrink}</h3>
    </div>
  );
}

export default DrinkCard;
