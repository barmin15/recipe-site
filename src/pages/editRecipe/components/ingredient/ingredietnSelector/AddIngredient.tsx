import { Box, Button } from "@mui/material";

interface AddButtonProps {
    onClick: () => void;
  }
  
  export default function AddIngredient({ onClick }: AddButtonProps) {
    
    return(<Box mt={2} textAlign="center">
      <Button variant="contained" color="primary" onClick={onClick}>
        Hozzáadom
      </Button>
    </Box>
  );
  
}