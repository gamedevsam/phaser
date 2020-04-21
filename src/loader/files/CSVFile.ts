import { GameInstance } from '../../GameInstance';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { XHRLoader } from '../XHRLoader';

export function CSVFile (key: string, url?: string): File<string>
{
    const file = new File<string>(key, url);

    file.load = () => {

        file.url = GetURL(file.key, file.url, '.csv', file.loader);

        return new Promise((resolve, reject) => {

            const game = GameInstance.get();

            if (!file.skipCache && game.cache.csv.has(file.key))
            {
                resolve(file);
            }
            else
            {
                XHRLoader(file).then(file => {

                    if (!file.skipCache)
                    {
                        game.cache.csv.set(file.key, file.data);
                    }

                    resolve(file);

                }).catch(file => {

                    reject(file);

                });
            }

        });
    };

    return file;
}
