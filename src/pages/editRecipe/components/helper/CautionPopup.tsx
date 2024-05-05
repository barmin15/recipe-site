import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

interface CautionPopupProps {
    isOpenCautionBar: boolean;
    errorMessage: string;
    setIsOpenCautionBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CautionPopup({ isOpenCautionBar, errorMessage, setIsOpenCautionBar }: CautionPopupProps) {

    return (
            <Backdrop
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpenCautionBar}
                onClick={() => setIsOpenCautionBar(false)}
            >
                <Typography variant="body1" sx={{ textAlign: 'center', ml: 2, color: 'black', padding: '10px', borderRadius: '5px', fontSize: 23 }}>
                    FIGYELEM
                    <br />
                    {errorMessage}
                    <br />
                    nyomjon bárhová, a tovább lépéshez
                </Typography>
            </Backdrop>
    );
}
