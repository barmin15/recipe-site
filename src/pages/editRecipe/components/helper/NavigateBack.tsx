import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function NavigateBack() {
    const navigate = useNavigate();

    // if viewed on mobile the button is an arrow icon
    return isMobile ?
        <ArrowBackIosIcon
            sx={{
                position: 'fixed',
                top: 20,
                left: 20,
                fontSize: 30,
                color: 'black',
                cursor: 'pointer'
            }}
            onClick={() => navigate("/")}
        />
        :
        <Button variant="contained" sx={{ position: 'fixed', top: 20, left: 20 }} onClick={() => navigate("/")}>
            Vissza
        </Button>
};
