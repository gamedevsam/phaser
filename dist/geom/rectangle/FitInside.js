import { CenterX } from './CenterX.js';
import { CenterY } from './CenterY.js';
import { GetAspectRatio } from './GetAspectRatio.js';

function FitInside(target, source) {
    const ratio = GetAspectRatio(target);
    let width = source.width;
    let height = source.height;
    if (ratio < GetAspectRatio(source)) {
        width = source.height * ratio;
    }
    else {
        height = source.width / ratio;
    }
    return target.set(CenterX(source) - (target.width / 2), CenterY(source) - (target.height / 2), width, height);
}

export { FitInside };
