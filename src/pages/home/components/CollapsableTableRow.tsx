import { useState } from "react";
import { TableRow, TableCell, IconButton, Collapse, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Recipe } from "../../../data/recipeDatas";
import { useMediaQuery } from "@mui/material";

import OpenRecipe from "./OpenRecipe";

interface CollapsableTableRowProps {
    recipe: Recipe;
}

export default function CollapsableTableRow({ recipe }: CollapsableTableRowProps) {
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleRowClick = (recipeId: number) => {
        setOpenRowId(openRowId === recipeId ? null : recipeId);
    };

    const shortenText = (text: string) => {
        return text.length > 20 ? text.slice(0, 20) + "..." : text;
    };

    return (
        <>
            <TableRow onClick={() => handleRowClick(recipe.id)} sx={{ cursor: "pointer", "&:hover": { backgroundColor: '#803D3B66' }, width: '100%' }}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{shortenText(recipe.description)}</TableCell>
                <TableCell >{shortenText(recipe.preparationSteps)}</TableCell>
                <TableCell>
                    <Link to={`/edit/${recipe.id}`} style={{ textDecoration: "none" }}>
                        <IconButton aria-label="edit" sx={{ "&:hover": { color: 'black' } }}>
                            <EditIcon />
                        </IconButton>
                    </Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 4 : 4}>
                    <Collapse in={openRowId === recipe.id} timeout="auto" unmountOnExit>
                        <Paper elevation={3} style={{ padding: 10 }}>
                            <OpenRecipe id={recipe.id} />
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
