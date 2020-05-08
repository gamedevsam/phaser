import { IGameObject } from '../gameobjects/IGameObject';

export function FindChildrenByName (parent: IGameObject, searchString: string, deep: boolean = false): IGameObject[]
{
    const children = parent.children;
    const regex = RegExp(searchString);

    let out: IGameObject[] = [];

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (regex.test(child.name))
        {
            out.push(child);
        }

        if (deep && child.numChildren > 0)
        {
            const deepChildren = FindChildrenByName(child, searchString, true);

            if (deepChildren.length)
            {
                out = out.concat(deepChildren);
            }
        }
    }

    return out;
}
