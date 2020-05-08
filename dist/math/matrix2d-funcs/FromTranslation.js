import { Matrix2D } from '../matrix2d/Matrix2D.js';
import { Translate } from './Translate.js';

function FromTranslation(x, y) {
    return Translate(new Matrix2D(), x, y);
}

export { FromTranslation };
