import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import GenerateStructuralReport from '../../GenerateStructuralReport';

const MainLayout: FC<any> = (): ReactElement<any> => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px' }}>
                <Typography variant="h4" component="div">
                    施工品管監造
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '18px' }}>
                <Typography variant="h6" gutterBottom component="div">
                    製作鋼筋查驗單
                </Typography>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'whitesmoke',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'top',
                    py: '20px',
                }}
            >
                <GenerateStructuralReport />
            </Box>
        </>
    );
};

export default MainLayout;
