export default function glowCard(node, options) {
    options = {
        trigger: 'mousemove',
        child_selector: '.glow_card',
        ...options,
    }
    for (const card of node.querySelectorAll(options.child_selector)) {
        card.classList.add('glow_card');
    }
    function handleMouse(e) {
        for (const card of node.querySelectorAll(options.child_selector)) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    }
    node.addEventListener(options.trigger, handleMouse)
    return {
        destroy() {
            node.removeEventListener(options.trigger, handleMouse);
            // BUG: Detect if already contains class on init
            for (const card of node.querySelectorAll(options.child_selector)) {
                card.classList.remove('glow_card');
            }
        }
    }
}