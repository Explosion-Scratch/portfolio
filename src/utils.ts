import { onDestroy } from "svelte";
import {globals} from './store';

export function strip(a) {
    return a.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = src
    })
}

export function inView(el, percentVisible) {
    let rect = el.getBoundingClientRect(),
        windowHeight =
            window.innerHeight || document.documentElement.clientHeight;

    return !(
        Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
        percentVisible ||
        Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
        percentVisible
    );
}

export function getIcon(link, size = 32) {
    const ICONS = {
        "github.com": `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 24 24"><path fill="currentColor" d="M9.653 20.865a.501.501 0 0 0-.59-.492c-1.59.295-3.608.299-4.194-1.347a5.622 5.622 0 0 0-1.679-2.249a1.46 1.46 0 0 1-.408-.31a.5.5 0 0 0-.491-.42h-.002a.5.5 0 0 0-.5.499c-.003.57.71.997.922 1.11c.53.475.947 1.064 1.222 1.721c.348.98 1.41 2.495 4.722 2.072c.003.365.008.553.012.697l.005.294a.5.5 0 0 0 1 0l-.005-.322a38.783 38.783 0 0 1-.014-1.253zM20.921 5.224a7.357 7.357 0 0 0-.096-.119c.067-.21.12-.427.158-.645a6.033 6.033 0 0 0-.397-3.17a.5.5 0 0 0-.309-.29c-.141-.047-1.433-.395-4.13 1.382a13.973 13.973 0 0 0-6.884 0C6.567.626 5.283.955 5.14.997a.503.503 0 0 0-.316.292a6.038 6.038 0 0 0-.394 3.219c.038.2.087.397.145.592a3.584 3.584 0 0 0-.1.128A5.946 5.946 0 0 0 3.2 9.002c-.002.31.012.62.043.929c.34 4.664 3.349 5.962 5.947 6.405a3.807 3.807 0 0 0-.376.967a.5.5 0 0 0 .971.238c.093-.46.325-.88.665-1.202a.5.5 0 0 0-.272-.874C7.422 15.152 4.56 14.24 4.24 9.84a7.683 7.683 0 0 1-.039-.838a4.982 4.982 0 0 1 1.07-3.168c.076-.102.16-.194.243-.286a.501.501 0 0 0 .096-.516a4.05 4.05 0 0 1-.194-.695a4.955 4.955 0 0 1 .232-2.39a6.71 6.71 0 0 1 3.248 1.39a.497.497 0 0 0 .414.067a12.973 12.973 0 0 1 6.793 0a.5.5 0 0 0 .415-.067a6.555 6.555 0 0 1 3.242-1.398a4.94 4.94 0 0 1 .237 2.356a3.877 3.877 0 0 1-.206.737a.501.501 0 0 0 .097.516c.088.097.175.205.253.302a4.913 4.913 0 0 1 1.07 3.152c.002.286-.012.572-.042.856c-.317 4.381-3.19 5.292-5.957 5.607a.5.5 0 0 0-.273.874c.345.325.576.752.659 1.219c.085.329.125.668.118 1.008v2.46c-.01.675-.01 1.182-.01 1.414a.5.5 0 0 0 1 0c0-.23 0-.731.01-1.407v-2.467a4.633 4.633 0 0 0-.15-1.255a3.653 3.653 0 0 0-.367-.975c2.609-.442 5.63-1.74 5.966-6.385c.033-.315.049-.632.046-.949a5.892 5.892 0 0 0-1.29-3.778z"/></svg>`,
        "codepen": `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 15 15"><path fill="currentColor" d="m7.5.5l.29-.407a.5.5 0 0 0-.58 0L7.5.5Zm7 5h.5a.5.5 0 0 0-.21-.407l-.29.407Zm0 4l.29.407A.5.5 0 0 0 15 9.5h-.5Zm-7 5l-.29.407a.5.5 0 0 0 .58 0L7.5 14.5Zm-7-5H0a.5.5 0 0 0 .21.407L.5 9.5Zm0-4l-.29-.407A.5.5 0 0 0 0 5.5h.5ZM7.21.907l7 5l.58-.814l-7-5l-.58.814ZM14 5.5v4h1v-4h-1Zm.21 3.593l-7 5l.58.814l7-5l-.58-.814Zm-6.42 5l-7-5l-.58.814l7 5l.58-.814ZM1 9.5v-4H0v4h1ZM.79 5.907l7-5l-.58-.814l-7 5l.58.814Zm0 4l7-5l-.58-.814l-7 5l.58.814Zm6.42-5l7 5l.58-.814l-7-5l-.58.814Zm-7 1l7 5l.58-.814l-7-5l-.58.814Zm7.58 5l7-5l-.58-.814l-7 5l.58.814ZM7 .5v4h1v-4H7Zm0 10v4h1v-4H7Z"/></svg>`,
        "codesandbox": `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 256 256"><path fill="currentColor" d="m222.72 67.91l-88-48.18a13.9 13.9 0 0 0-13.44 0l-88 48.17A14 14 0 0 0 26 80.18v95.64a14 14 0 0 0 7.28 12.28l88 48.17a13.92 13.92 0 0 0 13.44 0l88-48.17a14 14 0 0 0 7.28-12.28V80.18a14 14 0 0 0-7.28-12.27ZM128 121.16L44.49 75.44l38.65-21.15l42 23a6 6 0 0 0 5.76 0l42-23l38.65 21.15Zm-1-90.91a2 2 0 0 1 1.92 0l31.4 17.2L128 65.16L95.63 47.45ZM38 175.82v-40l36 19.7v41.16l-35-19.11a2 2 0 0 1-1-1.75Zm48 27.46V152a6 6 0 0 0-3.12-5.26L38 122.17v-36.6l84 46V223ZM134 223v-91.44l84-46v36.6l-44.88 24.57A6 6 0 0 0 170 152v51.28Zm83-45.42l-35 19.14v-41.17l36-19.7v40a2 2 0 0 1-1 1.72Z"/></svg>`,
        "svelte": `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 24 24"><path fill="currentColor" d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767a4.109 4.109 0 0 1-.703-3.107a3.898 3.898 0 0 1 .134-.522l.105-.321l.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063l-.02.208a1.253 1.253 0 0 0 .226.83a1.337 1.337 0 0 0 1.435.533a1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778a1.242 1.242 0 0 0-.211-.937a1.338 1.338 0 0 0-1.435-.533a1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499a4.44 4.44 0 0 1-4.765-1.766a4.108 4.108 0 0 1-.702-3.108a3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499a4.44 4.44 0 0 1 4.765 1.767a4.109 4.109 0 0 1 .703 3.107a3.943 3.943 0 0 1-.134.522l-.105.321l-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063l.02-.207a1.255 1.255 0 0 0-.226-.831a1.337 1.337 0 0 0-1.435-.532a1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778a1.24 1.24 0 0 0 .211.937a1.338 1.338 0 0 0 1.435.533a1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498a4.44 4.44 0 0 1 4.765 1.766a4.108 4.108 0 0 1 .702 3.108a3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295a6.753 6.753 0 0 0 .666 4.336a6.43 6.43 0 0 0-.96 2.396a6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295a6.756 6.756 0 0 0-.665-4.336a6.429 6.429 0 0 0 .958-2.396a6.831 6.831 0 0 0-1.167-5.168Z"/></svg>`,
        "repl": `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 24 24"><path fill="currentColor" d="M2 1.5A1.5 1.5 0 0 1 3.5 0h7A1.5 1.5 0 0 1 12 1.5V8H3.5A1.5 1.5 0 0 1 2 6.5ZM12 8h8.5A1.5 1.5 0 0 1 22 9.5v5a1.5 1.5 0 0 1-1.5 1.5H12ZM2 17.5A1.5 1.5 0 0 1 3.5 16H12v6.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 22.5Z"/></svg>`,
    }
    const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 24 24"><path fill="currentColor" d="M6 6a2 2 0 0 1 2-2a1 1 0 0 0 0-2a4 4 0 0 0-4 4v3a2 2 0 0 1-2 2a1 1 0 0 0 0 2a2 2 0 0 1 2 2v3a4 4 0 0 0 4 4a1 1 0 0 0 0-2a2 2 0 0 1-2-2v-3a4 4 0 0 0-1.38-3A4 4 0 0 0 6 9Zm16 5a2 2 0 0 1-2-2V6a4 4 0 0 0-4-4a1 1 0 0 0 0 2a2 2 0 0 1 2 2v3a4 4 0 0 0 1.38 3A4 4 0 0 0 18 15v3a2 2 0 0 1-2 2a1 1 0 0 0 0 2a4 4 0 0 0 4-4v-3a2 2 0 0 1 2-2a1 1 0 0 0 0-2Z"/></svg>`;

    let icon = Object.entries(ICONS).find(i => link?.toLowerCase()?.includes(i[0]))?.[1]
    if (!icon) {
        icon = DEFAULT_ICON
        console.log("Icon not found", link)
    }
    return icon.replaceAll('$SIZE', size.toString());
}

