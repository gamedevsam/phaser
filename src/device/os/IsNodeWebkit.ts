import { IsNode } from './IsNode';

export function IsNodeWebkit (): boolean
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (IsNode() && !!(process.versions as Record<string, any>).hasOwnProperty('node-webkit'));
}
