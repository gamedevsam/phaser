import { ParseXML } from '../../dom/ParseXML';
import { GameInstance } from '../../GameInstance';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { XHRLoader } from '../XHRLoader';

export function XMLFile (key: string, url?: string): File<XMLDocument>
{
    const file = new File<string>(key, url);
    const fileCast = (file as unknown) as File<XMLDocument>;

    fileCast.load = () => {

        fileCast.url = GetURL(fileCast.key, file.url, '.xml', fileCast.loader);

        return new Promise((resolve, reject) => {

            const game = GameInstance.get();

            if (!fileCast.skipCache && game.cache.xml.has(fileCast.key))
            {
                resolve(fileCast);
            }
            else
            {
                XHRLoader(file).then(file => {

                    const xml = ParseXML(file.data);

                    if (xml !== null)
                    {
                        fileCast.data = xml;

                        if (!fileCast.skipCache)
                        {
                            game.cache.xml.set(fileCast.key, xml);
                        }

                        resolve(fileCast);
                    }
                    else
                    {
                        reject(fileCast);
                    }

                }).catch(() => {

                    reject(fileCast);

                });
            }
        });
    };

    return fileCast;
}
