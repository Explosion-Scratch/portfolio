import tippy from 'tippy.js';
import { getIcon, isURL } from '../utils';

export default function tooltip(node, params) {
    let tip = tippy(node, getParams(params));
    function getParams(p) {
        if (typeof p === 'string') {
            if (isURL(p)) {
                let u = new URL(p);
                const BLACKLIST = ['tree', 'main', 'blob', 's', '', 'Explosion-Scratch'];
                p = `<span class='inner' style='display: flex; justify-content: center; align-items: center;'>
                    <span class='icon' style='display: grid; place-items: center; height: 100%; margin-right: 5px;'>${getIcon(u.toString(), 16)}</span>
                    <i style='color: #777;'>${u.hostname}/${u.pathname.split('/').filter(i => !BLACKLIST.includes(i)).join('/')}</i>
                </span>`;
            }
            p = { content: p, allowHTML: true }
        }
        return {
            placement: 'top',
            theme: 'light',
            ...p
        };
    }
    return {
        update: (newParams) => {
            tip.setProps(getParams(newParams));
        },
        destroy: () => {
            tip.destroy();
        }
    };
}
