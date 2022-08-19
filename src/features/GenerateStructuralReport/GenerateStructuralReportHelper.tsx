import { StructuralData } from '../../interfaces/structuralData.interface';
import { downloadBlob, dataToReport, blobToDataURL, parseJsonFile } from './../../services/Docx/docx.service';

export const generateReport = async (structuralData: Array<StructuralData>, callback: Function, onError: Function) => {
    const reader = new FileReader();
    let templateFile = await fetch(`${process.env.PUBLIC_URL}/templates/column_rebar_data.docx`).then(r => r.blob());

    reader.onload = async () => {
        let template = reader.result;
        structuralData = structuralData.map(d => {
            d.Image64 = d.Image64.includes('data:image/png;base64,') ? d.Image64 : `data:image/png;base64,${d.Image64}`;
            const img = new Image();
            img.src = d.Image64;
            document.body.appendChild(img);
            let ratio = img.width / img.height || 4 / 3;
            d['Image64Ratio'] = ratio;
            document.body.removeChild(img);
            return d;
        });

        console.log('Start generating report');
        console.log(structuralData);
        try {
            downloadBlob(
                'report.docx',
                await dataToReport(structuralData, template),
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                callback,
            );
        } catch (err) {
            console.log(err);
            onError(getErrorMessage(err));
        }
    };
    reader.readAsArrayBuffer(templateFile);
};

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}
