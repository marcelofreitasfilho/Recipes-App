import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import { ID_DRINKS_LINK } from '../Helpers/Links';
import { DrinkType,
  IngredientsType, DoneRecipesLocal, MakingRecipes } from '../Type/type';
import shareBtn from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { useRecipeContext } from '../Search/Results';

function MakingDrinks() {
  const { id } = useParams<{ id: string }>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [ischecked,
    setIschecked] = useState<MakingRecipes>({ meals: {}, drinks: {} });
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
  const [arrayTag, setArrayTag] = useState<string[]>([]);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleSaveInLocalStorage = async () => {
    const realDate = new Date().toISOString();
    const tagString = drinkRecipe?.strTags;
    let tagArray;
    if (tagString) {
      tagArray = tagString.split(',').map((tag) => tag.trim());
    }
    if (tagArray) {
      setArrayTag(tagArray);
    }
    const doneRecipe: DoneRecipesLocal = {
      id: drinkRecipe?.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkRecipe?.strCategory,
      alcoholicOrNot: drinkRecipe?.strAlcoholic,
      name: drinkRecipe?.strDrink,
      image: drinkRecipe?.strDrinkThumb,
      doneDate: realDate,
      tags: arrayTag,
    };
    const prevLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes') ?? '[]');
    localStorage.setItem('doneRecipes', JSON
      .stringify([...prevLocalStorage, doneRecipe]));
  };
  const fetchRecipe = async () => {
    const response = await fetchAPI(`${ID_DRINKS_LINK}${id}`);
    setDrinkRecipe(response.drinks[0]);
  };
  useEffect(() => {
    fetchRecipe();
    const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    if (localStorageIngredients) {
      setIschecked(JSON.parse(localStorageIngredients));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(ischecked));
  }, [ischecked]);
  useEffect(() => {
    const ingredientsArray = [];
    if (drinkRecipe) {
      const maxIngredientes = Object.keys(drinkRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = drinkRecipe[ingredientChave];
        const medida = drinkRecipe[medidaChave];
        if (medida && ingrediente) {
          const obj = {
            medida,
            ingrediente,
          };
          ingredientsArray.push(obj);
        }
      }
    }
    setIngredients(ingredientsArray);
    console.log(drinkRecipe);
  }, [drinkRecipe]);
  const handleShareBtn = () => {
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };
  const handleCheck = (i: number) => {
    const newCheckedIngredientsMap = { ...ischecked };
    if (drinkRecipe) {
      const recipeId = drinkRecipe.idDrink;
      if (!newCheckedIngredientsMap.drinks[recipeId]) {
        newCheckedIngredientsMap.drinks[recipeId] = [];
      }
      if (!newCheckedIngredientsMap.drinks[recipeId].includes(i)) {
        newCheckedIngredientsMap.drinks[recipeId].push(i);
      } else {
        const indexToRemove = newCheckedIngredientsMap.drinks[recipeId].indexOf(i);
        newCheckedIngredientsMap.drinks[recipeId].splice(indexToRemove, 1);
      }
      setIschecked(newCheckedIngredientsMap);
    }
  };
  const getCheckedStatus = (index: number) => {
    if (drinkRecipe && ischecked.drinks[drinkRecipe.idDrink]) {
      return ischecked.drinks[drinkRecipe.idDrink].includes(index);
    }
    return false;
  };
  useEffect(() => {
    const getFromLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (getFromLS) {
      setFavoriteRecipes(getFromLS);
      console.log(favoriteRecipes);
    }
  }, []);
  const handleFavoriteDrink = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === drinkRecipe?.idDrink);
    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== drinkRecipe?.idDrink);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }
    const updatedFavRecipes = [...favoriteRecipes, {
      id: drinkRecipe?.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkRecipe?.strCategory,
      alcoholicOrNot: drinkRecipe?.strAlcoholic,
      name: drinkRecipe?.strDrink,
      image: drinkRecipe?.strDrinkThumb,
    }];
    setFavoriteRecipes(updatedFavRecipes);
    setIsFavorite(true);
    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };
  const existingRecipe = favoriteRecipes.find((item) => item.id === drinkRecipe?.idDrink);
  return (
    <>
      <nav>
        <h1
          data-testid="recipe-category"
        >
          { drinkRecipe?.strCategory }
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
            onClick={ handleFavoriteDrink }
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
          src={ drinkRecipe?.strDrinkThumb }
          alt={ drinkRecipe?.strDrink }
        />
        <h2
          data-testid="recipe-title"
        >
          {drinkRecipe?.strDrink}
        </h2>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul
          style={ { listStyleType: 'none' } }
        >
          {ingredients.map((ingredient, i) => (
            <li key={ i }>
              <label
                htmlFor="ingredient"
                data-testid={ `${i}-ingredient-step` }
                key={ i }
                style={
                  getCheckedStatus(i)
                    ? { textDecoration: 'line-through solid rgb(0,0,0)' }
                    : undefined
                }
              >
                <input
                  style={ { marginRight: '10px', marginLeft: '-12px' } }
                  type="checkbox"
                  id="ingredient"
                  onChange={ () => handleCheck(i) }
                  checked={ getCheckedStatus(i) }
                />
                {`${ingredient.medida} of ${ingredient.ingrediente}`}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {drinkRecipe?.strInstructions}
        </p>
      </div>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          onClick={ handleSaveInLocalStorage }
          disabled={ !ingredients.every((ingredient, index) => getCheckedStatus(index)) }
        >
          Finish Recipe
        </button>
      </Link>
    </>
  );
}

export default MakingDrinks;
