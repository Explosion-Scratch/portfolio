import gsap from 'gsap';
import { globals } from '../store';

export default async function useGSAP(node, options) {
    await globals.ready;
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
    const rect = node.getBoundingClientRect();
    console.log(node, rect, options)
    let tl = gsap.timeline({
        scrollTrigger: {
            start: `${rect.top + window.scrollY - options.scrollMargin.y - 50 - options.scrollMargin.top}px ${100 - options.windowPercent}%`,
            end: `${rect.top + rect.height + window.scrollY + options.scrollMargin.y + options.scrollMargin.bottom}px ${options.windowPercent}%`,
            scrub: true,
            ...options.scrollTrigger,
        },
        ease: 'linear',
    })
    const tl_res = await options.timeline(tl);
    if (!tl_res) {
        tl.from(node, options.from);
        tl.to(node, options.to);
    }
    return {}
}