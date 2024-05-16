import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesLocal } from '../../Type/type';
import Footer from '../../Pages/Footer';
import Header from '../../Pages/Header';
import shareIcon from '../../images/shareIcon.svg';
import DoneRecipeCard from '../Card/DoneRecipeCard';

function DoneRecipes() {
  const [recipeList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const [filterList, setFilterList] = useState([] as DoneRecipesLocal[]);

  const filterRecipes = (recipeType: string) => {
    if (recipeType === 'all') {
      setFilterList(recipeList);
    } else {
      const filteredRecipes = recipeList.filter((recipe) => recipe.type === recipeType);
      setFilterList(filteredRecipes);
    }
  };

  useEffect(() => {
    const storageDoneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes') as string);
    setRecipeList(storageDoneRecipes);
    setFilterList(storageDoneRecipes);
  }, []);

  return (
    <>
      <Header title="Done Recipes" iconSearch={ false } iconProfile />
      <div>
        <button
          onClick={ () => filterRecipes('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => filterRecipes('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => filterRecipes('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      { recipeList
        ? filterList.map((recipe, i) => (
          <DoneRecipeCard key={ i } recipe={ recipe } i={ i } />
        ))
        : <h3>Nenhuma receita encontrada</h3> }
      <Footer />
    </>
  );
}

export default DoneRecipes;
