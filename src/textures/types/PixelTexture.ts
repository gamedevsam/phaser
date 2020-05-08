/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Arne16 } from '../palettes/Arne16';
import { CreateCanvas } from '../CreateCanvas';
import { Texture } from '../Texture';

/**
 * @callback Phaser.Types.Create.GenerateTextureCallback
 * @since 3.0.0
 *
 * @param {HTMLCanvasElement} canvas - The HTML Canvas element to operate on.
 * @param {CanvasRenderingContext2D} context - The context of the HTML Canvas element.
 */

/**
 * @typedef {object} Phaser.Types.Create.GenerateTextureConfig
 * @since 3.0.0
 *
 * @property {array} [data=[]] - An array of data, where each row is a string of single values 0-9A-F, or the period character.
 * @property {HTMLCanvasElement} [canvas=null] - The HTML Canvas to draw the texture to.
 * @property {Phaser.Types.Create.Palette} [palette=Arne16] - The indexed palette that the data cell values map to.
 * @property {number} [pixelWidth=1] - The width of each 'pixel' in the generated texture.
 * @property {number} [pixelHeight=1] - The height of each 'pixel' in the generated texture.
 * @property {boolean} [resizeCanvas=true] - Should the canvas be resized before the texture is drawn?
 * @property {boolean} [clearCanvas=true] - Should the canvas be cleared before the texture is drawn?
 * @property {Phaser.Types.Create.GenerateTextureCallback} [preRender] - A callback to send the canvas to prior to the texture being drawn.
 * @property {Phaser.Types.Create.GenerateTextureCallback} [postRender] - A callback to send the canvas to after the texture has been drawn.
 */

export type PixelTextureConfig = {
    data: string[];
    canvas?: HTMLCanvasElement;
    palette?: string[];
    pixelWidth?: number;
    pixelHeight?: number;
    resizeCanvas?: boolean;
    clearCanvas?: boolean;
    preRender?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
    postRender?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
};

/**
 * Generates a texture based on the given Create configuration object.
 *
 * The texture is drawn using a fixed-size indexed palette of 16 colors, where the hex value in the
 * data cells map to a single color. For example, if the texture config looked like this:
 *
 * ```javascript
 * var star = [
 *   '.....828.....',
 *   '....72227....',
 *   '....82228....',
 *   '...7222227...',
 *   '2222222222222',
 *   '8222222222228',
 *   '.72222222227.',
 *   '..787777787..',
 *   '..877777778..',
 *   '.78778887787.',
 *   '.27887.78872.',
 *   '.787.....787.'
 * ];
 *
 * this.textures.generate('star', { data: star, pixelWidth: 4 });
 * ```
 *
 * Then it would generate a texture that is 52 x 48 pixels in size, because each cell of the data array
 * represents 1 pixel multiplied by the `pixelWidth` value. The cell values, such as `8`, maps to color
 * number 8 in the palette. If a cell contains a period character `.` then it is transparent.
 *
 * The default palette is Arne16, but you can specify your own using the `palette` property.
 *
 * @function Phaser.Create.GenerateTexture
 * @since 3.0.0
 *
 * @param {Phaser.Types.Create.GenerateTextureConfig} config - The Generate Texture Configuration object.
 *
 * @return {Texture} An HTMLCanvasElement which contains the generated texture drawn to it.
 */
export function PixelTexture (config: PixelTextureConfig): Texture
{
    const {
        data = [],
        palette = Arne16,
        pixelWidth = 1,
        pixelHeight = pixelWidth,
        preRender = null,
        postRender = null
    } = config;

    let {
        canvas = null,
        resizeCanvas = true,
        clearCanvas = true
    } = config;

    const width = Math.floor(Math.abs(data[0].length * pixelWidth));
    const height = Math.floor(Math.abs(data.length * pixelHeight));

    if (!canvas)
    {
        canvas = CreateCanvas(width, height).canvas;
        resizeCanvas = false;
        clearCanvas = false;
    }

    if (resizeCanvas)
    {
        canvas.width = width;
        canvas.height = height;
    }

    const ctx = canvas.getContext('2d');

    if (clearCanvas)
    {
        ctx.clearRect(0, 0, width, height);
    }

    //  preRender Callback?
    if (preRender)
    {
        preRender(canvas, ctx);
    }

    //  Draw it
    for (let y = 0; y < data.length; y++)
    {
        const row = data[y];

        for (let x = 0; x < row.length; x++)
        {
            const d: string = row[x];

            if (d !== '.' && d !== ' ')
            {
                ctx.fillStyle = palette[parseInt('0x' + d.toUpperCase())];
                ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
            }
        }
    }

    //  postRender Callback?
    if (postRender)
    {
        postRender(canvas, ctx);
    }

    return new Texture(canvas);
}
