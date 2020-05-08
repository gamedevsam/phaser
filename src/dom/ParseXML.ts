/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Takes the given data string and parses it as XML using the native DOMParser interface.
 * The parsed XML object is returned, or `null` if there was an error while parsing the data.
 *
 * @function Phaser.DOM.ParseXML
 * @since 3.0.0
 *
 * @param {string} data - The XML source stored in a string.
 *
 * @return {?XMLDocument} The parsed XML data, or `null` if the data could not be parsed.
 */
export function ParseXML (data: string): XMLDocument | null
{
    let xml: XMLDocument;

    try
    {
        const parser = new DOMParser();

        xml = parser.parseFromString(data, 'text/xml');

        if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length)
        {
            return null;
        }
        else
        {
            return xml;
        }
    }
    catch (error)
    {
        return null;
    }
}
