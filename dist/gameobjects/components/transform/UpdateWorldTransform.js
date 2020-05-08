import { Copy } from '../../../math/matrix2d/Copy.js';

function UpdateWorldTransform(gameObject) {
    gameObject.dirty.setRender();
    const parent = gameObject.parent;
    const transform = gameObject.transform;
    const lt = transform.local;
    const wt = transform.world;
    lt.tx = transform.x;
    lt.ty = transform.y;
    if (!parent) {
        Copy(lt, wt);
        return;
    }
    const { a, b, c, d, tx, ty } = lt;
    const { a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty } = parent.transform.world;
    wt.set(a * pa + b * pc, a * pb + b * pd, c * pa + d * pc, c * pb + d * pd, tx * pa + ty * pc + ptx, tx * pb + ty * pd + pty);
}

export { UpdateWorldTransform };
