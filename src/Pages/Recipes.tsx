import DrinksRecipe from './DrinksRecipes';
import FoodsRecipe from './FoodsRecipes';

function Recipes() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals' ? <FoodsRecipe /> : <DrinksRecipe /> }
    </div>
  );
}

export default Recipes;
