import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import * as router from 'react-router';
import ScreenFoods from '../../Pages/ScreenFoods';
import { renderWithRouter } from '../Render';
import { RecipeProvider } from '../../Search/Results';
import { fetchMockData } from '../../Mocks/RecipesMock';

global.fetch = vi.fn(fetchMockData) as unknown as any;

describe('Verifica se renderiza', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica meal', async () => {
    vi.spyOn(router, 'useParams').mockImplementation(() => ({ id: '00000' }));
    renderWithRouter(
      <RecipeProvider>
        <ScreenFoods />
      </RecipeProvider>,
      { initialEntries: ['/meals/00000'] },
    );
    expect(await screen.findByText(/side/i)).toBeInTheDocument();
  });
});
