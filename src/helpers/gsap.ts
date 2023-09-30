import gsap from 'gsap';
import { globals } from '../store';

export default function useGSAP(node, options) {
    options.scrollMargin = {
        x: 0, y: 50, top: 0, bottom: 0,
        ...options.scrollMargin,
    }
    options = {
        from: {},
        to: {},
        windowPercent: 20,
        scrollTrigger: {},
        timeline: () => { },
        ...options
    }
    globals.ready.then(init)
    let destroy = () => {}
    async function init() {
        console.log('GSAP init')
        const rect = node.getBoundingClientRect();
        console.log(node, rect, options)
        let tl = gsap.timeline({
            scrollTrigger: {
                start: options.start || `${rect.top + window.scrollY - options.scrollMargin.y - 50 - options.scrollMargin.top}px ${100 - options.windowPercent}%`,
                end: options.end || `${rect.top + rect.height + window.scrollY + options.scrollMargin.y + options.scrollMargin.bottom}px ${options.windowPercent}%`,
                scrub: true,
                // markers: true,
                ...options.scrollTrigger,
            },
            ease: options.ease || 'linear',
        })
        const tl_res = await options.timeline(tl, {node, options, rect});
        if (!tl_res) {
            tl.from(node, options.from);
            tl.to(node, options.to);
        }
        destroy = () => {
            tl.progress(0);
            tl.kill();
        }
        console.log(tl_res)
    }
    return {
        destroy,
    }
}