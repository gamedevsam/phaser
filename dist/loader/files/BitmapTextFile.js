import '../../dom/ParseXML.js';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance.js';
import '../../cache/Cache.js';
import { BitmapTextParser } from '../../textures/parsers/BitmapTextParser.js';
import { File } from '../File.js';
import { GetURL } from '../GetURL.js';
import '../ImageTagLoader.js';
import '../XHRLoader.js';
import { ImageFile } from './ImageFile.js';
import { XMLFile } from './XMLFile.js';

function BitmapTextFile(key, textureURL, fontDataURL) {
    const xml = XMLFile(key, fontDataURL);
    const image = ImageFile(key, textureURL);
    const file = new File(key, '');
    file.load = () => {
        xml.url = GetURL(xml.key, xml.url, '.xml', file.loader);
        image.url = GetURL(image.key, image.url, '.png', file.loader);
        return new Promise((resolve, reject) => {
            xml.skipCache = true;
            xml.load().then(() => {
                image.load().then(() => {
                    const texture = TextureManagerInstance.get().get(key);
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

export { BitmapTextFile };
