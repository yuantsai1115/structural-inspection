import createReport from 'docx-templates';
global.Buffer = global.Buffer || require('buffer').Buffer;

export const downloadBlob = (filename, content, mimeType, callback) => {
    const blob = new Blob([content], { type: mimeType });

    const URL = window.URL || window.webkitURL;
    const downloadURI = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.setAttribute('href', downloadURI);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    callback();
};

export const dataToReport = async (data, template) => {
    const report = await createReport({
        template,
        data: {
            data: data,
        },
        additionalJsContext: {
            imageData: (dataUrl, imageRatio, h) => {
                const data = dataUrl.slice('data:image/png;base64,'.length);
                let w = imageRatio * h;
                return { width: w, height: h, data: data, extension: '.png' };
            },
        },

        // cmdDelimiter won't work for looping
        // cmdDelimiter: ['{', '}'],
    });
    return report;
};

export function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = e => {
            resolve(e.target.result);
        };
        fr.onerror = reject;
        fr.readAsDataURL(blob);
    });
}

export function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = event => resolve(JSON.parse(event.target.result));
        fileReader.onerror = error => reject(error);
        fileReader.readAsText(file);
    });
}
