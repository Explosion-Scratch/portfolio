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