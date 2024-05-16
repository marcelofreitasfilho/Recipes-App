import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import headerIMG from '../images/Header.png';
import SearchBar from './SearchBar';

type PropType = {
  title: string;
  iconSearch: boolean;
  iconProfile: boolean;
};

function Header({ title, iconSearch, iconProfile }: PropType) {
  const [showSideBar, setShowSideBar] = useState(false);
  const showSideBarElement = () => (showSideBar === false
    ? setShowSideBar(true) : setShowSideBar(false));

  const isDrinksPage = title.toUpperCase() === 'DRINKS';
  const isMealsPage = title.toUpperCase() === 'MEALS';

  return (
    <>
      <header>
        <div>
          <img
            src={ headerIMG }
            alt="Recipe Icon"
            style={ {
              width: '150px',
            } }
          />
          <span>
            <em>e-Cook</em>
            {' '}
            <strong>app</strong>
          </span>

        </div>
        <div>
          {iconProfile === true && (
            <Link to="/profile">
              <img
                src={ profileIcon }
                alt="ícone de perfil"
                style={ { color: 'blue' } }
                data-testid="profile-top-btn"
              />
            </Link>
          )}
          {iconSearch === true && (
            <button
              type="submit"
              onClick={ showSideBarElement }
            >
              <img
                className="searchIcon"
                src={ searchIcon }
                alt="ícone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </header>
      {showSideBar === true && (<SearchBar />)}
      <div>
        <h1 data-testid="page-title">
          {title}
        </h1>
        <div>
          {isDrinksPage && <img src={ drinkIcon } alt="ícone de drinks" />}
          {isMealsPage && <img src={ mealIcon } alt="ícone de meals" />}
        </div>
      </div>
    </>
  );
}

export default Header;
