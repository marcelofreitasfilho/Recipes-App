import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { RecipeProvider } from './Search/Results';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </BrowserRouter>,
  );
