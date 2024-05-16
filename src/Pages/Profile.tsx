import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import profilePic from '../images/profileIcon.svg';

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserEmail(parsedUser.email);
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" iconSearch={ false } iconProfile />
      <div>
        <img
          src={ profilePic }
          alt="foto de perfil"
        />
      </div>
      <div>
        <h2 data-testid="profile-email">{userEmail}</h2>
      </div>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
      </div>
      <div>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <div>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
