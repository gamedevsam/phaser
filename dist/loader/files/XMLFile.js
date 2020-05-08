import { ParseXML } from '../../dom/ParseXML.js';
import { Cache } from '../../cache/Cache.js';
import { File } from '../File.js';
import { GetURL } from '../GetURL.js';
import { XHRLoader } from '../XHRLoader.js';

function XMLFile(key, url) {
    const file = new File(key, url);
    file.load = () => {
        file.url = GetURL(file.key, file.url, '.xml', file.loader);
        return new Promise((resolve, reject) => {
            const cache = Cache.get('XML');
            if (!file.skipCache && cache.has(file.key)) {
                resolve(file);
            }
            else {
                XHRLoader(file).then(file => {
                    const xml = ParseXML(file.data);
                    if (xml !== null) {
                        file.data = xml;
                        if (!file.skipCache) {
                            cache.set(file.key, xml);
                        }
                        resolve(file);
                    }
                    else {
                        reject(file);
                    }
                }).catch(file => {
                    reject(file);
                });
            }
        });
    };
    return file;
}

export { XMLFile };
