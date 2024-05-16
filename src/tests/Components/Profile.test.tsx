import React from 'react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../Render';
import Profile from '../../Pages/Profile';

describe('Profile screen', () => {
  it('Testa validação do email', () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const emailElement = screen.getByTestId('profile-email');
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(emailElement).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('Testa se vai para a tela de receitas prontas', async () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const doneButton = screen.getByTestId('profile-done-btn');
    await userEvent.click(doneButton);

    waitFor(() => {
      expect(window.location.pathname).toBe('/done-recipes');
    });
  });

  it('Testa se vai para a tela de receitas favoritas', async () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(favoriteButton);

    waitFor(() => {
      expect(window.location.pathname).toBe('/favorite-recipes');
    });
  });

  it('testa se email fica no localstorage', async () => {
    const mockStoredUser = { email: 'test@example.com' };
    const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(mockStoredUser)),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail.textContent).toBe(mockStoredUser.email);
  });
});
