import { requestInterval } from "../utils";

export default function textEffect(node, options = {}) {
    options = {
        delay: 10,
        iterations: 10,
        trigger: 'mouseenter',
        letters: "abcdefghijklmnopqrstuvwxyz1234567890!@#%$^%*#*()[]-=;'",
        ...options,
    }
    if (options.time) { options.iterations = options.time / options.delay; }
    let original = node.getAttribute('data-text') || node.innerText;
    node.addEventListener(options.trigger, handle);
    let int;
    function handle() {
        let iterations = 0;
        int = requestInterval(() => {
            node.innerText = original.split('').map((i, idx) => {
                if (iterations > (idx + 1)) {
                    return i;
                }
                return options.letters.charAt(Math.floor(Math.random() * options.letters.length));
            }).join('')
            if (iterations > original.length) {
                clearInterval(int);
            }
            iterations += 1 / options.iterations;
        }, options.delay)
    }
    return {
        destroy() { node.removeEventListener(options.trigger, handle); node.innerText = original; clearInterval(int); }
    }
}