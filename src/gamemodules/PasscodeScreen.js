import { Container, Graphics } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { MenuButton } from "./MenuButton";

class PasscodeScreen extends GameObject{
    constructor(context){
        super(context, new Vector2D(0, 0,), new Vector2D(0, 0));
        this.passcodeContainer = new Container();
        let background = new Graphics();
        background.rect(0, 0, this.context.app.canvas.width, this.context.app.canvas.height);
        background.fill('black');
        this.passcodeContainer.addChild(background);

        let backButton = new MenuButton(this.passcodeContainer, 'Back');
        backButton.setMouseDown(() => this.hide());
        backButton.setTouchStart(() => this.hide());

        this.passcodeContainer.visible = false;
        this.context.app.stage.addChild(this.passcodeContainer);
    }

    hide(){
        this.passcodeContainer.visible = false;
    }

    show(){
        this.passcodeContainer.visible = true;
    }
}

export {PasscodeScreen}