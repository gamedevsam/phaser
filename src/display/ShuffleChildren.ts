import { IGameObject } from '../gameobjects/IGameObject';

export function ShuffleChildren (parent: IGameObject): IGameObject[]
{
    const children = parent.children;

    for (let i = children.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = children[i];

        children[i] = children[j];
        children[j] = temp;

        temp.dirty.setRender();
    }

    return children;
}
