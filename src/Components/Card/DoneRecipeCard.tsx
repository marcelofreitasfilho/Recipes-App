import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesLocal } from '../../Type/type';
import shareIcon from '../../images/shareIcon.svg';

type CardProp = {
  i: number,
  recipe: DoneRecipesLocal,
};

function DoneRecipesCard({ recipe, i }: CardProp) {
  const [linkCopied, setLinkCopied] = useState(false);
  const urlRecipe = `http://localhost:3000/${recipe.type}s/${recipe.id}`;

  const copyToClipboard = (currentUrl:string) => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  return (
    <div>
      <Link to={ urlRecipe }>
        <div>
          <img
            width="100px"
            data-testid={ `${i}-horizontal-image` }
            src={ recipe.image }
            alt="foto da comida"
          />
        </div>
      </Link>
      <div>
        <Link
          to={ urlRecipe }
        >
          <h1 data-testid={ `${i}-horizontal-name` }>
            { recipe.name }
          </h1>
        </Link>
        {recipe.type === 'drink'
          ? <p data-testid={ `${i}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
          : null}
        {recipe.type === 'meal' && (
          <>
            <p data-testid={ `${i}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
            {recipe.tags?.map((tag, ind) => (
              <li
                key={ ind }
                data-testid={ `0-${tag}-horizontal-tag` }
              >
                {tag}
              </li>
            ))}
          </>
        )}
        <p data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</p>
        <button
          onClick={ () => copyToClipboard(urlRecipe) }
        >
          { !linkCopied
            ? <img
                src={ shareIcon }
                data-testid={ `${i}-horizontal-share-btn` }
                alt="Botão de Compartilhamento"
            />
            : <span>Link copied!</span>}
        </button>
      </div>
    </div>
  );
}

export default DoneRecipesCard;
