import { Cache } from '../../cache/Cache';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { ParseXML } from '../../dom/ParseXML';
import { XHRLoader } from '../XHRLoader';

export function XMLFile (key: string, url?: string): File
{
    const file = new File(key, url);

    file.load = (): Promise<File> =>
    {
        file.url = GetURL(file.key, file.url, '.xml', file.loader);

        return new Promise((resolve, reject) =>
        {
            const cache = Cache.get('XML');

            if (!file.skipCache && cache.has(file.key))
            {
                resolve(file);
            }
            else
            {
                XHRLoader(file).then(file =>
                {
                    const xml = ParseXML(file.data);

                    if (xml !== null)
                    {
                        file.data = xml;

                        if (!file.skipCache)
                        {
                            cache.set(file.key, xml);
                        }

                        resolve(file);
                    }
                    else
                    {
                        reject(file);
                    }

                }).catch(file =>
                {
                    reject(file);
                });
            }
        });
    };

    return file;
}
