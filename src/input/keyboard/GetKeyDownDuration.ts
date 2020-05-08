import { IKey } from './IKey';

export function GetKeyDownDuration (key: IKey): number
{
    if (key.isDown)
    {
        return key.timeUpdated - key.timeDown;
    }
    else
    {
        return key.timeUp - key.timeDown;
    }
}
