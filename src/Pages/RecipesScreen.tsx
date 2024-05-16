import MainScreenDrink from './ScreenDrinks';
import MainScreenFood from './ScreenFoods';

function RecipeScreen() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals/:id' ? <MainScreenFood /> : <MainScreenDrink /> }
    </div>
  );
}

export default RecipeScreen;
