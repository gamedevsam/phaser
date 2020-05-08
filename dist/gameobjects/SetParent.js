import './GetChildIndex.js';
import { RemoveChild } from './RemoveChild.js';

function SetParent(parent, ...child) {
    child.forEach(entity => {
        if (entity.parent) {
            RemoveChild(entity.parent, entity);
        }
        entity.world = parent.world;
        entity.parent = parent;
    });
}

export { SetParent };
