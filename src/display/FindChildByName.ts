import { IGameObject } from '../gameobjects/IGameObject';

export function FindChildByName (parent: IGameObject, searchString: string, deep: boolean = false): IGameObject | undefined
{
    const children = parent.children;
    const regex = RegExp(searchString);

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (regex.test(child.name))
        {
            return child;
        }

        if (deep && child.numChildren > 0)
        {
            const deepChild = FindChildByName(child, searchString, true);

            if (deepChild)
            {
                return deepChild;
            }
        }
    }
}
