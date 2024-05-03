import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./css/style.css";

import Home from './pages/home/Home';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AddNewRecipe from './pages/editRecipe/AddRecipe';

const theme = createTheme({
  palette: {
    primary: {
      main: '#803D3B',
    },
    secondary: {
      main: '#E4C59E',
    },
  },
});

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AddNewRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
