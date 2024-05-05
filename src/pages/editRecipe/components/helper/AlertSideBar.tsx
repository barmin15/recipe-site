import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import { isMobile } from 'react-device-detect';

interface AlertSideBarProps {
    isOpenErrorMessage: boolean;
    errorMessage: string;
    setIsOpenErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlertSideBar({isOpenErrorMessage, errorMessage, setIsOpenErrorMessage}: AlertSideBarProps) {

    return (<Box
        sx={{
            position: 'fixed',
            bottom: isMobile ? 'unset' : '10px',
            top: isMobile ? '10px' : 'unset',
            left: '10px',
            right: '10px',
            width: isMobile ? 'calc(100% - 20px)' : '27%',
            //moved error message to z index 9999, so it will appear in front of every element
            zIndex: 9999,
        }}
        className={isOpenErrorMessage ? 'error-message open' : 'error-message'}
    >
        <Alert
            severity="error"
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={()=> setIsOpenErrorMessage(false)}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {errorMessage}
        </Alert>
    </Box>
    )
}