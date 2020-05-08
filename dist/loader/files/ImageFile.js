import { TextureManagerInstance } from '../../textures/TextureManagerInstance.js';
import { File } from '../File.js';
import { GetURL } from '../GetURL.js';
import { ImageTagLoader } from '../ImageTagLoader.js';

function ImageFile(key, url) {
    const file = new File(key, url);
    file.load = () => {
        file.url = GetURL(file.key, file.url, '.png', file.loader);
        if (file.loader) {
            file.crossOrigin = file.loader.crossOrigin;
        }
        return new Promise((resolve, reject) => {
            const textureManager = TextureManagerInstance.get();
            if (textureManager.has(file.key)) {
                resolve(file);
            }
            else {
                ImageTagLoader(file).then(file => {
                    textureManager.add(file.key, file.data);
                    resolve(file);
                }).catch(file => {
                    reject(file);
                });
            }
        });
    };
    return file;
}

export { ImageFile };
