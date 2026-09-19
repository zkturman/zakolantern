import {Controller} from './Controller'

const KeyMap = {
    Space: 'fire',
    KeyA: 'left',
    ArrowLeft: 'left',
    KeyD: 'right',
    ArrowRight: 'right',
};

class KeyboardController extends Controller {
    constructor() {
        super();
        window.addEventListener('keydown', (event) => this.keydownHandler(event));
        window.addEventListener('keyup', (event) => this.keyupHandler(event));
    }

    keydownHandler(event) {
        const key = KeyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = true;
    }

    keyupHandler(event) {
        const key = KeyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = false;
    }
}

export {KeyboardController}