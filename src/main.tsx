import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/home/Home';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AddNewRecipe from './pages/newRecipe/AddRecipe';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<AddNewRecipe/>} />
        <Route path="/edit/:id" element={<EditRecipe/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
