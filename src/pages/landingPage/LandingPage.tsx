import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../logic/fetch";
import { Fab, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Recipe } from "../../data/recipeDatas";

import RecipeList from "./components/RecipeList";

export default function LandingPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getRequest("/recipes/")
            .then((res) => {
                let filteredRecipes = res;
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <TextField
                label="Keress Receptet"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                fullWidth
                sx={{ marginBottom: 2, backgroundColor: '#EEEEEEE6'}}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => setSearch("")} size="small">
                            <ClearIcon sx={{"&:hover": {color: "black"}}}/>
                        </IconButton>
                    ),
                }}
            />
            <RecipeList recipes={recipes} />
            <Link to="/create" style={{ textDecoration: "none" }}>
                <Fab color="primary" sx={{ position: "fixed", right: 20, bottom: 20 }}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}
