import { Cache } from '../../cache/Cache.js';
import { File } from '../File.js';
import { GetURL } from '../GetURL.js';
import { XHRLoader } from '../XHRLoader.js';

function JSONFile(key, url) {
    const file = new File(key, url);
    file.load = () => {
        file.url = GetURL(file.key, file.url, '.json', file.loader);
        return new Promise((resolve, reject) => {
            const cache = Cache.get('JSON');
            if (!file.skipCache && cache.has(file.key)) {
                resolve(file);
            }
            else {
                XHRLoader(file).then(file => {
                    file.data = JSON.parse(file.data);
                    if (!file.skipCache) {
                        cache.set(file.key, file.data);
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

export { JSONFile };
