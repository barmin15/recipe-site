import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CollapsableTableRow from "./CollapsableTableRow";
import { Recipe } from "../../../data/recipeDatas";
import { isMobile } from "react-device-detect";

interface RecipeListProps {
    recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
    return (
        <TableContainer component={Paper} style={{ maxHeight: isMobile ? "70vh" : "78vh" }}>
            <Table aria-label="recipe table">
                <TableHead style={{ position: "sticky", top: 0, backgroundColor: '#222831', zIndex: 1 }}>
                    <TableRow>
                        <TableCell sx={style.tableHead}>Név</TableCell>
                        <TableCell sx={style.tableHead}>Leírás</TableCell>
                        <TableCell sx={{ ...style.tableHead, ...style.tableHeadPrepSteps }}>Elkészítési lépések</TableCell>
                        <TableCell sx={style.tableHead}>Szekeszt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.map((recipe) => (
                        <CollapsableTableRow key={recipe.id} recipe={recipe} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const style = {
    tableHead: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Fruitella, sans-serif'
    },
    tableHeadPrepSteps: {
        fontFamily: 'Fruitella, sans-serif',
        display: { xs: 'none', sm: 'table-cell' }
    }
}
