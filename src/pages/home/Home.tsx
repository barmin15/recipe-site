import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component from React Router
import { getRequest } from "../../api/fetch";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { Recipe } from "../../data/recipeDatas";

//components
import RecipeList from "./components/RecipeList";

export default function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        getRequest("/recipes/")
            .then((res) => {
                setRecipes(res);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    }, [search]);

    return (
        <>
            <RecipeList recipes={recipes} />
            <Link to="/create" style={{ textDecoration: "none" }}>
                <Fab color="primary" sx={{ position: "fixed", right: 20, bottom: 20 }}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}

