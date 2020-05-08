import '../../GameInstance.js';
import '../../math/matrix2d/Matrix2D.js';
import '../../geom/rectangle/Contains.js';
import '../../geom/rectangle/Rectangle.js';
import '../GetChildIndex.js';
import '../RemoveChild.js';
import '../SetParent.js';
import '../../math/matrix2d/Copy.js';
import '../components/transform/UpdateWorldTransform.js';
import '../RemoveChildrenBetween.js';
import '../DestroyChildren.js';
import '../components/bounds/BoundsComponent.js';
import '../components/dirty/DirtyComponent.js';
import '../components/input/InputComponent.js';
import '../components/transform/UpdateLocalTransform.js';
import '../components/transform/TransformComponent.js';
import '../ReparentChildren.js';
import { GameObject } from '../GameObject.js';

class Container extends GameObject {
    constructor(x = 0, y = 0) {
        super(x, y);
        this._alpha = 1;
        this.type = 'Container';
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        if (value !== this._alpha) {
            this._alpha = value;
        }
    }
}

export { Container };
