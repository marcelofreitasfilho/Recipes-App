import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../Card/RecipeCard';

interface DrinkRecipeListProps {
  drinks: Array<{
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }>;
}

function DrinksDone({ drinks }: DrinkRecipeListProps) {
  const limitedRecipes = drinks.slice(0, 12);

  return (
    <div>
      {limitedRecipes.map((drink, index) => (
        <Link
          to={ `/drinks/${drink.idDrink}` }
          key={ drink.idDrink }
        >
          <div>
            <RecipeCard
              key={ drink.idDrink }
              index={ index }
              id={ drink.idDrink }
              name={ drink.strDrink }
              image={ drink.strDrinkThumb }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DrinksDone;
