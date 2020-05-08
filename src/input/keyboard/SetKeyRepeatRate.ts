import { IKey } from './IKey';

export function SetKeyRepeatRate (rate: number, ...keys: IKey[]): IKey[]
{
    keys.forEach(key =>
    {
        key.repeatRate = rate;
    });

    return keys;
}
