import { GameInstance } from '../../GameInstance';
import { BitmapTextParser } from '../../textures/parsers/BitmapTextParser';
import { File } from '../File';
import { GetURL } from '../GetURL';
import { ImageFile } from './ImageFile';
import { XMLFile } from './XMLFile';

export function BitmapTextFile (key: string, textureURL?: string, fontDataURL?: string): File
{
    const xml = XMLFile(key, fontDataURL);
    const image = ImageFile(key, textureURL);

    const file = new File(key, '');

    file.load = () => {

        //  If called via a Loader, it has been set into the file const
        xml.url = GetURL(xml.key, xml.url, '.xml', file.loader);
        image.url = GetURL(image.key, image.url, '.png', file.loader);

        return new Promise((resolve, reject) => {

            xml.skipCache = true;

            xml.load().then(() => {

                image.load().then(() => {

                    //  By this stage, the XML and image are loaded and in the texture manager
                    const texture = GameInstance.get().textures.get(key);

                    const fontData = BitmapTextParser(texture, xml.data);

                    texture.data = fontData;

                    resolve(file);

                }).catch(() => {

                    reject(file);

                });

            }).catch(() => {

                reject(file);

            });
        });
    };

    return file;
}
