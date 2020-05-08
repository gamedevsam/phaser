import { GameInstance } from '../GameInstance';

let title = 'Phaser';
let url = 'https://phaser4.io';
let color = '#fff';
let background = 'linear-gradient(#3e0081 40%, #00bcc3)';

function Banner (gameTitle: string = '', gameURL: string = '', textColor?: string, textBackground?: string): () => void
{
    return (): void =>
    {
        title = gameTitle;
        url = gameURL;

        if (textColor)
        {
            color = textColor;
        }

        if (textBackground)
        {
            background = textBackground;
        }
    };
}

function GetBanner (): void
{
    if (title !== '')
    {
        const game = GameInstance.get();

        const version = (title === 'Phaser') ? ' v' + game.VERSION : '';

        console.log(
            `%c${title}${version}%c ${url}`,
            `padding: 4px 16px; color: ${color}; background: ${background}`,
            ''
        );
    }
}

export {
    Banner,
    GetBanner
};
