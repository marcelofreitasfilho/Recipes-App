import { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../Components/Card/FavoriteCard';
import Header from './Header';
import { Favorites, useRecipeContext } from '../Search/Results';

function FavoritsRecipes() {
  const [favsList, setFavsList] = useState<Favorites[]>([]);
  const [filteredFavsList, setFilteredFavsList] = useState<Favorites[]>([]);
  const { favoriteRecipes } = useRecipeContext();

  useEffect(() => {
    const favItmesLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    setFavsList(favItmesLS);
    setFilteredFavsList(favItmesLS);
  }, [favoriteRecipes]);

  const filterRecipes = (recipeType: string) => {
    if (recipeType === 'all') {
      setFilteredFavsList(favsList);
    } else {
      const filteredRecipes = favsList.filter((recipe) => recipe.type === recipeType);
      setFilteredFavsList(filteredRecipes);
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" iconSearch={ false } iconProfile />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      { filteredFavsList
        ? filteredFavsList.map((recipe, i) => (
          <FavoriteRecipeCard key={ i } i={ i } recip={ recipe } />
        ))
        : <h3>Nenhuma receita adicionada aos favoritos.</h3> }
    </>
  );
}

export default FavoritsRecipes;
