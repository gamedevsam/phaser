import { GetVertices } from '../components/transform/GetVertices';
import { ISprite } from './ISprite';

/*
    vertexData array structure:

    0 = topLeft.x
    1 = topLeft.y
    2 = frame.u0
    3 = frame.v0
    4 = textureIndex
    5 = topLeft.packedColor

    6 = bottomLeft.x
    7 = bottomLeft.y
    8 = frame.u0
    9 = frame.v1
    10 = textureIndex
    11 = bottomLeft.packedColor

    12 = bottomRight.x
    13 = bottomRight.y
    14 = frame.u1
    15 = frame.v1
    16 = textureIndex
    17 = bottomRight.packedColor

    18 = topRight.x
    19 = topRight.y
    20 = frame.u1
    21 = frame.v0
    22 = textureIndex
    23 = topRight.packedColor
*/

export function UpdateVertices <T extends ISprite> (sprite: T): T
{
    const data = sprite.vertexData;

    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(sprite.transform);

    //  top left
    data[0] = x0;
    data[1] = y0;

    //  bottom left
    data[6] = x1;
    data[7] = y1;

    //  bottom right
    data[12] = x2;
    data[13] = y2;

    //  top right
    data[18] = x3;
    data[19] = y3;

    return sprite;
}
