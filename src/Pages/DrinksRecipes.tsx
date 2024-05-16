import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useRecipeContext } from '../Search/Results';
import DrinksList from '../Components/DriksList';
import Footer from './Footer';
import { fetchAPI } from '../Helpers/FetchAPI';
import { CATEGORY_DRINKS_LINK, FILTER_DRINKS_LINK } from '../Helpers/Links';
import { CategoryType } from '../Type/type';

function DrinksRecipe() {
  const { drinkResults, updateDrinkState, fetchDrinks } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [checkCategory, setCheckCategory] = useState('');

  const fetchCategory = async () => {
    const response = await fetchAPI(CATEGORY_DRINKS_LINK);
    setCategories(response.drinks);
  };

  const fetchFilteredMeals = async (category: string) => {
    setCheckCategory(category);
    if (category === checkCategory) {
      fetchDrinks();
      setCheckCategory('');
    } else {
      const response = await fetchAPI(`${FILTER_DRINKS_LINK}${category}`);
      const data = response.drinks;
      updateDrinkState(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header title="Drinks" iconProfile iconSearch />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchDrinks() }
        >
          All
        </button>
        { categories.map((category, i) => (
          i < 5 && (
            <button
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => fetchFilteredMeals(category.strCategory) }
            >
              { category.strCategory }
            </button>
          )))}
      </div>
      {drinkResults.length > 0 ? (
        <DrinksList drinks={ drinkResults } />
      ) : (
        <p>Nenhum resultado encontrado para bebidas.</p>
      )}
      <Footer />
    </>
  );
}

export default DrinksRecipe;
