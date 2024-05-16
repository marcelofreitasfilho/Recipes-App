import React from 'react';
import { Meal } from '../../Search/Results';

interface CardMealsProps {
  recipe: Meal;
  image: string;
  index: number;
}

function MealsCard({ recipe, index, image }: CardMealsProps) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        src={ image }
        alt={ recipe.strMeal }
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h3>
    </div>
  );
}

export default MealsCard;
