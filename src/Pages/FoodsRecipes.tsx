import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import MealsDone from '../Components/Done/MealsDone';
import { useRecipeContext } from '../Search/Results';
import { fetchAPI } from '../Helpers/FetchAPI';
import { CategoryType } from '../Type/type';
import { CATEGORY_MEALS_LINK, FILTER_MEALS_LINK } from '../Helpers/Links';

function FoodsRecipe() {
  const { mealResults, updateMealState, fetchMeals } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [checkCategory, setCheckCategory] = useState('');

  const fetchCategory = async () => {
    const response = await fetchAPI(CATEGORY_MEALS_LINK);
    setCategories(response.meals);
  };

  const fetchFilteredMeals = async (category: string) => {
    setCheckCategory(category);
    if (category === checkCategory) {
      fetchMeals();
      setCheckCategory('');
    } else {
      const response = await fetchAPI(`${FILTER_MEALS_LINK}${category}`);
      const data = response.meals;
      updateMealState(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header title="Meals" iconProfile iconSearch />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchMeals() }
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
      {mealResults.length > 0 ? (
        <MealsDone recipes={ mealResults } />
      ) : (
        <p>Nenhum resultado encontrado para comidas.</p>
      )}
      <Footer />
    </>
  );
}

export default FoodsRecipe;
