import { GameInstance } from '../../GameInstance';
import { IFrameConfig } from '../../textures/IFrameConfig';
import { SpriteSheetParser } from '../../textures/parsers/SpriteSheetParser';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { ImageLoder } from '../ImageLoader';

export function SpriteSheetFile (key: string, url: string, frameConfig: IFrameConfig): File<HTMLImageElement>
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

                    const texture = game.textures.add(file.key, file.data);

                    if (texture)
                    {
                        SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);

                        resolve(file);
                    }
                    else
                    {
                        reject(file);
                    }

                }).catch(() => {

                    reject(fileCast);

                });
            }
        });
    };

    return fileCast;
}
