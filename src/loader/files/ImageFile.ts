import { GameInstance } from '../../GameInstance';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { ImageLoder } from '../ImageLoader';

export function ImageFile (key: string, url?: string): File<HTMLImageElement>
{
    const file = new File(key, url);
    const fileCast = file as unknown as File<HTMLImageElement>;

    fileCast.load = () => {

        file.url = GetURL(file.key, file.url, '.png', file.loader);

        if (file.loader)
        {
            file.crossOrigin = file.loader.crossOrigin;
        }

        return new Promise((resolve, reject) => {

            const game = GameInstance.get();

            if (game.textures.has(file.key))
            {
                resolve(fileCast);
            }
            else
            {
                ImageLoder(file).then(file => {

                    game.textures.add(file.key, file.data);

                    resolve(fileCast);

                }).catch(() => {

                    reject(fileCast);

                });
            }

        });
    };

    return fileCast;
}
