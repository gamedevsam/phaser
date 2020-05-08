import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex (parent: IGameObject, child: IGameObject): number
{
    return parent.children.indexOf(child);
}
