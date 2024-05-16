import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Components/Done/DoneRecipes';
import FavoritsRecipes from './Pages/FavoritsRecipes';
import Recipes from './Pages/Recipes';
// import RecipeDetails from './pages/RecipeDetails';
// import RecipeInProgress from './pages/RecipeInProgress';
import ScreenFoods from './Pages/ScreenFoods';
import ScreenDrinks from './Pages/ScreenDrinks';
import MakingDrinks from './Doing/MakingDrinks';
import MakingMeals from './Doing/MakingMeals';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <ScreenFoods /> } />
      <Route path="/drinks/:id" element={ <ScreenDrinks /> } />
      <Route path="/meals/:id/in-progress" element={ <MakingMeals /> } />
      <Route path="/drinks/:id/in-progress" element={ <MakingDrinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoritsRecipes /> } />
    </Routes>
  );
}

export default App;
