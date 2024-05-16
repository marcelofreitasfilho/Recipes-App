import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
} from '../API';
import { useRecipeContext } from '../Search/Results';

type SearchType = 'ingredient' | 'name' | 'first-letter';

function SearchBar() {
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { setDrinkResults, setMealResults } = useRecipeContext();
  const location = useLocation();

  const navigate = useNavigate();
  const FIRST_LETTER = 'first-letter';
  const isDrinksPage = location.pathname.includes('/drinks');

  const fetchRecipeData = async (fetchFunction: () => Promise<Response>) => {
    try {
      const response = await fetchFunction();
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isInvalidFirstLetterSearch = () => {
    return searchType === FIRST_LETTER && searchQuery.length !== 1;
  };

  const shouldShowNoResultsAlert = (jsonData: any) => {
    return (
      (!jsonData.meals || !Array.isArray(jsonData.meals) || jsonData.meals.length === 0)
      && (!jsonData.drinks || !Array
        .isArray(jsonData.drinks) || jsonData.drinks.length === 0)
    );
  };

  const updateResults = (jsonData: any) => {
    if (isDrinksPage) {
      setDrinkResults(jsonData.drinks || []);
      setMealResults([]);
    } else {
      setMealResults(jsonData.meals || []);
      setDrinkResults([]);
    }
  };

  const handleSearch = async () => {
    const fetchFunction = determineFetchFunction();
    const jsonData = await fetchRecipeData(fetchFunction);

    if (isInvalidFirstLetterSearch()) {
      alert('Your search must have only 1 (one) character');
      return;
    }

    if (shouldShowNoResultsAlert(jsonData)) {
      alert("Sorry, we haven't found any recipes for these filters.");
      return;
    }

    updateResults(jsonData);

    if (jsonData.meals?.length === 1) {
      const recipeId = jsonData.meals[0].idMeal;
      navigate(`/meals/${recipeId}`);
    } else if (jsonData.drinks?.length === 1) {
      const recipeId = jsonData.drinks[0].idDrink;
      navigate(`/drinks/${recipeId}`);
    }
  };

  const determineFetchFunction = () => {
    if (isDrinksPage) {
      if (searchType === 'ingredient') {
        return () => fetchDrinksByIngredient(searchQuery);
      } if (searchType === 'name') {
        return () => fetchDrinksByName(searchQuery);
      } if (searchType === FIRST_LETTER) {
        return () => fetchDrinksByFirstLetter(searchQuery);
      }
    } else {
      if (searchType === 'ingredient') {
        return () => fetchMealsByIngredient(searchQuery);
      } if (searchType === 'name') {
        return () => fetchMealsByName(searchQuery);
      } if (searchType === FIRST_LETTER) {
        return () => fetchMealsByFirstLetter(searchQuery);
      }
    }
    throw new Error('Invalid search type');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          data-testid="search-input"
          value={ searchQuery }
          onChange={ (e) => setSearchQuery(e.target.value) }
        />
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="search-type"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'ingredient' }
            onChange={ () => setSearchType('ingredient') }
          />
          Ingrediente
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="name"
            data-testid="name-search-radio"
            checked={ searchType === 'name' }
            onChange={ () => setSearchType('name') }
          />
          Nome
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="first-letter"
            data-testid="first-letter-search-radio"
            checked={ searchType === FIRST_LETTER }
            onChange={ () => setSearchType(FIRST_LETTER) }
          />
          Primeira Letra
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
