import { IGameObject } from '../gameobjects/IGameObject';

export function GetFirstChild (parent: IGameObject, property: string | symbol, value?: never): IGameObject | undefined
{
    const children = parent.children;

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        if (descriptor && (value === undefined || value === descriptor.value))
        {
            return child;
        }
    }
}
