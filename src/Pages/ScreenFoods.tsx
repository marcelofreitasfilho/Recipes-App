import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import { DRINKS_LINK, ID_MEALS_LINK } from '../Helpers/Links';
import { useRecipeContext, Drink } from '../Search/Results';
import DrinksCard from '../Components/Card/DrinkCard';
import shareBtn from '../images/shareBtn.svg';
import { MealType } from '../Type/type';
import BtnBeginRecipe from '../Components/BtnBeginRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function ScreenFoods() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = window.location.href;
  const [drinkRecommendations, setDrinkRecommendations] = useState<Drink[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRecommendations = async () => {
    const response = await fetchAPI(DRINKS_LINK);
    setDrinkRecommendations(response.drinks);
  };

  const fetchRecipe = async () => {
    const response = await fetchAPI(`${ID_MEALS_LINK}${id}`);
    setMealRecipe(response.meals[0]);
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    const ingredientsArray = [] as string[];
    if (mealRecipe) {
      const maxIngredientes = Object.keys(mealRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = mealRecipe[ingredientChave];
        const medida = mealRecipe[medidaChave];

        if (medida && ingrediente) {
          ingredientsArray.push(`${medida} of ${ingrediente}`);
        }
      }
    }
    setIngredients(ingredientsArray);
  }, [mealRecipe]);

  useEffect(() => {
    const getFromLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);

    if (getFromLS) {
      setFavoriteRecipes(getFromLS);
    }
  }, []);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const handleFavoriteMeal = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === mealRecipe?.idMeal);
    console.log(checkFav, mealRecipe?.idMeal);

    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== mealRecipe?.idMeal);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }

    const updatedFavRecipes = [...favoriteRecipes, {
      id: mealRecipe?.idMeal,
      type: 'meal',
      nationality: mealRecipe?.strArea,
      category: mealRecipe?.strCategory,
      alcoholicOrNot: '',
      name: mealRecipe?.strMeal,
      image: mealRecipe?.strMealThumb,
    }];
    setFavoriteRecipes(updatedFavRecipes);

    setIsFavorite(true);

    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };

  const existingRecipe = favoriteRecipes.find((item) => item.id === mealRecipe?.idMeal);

  return (
    <>
      <nav>
        <h1
          data-testid="recipe-category"
        >
          { mealRecipe?.strCategory }
        </h1>
        <div>
          <button
            data-testid="share-btn"
            onClick={ () => handleShareBtn() }
          >
            { !linkCopied ? <img src={ shareBtn } alt="Botão de Compartilhamento" />
              : <span>Link copied!</span>}
          </button>
          <button
            onClick={ handleFavoriteMeal }
          >
            <img
              data-testid="favorite-btn"
              src={ existingRecipe ? blackHeartIcon : whiteHeartIcon }
              alt="Botão de dar Like em uma receita"
            />
          </button>
        </div>
      </nav>
      <div>
        <img
          data-testid="recipe-photo"
          src={ mealRecipe?.strMealThumb }
          alt={ mealRecipe?.strMeal }
        />
        <h2
          data-testid="recipe-title"
        >
          { mealRecipe?.strMeal }
        </h2>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          { mealRecipe?.strInstructions }

        </p>
      </div>
      <h3>Video</h3>
      <div>
        { mealRecipe?.strYoutube ? <iframe title="recipe video" data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${mealRecipe?.strYoutube.split('=')[1]}` } /> : null }
      </div>
      <div>
        <h3>Recommendations</h3>
        <div>
          {drinkRecommendations.slice(0, 6).map((recommendation, index) => (
            <DrinksCard
              key={ recommendation.idDrink }
              recommendation={ recommendation }
              index={ index }
              image={ recommendation.strDrinkThumb }
            />
          ))}
        </div>
      </div>
      <BtnBeginRecipe page="Meal" recipeId={ id } />
    </>
  );
}

export default ScreenFoods;
