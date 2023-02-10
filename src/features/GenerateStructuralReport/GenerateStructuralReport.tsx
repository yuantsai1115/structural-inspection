import React, { ReactElement, FC, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Typography,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { StructuralData, isStructuralData } from '../../interfaces/structuralData.interface';
import { downloadBlob, dataToReport, blobToDataURL, parseJsonFile } from './../../services/Docx/docx.service';
import { generateReport } from './GenerateStructuralReportHelper';
import { ResetTvOutlined } from '@mui/icons-material';

const GenerateStructuralReport: FC<any> = (): ReactElement => {
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const handleFileSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const fileList: FileList | null = e.currentTarget.files;
        if (!fileList) {
            setIsButtonDisabled(true);
            return;
        }
        setSelectedFile(fileList[0]);
        setIsButtonDisabled(false);
        console.log(fileList[0]);
    };

    const [errorMessage, setErrorMessage] = useState<string>('');
    const clearMessage = () => {
        setErrorMessage('');
    };
    const handleProcessClicked = (i: number) => async (e: React.MouseEvent<HTMLElement>) => {
        // console.log(i);
        clearMessage();

        let data = await Promise.resolve().then(r => parseJsonFile(selectedFile));
        if (!!selectedFile) {
            if (!isSelectedFilePassed(data)) {
                setErrorMessage(`檔案有誤，請再確認。`);
                return;
            }

            setShowProgress(true);
            setIsButtonDisabled(true);
            await generateReport(
                data,
                () => {
                    setShowProgress(false);
                    setIsButtonDisabled(false);
                },
                (errorMessage: string) => {
                    console.log(errorMessage);
                    setErrorMessage(errorMessage);
                },
            );
        }
    };

    const isSelectedFilePassed = (data: any) => {
        if (!Array.isArray(data)) return false;
        let result = true;
        data.map(d => {
            if (!isStructuralData(d)) result = false;
        });
        return result;
    };

    return (
        <>
            <Box>
                <Card sx={{ minWidth: 350 }}>
                    <CardContent>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Rebar Inspection Sheet:</FormLabel>

                            <label htmlFor="contained-button-file">
                                <input
                                    accept=".json"
                                    style={{ display: 'none' }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileSelected}
                                />
                                <Button variant="text" component="span" style={{ marginRight: '8px' }}>
                                    Select
                                </Button>
                                <Typography variant="caption" display="inline" gutterBottom>
                                    {selectedFile?.name}
                                </Typography>
                            </label>
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'right', verticalAlign: 'center' }}>
                            {showProgress ? (
                                <Box sx={{ marginRight: '15px' }} component={Stack} direction="column" justifyContent="center">
                                    <CircularProgress size={20} />
                                </Box>
                            ) : (
                                <></>
                            )}
                            <Button disabled={isButtonDisabled} variant="contained" style={{ color: 'white' }} onClick={handleProcessClicked(1)}>
                                Generate
                            </Button>
                        </Box>
                        {errorMessage.length > 0 ? (
                            <Box sx={{ mt: '5px' }} component={Stack} direction="column" justifyContent="center">
                                <Typography variant="body2" color="error.main">
                                    {errorMessage}
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                </Card>

                <Box mt={2} ml={2}>
                    <Typography variant="caption" color="text.secondary">
                        Sample Files：
                    </Typography>
                    <Typography variant="caption">
                        <Box>
                            <a href={`${process.env.PUBLIC_URL}/samples/RC_Column_Design_Data copy.json`}>
                                {' '}
                                RC Column Design Data from Tekla (.json){' '}
                            </a>
                        </Box>
                        <Box>
                            <a href={`${process.env.PUBLIC_URL}/templates/column_rebar_template.docx`}>
                                {' '}
                                Rebar inspection sheet for RC Column (.docx){' '}
                            </a>
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default GenerateStructuralReport;
