import ScreenDrinks from './ScreenDrinks';
import ScreenFoods from './ScreenFoods';

function MakingRecipe() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals/:id' ? <ScreenFoods /> : <ScreenDrinks /> }
    </div>
  );
}

export default MakingRecipe;
