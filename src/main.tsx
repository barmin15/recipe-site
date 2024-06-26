import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./css/style.css";

import LandingPage from './pages/landingPage/LandingPage';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AddNewRecipe from './pages/editRecipe/AddRecipe';

//create custom color and typography theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#222831',
    }
  },
  typography: {
    fontFamily: 'Fruitella, sans-serif',
  },
});

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/*add routes for different pages*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<AddNewRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
