import { TextureManagerInstance } from '../../textures/TextureManagerInstance.js';
import '../../cache/Cache.js';
import { AtlasParser } from '../../textures/parsers/AtlasParser.js';
import { File } from '../File.js';
import { GetURL } from '../GetURL.js';
import '../ImageTagLoader.js';
import '../XHRLoader.js';
import { ImageFile } from './ImageFile.js';
import { JSONFile } from './JSONFile.js';

function AtlasFile(key, textureURL, atlasURL) {
    const json = JSONFile(key, atlasURL);
    const image = ImageFile(key, textureURL);
    const file = new File(key, '');
    file.load = () => {
        json.url = GetURL(json.key, json.url, '.json', file.loader);
        image.url = GetURL(image.key, image.url, '.png', file.loader);
        return new Promise((resolve, reject) => {
            json.skipCache = true;
            json.load().then(() => {
                image.load().then(() => {
                    AtlasParser(TextureManagerInstance.get().get(key), json.data);
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

export { AtlasFile };
