import './CanPlayAudioType.js';
import { CanPlayM4A } from './CanPlayM4A.js';
import { CanPlayMP3 } from './CanPlayMP3.js';
import { CanPlayOGG } from './CanPlayOGG.js';
import { CanPlayOpus } from './CanPlayOpus.js';
import { CanPlayWAV } from './CanPlayWAV.js';
import { CanPlayWebM } from './CanPlayWebM.js';
import { HasAudio } from './HasAudio.js';
import { HasWebAudio } from './HasWebAudio.js';

function GetAudio() {
    const result = {
        audioData: HasAudio(),
        m4a: false,
        mp3: false,
        ogg: false,
        opus: false,
        wav: false,
        webAudio: HasWebAudio(),
        webm: false
    };
    if (result.audioData) {
        result.m4a = CanPlayM4A();
        result.mp3 = CanPlayMP3();
        result.ogg = CanPlayOGG();
        result.opus = CanPlayOpus();
        result.wav = CanPlayWAV();
        result.webm = CanPlayWebM();
    }
    return result;
}

export { GetAudio };
