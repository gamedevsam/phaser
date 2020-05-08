import { DistanceBetweenPoints } from '../math/distance/DistanceBetweenPoints';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2 } from '../math/vec2/IVec2';

export function GetClosestChild (parent: IGameObject, point: IVec2): IGameObject
{
    const children = parent.children;

    let closest: IGameObject = null;
    let distance: number = 0;

    children.forEach(child =>
    {
        const childDistance = DistanceBetweenPoints(point, child.transform.position);

        if (!closest || childDistance < distance)
        {
            closest = child;
            distance = childDistance;
        }

    });

    return closest;
}
