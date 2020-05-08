import { Game } from './Game';

let instance: Game;
let frame: number = 0;

export const GameInstance =
{
    get: (): Game =>
    {
        return instance;
    },

    set: (game: Game | undefined): void =>
    {
        instance = game;
    },

    getFrame: (): number =>
    {
        return frame;
    },

    setFrame: (current: number): void =>
    {
        frame = current;
    }
};
