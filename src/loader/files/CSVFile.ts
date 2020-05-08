import { Cache } from '../../cache/Cache';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { XHRLoader } from '../XHRLoader';

export function CSVFile (key: string, url?: string): File
{
    const file = new File(key, url);

    file.load = (): Promise<File> =>
    {
        file.url = GetURL(file.key, file.url, '.csv', file.loader);

        return new Promise((resolve, reject) =>
        {
            const cache = Cache.get('CSV');

            if (!file.skipCache && cache.has(file.key))
            {
                resolve(file);
            }
            else
            {
                XHRLoader(file).then(file =>
                {
                    if (!file.skipCache)
                    {
                        cache.set(file.key, file.data);
                    }

                    resolve(file);

                }).catch(file =>
                {
                    reject(file);
                });
            }
        });
    };

    return file;
}
