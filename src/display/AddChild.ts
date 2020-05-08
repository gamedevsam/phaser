import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChild <T extends IGameObject> (parent: IGameObject, child: T): T
{
    SetParent(parent, child);

    parent.children.push(child);

    child.transform.updateWorld();

    return child;
}
