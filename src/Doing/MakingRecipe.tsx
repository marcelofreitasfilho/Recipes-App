import MakingDrinks from './MakingDrinks';
import MakingMeals from './MakingMeals';

function RecipeInProgress() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals/:id-da-receita/in-progress'
        ? <MakingMeals /> : <MakingDrinks /> }
    </div>
  );
}

export default RecipeInProgress;