export async function getInfo(image, projects) {
    let out = {
        isVideo: false,
        url: image,
    }
    const f = (
        await Promise.all(
            projects.map(async (i) => {
                return { ...i, valid: i.assetHash === (await sha256(image)) };
            })
        )
    ).filter((i) => i.valid)?.[0];
    if (f) {
        image = `${globals.base}/project_images/${f.path}`;
        if (f.contentType.endsWith("mp4")) {
            out.isVideo = true;
        }
    }
    out.url = image;
    return out;
}
export async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

export function safeInterval(fn, ms) {
    const info = {
        fn,
    }
    let interval = setInterval((...a) => {
        info.fn(...a)
    }, ms);
    onDestroy(() => {
        clearInterval(interval);
    })
    return {
        set: (f) => {
            console.log('setting function', f);
            info.fn = f
        }
    };
}
export function safeRequestAnimationFrame(fn) {
    let going = true;
    function run() {
        fn();
        if (going) { requestAnimationFrame(run); }
    }
    onDestroy(() => {
        going = false
    })
    requestAnimationFrame(run)
}

export function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}
export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export function requestInterval(fn, delay) {
    var requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })(),
        start = new Date().getTime(),
        handle = {};
    function loop() {
        handle.value = requestAnimFrame(loop);
        var current = new Date().getTime(),
            delta = current - start;
        if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
        }
    }
    handle.value = requestAnimFrame(loop);
    return handle;
};

export function isURL(a) {
    try {
        new URL(a);
        return true;
    } catch (e) { return false }
}