import { File } from './File';

export function ImageLoder (file: File<string>): Promise<File<HTMLImageElement>>
{
    const fileCast = file as unknown as File<HTMLImageElement>;
    fileCast.data = new Image();

    if (fileCast.crossOrigin)
    {
        fileCast.data.crossOrigin = file.crossOrigin;
    }

    return new Promise(
        (resolve, reject) => {

            fileCast.data.onload = () => {
                if (fileCast.data.onload)
                {
                    fileCast.data.onload = null;
                    fileCast.data.onerror = null;
                    resolve(fileCast);
                }
            };

            fileCast.data.onerror = (event) => {
                if (fileCast.data.onload)
                {
                    fileCast.data.onload = null;
                    fileCast.data.onerror = null;
                    fileCast.error = event;
                    reject(fileCast);
                }
            };

            fileCast.data.src = file.url;

            // Image is immediately-available or cached

            if (fileCast.data.complete && fileCast.data.width && fileCast.data.height)
            {
                fileCast.data.onload = null;
                fileCast.data.onerror = null;
                resolve(fileCast);
            }
        }
    );
}
