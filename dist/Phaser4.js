(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Phaser4 = {}));
}(this, (function (exports) { 'use strict';

    function GetElement(target) {
        let element;
        if (target) {
            if (typeof target === 'string') {
                element = document.getElementById(target);
            }
            else if (typeof target === 'object' && target.nodeType === 1) {
                element = target;
            }
        }
        if (!element) {
            element = document.body;
        }
        return element;
    }

    function AddToDOM(element, parent) {
        const target = GetElement(parent);
        target.appendChild(element);
        return element;
    }

    function DOMContentLoaded(callback) {
        const readyState = document.readyState;
        if (readyState === 'complete' || readyState === 'interactive') {
            callback();
            return;
        }
        const check = () => {
            document.removeEventListener('deviceready', check, true);
            document.removeEventListener('DOMContentLoaded', check, true);
            window.removeEventListener('load', check, true);
            callback();
        };
        if (!document.body) {
            window.setTimeout(check, 20);
        }
        else if (window.hasOwnProperty('cordova')) {
            document.addEventListener('deviceready', check, true);
        }
        else {
            document.addEventListener('DOMContentLoaded', check, true);
            window.addEventListener('load', check, true);
        }
    }

    function ParseXML(data) {
        let xml;
        try {
            const parser = new DOMParser();
            xml = parser.parseFromString(data, 'text/xml');
            if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
                return null;
            }
            else {
                return xml;
            }
        }
        catch (error) {
            return null;
        }
    }

    function RemoveFromDOM(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddToDOM: AddToDOM,
        DOMContentLoaded: DOMContentLoaded,
        GetElement: GetElement,
        ParseXML: ParseXML,
        RemoveFromDOM: RemoveFromDOM
    });

    let _audioElement;
    function CanPlayAudioType(type, audioElement) {
        if (!audioElement) {
            if (!_audioElement) {
                _audioElement = document.createElement('audio');
            }
            audioElement = _audioElement;
        }
        return (audioElement && audioElement.canPlayType(type) !== '');
    }

    function CanPlayM4A(audioElement) {
        return (CanPlayAudioType('audio/x-m4a', audioElement) ||
            CanPlayAudioType('audio/aac', audioElement));
    }

    function CanPlayMP3(audioElement) {
        return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
    }

    function CanPlayOGG(audioElement) {
        return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
    }

    function CanPlayOpus(audioElement) {
        return (CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) ||
            CanPlayAudioType('audio/webm; codecs="opus"', audioElement));
    }

    function CanPlayWAV(audioElement) {
        return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
    }

    function CanPlayWebM(audioElement) {
        return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
    }

    function HasAudio() {
        return (window && window.hasOwnProperty('Audio'));
    }

    function HasWebAudio() {
        return (window &&
            (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext')));
    }

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

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanPlayAudioType: CanPlayAudioType,
        CanPlayM4A: CanPlayM4A,
        CanPlayMP3: CanPlayMP3,
        CanPlayOGG: CanPlayOGG,
        CanPlayOpus: CanPlayOpus,
        CanPlayWAV: CanPlayWAV,
        CanPlayWebM: CanPlayWebM,
        GetAudio: GetAudio,
        HasAudio: HasAudio,
        HasWebAudio: HasWebAudio
    });

    function IsChrome() {
        const chrome = (/Chrome\/(\d+)/).test(navigator.userAgent);
        const chromeVersion = (chrome) ? parseInt(RegExp.$1, 10) : 0;
        return {
            chrome,
            chromeVersion
        };
    }

    function IsEdge() {
        const edge = (/Edge\/\d+/).test(navigator.userAgent);
        return {
            edge
        };
    }

    function IsFirefox() {
        const firefox = (/Firefox\D+(\d+)/).test(navigator.userAgent);
        const firefoxVersion = (firefox) ? parseInt(RegExp.$1, 10) : 0;
        return {
            firefox,
            firefoxVersion
        };
    }

    function IsMSIE() {
        const ie = (/MSIE (\d+\.\d+);/).test(navigator.userAgent);
        const ieVersion = (ie) ? parseInt(RegExp.$1, 10) : 0;
        return {
            ie,
            ieVersion
        };
    }

    function IsiOS() {
        const ua = navigator.userAgent;
        const result = {
            iOS: false,
            iOSVersion: 0,
            iPhone: false,
            iPad: false
        };
        if ((/iP[ao]d|iPhone/i).test(ua)) {
            const match = (/OS (\d+)/).exec(navigator.appVersion);
            result.iOS = true;
            result.iOSVersion = parseInt(match[0], 10);
            result.iPhone = (ua.toLowerCase().includes('iphone'));
            result.iPad = (ua.toLowerCase().includes('ipad'));
        }
        return result;
    }

    function IsMobileSafari() {
        const { iOS } = IsiOS();
        const mobileSafari = (navigator.userAgent.includes('AppleWebKit') && iOS);
        return {
            mobileSafari
        };
    }

    function IsOpera() {
        const opera = navigator.userAgent.includes('Opera');
        return {
            opera
        };
    }

    function IsWindowsPhone() {
        const ua = navigator.userAgent;
        return ((/Windows Phone/i).test(ua) || (/IEMobile/i).test(ua));
    }

    function IsSafari() {
        const ua = navigator.userAgent;
        const safari = (ua.includes('Safari') && !IsWindowsPhone());
        const safariVersion = ((/Version\/(\d+)\./).test(ua)) ? parseInt(RegExp.$1, 10) : 0;
        return {
            safari,
            safariVersion
        };
    }

    function IsSilk() {
        const silk = navigator.userAgent.includes('Silk');
        return {
            silk
        };
    }

    function IsTrident() {
        const trident = (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(navigator.userAgent);
        const tridentVersion = (trident) ? parseInt(RegExp.$1, 10) : 0;
        const tridentIEVersion = (trident) ? parseInt(RegExp.$3, 10) : 0;
        return {
            trident,
            tridentVersion,
            tridentIEVersion
        };
    }

    function GetBrowser() {
        const { chrome, chromeVersion } = IsChrome();
        const { edge } = IsEdge();
        const { firefox, firefoxVersion } = IsFirefox();
        let { ie, ieVersion } = IsMSIE();
        const { mobileSafari } = IsMobileSafari();
        const { opera } = IsOpera();
        const { safari, safariVersion } = IsSafari();
        const { silk } = IsSilk();
        const { trident, tridentVersion, tridentIEVersion } = IsTrident();
        if (trident) {
            ie = true;
            ieVersion = tridentIEVersion;
        }
        const result = {
            chrome,
            chromeVersion,
            edge,
            firefox,
            firefoxVersion,
            ie,
            ieVersion,
            mobileSafari,
            opera,
            safari,
            safariVersion,
            silk,
            trident,
            tridentVersion
        };
        return result;
    }

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetBrowser: GetBrowser,
        IsChrome: IsChrome,
        IsEdge: IsEdge,
        IsFirefox: IsFirefox,
        IsMobileSafari: IsMobileSafari,
        IsMSIE: IsMSIE,
        IsOpera: IsOpera,
        IsSafari: IsSafari,
        IsSilk: IsSilk,
        IsTrident: IsTrident
    });

    function IsAndroid() {
        return (navigator.userAgent.includes('Android'));
    }

    function IsChromeOS() {
        return (navigator.userAgent.includes('CrOS'));
    }

    function IsCordova() {
        return (window.hasOwnProperty('cordova'));
    }

    function IsCrosswalk() {
        return (navigator.userAgent.includes('Crosswalk'));
    }

    function IsEjecta() {
        return (window.hasOwnProperty('ejecta'));
    }

    function IsKindle() {
        const ua = navigator.userAgent;
        return ((ua.includes('Kindle') || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua)));
    }

    function IsLinux() {
        return (navigator.userAgent.includes('Linux'));
    }

    function IsMacOS() {
        const ua = navigator.userAgent;
        return (ua.includes('Mac OS') && !(ua.includes('like Mac OS')));
    }

    function IsNode() {
        return (typeof process !== 'undefined' && typeof process.versions === 'object' && process.versions.hasOwnProperty('node'));
    }

    function IsNodeWebkit() {
        return (IsNode() && !!process.versions.hasOwnProperty('node-webkit'));
    }

    function IsWebApp() {
        return (navigator.hasOwnProperty('standalone'));
    }

    function IsWindows() {
        return (navigator.userAgent.includes('Windows'));
    }

    function GetOS() {
        const ua = navigator.userAgent;
        const { iOS, iOSVersion, iPad, iPhone } = IsiOS();
        const result = {
            android: IsAndroid(),
            chromeOS: IsChromeOS(),
            cordova: IsCordova(),
            crosswalk: IsCrosswalk(),
            desktop: false,
            ejecta: IsEjecta(),
            iOS,
            iOSVersion,
            iPad,
            iPhone,
            kindle: IsKindle(),
            linux: IsLinux(),
            macOS: IsMacOS(),
            node: IsNode(),
            nodeWebkit: IsNodeWebkit(),
            pixelRatio: 1,
            webApp: IsWebApp(),
            windows: IsWindows(),
            windowsPhone: IsWindowsPhone()
        };
        if (result.windowsPhone) {
            result.android = false;
            result.iOS = false;
            result.macOS = false;
            result.windows = true;
        }
        const silk = ua.includes('Silk');
        if (result.windows || result.macOS || (result.linux && !silk) || result.chromeOS) {
            result.desktop = true;
        }
        if (result.windowsPhone || (((/Windows NT/i).test(ua)) && ((/Touch/i).test(ua)))) {
            result.desktop = false;
        }
        return result;
    }

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetOS: GetOS,
        IsAndroid: IsAndroid,
        IsChromeOS: IsChromeOS,
        IsCordova: IsCordova,
        IsCrosswalk: IsCrosswalk,
        IsEjecta: IsEjecta,
        IsiOS: IsiOS,
        IsKindle: IsKindle,
        IsLinux: IsLinux,
        IsMacOS: IsMacOS,
        IsNode: IsNode,
        IsNodeWebkit: IsNodeWebkit,
        IsWebApp: IsWebApp,
        IsWindows: IsWindows,
        IsWindowsPhone: IsWindowsPhone
    });

    let _videoElement;
    function CanPlayVideoType(type, videoElement) {
        if (!videoElement) {
            if (!_videoElement) {
                _videoElement = document.createElement('video');
            }
            videoElement = _videoElement;
        }
        return (videoElement && videoElement.canPlayType(type) !== '');
    }

    function CanPlayH264Video(videoElement) {
        return CanPlayVideoType('video/mp4; codecs="avc1.42E01E"', videoElement);
    }

    function CanPlayHLSVideo(videoElement) {
        return CanPlayVideoType('application/x-mpegURL; codecs="avc1.42E01E"', videoElement);
    }

    function CanPlayOGGVideo(videoElement) {
        return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
    }

    function CanPlayVP9Video(videoElement) {
        return CanPlayVideoType('video/webm; codecs="vp9"', videoElement);
    }

    function CanPlayWebMVideo(videoElement) {
        return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
    }

    function GetVideo() {
        return {
            h264Video: CanPlayH264Video(),
            hlsVideo: CanPlayHLSVideo(),
            oggVideo: CanPlayOGGVideo(),
            vp9Video: CanPlayVP9Video(),
            webmVideo: CanPlayWebMVideo()
        };
    }

    var index$4 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanPlayH264Video: CanPlayH264Video,
        CanPlayHLSVideo: CanPlayHLSVideo,
        CanPlayOGGVideo: CanPlayOGGVideo,
        CanPlayVP9Video: CanPlayVP9Video,
        CanPlayVideoType: CanPlayVideoType,
        CanPlayWebMVideo: CanPlayWebMVideo,
        GetVideo: GetVideo
    });

    var index$5 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Audio: index$1,
        Browser: index$2,
        OS: index$3,
        Video: index$4,
        CanPlayAudioType: CanPlayAudioType,
        CanPlayM4A: CanPlayM4A,
        CanPlayMP3: CanPlayMP3,
        CanPlayOGG: CanPlayOGG,
        CanPlayOpus: CanPlayOpus,
        CanPlayWAV: CanPlayWAV,
        CanPlayWebM: CanPlayWebM,
        GetAudio: GetAudio,
        HasAudio: HasAudio,
        HasWebAudio: HasWebAudio,
        GetBrowser: GetBrowser,
        IsChrome: IsChrome,
        IsEdge: IsEdge,
        IsFirefox: IsFirefox,
        IsMobileSafari: IsMobileSafari,
        IsMSIE: IsMSIE,
        IsOpera: IsOpera,
        IsSafari: IsSafari,
        IsSilk: IsSilk,
        IsTrident: IsTrident,
        GetOS: GetOS,
        IsAndroid: IsAndroid,
        IsChromeOS: IsChromeOS,
        IsCordova: IsCordova,
        IsCrosswalk: IsCrosswalk,
        IsEjecta: IsEjecta,
        IsiOS: IsiOS,
        IsKindle: IsKindle,
        IsLinux: IsLinux,
        IsMacOS: IsMacOS,
        IsNode: IsNode,
        IsNodeWebkit: IsNodeWebkit,
        IsWebApp: IsWebApp,
        IsWindows: IsWindows,
        IsWindowsPhone: IsWindowsPhone,
        CanPlayH264Video: CanPlayH264Video,
        CanPlayHLSVideo: CanPlayHLSVideo,
        CanPlayOGGVideo: CanPlayOGGVideo,
        CanPlayVP9Video: CanPlayVP9Video,
        CanPlayVideoType: CanPlayVideoType,
        CanPlayWebMVideo: CanPlayWebMVideo,
        GetVideo: GetVideo
    });

    function ClearEvent(emitter, event) {
        emitter.events.delete(event);
        return emitter;
    }

    function Emit(emitter, event, ...args) {
        if (!emitter.events.has(event)) {
            return false;
        }
        const listeners = emitter.events.get(event);
        for (const ee of listeners) {
            ee.callback.apply(ee.context, args);
            if (ee.once) {
                listeners.delete(ee);
            }
        }
        if (listeners.size === 0) {
            emitter.events.delete(event);
        }
        return true;
    }

    class EventEmitter {
        constructor() {
            this.events = new Map();
        }
    }

    class EventInstance {
        constructor(callback, context, once = false) {
            this.callback = callback;
            this.context = context;
            this.once = once;
        }
    }

    function GetEventNames(emitter) {
        return [...emitter.events.keys()];
    }

    function GetListenerCount(emitter, event) {
        const listeners = emitter.events.get(event);
        return (listeners) ? listeners.size : 0;
    }

    function GetListeners(emitter, event) {
        const out = [];
        const listeners = emitter.events.get(event);
        listeners.forEach(listener => {
            out.push(listener.callback);
        });
        return out;
    }

    function Off(emitter, event, callback, context, once) {
        const events = emitter.events;
        if (!callback) {
            events.delete(event);
        }
        else {
            const listeners = events.get(event);
            const hasContext = !context;
            const hasOnce = (once !== undefined);
            for (const listener of listeners) {
                if ((listener.callback === callback) &&
                    (hasContext && listener.context === console) &&
                    (hasOnce && listener.once === once)) {
                    listeners.delete(listener);
                }
            }
            if (listeners.size === 0) {
                events.delete(event);
            }
        }
        return emitter;
    }

    function On(emitter, event, callback, context = emitter, once = false) {
        if (typeof callback !== 'function') {
            throw new TypeError('Listener not a function');
        }
        const listener = new EventInstance(callback, context, once);
        const listeners = emitter.events.get(event);
        if (!listeners) {
            emitter.events.set(event, new Set([listener]));
        }
        else {
            listeners.add(listener);
        }
        return emitter;
    }

    function Once(emitter, event, callback, context = emitter) {
        return On(emitter, event, callback, context, true);
    }

    function RemoveAllListeners(emitter, event) {
        if (!event) {
            emitter.events.clear();
        }
        else {
            emitter.events.delete(event);
        }
    }

    var index$6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ClearEvent: ClearEvent,
        Emit: Emit,
        EventEmitter: EventEmitter,
        EventInstance: EventInstance,
        GetEventNames: GetEventNames,
        GetListenerCount: GetListenerCount,
        GetListeners: GetListeners,
        Off: Off,
        On: On,
        Once: Once,
        RemoveAllListeners: RemoveAllListeners
    });

    function GetChildIndex(parent, child) {
        return parent.children.indexOf(child);
    }

    function RemoveChild(parent, child) {
        const children = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex > -1) {
            children.splice(currentIndex, 1);
            child.parent = null;
        }
        return child;
    }

    function SetParent(parent, ...child) {
        child.forEach(entity => {
            if (entity.parent) {
                RemoveChild(entity.parent, entity);
            }
            entity.world = parent.world;
            entity.parent = parent;
        });
    }

    function Copy(src, target) {
        return target.set(src.a, src.b, src.c, src.d, src.tx, src.ty);
    }

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

    function AddChild(parent, child) {
        SetParent(parent, child);
        parent.children.push(child);
        UpdateWorldTransform(child);
        return child;
    }

    function AddChildAt(parent, index, child) {
        const children = parent.children;
        if (index >= 0 && index <= children.length) {
            SetParent(parent, child);
            children.splice(index, 0, child);
            UpdateWorldTransform(child);
        }
        return child;
    }

    function AddChildren(parent, ...children) {
        children.forEach(child => {
            SetParent(parent, child);
            parent.children.push(child);
            UpdateWorldTransform(child);
        });
        return children;
    }

    function AddChildrenAt(parent, index, ...children) {
        const parentChildren = parent.children;
        if (index >= 0 && index <= parentChildren.length) {
            children.reverse().forEach(child => {
                SetParent(parent, child);
                children.splice(index, 0, child);
                UpdateWorldTransform(child);
            });
        }
        return children;
    }

    function AddPosition(x, y, ...child) {
        child.forEach(entity => {
            entity.x += x;
            entity.y += y;
        });
    }

    function AddRotation(rotation, ...child) {
        child.forEach(entity => {
            entity.rotation += rotation;
        });
    }

    function AddScale(scaleX, scaleY, ...child) {
        child.forEach(entity => {
            entity.scaleX += scaleX;
            entity.scaleY += scaleY;
        });
    }

    function AddSkew(skewX, skewY, ...child) {
        child.forEach(entity => {
            entity.skewX += skewX;
            entity.skewY += skewY;
        });
    }

    function Contains(rect, x, y) {
        if (rect.width <= 0 || rect.height <= 0) {
            return false;
        }
        return (rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y);
    }

    class Rectangle {
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.set(x, y, width, height);
        }
        set(x = 0, y = 0, width = 0, height = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        }
        contains(x, y) {
            return Contains(this, x, y);
        }
        set right(value) {
            if (value <= this.x) {
                this.width = 0;
            }
            else {
                this.width = value - this.x;
            }
        }
        get right() {
            return this.x + this.width;
        }
        set bottom(value) {
            if (value <= this.y) {
                this.height = 0;
            }
            else {
                this.height = value - this.y;
            }
        }
        get bottom() {
            return this.y + this.height;
        }
    }

    class BoundsComponent {
        constructor(parent) {
            this.fixed = false;
            this.parent = parent;
            this.area = new Rectangle();
        }
        setArea(x, y, width, height) {
            this.area.set(x, y, width, height);
        }
        destroy() {
            this.parent = null;
            this.area = null;
        }
    }

    let instance;
    let frame = 0;
    const GameInstance = {
        get: () => {
            return instance;
        },
        set: (game) => {
            instance = game;
        },
        getFrame: () => {
            return frame;
        },
        setFrame: (current) => {
            frame = current;
        }
    };

    class DirtyComponent {
        constructor(parent) {
            this.render = true;
            this.update = true;
            this.frame = 0;
            this.parent = parent;
        }
        setRender() {
            this.render = true;
            this.frame = GameInstance.getFrame();
        }
        setUpdate() {
            this.update = true;
        }
        destroy() {
            this.parent = null;
        }
    }

    class InputComponent {
        constructor(parent) {
            this.enabled = false;
            this.enabledChildren = true;
            this.parent = parent;
        }
        destroy() {
            this.parent = null;
            this.hitArea = null;
        }
    }

    class Matrix2D {
        constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
            this.set(a, b, c, d, tx, ty);
        }
        set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        }
        identity() {
            return this.set();
        }
        toArray() {
            return [this.a, this.b, this.c, this.d, this.tx, this.ty];
        }
        fromArray(src) {
            return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
        }
    }

    function UpdateLocalTransform(gameObject) {
        const transformComponent = gameObject.transform;
        const local = transformComponent.local;
        const { rotation, skewX, skewY, scaleX, scaleY, x, y } = transformComponent;
        local.set(Math.cos(rotation + skewY) * scaleX, Math.sin(rotation + skewY) * scaleX, -Math.sin(rotation - skewX) * scaleY, Math.cos(rotation - skewX) * scaleY, x, y);
        UpdateWorldTransform(gameObject);
    }

    class TransformComponent {
        constructor(parent, x = 0, y = 0) {
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.skewX = 0;
            this.skewY = 0;
            this.originX = 0.5;
            this.originY = 0.5;
            this.width = 0;
            this.height = 0;
            this.parent = parent;
            this.local = new Matrix2D();
            this.world = new Matrix2D();
            this.x = x;
            this.y = y;
        }
        setSize(width, height) {
            this.width = width;
            this.height = height;
        }
        setWidth(value) {
            this.width = value;
        }
        setHeight(value) {
            this.height = value;
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
            UpdateWorldTransform(this.parent);
        }
        setX(value) {
            this.x = value;
            UpdateWorldTransform(this.parent);
        }
        setY(value) {
            this.y = value;
            UpdateWorldTransform(this.parent);
        }
        setOrigin(x, y) {
            this.originX = x;
            this.originY = y;
        }
        setOriginX(value) {
            this.originX = value;
        }
        setOriginY(value) {
            this.originX = value;
        }
        setSkew(x, y) {
            this.skewX = x;
            this.skewY = y;
            UpdateLocalTransform(this.parent);
        }
        setSkewX(value) {
            if (value !== this.skewX) {
                this.skewX = value;
                UpdateLocalTransform(this.parent);
            }
        }
        setSkewY(value) {
            if (value !== this.skewY) {
                this.skewY = value;
                UpdateLocalTransform(this.parent);
            }
        }
        setScale(x, y) {
            this.scaleX = x;
            this.scaleY = y;
            UpdateLocalTransform(this.parent);
        }
        setScaleX(value) {
            if (value !== this.scaleX) {
                this.scaleX = value;
                UpdateLocalTransform(this.parent);
            }
        }
        setScaleY(value) {
            if (value !== this.scaleY) {
                this.scaleY = value;
                UpdateLocalTransform(this.parent);
            }
        }
        setRotation(value) {
            if (value !== this.rotation) {
                this.rotation = value;
                UpdateLocalTransform(this.parent);
            }
        }
        destroy() {
            this.parent = null;
            this.local = null;
            this.world = null;
        }
    }

    function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
        const children = parent.children;
        if (endIndex === undefined) {
            endIndex = children.length;
        }
        const range = endIndex - beginIndex;
        if (range > 0 && range <= endIndex) {
            const removed = children.splice(beginIndex, range);
            removed.forEach(child => {
                child.parent = null;
            });
            return removed;
        }
        else {
            return [];
        }
    }

    function DestroyChildren(parent, beginIndex = 0, endIndex) {
        const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
        removed.forEach(child => {
            child.destroy();
        });
    }

    function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
        const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
        moved.forEach(child => {
            SetParent(newParent, child);
        });
        return moved;
    }

    class GameObject {
        constructor(x = 0, y = 0) {
            this.name = '';
            this.type = 'GameObject';
            this.willRender = true;
            this.willUpdate = true;
            this.visible = true;
            this.children = [];
            this.dirty = new DirtyComponent(this);
            this.transform = new TransformComponent(this, x, y);
            this.bounds = new BoundsComponent(this);
            this.input = new InputComponent(this);
        }
        isRenderable() {
            return (this.visible && this.willRender);
        }
        update(delta, time) {
            if (this.willUpdate) {
                const children = this.children;
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    if (child && child.willUpdate) {
                        child.update(delta, time);
                    }
                }
            }
        }
        get numChildren() {
            return this.children.length;
        }
        set width(value) {
            this.transform.setWidth(value);
        }
        get width() {
            return this.transform.width;
        }
        set height(value) {
            this.transform.setHeight(value);
        }
        get height() {
            return this.transform.height;
        }
        set x(value) {
            this.transform.setX(value);
        }
        get x() {
            return this.transform.x;
        }
        set y(value) {
            this.transform.setY(value);
        }
        get y() {
            return this.transform.y;
        }
        set originX(value) {
            this.transform.setOriginX(value);
        }
        get originX() {
            return this.transform.originX;
        }
        set originY(value) {
            this.transform.setOriginY(value);
        }
        get originY() {
            return this.transform.originY;
        }
        set skewX(value) {
            this.transform.setSkewX(value);
        }
        get skewX() {
            return this.transform.skewX;
        }
        set skewY(value) {
            this.transform.setSkewY(value);
        }
        get skewY() {
            return this.transform.skewY;
        }
        set scaleX(value) {
            this.transform.setScaleX(value);
        }
        get scaleX() {
            return this.transform.scaleX;
        }
        set scaleY(value) {
            this.transform.setScaleY(value);
        }
        get scaleY() {
            return this.transform.scaleY;
        }
        set rotation(value) {
            this.transform.setRotation(value);
        }
        get rotation() {
            return this.transform.rotation;
        }
        destroy(reparentChildren) {
            if (reparentChildren) {
                ReparentChildren(this, reparentChildren);
            }
            else {
                DestroyChildren(this);
            }
            this.transform.destroy();
            this.dirty.destroy();
            this.bounds.destroy();
            this.input.destroy();
            this.world = null;
            this.parent = null;
            this.children = null;
        }
    }

    class Container extends GameObject {
        constructor(x = 0, y = 0) {
            super(x, y);
            this._alpha = 1;
            this.type = 'Container';
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            if (value !== this._alpha) {
                this._alpha = value;
            }
        }
    }

    function SetFrame(texture, key, ...sprite) {
        const frame = texture.get(key);
        sprite.forEach(entity => {
            if (frame === entity.frame) {
                return;
            }
            entity.frame = frame;
            entity.transform.setSize(frame.sourceSizeWidth, frame.sourceSizeHeight);
            entity.bounds.setArea(entity.x, entity.y, entity.width, entity.height);
            const pivot = frame.pivot;
            if (pivot) {
                entity.transform.setOrigin(pivot.x, pivot.y);
            }
            const data = entity.vertexData;
            data[2] = frame.u0;
            data[3] = frame.v0;
            data[8] = frame.u0;
            data[9] = frame.v1;
            data[14] = frame.u1;
            data[15] = frame.v1;
            data[20] = frame.u1;
            data[21] = frame.v0;
            entity.dirty.setRender();
            entity.hasTexture = true;
        });
    }

    let gl;
    const GL = {
        get: () => {
            return gl;
        },
        set: (context) => {
            gl = context;
        }
    };

    function IsSizePowerOfTwo(width, height) {
        if (width < 1 || height < 1) {
            return false;
        }
        return ((width & (width - 1)) === 0) && ((height & (height - 1)) === 0);
    }

    function CreateGLTexture(source, width, height, potClamp = true, linear = true) {
        const gl = GL.get();
        if (!gl) {
            return;
        }
        const glTexture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        if (source) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            width = source.width;
            height = source.height;
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        const mode = (linear) ? gl.LINEAR : gl.NEAREST;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
        const pot = (source && IsSizePowerOfTwo(width, height));
        const wrap = (pot && potClamp) ? gl.REPEAT : gl.CLAMP_TO_EDGE;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
        if (pot) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        return glTexture;
    }

    function DeleteFramebuffer(framebuffer) {
        const gl = GL.get();
        if (gl.isFramebuffer(framebuffer)) {
            gl.deleteFramebuffer(framebuffer);
        }
    }

    function DeleteGLTexture(texture) {
        const gl = GL.get();
        if (!gl) {
            return;
        }
        if (gl.isTexture(texture)) {
            gl.deleteTexture(texture);
        }
    }

    class Frame {
        constructor(texture, key, x, y, width, height) {
            this.trimmed = false;
            this.texture = texture;
            this.key = key;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.updateUVs();
        }
        setPivot(x, y) {
            this.pivot = { x, y };
        }
        setSize(width, height) {
            this.width = width;
            this.height = height;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.updateUVs();
        }
        setSourceSize(width, height) {
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
        }
        setTrim(width, height, x, y, w, h) {
            this.trimmed = true;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.spriteSourceSizeX = x;
            this.spriteSourceSizeY = y;
            this.spriteSourceSizeWidth = w;
            this.spriteSourceSizeHeight = h;
        }
        updateUVs() {
            const { x, y, width, height } = this;
            const baseTextureWidth = this.texture.width;
            const baseTextureHeight = this.texture.height;
            this.u0 = x / baseTextureWidth;
            this.v0 = y / baseTextureHeight;
            this.u1 = (x + width) / baseTextureWidth;
            this.v1 = (y + height) / baseTextureHeight;
        }
    }

    function SetGLTextureFilterMode(texture, linear = true) {
        const gl = GL.get();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const mode = (linear) ? gl.LINEAR : gl.NEAREST;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
    }

    function UpdateGLTexture(source, dstTexture, flipY = false) {
        const gl = GL.get();
        const width = source.width;
        const height = source.height;
        if (width > 0 && height > 0) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, dstTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        }
    }

    class Texture {
        constructor(image, width, height) {
            this.key = '';
            this.glIndex = 0;
            this.glIndexCounter = -1;
            if (image) {
                width = image.width;
                height = image.height;
            }
            this.image = image;
            this.width = width;
            this.height = height;
            this.frames = new Map();
            this.data = {};
            this.add('__BASE', 0, 0, width, height);
        }
        add(key, x, y, width, height) {
            if (this.frames.has(key)) {
                return null;
            }
            const frame = new Frame(this, key, x, y, width, height);
            this.frames.set(key, frame);
            if (!this.firstFrame || this.firstFrame.key === '__BASE') {
                this.firstFrame = frame;
            }
            return frame;
        }
        get(key) {
            if (!key) {
                return this.firstFrame;
            }
            if (key instanceof Frame) {
                key = key.key;
            }
            let frame = this.frames.get(key);
            if (!frame) {
                console.warn('Texture.frame missing: ' + key);
                frame = this.firstFrame;
            }
            return frame;
        }
        getFrames(frames) {
            const output = [];
            frames.forEach((key) => {
                output.push(this.get(key));
            });
            return output;
        }
        getFramesInRange(prefix, start, end, zeroPad = 0, suffix = '') {
            const frameKeys = [];
            const diff = (start < end) ? 1 : -1;
            end += diff;
            for (let i = start; i !== end; i += diff) {
                frameKeys.push(prefix + i.toString().padStart(zeroPad, '0') + suffix);
            }
            return this.getFrames(frameKeys);
        }
        setSize(width, height) {
            this.width = width;
            this.height = height;
            const frame = this.frames.get('__BASE');
            frame.setSize(width, height);
        }
        setFilter(linear) {
            SetGLTextureFilterMode(this.glTexture, linear);
        }
        createGL() {
            if (this.glTexture) {
                DeleteGLTexture(this.glTexture);
            }
            this.glTexture = CreateGLTexture(this.image);
        }
        updateGL() {
            if (!this.glTexture) {
                this.glTexture = CreateGLTexture(this.image);
            }
            else {
                UpdateGLTexture(this.image, this.glTexture);
            }
        }
        destroy() {
            this.frames.clear();
            this.image = null;
            this.firstFrame = null;
            this.data = null;
            DeleteGLTexture(this.glTexture);
            DeleteFramebuffer(this.glFramebuffer);
        }
    }

    let instance$1;
    const TextureManagerInstance = {
        get: () => {
            return instance$1;
        },
        set: (manager) => {
            instance$1 = manager;
        }
    };

    function SetTexture(key, frame, ...sprite) {
        if (!key) {
            return;
        }
        let texture;
        if (key instanceof Texture) {
            texture = key;
        }
        else {
            texture = TextureManagerInstance.get().get(key);
        }
        if (!texture) {
            console.warn('Invalid Texture key: ' + key);
            return;
        }
        else {
            if (!texture.glTexture) {
                texture.createGL();
            }
            sprite.forEach(entity => {
                entity.texture = texture;
                SetFrame(texture, frame, entity);
            });
        }
    }

    class Sprite extends Container {
        constructor(x, y, texture, frame) {
            super(x, y);
            this.hasTexture = false;
            this.prevTextureID = -1;
            this._tint = 0xffffff;
            this.vertexData = new Float32Array(24).fill(0);
            this.vertexColor = new Uint32Array(4).fill(4294967295);
            this.vertexAlpha = new Float32Array(4).fill(1);
            this.vertexTint = new Uint32Array(4).fill(0xffffff);
            this.type = 'Sprite';
            this.setTexture(texture, frame);
            this.bounds.setArea(x, y, this.width, this.height);
        }
        setTexture(key, frame) {
            SetTexture(key, frame, this);
            return this;
        }
        setFrame(key) {
            SetFrame(this.texture, key, this);
            return this;
        }
        isRenderable() {
            return (this.visible && this.willRender && this.hasTexture && this.alpha > 0);
        }
        updateVertices() {
            const data = this.vertexData;
            this.dirty.render = false;
            const frame = this.frame;
            const originX = this.originX;
            const originY = this.originY;
            let w0;
            let w1;
            let h0;
            let h1;
            const { a, b, c, d, tx, ty } = this.transform.world;
            if (frame.trimmed) {
                w1 = frame.spriteSourceSizeX - (originX * frame.sourceSizeWidth);
                w0 = w1 + frame.spriteSourceSizeWidth;
                h1 = frame.spriteSourceSizeY - (originY * frame.sourceSizeHeight);
                h0 = h1 + frame.spriteSourceSizeHeight;
            }
            else {
                w1 = -originX * frame.sourceSizeWidth;
                w0 = w1 + frame.sourceSizeWidth;
                h1 = -originY * frame.sourceSizeHeight;
                h0 = h1 + frame.sourceSizeHeight;
            }
            const x0 = (w1 * a) + (h1 * c) + tx;
            const y0 = (w1 * b) + (h1 * d) + ty;
            const x1 = (w1 * a) + (h0 * c) + tx;
            const y1 = (w1 * b) + (h0 * d) + ty;
            const x2 = (w0 * a) + (h0 * c) + tx;
            const y2 = (w0 * b) + (h0 * d) + ty;
            const x3 = (w0 * a) + (h1 * c) + tx;
            const y3 = (w0 * b) + (h1 * d) + ty;
            data[0] = x0;
            data[1] = y0;
            data[6] = x1;
            data[7] = y1;
            data[12] = x2;
            data[13] = y2;
            data[18] = x3;
            data[19] = y3;
            const boundsX = Math.min(x0, x1, x2, x3);
            const boundsY = Math.min(y0, y1, y2, y3);
            const boundsRight = Math.max(x0, x1, x2, x3);
            const boundsBottom = Math.max(y0, y1, y2, y3);
            this.bounds.setArea(boundsX, boundsY, boundsRight, boundsBottom);
        }
        get tint() {
            return this._tint;
        }
        set tint(value) {
            this._tint = value;
        }
        destroy(reparentChildren) {
            super.destroy(reparentChildren);
            this.texture = null;
            this.frame = null;
            this.hasTexture = false;
            this.vertexData = null;
            this.vertexColor = null;
            this.vertexAlpha = null;
            this.vertexTint = null;
        }
    }

    class AnimatedSprite extends Sprite {
        constructor(x, y, texture, frame) {
            super(x, y, texture, frame);
            this.type = 'AnimatedSprite';
            this.anims = new Map();
            this.animData = {
                currentAnim: '',
                currentFrames: [],
                frameIndex: 0,
                animSpeed: 0,
                nextFrameTime: 0,
                repeatCount: 0,
                isPlaying: false,
                yoyo: false,
                pendingStart: false,
                playingForward: true,
                delay: 0,
                repeatDelay: 0,
                onStart: null,
                onRepeat: null,
                onComplete: null
            };
        }
        stop() {
            const data = this.animData;
            data.isPlaying = false;
            data.currentAnim = '';
            if (data.onComplete) {
                data.onComplete(this, data.currentAnim);
            }
        }
        nextFrame() {
            const data = this.animData;
            data.frameIndex++;
            if (data.frameIndex === data.currentFrames.length) {
                if (data.yoyo) {
                    data.frameIndex--;
                    data.playingForward = false;
                }
                else if (data.repeatCount === -1 || data.repeatCount > 0) {
                    data.frameIndex = 0;
                    if (data.repeatCount !== -1) {
                        data.repeatCount--;
                    }
                    if (data.onRepeat) {
                        data.onRepeat(this, data.currentAnim);
                    }
                    data.nextFrameTime += data.repeatDelay;
                }
                else {
                    data.frameIndex--;
                    return this.stop();
                }
            }
            this.setFrame(data.currentFrames[data.frameIndex]);
            data.nextFrameTime += data.animSpeed;
        }
        prevFrame() {
            const data = this.animData;
            data.frameIndex--;
            if (data.frameIndex === -1) {
                if (data.repeatCount === -1 || data.repeatCount > 0) {
                    data.frameIndex = 0;
                    data.playingForward = true;
                    if (data.repeatCount !== -1) {
                        data.repeatCount--;
                    }
                    if (data.onRepeat) {
                        data.onRepeat(this, data.currentAnim);
                    }
                    data.nextFrameTime += data.repeatDelay;
                }
                else {
                    data.frameIndex = 0;
                    return this.stop();
                }
            }
            this.setFrame(data.currentFrames[data.frameIndex]);
            data.nextFrameTime += data.animSpeed;
        }
        update(delta, now) {
            super.update(delta, now);
            const data = this.animData;
            if (!data.isPlaying) {
                return;
            }
            data.nextFrameTime -= delta * 1000;
            data.nextFrameTime = Math.max(data.nextFrameTime, 0);
            if (data.nextFrameTime === 0) {
                if (data.pendingStart) {
                    if (data.onStart) {
                        data.onStart(this, data.currentAnim);
                    }
                    data.pendingStart = false;
                    data.nextFrameTime = data.animSpeed;
                }
                else if (data.playingForward) {
                    this.nextFrame();
                }
                else {
                    this.prevFrame();
                }
            }
        }
        get isPlaying() {
            return this.animData.isPlaying;
        }
        get isPlayingForward() {
            return (this.animData.isPlaying && this.animData.playingForward);
        }
        get currentAnimation() {
            return this.animData.currentAnim;
        }
        destroy(reparentChildren) {
            super.destroy(reparentChildren);
            this.anims.clear();
            this.animData = null;
        }
    }

    function BringChildToTop(parent, child) {
        const parentChildren = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex < parentChildren.length) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.push(child);
            child.dirty.setRender();
        }
        return child;
    }

    function CountMatchingChildren(parent, property, value) {
        const children = parent.children;
        let total = 0;
        children.forEach(child => {
            const descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                total++;
            }
        });
        return total;
    }

    function GetChildAt(parent, index) {
        const children = parent.children;
        if (index < 0 || index > children.length) {
            throw new Error('Index out of bounds: ' + index);
        }
        return children[index];
    }

    function GetChildren(parent, property, value) {
        const children = parent.children;
        if (!property) {
            return [...children];
        }
        const results = [];
        children.forEach(child => {
            const descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetFirstChild(parent, property, value) {
        const children = parent.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetLastChild(parent, property, value) {
        const children = parent.children;
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            const descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetRandomChild(parent, startIndex = 0, length) {
        const children = parent.children;
        if (!length) {
            length = children.length;
        }
        const randomIndex = startIndex + Math.floor(Math.random() * length);
        return children[randomIndex];
    }

    function MoveChildDown(parent, child) {
        const parentChildren = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex > 0) {
            const child2 = parentChildren[currentIndex - 1];
            const index2 = parentChildren.indexOf(child2);
            parentChildren[currentIndex] = child2;
            parentChildren[index2] = child;
            child.dirty.setRender();
            child2.dirty.setRender();
        }
        return child;
    }

    function MoveChildTo(parent, child, index) {
        const parentChildren = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
            throw new Error('Index out of bounds');
        }
        if (currentIndex !== index) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.splice(index, 0, child);
            child.dirty.setRender();
        }
        return child;
    }

    function MoveChildUp(parent, child) {
        const parentChildren = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex > 0) {
            const child2 = parentChildren[currentIndex + 1];
            const index2 = parentChildren.indexOf(child2);
            parentChildren[currentIndex] = child2;
            parentChildren[index2] = child;
            child.dirty.setRender();
            child2.dirty.setRender();
        }
        return child;
    }

    function NOOP() {
    }

    function AddTimer(world, config) {
        const { duration = 0, repeat = 0, delay = -1, onStart = NOOP, onUpdate = NOOP, onRepeat = NOOP, onComplete = NOOP } = config;
        const timer = {
            elapsed: duration,
            duration,
            repeat,
            delay,
            update: null,
            onStart,
            onUpdate,
            onRepeat,
            onComplete
        };
        timer.update = (delta) => {
            if (timer.delay > 0) {
                timer.delay -= delta;
                if (timer.delay < 0) {
                    timer.delay = 0;
                }
                else {
                    return false;
                }
            }
            if (timer.delay === 0) {
                timer.onStart();
                timer.delay = -1;
            }
            if (timer.delay === -1) {
                timer.elapsed -= delta;
                timer.onUpdate(delta, timer.elapsed / timer.duration);
                if (timer.elapsed <= 0) {
                    if (timer.repeat > 0) {
                        timer.repeat--;
                        timer.elapsed = timer.duration;
                        timer.onRepeat(timer.repeat);
                    }
                    else {
                        timer.elapsed = 0;
                        timer.onComplete();
                    }
                }
            }
            return (timer.elapsed === 0);
        };
        world.clock.events.add(timer);
    }

    function AngleBetween(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    function AngleBetweenPoints(point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x);
    }

    function AngleBetweenPointsY(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    function AngleBetweenY(x1, y1, x2, y2) {
        return Math.atan2(x2 - x1, y2 - y1);
    }

    const MATH_CONST = {
        PI2: Math.PI * 2,
        HALF_PI: Math.PI * 0.5,
        EPSILON: 1.0e-6,
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
        MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
    };

    function CounterClockwise(angle) {
        if (angle > Math.PI) {
            angle -= MATH_CONST.PI2;
        }
        return Math.abs((((angle + MATH_CONST.HALF_PI) % MATH_CONST.PI2) - MATH_CONST.PI2) % MATH_CONST.PI2);
    }

    function NormalizeAngle(angle) {
        angle = angle % MATH_CONST.PI2;
        if (angle >= 0) {
            return angle;
        }
        else {
            return angle + MATH_CONST.PI2;
        }
    }

    function ReverseAngle(angle) {
        return NormalizeAngle(angle + Math.PI);
    }

    function RotateAngleTo(currentAngle, targetAngle, lerp = 0.05) {
        if (currentAngle === targetAngle) {
            return currentAngle;
        }
        if (Math.abs(targetAngle - currentAngle) <= lerp || Math.abs(targetAngle - currentAngle) >= (MATH_CONST.PI2 - lerp)) {
            currentAngle = targetAngle;
        }
        else {
            if (Math.abs(targetAngle - currentAngle) > Math.PI) {
                if (targetAngle < currentAngle) {
                    targetAngle += MATH_CONST.PI2;
                }
                else {
                    targetAngle -= MATH_CONST.PI2;
                }
            }
            if (targetAngle > currentAngle) {
                currentAngle += lerp;
            }
            else if (targetAngle < currentAngle) {
                currentAngle -= lerp;
            }
        }
        return currentAngle;
    }

    function ShortestAngleBetween(angle1, angle2) {
        const difference = angle2 - angle1;
        if (difference === 0) {
            return 0;
        }
        const times = Math.floor((difference - (-180)) / 360);
        return difference - (times * 360);
    }

    function Wrap(value, min, max) {
        const range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    }

    function WrapAngle(angle) {
        return Wrap(angle, -Math.PI, Math.PI);
    }

    function WrapAngleDegrees(angle) {
        return Wrap(angle, -180, 180);
    }

    var index$7 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AngleBetween: AngleBetween,
        AngleBetweenPoints: AngleBetweenPoints,
        AngleBetweenPointsY: AngleBetweenPointsY,
        AngleBetweenY: AngleBetweenY,
        CounterClockwise: CounterClockwise,
        NormalizeAngle: NormalizeAngle,
        ReverseAngle: ReverseAngle,
        RotateAngleTo: RotateAngleTo,
        ShortestAngleBetween: ShortestAngleBetween,
        WrapAngle: WrapAngle,
        WrapAngleDegrees: WrapAngleDegrees
    });

    function ChebyshevDistance(x1, y1, x2, y2) {
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }

    function DistanceBetween(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function DistanceBetweenPoints(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function DistanceBetweenPointsSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    function DistancePower(x1, y1, x2, y2, pow = 2) {
        return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));
    }

    function DistanceSquared(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return dx * dx + dy * dy;
    }

    function SnakeDistance(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    var index$8 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ChebyshevDistance: ChebyshevDistance,
        DistanceBetween: DistanceBetween,
        DistanceBetweenPoints: DistanceBetweenPoints,
        DistanceBetweenPointsSquared: DistanceBetweenPointsSquared,
        DistancePower: DistancePower,
        DistanceSquared: DistanceSquared,
        SnakeDistance: SnakeDistance
    });

    function MoveToPosition(x, y, duration, ...child) {
        child.forEach(entity => {
            const px = entity.x;
            const py = entity.y;
            const azimuth = AngleBetween(px, py, x, y);
            const speed = DistanceBetween(px, py, x, y) / (duration / 1000);
            const incX = Math.cos(azimuth) * speed;
            const incY = Math.sin(azimuth) * speed;
            const moveHandler = (delta) => {
                delta /= 1000;
                entity.x += incX * delta;
                entity.y += incY * delta;
            };
            const world = entity.world;
            if (world) {
                AddTimer(world, {
                    duration,
                    onUpdate: moveHandler
                });
            }
        });
    }

    function RemoveChildAt(parent, index) {
        const children = parent.children;
        let child;
        if (index >= 0 && index < children.length) {
            const removed = children.splice(index, 1);
            if (removed[0]) {
                child = removed[0];
                child.parent = null;
            }
        }
        return child;
    }

    function RemoveChildren(parent, ...children) {
        children.forEach(child => {
            RemoveChild(parent, child);
        });
    }

    function RemoveChildrenAt(parent, ...index) {
        const children = parent.children;
        const removed = [];
        index.sort((a, b) => a - b);
        index.reverse().forEach(entity => {
            const child = GetChildAt(parent, entity);
            if (child) {
                children.splice(entity, 1);
                child.parent = null;
                removed.push(child);
            }
        });
        return removed;
    }

    function RotateChildrenLeft(parent, total = 1) {
        const parentChildren = parent.children;
        let child = null;
        for (let i = 0; i < total; i++) {
            child = parentChildren.shift();
            parentChildren.push(child);
            child.dirty.setRender();
        }
        return child;
    }

    function RotateChildrenRight(parent, total = 1) {
        const parentChildren = parent.children;
        let child = null;
        for (let i = 0; i < total; i++) {
            child = parentChildren.pop();
            parentChildren.unshift(child);
            child.dirty.setRender();
        }
        return child;
    }

    function SendChildToBack(parent, child) {
        const parentChildren = parent.children;
        const currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex > 0) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.unshift(child);
            child.dirty.setRender();
        }
        return child;
    }

    function SetBounds(x, y, width, height, ...child) {
        child.forEach(entity => {
            entity.bounds.setArea(x, y, width, height);
        });
    }

    function SetName(name, ...child) {
        child.forEach(entity => {
            entity.name = name;
        });
    }

    function SetOrigin(originX, originY, ...child) {
        child.forEach(entity => {
            entity.transform.setOrigin(originX, originY);
        });
    }

    function SetPosition(x, y, ...child) {
        child.forEach(entity => {
            entity.transform.setPosition(x, y);
        });
    }

    function SetRotation(rotation, ...child) {
        child.forEach(entity => {
            entity.rotation = rotation;
        });
    }

    function SetScale(scaleX, scaleY, ...child) {
        child.forEach(entity => {
            entity.transform.setScale(scaleX, scaleY);
        });
    }

    function SetSize(width, height, ...child) {
        child.forEach(entity => {
            entity.transform.setSize(width, height);
        });
    }

    function SetSkew(skewX, skewY, ...child) {
        child.forEach(entity => {
            entity.transform.setSkew(skewX, skewY);
        });
    }

    function SetType(type, ...child) {
        child.forEach(entity => {
            entity.type = type;
        });
    }

    function SetVisible(visible, ...child) {
        child.forEach(entity => {
            entity.visible = visible;
        });
    }

    function SetWorld(world, ...child) {
        child.forEach(entity => {
            entity.world = world;
        });
    }

    function ShuffleChildren(parent) {
        const children = parent.children;
        for (let i = children.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = children[i];
            children[i] = children[j];
            children[j] = temp;
            temp.dirty.setRender();
        }
        return children;
    }

    function SwapChildren(child1, child2) {
        if (child1.parent === child2.parent) {
            const children = child1.parent.children;
            const index1 = GetChildIndex(child1.parent, child1);
            const index2 = GetChildIndex(child2.parent, child2);
            if (index1 !== index2) {
                children[index1] = child2;
                children[index2] = child1;
            }
        }
    }

    function CreateCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    function CanvasTexture(width = 32, height = 32) {
        const ctx = CreateCanvas(width, height);
        return new Texture(ctx.canvas);
    }

    class Text extends Sprite {
        constructor(x, y, text = '', font, fillStyle) {
            super(x, y, CanvasTexture());
            this.splitRegExp = /(?:\r\n|\r|\n)/;
            this.padding = { left: 0, right: 0, top: 0, bottom: 0 };
            this.verticalAlign = 'ascent';
            this.lineSpacing = 0;
            this.font = '16px monospace';
            this.fillStyle = '#fff';
            this.strokeStyle = '';
            this.backgroundStyle = '';
            this.cornerRadius = 0;
            this.textAlign = 'left';
            this.textBaseline = 'alphabetic';
            this.lineWidth = 0;
            this.lineDash = [];
            this.antialias = false;
            this.type = 'Text';
            const game = GameInstance.get();
            this.resolution = game.renderer.resolution;
            this.canvas = this.texture.image;
            this.context = this.canvas.getContext('2d');
            this.texture.glTexture = CreateGLTexture(this.canvas, 32, 32, false, this.antialias);
            if (font) {
                this.font = font;
            }
            if (fillStyle) {
                this.fillStyle = fillStyle;
            }
            this.setText(text);
        }
        syncContext(canvas, ctx) {
            if (this.preRenderCallback) {
                this.preRenderCallback(canvas, ctx);
            }
            ctx.font = this.font;
            ctx.textBaseline = this.textBaseline;
            ctx.textAlign = this.textAlign;
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash(this.lineDash);
            ctx.imageSmoothingEnabled = this.antialias;
        }
        updateText() {
            const canvas = this.canvas;
            const ctx = this.context;
            const resolution = this.resolution;
            const lines = this._text.split(this.splitRegExp);
            const padding = this.padding;
            const fillStyle = this.fillStyle;
            const strokeStyle = this.strokeStyle;
            const strokeWidth = this.lineWidth;
            const lineSpacing = this.lineSpacing;
            const strokeWidthHalf = (strokeWidth > 0) ? strokeWidth / 2 : 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.syncContext(canvas, ctx);
            ctx.textAlign = 'start';
            let maxWidth = 0;
            let maxHeight = 0;
            let y = 0;
            const lineMetrics = [];
            const vAlignAscent = (this.verticalAlign === 'ascent');
            const metrics = ctx.measureText('|MÉq');
            const averageLineHeight = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;
            for (let i = 0; i < lines.length; i++) {
                const metrics = ctx.measureText(lines[i]);
                const left = metrics.actualBoundingBoxLeft;
                const right = metrics.actualBoundingBoxRight;
                let ascent = metrics.actualBoundingBoxAscent;
                let descent = metrics.actualBoundingBoxDescent;
                if ((!ascent && !descent) || lines[i] === '') {
                    ascent = averageLineHeight;
                    descent = 0;
                }
                const lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
                const lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;
                if (vAlignAscent) {
                    y += ascent + strokeWidthHalf;
                    if (i > 0) {
                        y += lineSpacing + strokeWidthHalf;
                    }
                    maxHeight = y + descent + strokeWidthHalf;
                }
                else {
                    y = maxHeight + ((lineHeight - descent) - strokeWidthHalf);
                    maxHeight += lineHeight;
                    if (i < lines.length - 1) {
                        maxHeight += lineSpacing;
                    }
                }
                maxWidth = Math.max(maxWidth, lineWidth);
                lineMetrics.push({ lineWidth, lineHeight, ascent, descent, left, right, y });
            }
            maxWidth += padding.left + padding.right;
            maxHeight += padding.top + padding.bottom;
            const displayWidth = (this.fixedWidth) ? this.fixedWidth : maxWidth;
            const displayHeight = (this.fixedHeight) ? this.fixedHeight : maxHeight;
            const canvasWidth = Math.ceil(displayWidth * resolution);
            const canvasHeight = Math.ceil(displayHeight * resolution);
            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                this.texture.setSize(displayWidth, displayHeight);
                this.transform.setSize(displayWidth, displayHeight);
            }
            ctx.save();
            ctx.scale(resolution, resolution);
            this.syncContext(canvas, ctx);
            const backgroundStyle = this.backgroundStyle;
            if (backgroundStyle) {
                ctx.save();
                ctx.fillStyle = backgroundStyle;
                ctx.strokeStyle = backgroundStyle;
                const cornerRadius = this.cornerRadius;
                const halfRadius = (cornerRadius > 0) ? cornerRadius / 2 : 0;
                if (cornerRadius) {
                    ctx.lineWidth = cornerRadius;
                    ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
                }
                ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
                ctx.restore();
            }
            const textAlign = this.textAlign;
            const isCenter = (textAlign === 'center');
            const isRight = (textAlign === 'right' || textAlign === 'end');
            const yOffset = ((displayHeight - maxHeight) / 2) + padding.top;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const metrics = lineMetrics[i];
                let tx = padding.left + metrics.left + strokeWidthHalf;
                const ty = yOffset + metrics.y;
                if (isCenter) {
                    tx = displayWidth / 2;
                }
                else if (isRight) {
                    tx = displayWidth - strokeWidthHalf;
                }
                if (strokeStyle) {
                    ctx.strokeText(line, tx, ty);
                }
                if (fillStyle) {
                    ctx.fillText(line, tx, ty);
                }
            }
            ctx.restore();
            this.texture.updateGL();
            this.dirty.setRender();
            return this;
        }
        get text() {
            return this._text;
        }
        set text(value) {
            this.setText(value);
        }
        setText(value = '') {
            if (Array.isArray(value)) {
                value = value.join('\n');
            }
            if (value !== this._text) {
                this._text = value.toString();
                this.updateText();
            }
            return this;
        }
        destroy(reparentChildren) {
            this.texture.destroy();
            this.fillStyle = null;
            this.strokeStyle = null;
            this.backgroundStyle = null;
            this.canvas = null;
            this.context = null;
            super.destroy(reparentChildren);
        }
    }

    var index$9 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddChild: AddChild,
        AddChildAt: AddChildAt,
        AddChildren: AddChildren,
        AddChildrenAt: AddChildrenAt,
        AddPosition: AddPosition,
        AddRotation: AddRotation,
        AddScale: AddScale,
        AddSkew: AddSkew,
        AnimatedSprite: AnimatedSprite,
        BringChildToTop: BringChildToTop,
        Container: Container,
        CountMatchingChildren: CountMatchingChildren,
        DestroyChildren: DestroyChildren,
        GameObject: GameObject,
        GetChildAt: GetChildAt,
        GetChildIndex: GetChildIndex,
        GetChildren: GetChildren,
        GetFirstChild: GetFirstChild,
        GetLastChild: GetLastChild,
        GetRandomChild: GetRandomChild,
        MoveChildDown: MoveChildDown,
        MoveChildTo: MoveChildTo,
        MoveChildUp: MoveChildUp,
        MoveToPosition: MoveToPosition,
        RemoveChild: RemoveChild,
        RemoveChildAt: RemoveChildAt,
        RemoveChildren: RemoveChildren,
        RemoveChildrenAt: RemoveChildrenAt,
        RemoveChildrenBetween: RemoveChildrenBetween,
        ReparentChildren: ReparentChildren,
        RotateChildrenLeft: RotateChildrenLeft,
        RotateChildrenRight: RotateChildrenRight,
        SendChildToBack: SendChildToBack,
        SetBounds: SetBounds,
        SetName: SetName,
        SetOrigin: SetOrigin,
        SetParent: SetParent,
        SetPosition: SetPosition,
        SetRotation: SetRotation,
        SetScale: SetScale,
        SetSize: SetSize,
        SetSkew: SetSkew,
        SetType: SetType,
        SetVisible: SetVisible,
        SetWorld: SetWorld,
        ShuffleChildren: ShuffleChildren,
        Sprite: Sprite,
        SwapChildren: SwapChildren,
        Text: Text
    });

    function FuzzyCeil(value, epsilon = 0.0001) {
        return Math.ceil(value - epsilon);
    }

    function FuzzyEqual(a, b, epsilon = 0.0001) {
        return Math.abs(a - b) < epsilon;
    }

    function FuzzyFloor(value, epsilon = 0.0001) {
        return Math.floor(value + epsilon);
    }

    function FuzzyGreaterThan(a, b, epsilon = 0.0001) {
        return a > b - epsilon;
    }

    function FuzzyLessThan(a, b, epsilon = 0.0001) {
        return a < b + epsilon;
    }

    var index$a = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FuzzyCeil: FuzzyCeil,
        FuzzyEqual: FuzzyEqual,
        FuzzyFloor: FuzzyFloor,
        FuzzyGreaterThan: FuzzyGreaterThan,
        FuzzyLessThan: FuzzyLessThan
    });

    function Factorial(value) {
        if (value === 0) {
            return 1;
        }
        let res = value;
        while (--value) {
            res *= value;
        }
        return res;
    }

    function Bernstein(n, i) {
        return Factorial(n) / Factorial(i) / Factorial(n - i);
    }

    function BezierInterpolation(v, k) {
        let b = 0;
        const n = v.length - 1;
        for (let i = 0; i <= n; i++) {
            b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Bernstein(n, i);
        }
        return b;
    }

    function CatmullRom(t, p0, p1, p2, p3) {
        const v0 = (p2 - p0) * 0.5;
        const v1 = (p3 - p1) * 0.5;
        const t2 = t * t;
        const t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }

    function CatmullRomInterpolation(v, k) {
        const m = v.length - 1;
        let f = m * k;
        let i = Math.floor(f);
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor(f = m * (1 + k));
            }
            return CatmullRom(f - i, v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m]);
        }
        else {
            if (k < 0) {
                return v[0] - (CatmullRom(-f, v[0], v[0], v[1], v[1]) - v[0]);
            }
            if (k > 1) {
                return v[m] - (CatmullRom(f - m, v[m], v[m], v[m - 1], v[m - 1]) - v[m]);
            }
            return CatmullRom(f - i, v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2]);
        }
    }

    function P0(t, p) {
        const k = 1 - t;
        return k * k * k * p;
    }
    function P1(t, p) {
        const k = 1 - t;
        return 3 * k * k * t * p;
    }
    function P2(t, p) {
        return 3 * (1 - t) * t * t * p;
    }
    function P3(t, p) {
        return t * t * t * p;
    }
    function CubicBezierInterpolation(t, p0, p1, p2, p3) {
        return P0(t, p0) + P1(t, p1) + P2(t, p2) + P3(t, p3);
    }

    function Linear(p0, p1, t) {
        return (p1 - p0) * t + p0;
    }

    function LinearInterpolation(v, k) {
        const m = v.length - 1;
        const f = m * k;
        const i = Math.floor(f);
        if (k < 0) {
            return Linear(v[0], v[1], f);
        }
        else if (k > 1) {
            return Linear(v[m], v[m - 1], m - f);
        }
        else {
            return Linear(v[i], v[(i + 1 > m) ? m : i + 1], f - i);
        }
    }

    function P0$1(t, p) {
        const k = 1 - t;
        return k * k * p;
    }
    function P1$1(t, p) {
        return 2 * (1 - t) * t * p;
    }
    function P2$1(t, p) {
        return t * t * p;
    }
    function QuadraticBezierInterpolation(t, p0, p1, p2) {
        return P0$1(t, p0) + P1$1(t, p1) + P2$1(t, p2);
    }

    function SmoothStep(x, min, max) {
        if (x <= min) {
            return 0;
        }
        if (x >= max) {
            return 1;
        }
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }

    function SmoothStepInterpolation(t, min, max) {
        return min + (max - min) * SmoothStep(t, 0, 1);
    }

    function SmootherStep(x, min, max) {
        x = Math.max(0, Math.min(1, (x - min) / (max - min)));
        return x * x * x * (x * (x * 6 - 15) + 10);
    }

    function SmootherStepInterpolation(t, min, max) {
        return min + (max - min) * SmootherStep(t, 0, 1);
    }

    var index$b = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BezierInterpolation: BezierInterpolation,
        CatmullRomInterpolation: CatmullRomInterpolation,
        CubicBezierInterpolation: CubicBezierInterpolation,
        LinearInterpolation: LinearInterpolation,
        QuadraticBezierInterpolation: QuadraticBezierInterpolation,
        SmoothStepInterpolation: SmoothStepInterpolation,
        SmootherStepInterpolation: SmootherStepInterpolation
    });

    function Add(target, src) {
        target.a += src.a;
        target.b += src.b;
        target.c += src.c;
        target.d += src.d;
        target.tx += src.tx;
        target.ty += src.ty;
        return target;
    }

    function CopyToContext(src, context) {
        const { a, b, c, d, tx, ty } = src;
        context.transform(a, b, c, d, tx, ty);
        return context;
    }

    function Determinant(src) {
        const { a, b, c, d } = src;
        return (a * d) - (b * c);
    }

    function Frobenius(src) {
        return (Math.hypot(src.a, src.b, src.c, src.d, src.tx, src.ty, 1));
    }

    class Vec2 {
        constructor(x = 0, y = 0) {
            this.set(x, y);
        }
        set(x = 0, y = 0) {
            this.x = x;
            this.y = y;
            return this;
        }
        getArray() {
            return [this.x, this.y];
        }
        fromArray(src) {
            return this.set(src[0], src[1]);
        }
    }

    function GlobalToLocal(mat, x, y, outPoint = new Vec2()) {
        const { a, b, c, d, tx, ty } = mat;
        const id = 1 / ((a * d) + (c * -b));
        outPoint.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
        outPoint.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);
        return outPoint;
    }

    function ITRS(target, x, y, angle, scaleX, scaleY) {
        if (angle === 0) {
            return target.set(1, 0, 0, 1, x, y);
        }
        else {
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            return target.set(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
    }

    function ITRSS(target, x, y, angle = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {
        if (angle === 0) {
            return target.set(1, 0, 0, 1, x, y);
        }
        else {
            return target.set(Math.cos(angle + skewY) * scaleX, Math.sin(angle + skewY) * scaleX, -Math.sin(angle - skewX) * scaleY, Math.cos(angle - skewX) * scaleY, x, y);
        }
    }

    function Invert(target) {
        const { a, b, c, d, tx, ty } = target;
        let determinant = a * d - b * c;
        if (determinant) {
            determinant = 1 / determinant;
            target.set(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
        }
        return target;
    }

    function LocalToGlobal(mat, x, y, outPoint = new Vec2()) {
        const { a, b, c, d, tx, ty } = mat;
        outPoint.x = (a * x) + (c * y) + tx;
        outPoint.y = (b * x) + (d * y) + ty;
        return outPoint;
    }

    function Multiply(target, src) {
        const { a: a0, b: b0, c: c0, d: d0, tx: tx0, ty: ty0 } = target;
        const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = src;
        target.a = a0 * a1 + c0 * b1;
        target.b = b0 * a1 + d0 * b1;
        target.c = a0 * c1 + c0 * d1;
        target.d = b0 * c1 + d0 * d1;
        target.tx = a0 * tx1 + c0 * ty1 + tx0;
        target.ty = b0 * tx1 + d0 * ty1 + ty0;
        return target;
    }

    function MultiplyScalar(target, scale) {
        target.a *= scale;
        target.b *= scale;
        target.c *= scale;
        target.d *= scale;
        target.tx *= scale;
        target.ty *= scale;
        return target;
    }

    function MultiplyScalarAndAdd(target, src, scale) {
        const { a, b, c, d, tx, ty } = src;
        target.a += (a * scale);
        target.b += (b * scale);
        target.c += (c * scale);
        target.d += (d * scale);
        target.tx += (tx * scale);
        target.ty += (ty * scale);
        return target;
    }

    function Rotate(target, angle) {
        const { a, b, c, d, tx, ty } = target;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return target.set((a * cos) + (c * sin), (b * cos) + (d * sin), (a * -sin) + (c * cos), (b * -sin) + (d * cos), tx, ty);
    }

    function Scale(target, scaleX, scaleY) {
        target.a *= scaleX;
        target.b *= scaleX;
        target.c *= scaleY;
        target.d *= scaleY;
        return target;
    }

    function SetToContext(src, context) {
        const { a, b, c, d, tx, ty } = src;
        context.setTransform(a, b, c, d, tx, ty);
        return context;
    }

    function Skew(target, angleX, angleY) {
        target.b += Math.tan(angleX);
        target.c += Math.tan(angleY);
        return target;
    }

    function Subtract(target, src) {
        const { a, b, c, d, tx, ty } = src;
        target.a -= a;
        target.b -= b;
        target.c -= c;
        target.d -= d;
        target.tx -= tx;
        target.ty -= ty;
        return target;
    }

    function Translate(target, x, y) {
        const { a, b, c, d, tx, ty } = target;
        target.tx = (a * x) + (c * y) + tx;
        target.ty = (b * x) + (d * y) + ty;
        return target;
    }

    function Zero(target) {
        return target.set(0, 0, 0, 0, 0, 0);
    }

    var index$c = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Add: Add,
        Copy: Copy,
        CopyToContext: CopyToContext,
        Determinant: Determinant,
        Frobenius: Frobenius,
        GlobalToLocal: GlobalToLocal,
        Invert: Invert,
        ITRS: ITRS,
        ITRSS: ITRSS,
        LocalToGlobal: LocalToGlobal,
        Matrix2D: Matrix2D,
        Multiply: Multiply,
        MultiplyScalar: MultiplyScalar,
        MultiplyScalarAndAdd: MultiplyScalarAndAdd,
        Rotate: Rotate,
        Scale: Scale,
        SetToContext: SetToContext,
        Skew: Skew,
        Subtract: Subtract,
        Translate: Translate,
        Zero: Zero
    });

    function Add$1(a, b) {
        return new Matrix2D(a.a + b.a, a.b + b.b, a.c + b.c, a.c + b.c, a.tx + b.tx, a.ty + b.ty);
    }

    function Append(mat1, mat2, out = new Matrix2D()) {
        const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = mat1;
        const { a: a2, b: b2, c: c2, d: d2, tx: tx2, ty: ty2 } = mat2;
        return out.set((a2 * a1) + (b2 * c1), (a2 * b1) + (b2 * d1), (c2 * a1) + (d2 * c1), (c2 * b1) + (d2 * d1), (tx2 * a1) + (ty2 * c1) + tx1, (tx2 * b1) + (ty2 * d1) + ty1);
    }

    function Clone(src) {
        return new Matrix2D(src.a, src.b, src.c, src.d, src.tx, src.ty);
    }

    function Equals(a, b, epsilon = 0.000001) {
        const { a: a0, b: b0, c: c0, d: d0, tx: tx0, ty: ty0 } = a;
        const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = b;
        return (Math.abs(a0 - a1) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(a1)) &&
            Math.abs(b0 - b1) <= epsilon * Math.max(1, Math.abs(b0), Math.abs(b1)) &&
            Math.abs(c0 - c1) <= epsilon * Math.max(1, Math.abs(c0), Math.abs(c1)) &&
            Math.abs(d0 - d1) <= epsilon * Math.max(1, Math.abs(d0), Math.abs(d1)) &&
            Math.abs(tx0 - tx1) <= epsilon * Math.max(1, Math.abs(tx0), Math.abs(tx1)) &&
            Math.abs(ty0 - ty1) <= epsilon * Math.max(1, Math.abs(ty0), Math.abs(ty1)));
    }

    function ExactEquals(a, b) {
        return (a.a === b.a &&
            a.b === b.b &&
            a.c === b.c &&
            a.d === b.d &&
            a.tx === b.tx &&
            a.ty === b.ty);
    }

    function Rotate$1(src, angle) {
        const { a, b, c, d } = src;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return new Matrix2D(a * cos + c * sin, b * cos + d * sin, a * -sin + c * cos, b * -sin + d * cos);
    }

    function FromRotation(angle) {
        return Rotate$1(new Matrix2D(), angle);
    }

    function Scale$1(src, scaleX, scaleY) {
        return new Matrix2D(src.a * scaleX, src.b * scaleX, src.c * scaleY, src.d * scaleY);
    }

    function FromScaling(scaleX, scaleY = scaleX) {
        return Scale$1(new Matrix2D(), scaleX, scaleY);
    }

    function Translate$1(src, x, y) {
        const { a, b, c, d, tx, ty } = src;
        const dtx = a * x + c * y + tx;
        const dty = b * x + d * y + ty;
        return new Matrix2D(1, 0, 0, 1, dtx, dty);
    }

    function FromTranslation(x, y) {
        return Translate$1(new Matrix2D(), x, y);
    }

    function Identity() {
        return new Matrix2D();
    }

    function Invert$1(src) {
        const { a, b, c, d, tx, ty } = src;
        let determinant = (a * d) - (b * c);
        if (!determinant) {
            return null;
        }
        determinant = 1 / determinant;
        return new Matrix2D(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
    }

    function Multiply$1(a, b) {
        const { a: a0, b: b0, c: c0, d: d0, tx: tx0, ty: ty0 } = a;
        const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = b;
        return new Matrix2D(a0 * a1 + c0 * b1, b0 * a1 + d0 * b1, a0 * c1 + c0 * d1, b0 * c1 + d0 * d1, a0 * tx1 + c0 * ty1 + tx0, b0 * tx1 + d0 * ty1 + ty0);
    }

    function MultiplyScalar$1(src, scale) {
        return new Matrix2D(src.a * scale, src.b * scale, src.c * scale, src.d * scale, src.tx * scale, src.ty * scale);
    }

    function MultiplyScalarAndAdd$1(a, b, scale) {
        return new Matrix2D(a.a + (b.a * scale), a.b + (b.b * scale), a.c + (b.c * scale), a.d + (b.d * scale), a.tx + (b.tx * scale), a.ty + (b.ty * scale));
    }

    function Subtract$1(a, b) {
        return new Matrix2D(a.a - b.a, a.b - b.b, a.c - b.c, a.c - b.c, a.tx - b.tx, a.ty - b.ty);
    }

    function Zero$1() {
        return new Matrix2D(0, 0, 0, 0, 0, 0);
    }

    var index$d = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Add: Add$1,
        Append: Append,
        Clone: Clone,
        Equals: Equals,
        ExactEquals: ExactEquals,
        FromRotation: FromRotation,
        FromScaling: FromScaling,
        FromTranslation: FromTranslation,
        Identity: Identity,
        Invert: Invert$1,
        Multiply: Multiply$1,
        MultiplyScalar: MultiplyScalar$1,
        MultiplyScalarAndAdd: MultiplyScalarAndAdd$1,
        Rotate: Rotate$1,
        Scale: Scale$1,
        Subtract: Subtract$1,
        Translate: Translate$1,
        Zero: Zero$1
    });

    function GetPowerOfTwo(value) {
        const index = Math.log(value) / 0.6931471805599453;
        return (1 << Math.ceil(index));
    }

    function IsValuePowerOfTwo(value) {
        return (value > 0 && (value & (value - 1)) === 0);
    }

    var index$e = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetPowerOfTwo: GetPowerOfTwo,
        IsSizePowerOfTwo: IsSizePowerOfTwo,
        IsValuePowerOfTwo: IsValuePowerOfTwo
    });

    function SnapCeil(value, gap, start = 0, divide = false) {
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.ceil(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    function SnapFloor(value, gap, start = 0, divide = false) {
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.floor(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    function SnapTo(value, gap, start = 0, divide = false) {
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.round(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    var index$f = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SnapCeil: SnapCeil,
        SnapFloor: SnapFloor,
        SnapTo: SnapTo
    });

    var index$g = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Vec2: Vec2
    });

    function Average(values) {
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
            sum += (+values[i]);
        }
        return sum / values.length;
    }

    function Between(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function CeilTo(value, place = 0, base = 10) {
        const p = Math.pow(base, -place);
        return Math.ceil(value * p) / p;
    }

    function Clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function DegToRad(degrees) {
        return degrees * MATH_CONST.DEG_TO_RAD;
    }

    function Difference(a, b) {
        return Math.abs(a - b);
    }

    function FloatBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function FloorTo(value, place = 0, base = 10) {
        const p = Math.pow(base, -place);
        return Math.floor(value * p) / p;
    }

    function FromPercent(percent, min, max) {
        percent = Clamp(percent, 0, 1);
        return (max - min) * percent;
    }

    function GetSpeed(distance, time) {
        return (distance / time) / 1000;
    }

    function MaxAdd(value, amount, max) {
        return Math.min(value + amount, max);
    }

    function MinSub(value, amount, min) {
        return Math.max(value - amount, min);
    }

    function Percent(value, min, max, upperMax) {
        if (max === undefined) {
            max = min + 1;
        }
        let percentage = (value - min) / (max - min);
        if (percentage > 1) {
            if (upperMax !== undefined) {
                percentage = ((upperMax - value)) / (upperMax - max);
                if (percentage < 0) {
                    percentage = 0;
                }
            }
            else {
                percentage = 1;
            }
        }
        else if (percentage < 0) {
            percentage = 0;
        }
        return percentage;
    }

    function RadToDeg(radians) {
        return radians * MATH_CONST.RAD_TO_DEG;
    }

    function RoundAwayFromZero(value) {
        return (value > 0) ? Math.ceil(value) : Math.floor(value);
    }

    function RoundTo(value, place = 0, base = 10) {
        const p = Math.pow(base, -place);
        return Math.round(value * p) / p;
    }

    function SinCosTableGenerator(length, sinAmp = 1, cosAmp = 1, frequency = 1) {
        frequency *= Math.PI / length;
        const cos = [];
        const sin = [];
        for (let c = 0; c < length; c++) {
            cosAmp -= sinAmp * frequency;
            sinAmp += cosAmp * frequency;
            cos[c] = cosAmp;
            sin[c] = sinAmp;
        }
        return {
            sin,
            cos,
            length
        };
    }

    function ToXY(index, width, height, out = new Vec2()) {
        let x = 0;
        let y = 0;
        const total = width * height;
        if (index > 0 && index <= total) {
            if (index > width - 1) {
                y = Math.floor(index / width);
                x = index - (y * width);
            }
            else {
                x = index;
            }
            out.set(x, y);
        }
        return out;
    }

    function TransformXY(x, y, positionX, positionY, rotation, scaleX, scaleY, output = new Vec2()) {
        const radianSin = Math.sin(rotation);
        const radianCos = Math.cos(rotation);
        const a = radianCos * scaleX;
        const b = radianSin * scaleX;
        const c = -radianSin * scaleY;
        const d = radianCos * scaleY;
        const id = 1 / ((a * d) + (c * -b));
        output.x = (d * id * x) + (-c * id * y) + (((positionY * c) - (positionX * d)) * id);
        output.y = (a * id * y) + (-b * id * x) + (((-positionY * a) + (positionX * b)) * id);
        return output;
    }

    function Within(a, b, tolerance) {
        return (Math.abs(a - b) <= tolerance);
    }

    var index$h = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Angle: index$7,
        Distance: index$8,
        Fuzzy: index$a,
        Interpolation: index$b,
        Matrix2d: index$c,
        Matrix2dFuncs: index$d,
        Pow2: index$e,
        Snap: index$f,
        Vec2: index$g,
        Average: Average,
        Bernstein: Bernstein,
        Between: Between,
        CatmullRom: CatmullRom,
        CeilTo: CeilTo,
        Clamp: Clamp,
        MATH_CONST: MATH_CONST,
        DegToRad: DegToRad,
        Difference: Difference,
        Factorial: Factorial,
        FloatBetween: FloatBetween,
        FloorTo: FloorTo,
        FromPercent: FromPercent,
        GetSpeed: GetSpeed,
        Linear: Linear,
        MaxAdd: MaxAdd,
        MinSub: MinSub,
        Percent: Percent,
        RadToDeg: RadToDeg,
        RoundAwayFromZero: RoundAwayFromZero,
        RoundTo: RoundTo,
        SinCosTableGenerator: SinCosTableGenerator,
        SmootherStep: SmootherStep,
        SmoothStep: SmoothStep,
        ToXY: ToXY,
        TransformXY: TransformXY,
        Within: Within,
        Wrap: Wrap
    });

    const Arne16 = [
        '#000',
        '#9D9D9D',
        '#FFF',
        '#BE2633',
        '#E06F8B',
        '#493C2B',
        '#A46422',
        '#EB8931',
        '#F7E26B',
        '#2F484E',
        '#44891A',
        '#A3CE27',
        '#1B2632',
        '#005784',
        '#31A2F2',
        '#B2DCEF'
    ];

    const C64 = [
        '#000',
        '#fff',
        '#8b4131',
        '#7bbdc5',
        '#8b41ac',
        '#6aac41',
        '#3931a4',
        '#d5de73',
        '#945a20',
        '#5a4100',
        '#bd736a',
        '#525252',
        '#838383',
        '#acee8b',
        '#7b73de',
        '#acacac'
    ];

    const CGA = [
        '#000',
        '#2234d1',
        '#0c7e45',
        '#44aacc',
        '#8a3622',
        '#5c2e78',
        '#aa5c3d',
        '#b5b5b5',
        '#5e606e',
        '#4c81fb',
        '#6cd947',
        '#7be2f9',
        '#eb8a60',
        '#e23d69',
        '#ffd93f',
        '#fff'
    ];

    const JMP = [
        '#000',
        '#191028',
        '#46af45',
        '#a1d685',
        '#453e78',
        '#7664fe',
        '#833129',
        '#9ec2e8',
        '#dc534b',
        '#e18d79',
        '#d6b97b',
        '#e9d8a1',
        '#216c4b',
        '#d365c8',
        '#afaab9',
        '#f5f4eb'
    ];

    const MSX = [
        '#000',
        '#191028',
        '#46af45',
        '#a1d685',
        '#453e78',
        '#7664fe',
        '#833129',
        '#9ec2e8',
        '#dc534b',
        '#e18d79',
        '#d6b97b',
        '#e9d8a1',
        '#216c4b',
        '#d365c8',
        '#afaab9',
        '#fff'
    ];

    const PICO8 = [
        '#000',
        '#1D2B53',
        '#7E2553',
        '#008751',
        '#AB5236',
        '#5F574F',
        '#C2C3C7',
        '#FFF1E8',
        '#FF004D',
        '#FFA300',
        '#FFEC27',
        '#00E436',
        '#29ADFF',
        '#83769C',
        '#FF77A8',
        '#FFCCAA'
    ];

    var index$i = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Arne16: Arne16,
        C64: C64,
        CGA: CGA,
        JMP: JMP,
        MSX: MSX,
        PICO8: PICO8
    });

    function AtlasParser(texture, data) {
        let frames;
        if (Array.isArray(data.textures)) {
            frames = data.textures[0].frames;
        }
        else if (Array.isArray(data.frames)) {
            frames = data.frames;
        }
        else if (data.hasOwnProperty('frames')) {
            frames = Object.values(data.frames);
        }
        else {
            console.warn('Invalid Texture Atlas JSON');
        }
        if (frames) {
            let newFrame;
            for (let i = 0; i < frames.length; i++) {
                const src = frames[i];
                newFrame = texture.add(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);
                if (src.trimmed) {
                    newFrame.setTrim(src.sourceSize.w, src.sourceSize.h, src.spriteSourceSize.x, src.spriteSourceSize.y, src.spriteSourceSize.w, src.spriteSourceSize.h);
                }
                else {
                    newFrame.setSourceSize(src.sourceSize.w, src.sourceSize.h);
                }
                if (src.rotated) ;
                if (src.anchor) {
                    newFrame.setPivot(src.anchor.x, src.anchor.y);
                }
            }
        }
    }

    function GetValue(node, attribute) {
        return parseInt(node.getAttribute(attribute), 10);
    }
    function BitmapTextParser(texture, xml, frame) {
        const xSpacing = 0;
        const ySpacing = 0;
        const info = xml.getElementsByTagName('info')[0];
        const common = xml.getElementsByTagName('common')[0];
        const data = {
            font: info.getAttribute('face'),
            size: GetValue(info, 'size'),
            lineHeight: GetValue(common, 'lineHeight') + ySpacing,
            chars: {}
        };
        const letters = xml.getElementsByTagName('char');
        for (let i = 0; i < letters.length; i++) {
            const node = letters[i];
            const charCode = GetValue(node, 'id');
            const x = GetValue(node, 'x');
            const y = GetValue(node, 'y');
            const width = GetValue(node, 'width');
            const height = GetValue(node, 'height');
            data.chars[charCode] =
                {
                    x,
                    y,
                    width,
                    height,
                    xOffset: GetValue(node, 'xoffset'),
                    yOffset: GetValue(node, 'yoffset'),
                    xAdvance: GetValue(node, 'xadvance') + xSpacing,
                    kerning: {}
                };
            texture.add(charCode, x, y, width, height);
        }
        const kernings = xml.getElementsByTagName('kerning');
        for (let i = 0; i < kernings.length; i++) {
            const kern = kernings[i];
            const first = GetValue(kern, 'first');
            const second = GetValue(kern, 'second');
            const amount = GetValue(kern, 'amount');
            data.chars[second].kerning[first] = amount;
        }
        return data;
    }

    function SpriteSheetParser(texture, x, y, width, height, frameConfig) {
        const { frameWidth = null, endFrame = -1, margin = 0, spacing = 0 } = frameConfig;
        let { frameHeight = null, startFrame = 0 } = frameConfig;
        if (!frameHeight) {
            frameHeight = frameWidth;
        }
        if (frameWidth === null) {
            throw new Error('SpriteSheetParser: Invalid frameWidth');
        }
        const row = Math.floor((width - margin + spacing) / (frameWidth + spacing));
        const column = Math.floor((height - margin + spacing) / (frameHeight + spacing));
        let total = row * column;
        if (total === 0) {
            console.warn('SpriteSheetParser: Frame config will result in zero frames');
        }
        if (startFrame > total || startFrame < -total) {
            startFrame = 0;
        }
        if (startFrame < 0) {
            startFrame = total + startFrame;
        }
        if (endFrame !== -1) {
            total = startFrame + (endFrame + 1);
        }
        let fx = margin;
        let fy = margin;
        let ax = 0;
        let ay = 0;
        for (let i = 0; i < total; i++) {
            ax = 0;
            ay = 0;
            const w = fx + frameWidth;
            const h = fy + frameHeight;
            if (w > width) {
                ax = w - width;
            }
            if (h > height) {
                ay = h - height;
            }
            texture.add(i, x + fx, y + fy, frameWidth - ax, frameHeight - ay);
            fx += frameWidth + spacing;
            if (fx + frameWidth > width) {
                fx = margin;
                fy += frameHeight + spacing;
            }
        }
    }

    var index$j = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AtlasParser: AtlasParser,
        BitmapTextParser: BitmapTextParser,
        SpriteSheetParser: SpriteSheetParser
    });

    function GridTexture(color1, color2, width = 32, height = 32, cols = 2, rows = 2) {
        const ctx = CreateCanvas(width, height);
        const colWidth = width / cols;
        const rowHeight = height / rows;
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = color2;
        for (let y = 0; y < rows; y++) {
            for (let x = (y % 2); x < cols; x += 2) {
                ctx.fillRect(x * colWidth, y * rowHeight, colWidth, rowHeight);
            }
        }
        return new Texture(ctx.canvas);
    }

    function PixelTexture(config) {
        const { data = [], palette = Arne16, pixelWidth = 1, pixelHeight = pixelWidth, preRender = null, postRender = null } = config;
        let { canvas = null, resizeCanvas = true, clearCanvas = true } = config;
        const width = Math.floor(Math.abs(data[0].length * pixelWidth));
        const height = Math.floor(Math.abs(data.length * pixelHeight));
        if (!canvas) {
            canvas = CreateCanvas(width, height).canvas;
            resizeCanvas = false;
            clearCanvas = false;
        }
        if (resizeCanvas) {
            canvas.width = width;
            canvas.height = height;
        }
        const ctx = canvas.getContext('2d');
        if (clearCanvas) {
            ctx.clearRect(0, 0, width, height);
        }
        if (preRender) {
            preRender(canvas, ctx);
        }
        for (let y = 0; y < data.length; y++) {
            const row = data[y];
            for (let x = 0; x < row.length; x++) {
                const d = row[x];
                if (d !== '.' && d !== ' ') {
                    ctx.fillStyle = palette[parseInt('0x' + d.toUpperCase())];
                    ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }
        if (postRender) {
            postRender(canvas, ctx);
        }
        return new Texture(canvas);
    }

    function CreateFramebuffer(width, height) {
        const gl = GL.get();
        const texture = CreateGLTexture(null, width, height);
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return [texture, framebuffer];
    }

    function Ortho(width, height, near = -1, far = 1) {
        const m00 = -2 * (1 / -width);
        const m11 = -2 * (1 / height);
        const m22 = 2 * (1 / (near - far));
        return new Float32Array([m00, 0, 0, 0, 0, m11, 0, 0, 0, 0, m22, 0, -1, 1, 0, 1]);
    }

    function UploadBuffers(sprite, F32, U32, offset, setTexture = true) {
        if (sprite.dirty.render) {
            sprite.updateVertices();
        }
        const data = sprite.vertexData;
        const textureIndex = sprite.texture.glIndex;
        if (setTexture && textureIndex !== sprite.prevTextureID) {
            sprite.prevTextureID = textureIndex;
            data[4] = textureIndex;
            data[10] = textureIndex;
            data[16] = textureIndex;
            data[22] = textureIndex;
        }
        F32.set(data, offset);
        const color = sprite.vertexColor;
        U32[offset + 5] = color[0];
        U32[offset + 11] = color[2];
        U32[offset + 17] = color[3];
        U32[offset + 23] = color[1];
    }

    function RenderWebGL(sprite, renderer, shader, startActiveTexture) {
        const texture = sprite.texture;
        if (texture.glIndexCounter < startActiveTexture) {
            renderer.requestTexture(texture);
        }
        if (shader.count === shader.batchSize) {
            shader.flush();
        }
        UploadBuffers(sprite, shader.vertexViewF32, shader.vertexViewU32, shader.count * shader.quadElementSize);
        shader.count++;
    }

    class RenderTexture extends Texture {
        constructor(renderer, width = 256, height = width) {
            super(null, width, height);
            this.renderer = renderer;
            const [texture, framebuffer] = CreateFramebuffer(width, height);
            this.glTexture = texture;
            this.glFramebuffer = framebuffer;
            this.projectionMatrix = Ortho(width, height);
            this.cameraMatrix = new Float32Array([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, height, 0, 1]);
        }
        cls() {
            const renderer = this.renderer;
            const gl = renderer.gl;
            renderer.reset(this.glFramebuffer, this.width, this.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            renderer.reset();
            return this;
        }
        batchStart() {
            const renderer = this.renderer;
            renderer.reset(this.glFramebuffer, this.width, this.height);
            renderer.shader.bind(this.projectionMatrix, this.cameraMatrix);
            return this;
        }
        batchDraw(sprites) {
            const renderer = this.renderer;
            const shader = renderer.shader;
            for (let i = 0, len = sprites.length; i < len; i++) {
                RenderWebGL(sprites[i], renderer, shader, renderer.startActiveTexture);
            }
            return this;
        }
        batchEnd() {
            const renderer = this.renderer;
            const shader = renderer.shader;
            shader.flush();
            renderer.reset();
            return this;
        }
        draw(...sprites) {
            this.batchStart();
            this.batchDraw(sprites);
            this.batchEnd();
            return this;
        }
    }

    function SolidColorTexture(color = 'rgba(0,0,0,0)', width = 32, height = 32) {
        const ctx = CreateCanvas(width, height);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return new Texture(ctx.canvas);
    }

    var index$k = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanvasTexture: CanvasTexture,
        GridTexture: GridTexture,
        PixelTexture: PixelTexture,
        RenderTexture: RenderTexture,
        SolidColorTexture: SolidColorTexture
    });

    class TextureManager {
        constructor() {
            this.textures = new Map();
            this.createDefaultTextures();
            TextureManagerInstance.set(this);
        }
        createDefaultTextures() {
            this.add('__BLANK', new Texture(CreateCanvas(32, 32).canvas));
            const missing = CreateCanvas(32, 32);
            missing.strokeStyle = '#0f0';
            missing.moveTo(0, 0);
            missing.lineTo(32, 32);
            missing.stroke();
            missing.strokeRect(0.5, 0.5, 31, 31);
            this.add('__MISSING', new Texture(missing.canvas));
        }
        get(key) {
            const textures = this.textures;
            if (textures.has(key)) {
                return textures.get(key);
            }
            else {
                return textures.get('__MISSING');
            }
        }
        has(key) {
            return this.textures.has(key);
        }
        add(key, source) {
            let texture;
            const textures = this.textures;
            if (!textures.has(key)) {
                if (source instanceof Texture) {
                    texture = source;
                }
                else {
                    texture = new Texture(source);
                }
                texture.key = key;
                if (!texture.glTexture) {
                    texture.createGL();
                }
                textures.set(key, texture);
            }
            return texture;
        }
    }

    var index$l = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CreateCanvas: CreateCanvas,
        Frame: Frame,
        Palettes: index$i,
        Parsers: index$j,
        Types: index$k,
        Texture: Texture,
        TextureManager: TextureManager
    });

    function AddDelayedCall(world, delay, callback) {
        AddTimer(world, {
            duration: 0,
            delay,
            onComplete: callback
        });
    }

    class Clock {
        constructor(world) {
            this.world = world;
            this.timeScale = 1;
            this.events = new Set();
        }
        update(delta, time) {
            this.now = time;
            delta *= this.timeScale;
            this.events.forEach(timer => {
                if (timer.update(delta)) {
                    this.events.delete(timer);
                }
            });
        }
    }

    var index$m = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddDelayedCall: AddDelayedCall,
        AddTimer: AddTimer,
        Clock: Clock,
        NOOP: NOOP
    });

    let bgColor = 0;
    function GetBackgroundColor() {
        return bgColor;
    }

    let title = 'Phaser';
    let url = 'https://phaser4.io';
    let color = '#fff';
    let background = 'linear-gradient(#3e0081 40%, #00bcc3)';
    function GetBanner() {
        {
            const game = GameInstance.get();
            const version =  ' v' + game.VERSION ;
            console.log(`%c${title}${version}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, '');
        }
    }

    let _width = 800;
    let _height = 600;
    let _resolution = 1;
    function GetWidth() {
        return _width;
    }
    function GetHeight() {
        return _height;
    }
    function GetResolution() {
        return _resolution;
    }

    let instance$2;
    function GetRenderer() {
        return instance$2;
    }

    let _scenes = [];
    function GetScenes() {
        return _scenes;
    }

    let _contextAttributes = {
        alpha: false,
        antialias: false,
        depth: false,
        premultipliedAlpha: false
    };
    function GetWebGLContext() {
        return _contextAttributes;
    }

    const fragTemplate = [
        'precision mediump float;',
        'void main(void){',
        'float test = 0.1;',
        '%forloop%',
        'gl_FragColor = vec4(0.0);',
        '}'
    ].join('\n');
    function GenerateSrc(maxIfs) {
        let src = '';
        for (let i = 0; i < maxIfs; ++i) {
            if (i > 0) {
                src += '\nelse ';
            }
            if (i < maxIfs - 1) {
                src += `if(test == ${i}.0){}`;
            }
        }
        return src;
    }
    function CheckShaderMaxIfStatements(maxIfs, gl) {
        const shader = gl.createShader(gl.FRAGMENT_SHADER);
        while (true) {
            const fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));
            gl.shaderSource(shader, fragmentSrc);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                maxIfs = (maxIfs / 2) | 0;
            }
            else {
                break;
            }
        }
        return maxIfs;
    }

    const shaderSource = {
        fragmentShader: `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

void main (void)
{
    vec4 color;
    %forloop%

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`,
        vertexShader: `
precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aTextureId;
attribute vec4 aTintColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

void main (void)
{
    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vTintColor = aTintColor;

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);
}`
    };
    class MultiTextureQuadShader {
        constructor(renderer, config = {}) {
            this.attribs = { aVertexPosition: 0, aTextureCoord: 0, aTextureId: 0, aTintColor: 0 };
            this.uniforms = { uProjectionMatrix: 0, uCameraMatrix: 0, uTexture: 0 };
            this.dataSize = 4;
            this.indexSize = 4;
            this.vertexElementSize = 6;
            this.vertexByteSize = 6 * 4;
            this.quadByteSize = (6 * 4) * 4;
            this.quadElementSize = 6 * 4;
            this.quadIndexSize = 6;
            this.renderer = renderer;
            this.gl = renderer.gl;
            const { batchSize = 4096, fragmentShader = shaderSource.fragmentShader, vertexShader = shaderSource.vertexShader } = config;
            this.batchSize = batchSize;
            this.bufferByteSize = batchSize * this.quadByteSize;
            this.createBuffers();
            this.createShaders(fragmentShader, vertexShader);
            this.count = 0;
        }
        createBuffers() {
            let ibo = [];
            for (let i = 0; i < (this.batchSize * this.indexSize); i += this.indexSize) {
                ibo.push(i + 0, i + 1, i + 2, i + 2, i + 3, i + 0);
            }
            this.data = new ArrayBuffer(this.bufferByteSize);
            this.index = new Uint16Array(ibo);
            this.vertexViewF32 = new Float32Array(this.data);
            this.vertexViewU32 = new Uint32Array(this.data);
            const gl = this.gl;
            this.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            ibo = [];
        }
        createShaders(fragmentShaderSource, vertexShaderSource) {
            const gl = this.gl;
            const maxTextures = this.renderer.maxTextures;
            let src = '';
            if (maxTextures > 1) {
                for (let i = 0; i < maxTextures; i++) {
                    if (i > 0) {
                        src += '\nelse ';
                    }
                    if (i < maxTextures - 1) {
                        src += `if (vTextureId < ${i}.5)`;
                    }
                    src += '\n{';
                    src += `\n  color = texture2D(uTexture[${i}], vTextureCoord);`;
                    src += '\n}';
                }
                fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
                fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
            }
            else {
                src = 'color = texture2D(uTexture[0], vTextureCoord);';
            }
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragmentShaderSource);
            gl.compileShader(fragmentShader);
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertexShaderSource);
            gl.compileShader(vertexShader);
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);
            this.program = program;
            for (const key of Object.keys(this.attribs)) {
                const location = gl.getAttribLocation(program, key);
                gl.enableVertexAttribArray(location);
                this.attribs[key] = location;
            }
            for (const key of Object.keys(this.uniforms)) {
                this.uniforms[key] = gl.getUniformLocation(program, key);
            }
        }
        bind(projectionMatrix, cameraMatrix) {
            const gl = this.gl;
            const renderer = this.renderer;
            const uniforms = this.uniforms;
            gl.useProgram(this.program);
            gl.uniformMatrix4fv(uniforms.uProjectionMatrix, false, projectionMatrix);
            gl.uniformMatrix4fv(uniforms.uCameraMatrix, false, cameraMatrix);
            gl.uniform1iv(uniforms.uTexture, renderer.textureIndex);
            this.bindBuffers(this.indexBuffer, this.vertexBuffer);
        }
        bindBuffers(indexBuffer, vertexBuffer) {
            const gl = this.gl;
            const stride = this.vertexByteSize;
            const attribs = this.attribs;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(attribs.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
            gl.vertexAttribPointer(attribs.aTextureCoord, 2, gl.FLOAT, false, stride, 8);
            gl.vertexAttribPointer(attribs.aTextureId, 1, gl.FLOAT, false, stride, 16);
            gl.vertexAttribPointer(attribs.aTintColor, 4, gl.UNSIGNED_BYTE, true, stride, 20);
            this.count = 0;
        }
        draw(count) {
            const gl = this.gl;
            const offset = count * this.quadByteSize;
            if (offset === this.bufferByteSize) {
                gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);
            }
            else {
                const view = this.vertexViewF32.subarray(0, offset);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
            }
            gl.drawElements(gl.TRIANGLES, count * this.quadIndexSize, gl.UNSIGNED_SHORT, 0);
        }
        flush() {
            const count = this.count;
            if (count === 0) {
                return false;
            }
            this.draw(count);
            this.prevCount = count;
            this.count = 0;
            this.renderer.flushTotal++;
            return true;
        }
    }

    class WebGLRenderer {
        constructor() {
            this.clearColor = [0, 0, 0, 1];
            this.flushTotal = 0;
            this.maxTextures = 0;
            this.currentActiveTexture = 0;
            this.startActiveTexture = 0;
            this.tempTextures = [];
            this.clearBeforeRender = true;
            this.optimizeRedraw = true;
            this.autoResize = true;
            this.contextLost = false;
            this.width = GetWidth();
            this.height = GetHeight();
            this.resolution = GetResolution();
            this.setBackgroundColor(GetBackgroundColor());
            const canvas = document.createElement('canvas');
            canvas.addEventListener('webglcontextlost', (event) => this.onContextLost(event), false);
            canvas.addEventListener('webglcontextrestored', () => this.onContextRestored(), false);
            this.canvas = canvas;
            this.initContext();
            this.shader = new MultiTextureQuadShader(this);
        }
        initContext() {
            const gl = this.canvas.getContext('webgl', GetWebGLContext());
            GL.set(gl);
            this.gl = gl;
            this.elementIndexExtension = gl.getExtension('OES_element_index_uint');
            this.getMaxTextures();
            if (this.shader) {
                this.shader.gl = gl;
            }
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
            this.resize(this.width, this.height, this.resolution);
        }
        resize(width, height, resolution = 1) {
            this.width = width * resolution;
            this.height = height * resolution;
            this.resolution = resolution;
            const canvas = this.canvas;
            canvas.width = this.width;
            canvas.height = this.height;
            if (this.autoResize) {
                canvas.style.width = this.width / resolution + 'px';
                canvas.style.height = this.height / resolution + 'px';
            }
            this.gl.viewport(0, 0, this.width, this.height);
            this.projectionMatrix = Ortho(width, height);
        }
        onContextLost(event) {
            event.preventDefault();
            this.contextLost = true;
        }
        onContextRestored() {
            this.contextLost = false;
            this.initContext();
        }
        setBackgroundColor(color) {
            const clearColor = this.clearColor;
            const r = color >> 16 & 0xFF;
            const g = color >> 8 & 0xFF;
            const b = color & 0xFF;
            const a = (color > 16777215) ? color >>> 24 : 255;
            clearColor[0] = r / 255;
            clearColor[1] = g / 255;
            clearColor[2] = b / 255;
            clearColor[3] = a / 255;
            return this;
        }
        getMaxTextures() {
            const gl = this.gl;
            const maxTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), gl);
            const tempTextures = this.tempTextures;
            if (tempTextures.length) {
                tempTextures.forEach(texture => {
                    gl.deleteTexture(texture);
                });
            }
            for (let texturesIndex = 0; texturesIndex < maxTextures; texturesIndex++) {
                const tempTexture = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0 + texturesIndex);
                gl.bindTexture(gl.TEXTURE_2D, tempTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
                tempTextures[texturesIndex] = tempTexture;
            }
            this.maxTextures = maxTextures;
            this.textureIndex = Array.from(Array(maxTextures).keys());
            this.activeTextures = Array(maxTextures);
            this.currentActiveTexture = 0;
        }
        reset(framebuffer = null, width = this.width, height = this.height) {
            const gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.viewport(0, 0, width, height);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            this.currentActiveTexture = 0;
            this.startActiveTexture++;
            this.flushTotal = 0;
        }
        render(renderData) {
            if (this.contextLost) {
                return;
            }
            const gl = this.gl;
            this.reset();
            if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
                return;
            }
            const shader = this.shader;
            const cls = this.clearColor;
            if (this.clearBeforeRender) {
                gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            const projectionMatrix = this.projectionMatrix;
            let prevCamera;
            const worlds = renderData.worldData;
            for (let i = 0; i < worlds.length; i++) {
                const { camera, renderList, numRendered } = worlds[i];
                if (!prevCamera || !ExactEquals(camera.worldTransform, prevCamera.worldTransform)) {
                    shader.flush();
                    shader.bind(projectionMatrix, camera.matrix);
                    prevCamera = camera;
                }
                for (let s = 0; s < numRendered; s++) {
                    RenderWebGL(renderList[s], this, shader, this.startActiveTexture);
                }
            }
            shader.flush();
        }
        resetTextures(texture) {
            const gl = this.gl;
            const active = this.activeTextures;
            active.fill(null);
            this.currentActiveTexture = 0;
            this.startActiveTexture++;
            if (texture) {
                active[0] = texture;
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
                this.currentActiveTexture = 1;
            }
        }
        requestTexture(texture) {
            const gl = this.gl;
            texture.glIndexCounter = this.startActiveTexture;
            if (this.currentActiveTexture < this.maxTextures) {
                this.activeTextures[this.currentActiveTexture] = texture;
                texture.glIndex = this.currentActiveTexture;
                gl.activeTexture(gl.TEXTURE0 + this.currentActiveTexture);
                gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
                this.currentActiveTexture++;
            }
            else {
                this.shader.flush();
                this.resetTextures(texture);
            }
        }
    }

    function CreateSceneRenderData() {
        return {
            gameFrame: 0,
            numTotalFrames: 0,
            numDirtyFrames: 0,
            numDirtyCameras: 0,
            worldData: []
        };
    }

    function ResetSceneRenderData(renderData, gameFrame = 0) {
        renderData.gameFrame = gameFrame;
        renderData.numTotalFrames = 0;
        renderData.numDirtyFrames = 0;
        renderData.numDirtyCameras = 0;
        renderData.worldData.length = 0;
    }

    let instance$3;
    const SceneManagerInstance = {
        get: () => {
            return instance$3;
        },
        set: (manager) => {
            instance$3 = manager;
        }
    };

    class SceneManager {
        constructor() {
            this.scenes = new Map();
            this.sceneIndex = 0;
            this.flush = false;
            this.renderResult = CreateSceneRenderData();
            this.game = GameInstance.get();
            SceneManagerInstance.set(this);
            Once(this.game, 'boot', () => this.boot());
        }
        boot() {
            GetScenes().forEach(scene => new scene());
        }
        update(delta, time) {
            for (const scene of this.scenes.values()) {
                Emit(scene, 'update', delta, time);
            }
        }
        render(gameFrame) {
            const results = this.renderResult;
            ResetSceneRenderData(results, gameFrame);
            for (const scene of this.scenes.values()) {
                Emit(scene, 'render', results);
            }
            if (this.flush) {
                results.numDirtyFrames++;
                this.flush = false;
            }
            return results;
        }
    }

    class Game extends EventEmitter {
        constructor(...settings) {
            super();
            this.VERSION = '4.0.0-beta1';
            this.isBooted = false;
            this.isPaused = false;
            this.willUpdate = true;
            this.willRender = true;
            this.lastTick = 0;
            this.frame = 0;
            GameInstance.set(this);
            DOMContentLoaded(() => this.boot(settings));
        }
        boot(settings) {
            settings.forEach(setting => setting());
            const renderer = GetRenderer();
            this.renderer = new renderer();
            this.textureManager = new TextureManager();
            this.sceneManager = new SceneManager();
            this.isBooted = true;
            GetBanner();
            Emit(this, 'boot');
            this.lastTick = performance.now();
            this.step(this.lastTick);
        }
        pause() {
            this.isPaused = true;
        }
        resume() {
            this.isPaused = false;
            this.lastTick = performance.now();
        }
        step(time) {
            const delta = time - this.lastTick;
            this.lastTick = time;
            if (!this.isPaused) {
                if (this.willUpdate) {
                    this.sceneManager.update(delta, time);
                }
                if (this.willRender) {
                    this.renderer.render(this.sceneManager.render(this.frame));
                }
            }
            this.frame++;
            GameInstance.setFrame(this.frame);
            requestAnimationFrame(now => this.step(now));
        }
        destroy() {
        }
    }

    class Loader extends EventEmitter {
        constructor() {
            super();
            this.baseURL = '';
            this.path = '';
            this.crossOrigin = 'anonymous';
            this.maxParallelDownloads = -1;
            this.isLoading = false;
            this.reset();
        }
        reset() {
            this.isLoading = false;
            this.queue = new Set();
            this.inflight = new Set();
            this.completed = new Set();
            this.progress = 0;
        }
        add(...file) {
            file.forEach(entity => {
                entity.loader = this;
                this.queue.add(entity);
            });
            return this;
        }
        start(onComplete) {
            if (this.isLoading) {
                return this;
            }
            this.completed.clear();
            this.progress = 0;
            if (this.queue.size > 0) {
                this.isLoading = true;
                this.onComplete = onComplete;
                Emit(this, 'start');
                this.nextFile();
            }
            else {
                this.progress = 1;
                Emit(this, 'complete');
                onComplete();
            }
            return this;
        }
        nextFile() {
            let limit = this.queue.size;
            if (this.maxParallelDownloads !== -1) {
                limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
            }
            if (limit) {
                const iterator = this.queue.values();
                while (limit > 0) {
                    const file = iterator.next().value;
                    this.inflight.add(file);
                    this.queue.delete(file);
                    file.load().then((file) => this.fileComplete(file)).catch((file) => this.fileError(file));
                    limit--;
                }
            }
            else if (this.inflight.size === 0) {
                this.stop();
            }
        }
        stop() {
            this.isLoading = false;
            Emit(this, 'complete', this.completed);
            this.onComplete();
            this.completed.clear();
        }
        updateProgress(file) {
            this.inflight.delete(file);
            this.completed.add(file);
            const totalCompleted = this.completed.size;
            const totalQueued = this.queue.size + this.inflight.size;
            if (totalCompleted > 0) {
                this.progress = totalCompleted / (totalCompleted + totalQueued);
            }
            Emit(this, 'progress', this.progress, totalCompleted, totalQueued);
            this.nextFile();
        }
        fileComplete(file) {
            Emit(this, 'filecomplete', file);
            this.updateProgress(file);
        }
        fileError(file) {
            Emit(this, 'fileerror', file);
            this.updateProgress(file);
        }
        totalFilesToLoad() {
            return this.queue.size + this.inflight.size;
        }
        setBaseURL(url = '') {
            if (url !== '' && url.substr(-1) !== '/') {
                url = url.concat('/');
            }
            this.baseURL = url;
            return this;
        }
        setPath(path = '') {
            if (path !== '' && path.substr(-1) !== '/') {
                path = path.concat('/');
            }
            this.path = path;
            return this;
        }
        setCORS(crossOrigin) {
            this.crossOrigin = crossOrigin;
            return this;
        }
        setMaxParallelDownloads(max) {
            this.maxParallelDownloads = max;
            return this;
        }
    }

    function GetConfigValue(config, property, defaultValue) {
        if (Object.prototype.hasOwnProperty.call(config, property)) {
            return config[property];
        }
        else {
            return defaultValue;
        }
    }

    function Install(scene, config = {}) {
        const sceneManager = SceneManagerInstance.get();
        const size = sceneManager.scenes.size;
        const sceneIndex = sceneManager.sceneIndex;
        const firstScene = (size === 0);
        if (typeof config === 'string') {
            scene.key = config;
        }
        else if (config || (!config && firstScene)) {
            scene.key = GetConfigValue(config, 'key', 'scene' + sceneIndex);
        }
        if (sceneManager.scenes.has(scene.key)) {
            console.warn('Scene key already in use: ' + scene.key);
        }
        else {
            sceneManager.scenes.set(scene.key, scene);
            sceneManager.flush = true;
            sceneManager.sceneIndex++;
        }
    }

    class Scene {
        constructor(config) {
            this.game = GameInstance.get();
            this.events = new Map();
            Install(this, config);
        }
    }

    exports.DOM = index;
    exports.Device = index$5;
    exports.Events = index$6;
    exports.Game = Game;
    exports.GameObjects = index$9;
    exports.Loader = Loader;
    exports.Math = index$h;
    exports.Scene = Scene;
    exports.Textures = index$l;
    exports.Time = index$m;
    exports.WebGLRenderer = WebGLRenderer;

})));
//# sourceMappingURL=Phaser4.js.map
