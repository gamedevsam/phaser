import { Emit, EventEmitter } from '../../events';

import { Append as AppendMatrix2d } from '../../math/matrix2d-funcs/Append';
import { GameInstance } from '../../GameInstance';
import { GlobalToLocal } from '../../math/matrix2d/GlobalToLocal';
import { IGameObject } from '../../gameobjects/IGameObject';
import { Vec2 } from '../../math/vec2/Vec2';

export class Mouse extends EventEmitter
{
    primaryDown: boolean = false;
    auxDown: boolean = false;
    secondaryDown: boolean = false;

    localPoint: Vec2;
    hitPoint: Vec2;

    private target: HTMLElement;
    private resolution: number = 1;

    private mousedownHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
    private mouseupHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
    private mousemoveHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
    private blurHandler: { (): void; (this: Window, ev: FocusEvent): void };

    private transPoint: Vec2;

    constructor (target?: HTMLElement)
    {
        super();

        this.mousedownHandler = (event: MouseEvent): void => this.onMouseDown(event);
        this.mouseupHandler = (event: MouseEvent): void => this.onMouseUp(event);
        this.mousemoveHandler = (event: MouseEvent): void => this.onMouseMove(event);
        this.blurHandler = (): void => this.onBlur();

        this.localPoint = new Vec2();
        this.hitPoint = new Vec2();
        this.transPoint = new Vec2();

        if (!target)
        {
            target = GameInstance.get().renderer.canvas;
        }

        target.addEventListener('mousedown', this.mousedownHandler);
        target.addEventListener('mouseup', this.mouseupHandler);

        window.addEventListener('mouseup', this.mouseupHandler);
        window.addEventListener('mousemove', this.mousemoveHandler);
        window.addEventListener('blur', this.blurHandler);

        this.target = target;
    }

    private onBlur (): void
    {
    }

    private onMouseDown (event: MouseEvent): void
    {
        this.positionToPoint(event);

        this.primaryDown = (event.button === 0);
        this.auxDown = (event.button === 1);
        this.secondaryDown = (event.button === 2);

        Emit(this, 'pointerdown', this.localPoint.x, this.localPoint.y, event.button, event);
    }

    private onMouseUp (event: MouseEvent): void
    {
        this.positionToPoint(event);

        this.primaryDown = !(event.button === 0);
        this.auxDown = !(event.button === 1);
        this.secondaryDown = !(event.button === 2);

        Emit(this, 'pointerup', this.localPoint.x, this.localPoint.y, event.button, event);
    }

    private onMouseMove (event: MouseEvent): void
    {
        this.positionToPoint(event);

        Emit(this, 'pointermove', this.localPoint.x, this.localPoint.y, event);
    }

    positionToPoint (event: MouseEvent): Vec2
    {
        return this.localPoint.set(event.offsetX, event.offsetY);
    }

    getInteractiveChildren <T extends IGameObject> (parent: T, results: IGameObject[]): void
    {
        const children = parent.children;

        for (let i = 0; i < children.length; i++)
        {
            const child = children[i];

            if (!child.visible || !child.input.enabled)
            {
                continue;
            }

            results.push(child);

            if (child.input.enabledChildren && child.numChildren)
            {
                this.getInteractiveChildren(child, results);
            }
        }
    }

    checkHitArea <T extends IGameObject> (entity: T, px: number, py: number): boolean
    {
        if (entity.input.hitArea)
        {
            if (entity.input.hitArea.contains(px, py))
            {
                return true;
            }
        }
        else
        {
            return entity.transform.extent.contains(px, py);
        }

        return false;
    }

    hitTest <T extends IGameObject> (...entities: T[]): boolean
    {
        const localX = this.localPoint.x;
        const localY = this.localPoint.y;
        const point = this.transPoint;

        for (let i: number = 0; i < entities.length; i++)
        {
            const entity = entities[i];

            if (!entity.world)
            {
                //  Can't hit test an entity if it hasn't been added to a World yet
                continue;
            }

            const mat = AppendMatrix2d(entity.world.camera.worldTransform, entity.transform.world);

            GlobalToLocal(mat, localX, localY, point);

            if (this.checkHitArea(entity, point.x, point.y))
            {
                this.hitPoint.set(point.x, point.y);

                return true;
            }
        }

        return false;
    }

    hitTestChildren <T extends IGameObject> (parent: T, topOnly: boolean = true): IGameObject[]
    {
        const output: IGameObject[] = [];

        if (!parent.visible)
        {
            return output;
        }

        //  Build a list of potential input candidates
        const candidates: IGameObject[] = [];
        const parentInput = parent.input;

        if (parentInput && parentInput.enabled)
        {
            candidates.push(parent);
        }

        if (parentInput.enabledChildren && parent.numChildren)
        {
            this.getInteractiveChildren(parent, candidates);
        }

        for (let i: number = candidates.length - 1; i >= 0; i--)
        {
            const entity = candidates[i];

            if (this.hitTest(entity))
            {
                output.push(entity);

                if (topOnly)
                {
                    break;
                }
            }
        }

        return output;
    }

    shutdown (): void
    {
        this.target.addEventListener('mousedown', this.mousedownHandler);
        this.target.addEventListener('mouseup', this.mouseupHandler);

        window.addEventListener('mouseup', this.mouseupHandler);
        window.addEventListener('mousemove', this.mousemoveHandler);
        window.addEventListener('blur', this.blurHandler);
    }
}
