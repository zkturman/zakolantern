import { Container, Graphics } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { MenuButton } from "./MenuButton";
import { CreateDanceTile } from "./ColorDanceTile";
import { ShakeAnimator } from "./MenuAnimator";

class PasscodeScreen extends GameObject{
    constructor(context){
        super(context, new Vector2D(0, 0,), new Vector2D(0, 0));
        this.passcodeContainer = new Container();
        let background = new Graphics();
        background.rect(0, 0, this.context.app.canvas.width, this.context.app.canvas.height);
        background.fill('black');
        this.passcodeContainer.addChild(background);

        this.hagathaEye = new Graphics();
        this.hagathaEye.rect(0, 0, 200, 100);
        this.hagathaEye.fill('magenta');
        this.passcodeContainer.addChild(this.hagathaEye);

        this.danceTileCollections = [];
        this.danceTileContainer = new Container();
        for (let i = 0; i < this.context.code.length; i++){
            let danceTile = CreateDanceTile();
            this.danceTileCollections.push(danceTile);
            danceTile.x = i * danceTile.width + i * 10;
            this.danceTileContainer.addChild(danceTile);
            this.passcodeContainer.addChild(this.danceTileContainer);
        }
        this.shakeAnimator = null;

        this.generateSubmitButton();
        this.generateBackButton();

        this.hagathaEye.position.set((this.context.app.canvas.width / 2) - (this.hagathaEye.width / 2),
            100);
        this.danceTileContainer.position.set((this.context.app.canvas.width / 2) - (this.danceTileContainer.width / 2),
            this.hagathaEye.position.y + this.hagathaEye.height);
        this.submitButton.setPosition((this.context.app.canvas.width / 2) - (this.submitButton.width / 2), 
            this.danceTileContainer.y + this.danceTileContainer.height);
        this.backButton.setPosition((this.context.app.canvas.width / 2) - (this.backButton.width / 2), 
            this.submitButton.y + this.submitButton.height);

        this.passcodeContainer.visible = false;
        this.context.app.stage.addChild(this.passcodeContainer);
    }

    generateSubmitButton(){
        this.submitButton = new MenuButton(this.passcodeContainer, 'Dance!');
        this.submitButton.setMouseDown(() => this.submitButtonClick());
        this.submitButton.setTouchStart(() => this.submitButtonClick());
    }

    submitButtonClick(){
        console.log('clicked?');
        this.shakeAnimator = new ShakeAnimator(this.danceTileContainer, 0.1);
    }

    generateBackButton(){
        this.backButton = new MenuButton(this.passcodeContainer, 'Back');
        this.backButton.setMouseDown(() => this.hide());
        this.backButton.setTouchStart(() => this.hide());
    }

    hide(){
        this.passcodeContainer.visible = false;
        for (let i = 0; i < this.danceTileCollections.length; i++){
            this.danceTileCollections[i].ResetColor();
        }
    }

    show(){
        this.passcodeContainer.visible = true;
    }

    update(secondsPassed){
        if (this.shakeAnimator !== null){
            this.shakeAnimator.play(secondsPassed);
            if (this.shakeAnimator.isDone()){
                this.shakeAnimator = null;
            }
        }
    }
}

export {PasscodeScreen}