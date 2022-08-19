import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import GenerateStructuralReport from '../../GenerateStructuralReport';

const MainLayout: FC<any> = (): ReactElement<any> => {
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'whitesmoke',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: '20px',
                }}
            >
                <GenerateStructuralReport />
            </Box>
        </>
    );
};

export default MainLayout;
