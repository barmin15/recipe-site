import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../logic/fetch";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Recipe } from "../../data/recipeDatas";

import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

export default function LandingPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        //fetches the data, every time the page reloads, or the search changes
        getRequest("/recipes/")
            .then((res) => {
                let filteredRecipes = res;
                //if search is not empty, filter for recipes containing search
                if (search.trim() !== '') {
                    filteredRecipes = res.filter((recipe: { name: string; description: string; }) =>
                        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
                        recipe.description.toLowerCase().includes(search.toLowerCase()));
                }
                setRecipes(filteredRecipes);
            }).catch((error) => {
                console.error(error);
            });
    }, [search]);



    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <RecipeList recipes={recipes} />
            <Link to="/create" style={{ textDecoration: "none" }}>
                <Fab color="primary" sx={{ position: "fixed", right: 20, bottom: 20 }}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}
