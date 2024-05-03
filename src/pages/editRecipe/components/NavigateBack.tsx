import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function NavigateBack() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 20,
                left: 20,
            }}
        >
            <Button variant="contained" onClick={() => navigate("/")}>
                Vissza
            </Button>
        </Box>
    );
};
