import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Favorites, useRecipeContext } from '../../Search/Results';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

type CardProp = {
  i: number,
  recip: Favorites,
};

function FavoriteCard({ i, recip }: CardProp) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const urlRecipe = `http://localhost:3000/${recip.type}s/${recip.id}`;

  const handleShareButton = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  useEffect(() => {
    const favItmesLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    setFavoriteRecipes(favItmesLS);
  }, []);

  const handleFavoriteMeal = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === recip.id);

    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== recip.id);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }

    const updatedFavRecipes = [...favoriteRecipes, {
      id: recip.id,
      type: recip.type,
      nationality: recip.nationality,
      category: recip.category,
      alcoholicOrNot: recip.alcoholicOrNot,
      name: recip.name,
      image: recip.image,
    }];
    setFavoriteRecipes(updatedFavRecipes);

    setIsFavorite(true);

    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };

  const Recipe = favoriteRecipes.find((item) => item.id === recip.id);

  return (
    <div key={ i }>
      <div>
        <Link to={ urlRecipe }>
          <img
            data-testid={ `${i}-horizontal-image` }
            src={ recip.image }
            alt={ recip.name }
            width="100px"
          />
        </Link>
      </div>
      <div>
        <Link to={ urlRecipe }>
          <h3
            data-testid={ `${i}-horizontal-name` }
          >
            { recip.name }
          </h3>
        </Link>
        <p
          data-testid={ `${i}-horizontal-top-text` }
        >
          {
            recip.type === 'meal'
              ? `${recip.nationality} - ${recip.category}`
              : `${recip.category}`
          }
        </p>

        <div>
          {
            recip.type === 'drink'
              ? <p data-testid={ `${i}-horizontal-top-text` }>{ recip.alcoholicOrNot }</p>
              : null
          }
        </div>
      </div>
      <div>
        <button
          onClick={
                  () => handleShareButton(urlRecipe)
                }
        >
          { !linkCopied ? <img
            src={ shareIcon }
            alt="Botão de Compartilhamento"
            data-testid={ `${i}-horizontal-share-btn` }
          />
            : <span>Link copied!</span>}
        </button>

        <button
          onClick={ handleFavoriteMeal }
        >
          <img
            data-testid={ `${i}-horizontal-favorite-btn` }
            src={ Recipe ? blackHeartIcon : whiteHeartIcon }
            alt="Botão de dar Like em uma receita"
          />
        </button>
      </div>
    </div>

  );
}

export default FavoriteCard;
