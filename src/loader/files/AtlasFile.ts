import { AtlasParser } from '../../textures/parsers/AtlasParser';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export function AtlasFile (key: string, textureURL?: string, atlasURL?: string): File
{
    const json = JSONFile(key, atlasURL);
    const image = ImageFile(key, textureURL);

    const file = new File(key, '');

    file.load = (): Promise<File> =>
    {
        //  If called via a Loader, it has been set into the file const
        json.url = GetURL(json.key, json.url, '.json', file.loader);
        image.url = GetURL(image.key, image.url, '.png', file.loader);

        return new Promise((resolve, reject) =>
        {
            json.skipCache = true;

            json.load().then(() =>
            {
                image.load().then(() =>
                {
                    //  By this stage, the JSON and image are loaded and in the texture manager

                    AtlasParser(TextureManagerInstance.get().get(key), json.data);

                    resolve(file);

                }).catch(() =>
                {
                    reject(file);
                });

            }).catch(() =>
            {
                reject(file);
            });
        });
    };

    return file;
}
