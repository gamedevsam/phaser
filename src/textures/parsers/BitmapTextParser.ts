import { Frame } from '../Frame';
import { Texture } from '../Texture';

/**
 * Read an integer value from an XML Node.
 *
 * @function getValue
 * @since 3.0.0
 * @private
 *
 * @param {Node} node - The XML Node.
 * @param {string} attribute - The attribute to read.
 *
 * @return {integer} The parsed value.
 */
function GetValue (node: any, attribute: string): number
{
    return parseInt(node.getAttribute(attribute), 10);
}

type BitmapCharacter = {
    x: number;
    y: number;
    width: number;
    height: number;
    // centerX: number;
    // centerY: number,
    xOffset: number;
    yOffset: number;
    xAdvance: number;
    // data: {};
    kerning: Record<number, number>;
};

type BitmapData = {
    font: string;
    size: number;
    lineHeight: number;
    chars: Record<number, BitmapCharacter>;
};

export function BitmapTextParser (texture: Texture, xml: XMLDocument, frame?: Frame): BitmapData
{
    const xSpacing = 0;
    const ySpacing = 0;

    const info = xml.getElementsByTagName('info')[0];
    const common = xml.getElementsByTagName('common')[0];

    const data: BitmapData = {
        font: info.getAttribute('face'),
        size: GetValue(info, 'size'),
        lineHeight: GetValue(common, 'lineHeight') + ySpacing,
        chars: {}
    };

    const letters = xml.getElementsByTagName('char');

    // var adjustForTrim = (frame !== undefined && frame.trimmed);

    // if (adjustForTrim)
    // {
    //     var top = frame.height;
    //     var left = frame.width;
    // }

    for (let i: number = 0; i < letters.length; i++)
    {
        const node = letters[i];

        const charCode = GetValue(node, 'id');
        const x = GetValue(node, 'x');
        const y = GetValue(node, 'y');
        const width = GetValue(node, 'width');
        const height = GetValue(node, 'height');

        //  Handle frame trim issues

        // if (adjustForTrim)
        // {
        //     if (gx < left)
        //     {
        //         left = gx;
        //     }

        //     if (gy < top)
        //     {
        //         top = gy;
        //     }
        // }

        data.chars[charCode] =
        {
            x,
            y,
            width,
            height,
            // centerX: Math.floor(width / 2),
            // centerY: Math.floor(height / 2),
            xOffset: GetValue(node, 'xoffset'),
            yOffset: GetValue(node, 'yoffset'),
            xAdvance: GetValue(node, 'xadvance') + xSpacing,
            // data: {},
            kerning: {}
        };

        texture.addFrame(charCode, x, y, width, height);
    }

    /*
    if (adjustForTrim && top !== 0 && left !== 0)
    {
        //  Now we know the top and left coordinates of the glyphs in the original data
        //  so we can work out how much to adjust the glyphs by

        for (var code in data.chars)
        {
            var glyph = data.chars[code];

            glyph.x -= frame.x;
            glyph.y -= frame.y;
        }
    }
    */

    const kernings = xml.getElementsByTagName('kerning');

    for (let i: number = 0; i < kernings.length; i++)
    {
        const kern = kernings[i];

        const first = GetValue(kern, 'first');
        const second = GetValue(kern, 'second');
        const amount = GetValue(kern, 'amount');

        data.chars[second].kerning[first] = amount;
    }

    return data;
}
