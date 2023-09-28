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
})

export const events = hub();