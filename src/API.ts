const BASE_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1';

export type FetchFunction = () => Promise<Response>;
export function fetchMealsByIngredient(ingredient: string): Promise<Response> {
  const url = `${BASE_URL_MEALS}/filter.php?i=${ingredient}`;
  return fetch(url);
}

export function fetchMealsByName(name: string): Promise<Response> {
  const url = `${BASE_URL_MEALS}/search.php?s=${name}`;
  return fetch(url);
}

export function fetchMealsByFirstLetter(letter: string): Promise<Response> {
  const url = `${BASE_URL_MEALS}/search.php?f=${letter}`;
  return fetch(url);
}

export function fetchDrinksByIngredient(ingredient: string): Promise<Response> {
  const url = `${BASE_URL_DRINKS}/filter.php?i=${ingredient}`;
  return fetch(url);
}

export function fetchDrinksByName(name: string): Promise<Response> {
  const url = `${BASE_URL_DRINKS}/search.php?s=${name}`;
  return fetch(url);
}

export function fetchDrinksByFirstLetter(letter: string): Promise<Response> {
  const url = `${BASE_URL_DRINKS}/search.php?f=${letter}`;
  return fetch(url);
}
