import { firstMealMock } from './FirstMealMock';
import { mealsMock, drinksMock } from './DrinksandMealsMock';
import { drinkAqua } from './drinkAqua';

export const beefMeals = {
  meals: [
    {
      strMeal: 'Beef and Mustard Pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
      idMeal: '52874',
    },
    {
      strMeal: 'Beef and Oyster pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
      idMeal: '52878',
    },
  ],
};

export const chickenMeals = {
  meals: [
    {
      strMeal: 'Brown Stew Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
      idMeal: '52940',
    },
    {
      strMeal: 'Chicken & mushroom Hotpot',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      idMeal: '52846',
    },
  ],
};

export const dessertMeals = {
  meals: [
    {
      strMeal: 'Apple & Blackberry Crumble',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
      idMeal: '52893',
    },
    {
      strMeal: 'Apple Frangipan Tart',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      idMeal: '52768',
    },
  ],
};

export const ordinaryDrinks = {
  drinks: [
    {
      strDrink: '410 Gone',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xtuyqv1472669026.jpg',
      idDrink: '13581',
    },
    {
      strDrink: '50/50',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wwpyvr1461919316.jpg',
      idDrink: '14598',
    },
  ],
};

export const cocktailDrinks = {
  drinks: [
    {
      strDrink: '155 Belmont',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg',
      idDrink: '15346',
    },
    {
      strDrink: '747 Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
      idDrink: '178318',
    },
  ],
};

export const milkDrinks = {
  drinks: [
    {
      strDrink: 'Avalanche',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/uppqty1472720165.jpg',
      idDrink: '16419',
    },
    {
      strDrink: 'Baby Eskimo',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wywrtw1472720227.jpg',
      idDrink: '15511',
    },
  ],
};

const drinkCategories = {
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Shake',
    },
    {
      strCategory: 'Other/Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
  ],
};

export const mealCategories = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
  ],
};

export const fetchMockData = (url: string) => Promise.resolve(
  {
    status: 200,
    ok: true,
    json: () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve(mealCategories);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve(drinkCategories);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
        return Promise.resolve(beefMeals);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') {
        return Promise.resolve(chickenMeals);
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
        return Promise.resolve(dessertMeals);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
        return Promise.resolve(ordinaryDrinks);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') {
        return Promise.resolve(cocktailDrinks);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') {
        return Promise.resolve(milkDrinks);
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve(drinksMock);
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve(mealsMock);
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=00000') {
        return Promise.resolve(firstMealMock);
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=00000') {
        return Promise.resolve(drinkAqua);
      }

      console.log('url não encontrada no mock', url);
    },
  },
);
