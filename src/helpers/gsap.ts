import gsap from 'gsap';
import { globals } from '../store';

export default async function useGSAP(node, options) {
    await globals.ready;
    options = {
        scrollMargin: { x: 0, y: 50 },
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
            start: `${rect.top + window.scrollY - options.scrollMargin.y} ${100 - options.windowPercent}%`,
            end: `${rect.top + rect.height + window.scrollY + options.scrollMargin.y} ${options.windowPercent}%`,
            scrub: true,
            markers: true,
            ...options.scrollTrigger,
        }
    })
    const tl_res = await options.timeline(tl);
    if (!tl_res) {
        tl.from(node, options.from);
        tl.to(node, options.to);
    }
    return {}
}