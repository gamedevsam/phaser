import { GameInstance } from '../GameInstance';

let willPauseOnVisibility = false;
let willPauseOnBlur = false;

let visibilityHandler: () => void;
let blurHandler: () => void;
let focusHandler: () => void;

function ClearHandlers (): void
{
    if (willPauseOnVisibility)
    {
        document.removeEventListener('visibilitychange', visibilityHandler);

        willPauseOnVisibility = false;
    }

    if (willPauseOnBlur)
    {
        window.removeEventListener('blur', blurHandler);
        window.removeEventListener('focus', focusHandler);

        willPauseOnBlur = false;
    }
}

function PauseOnBlur (pauseOnDocumentHidden: boolean = true, pauseOnBlur: boolean = true): () => void
{
    return (): void =>
    {
        if (pauseOnDocumentHidden && document)
        {
            //  Visibility API = move to own function
            visibilityHandler = (): void =>
            {
                const game = GameInstance.get();

                if (!game)
                {
                    ClearHandlers();
                }
                else if (document.hidden)
                {
                    game.pause();
                }
                else
                {
                    game.resume();
                }
            };

            willPauseOnVisibility = true;

            document.addEventListener('visibilitychange', visibilityHandler);
        }

        if (pauseOnBlur && window)
        {
            blurHandler = (): void =>
            {
                const game = GameInstance.get();

                if (!game)
                {
                    ClearHandlers();
                }
                else
                {
                    game.pause();
                }
            };

            focusHandler = (): void =>
            {
                const game = GameInstance.get();

                if (!game)
                {
                    ClearHandlers();
                }
                else
                {
                    game.resume();
                }
            };

            willPauseOnBlur = true;

            window.addEventListener('blur', blurHandler);
            window.addEventListener('focus', focusHandler);
        }
    };
}

function WillPauseOnVisibility (): boolean
{
    return willPauseOnVisibility;
}

function WillPauseOnBlur (): boolean
{
    return willPauseOnBlur;
}

export {
    ClearHandlers,
    PauseOnBlur,
    WillPauseOnVisibility,
    WillPauseOnBlur
};
