import React, { useState } from 'react';
import { Recipe } from '../../data/recipeDatas';
import { request } from '../../api/fetch';
import RecipeForm from './../../components/RecipeForm'; 
import { useNavigate } from 'react-router';

export default function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    name: '',
    description: '',
    preparationSteps: '',
    ingredients: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      const ingredientsArray = value.split(',').map(ingredient => ingredient.trim());
      setRecipe({ ...recipe, [name]: ingredientsArray });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    /* 
    request("POST", "/recipe-book/recipes/", recipe)
       .then(res => console.log(res))
       .catch(err => console.log(err));
    */

    setRecipe({
      id: 0,
      name: '',
      description: '',
      preparationSteps: '',
      ingredients: []
    });

    navigate("/");
  };

  return (
    <RecipeForm handleSubmit={handleSubmit} handleChange={handleChange} recipe={recipe} /> // Pass recipe as a prop to RecipeForm
  );
};