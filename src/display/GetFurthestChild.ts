import { DistanceBetweenPoints } from '../math/distance/DistanceBetweenPoints';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2 } from '../math/vec2/IVec2';

export function GetFurthestChild (parent: IGameObject, point: IVec2): IGameObject
{
    const children = parent.children;

    let furthest: IGameObject = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        const childDistance = DistanceBetweenPoints(point, child.transform.position);

        if (!furthest || childDistance > distance)
        {
            furthest = child;
            distance = childDistance;
        }

    });

    return furthest;
}
