import { inView, preloadImage, requestInterval } from '../utils';
import { events } from '../store';

export default function bgImage(node, options = {}) {
    options = {
        width: 500,
        height: 500,
        trigger: 'mouseenter',
        out_trigger: 'mouseleave',
        appendTo: 'body',
        lerpFactor: 20,
        opacity: .6,
        filter: 'grayscale(100%)',
        ...options,
    }
    if (!options.url) { throw new Error('No URL') }
    preloadImage(options.url).then(console.log.bind(console, 'Preloaded'));

    let pos = {
        x: 0,
        y: 0,
    }
    let dest = { ...pos };

    let img;
    let int;
    function created() {
        initImage();

        node.addEventListener(options.trigger, handle);
        node.addEventListener(options.out_trigger, outHandle);
        events.on('mousemove', mouseMove);

        int = requestInterval(() => {
            pos.x += (dest.x - pos.x) / options.lerpFactor;
            pos.y += (dest.y - pos.y) / options.lerpFactor;
            img.style.top = `${pos.y - options.height / 2}px`;
            img.style.left = `${pos.x - options.width / 2}px`;
        }, 10)
    }
    function handle() {
        img.style.opacity = options.opacity;
        img.style.transform = 'scale(1) rotate(0deg)';
    }
    function initImage() {
        img = document.createElement('img');
        img.src = options.url;
        img.style.zIndex = '-10';
        img.style.width = options.width + 'px';
        img.style.height = options.height + 'px';
        const duration = '.8s';
        img.style.transition = `opacity .3s ease, transform ${duration} ease`;
        img.style.position = 'fixed';
        img.style.transform = 'scale(.9) rotate(15deg)';
        img.style.filter = options.filter;
        img.style.objectFit = 'cover';
        img.style.opacity = 0;
        document.querySelector(options.appendTo).appendChild(img)
    }

    function mouseMove({ x, y }) {
        Object.assign(dest, { x, y });
    }

    function outHandle() {
        img.style.transform = 'scale(.9) rotate(15deg)';
        img.style.opacity = 0;
    }
    function destroy() {
        node.removeEventListener(options.trigger, handle);
        node.removeEventListener(options.out_trigger, outHandle);
        img?.remove();
        cancelAnimationFrame(int.value);
        events.off('mousemove', mouseMove);
    }

    created();
    let prev = inView(node, 1);
    events.on('scroll', () => {
        if (prev === inView(node, 1)) { return }
        prev = inView(node, 1);
        if (prev) {
            console.log('Created')
            created();
        } else {
            console.log('Destroyed')
            destroy();
        }
    })
    return {
        destroy,
    }
}