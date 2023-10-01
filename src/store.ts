import { writable } from "svelte/store";

// FROM: From my library Bijou.js https://unpkg.com/bijou.js (search for "export let hub")
let hub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub['*'] || []).forEach((handler) => handler(event, data));
        (this.hub[event] || []).forEach((handler) => handler(data));
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex((h) => h === handler);
        if (i > -1) this.hub[event].splice(i, 1);
        if (this.hub[event].length === 0) delete this.hub[event];
    },
});

type Globals = {
    timeline: GSAPTimeline,
    modal: {
        showing?: boolean;
    }
}
export const globals: Globals = ({
    timeline: {},
    modal: {},
    ready: null,
    readyRes: () => { },
    matrixOverlap: 0.7,// percent of window height
    info: {
        email: 'explosionscratch@gmail.com',
    },
    wrapper: null,
    images: {
        repo_count: `https://github.com/Explosion-Scratch/projects/assets/61319150/4e429acc-cf9b-4594-a1c5-791ea35f7d08`,
        github_contribs: `https://github.com/Explosion-Scratch/projects/assets/61319150/7c3a74b9-aa06-427f-a22b-14c2f3736a02`,
    },
    base: '/portfolio',
})

globals.ready = new Promise(r => (globals.readyRes = r));

export const events = hub();