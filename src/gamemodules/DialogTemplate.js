import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { Container, Graphics, TextStyle, Text, styleAttributes } from "pixi.js";
import { MenuButton } from "./MenuButton";
import { FadeAnimator, FloatAnimator } from "./MenuAnimator";

const dialogStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 18,
    fill: 'black',
    wordWrap: true,
    wordWrapWidth: 250,
    lineHeight: 40,
    align: 'left'
});

const labelStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fill: 'white',
    wordWrap: true,
    align: 'center'
});

class DialogTemplate extends GameObject {
    closedEvent = null;
    floatAnimator = null;
    
    constructor(context, dialogData) {
        super(context, new Vector2D(0, 0), new Vector2D(0, 0));
        this.generateDialogScene();
    }

    injectDialogData(dialogData){
        this.reset();
        this.dialogData = dialogData
        if (!this.dialogData){
            this.dialogData = {
                name: "empty",
                dialog: ["no dialog found"]
            }
        }

        this.nameText.text = this.dialogData.name;
        this.dialogText.text = this.dialogData.dialog[0];
        if (this.dialogData.dialog.length <= 1){
            this.dialogButton.setText('Leave');
            this.backButton.hide();
        }
        else{
            this.dialogButton.setText('Continue');
        }
    }

    generateDialogScene() {
        this.dialogContainer = new Container();
        this.context.app.stage.addChild(this.dialogContainer);

        this.generateDialogBackground();
        this.generateDialogSprite();
        this.generateDialogBox()
        this.generateDialogButton();
        this.generateBackButton();

        this.dialogSprite.position.set((this.dialogContainer.width / 2) - (this.dialogSprite.width / 2),
            50);
        this.dialogBox.position.set((this.dialogContainer.width / 2) - this.dialogBox.width / 2,
            this.dialogSprite.y + this.dialogSprite.height);
        this.dialogButton.setPosition((this.dialogContainer.width / 2) - this.dialogButton.width / 2,
            this.dialogBox.y + this.dialogBox.height);
        this.backButton.setPosition((this.dialogContainer.width / 2) - this.backButton.width / 2,
            this.context.app.canvas.height - this.backButton.height - 20);
        this.dialogContainer.visible = false;

        this.floatAnimator = new FloatAnimator(this.dialogSprite, .5);
        this.fadeAnimator = new FadeAnimator(this.dialogSprite, 1);
        console.log(this.dialogSprite.getGlobalPosition());
    }

    generateDialogBackground(){
        let background = new Graphics();
        background.rect(0, 0, this.context.app.canvas.width, this.context.app.canvas.height);
        background.fill('black');
        this.dialogContainer.addChild(background);
    }

    generateDialogSprite(){
        this.dialogSprite = new Graphics();
        this.dialogSprite.rect(0, 0, 300, 400);
        this.dialogSprite.fill('green');
        this.dialogContainer.addChild(this.dialogSprite);
    }

    generateDialogBox(){
        this.dialogBox = new Container();
        let dialogOutline = new Graphics();
        dialogOutline.setStrokeStyle({
            width: 2,
            color: 0x000000
        });
        dialogOutline.rect(0, 0, 250, 150);
        dialogOutline.stroke();
        dialogOutline.fill('white');
        this.dialogBox.addChild(dialogOutline);

        let nameLabel = new Container();
        let nameLabelBackground = new Graphics();
        nameLabelBackground.rect(0, 0, 60, 30);
        nameLabelBackground.fill('black');
        nameLabel.addChild(nameLabelBackground);
        
        this.nameText = new Text({
            text: "",
            style: labelStyle
        });
        nameLabel.addChild(this.nameText);
        this.nameText.anchor.set(0.5, 0.5);
        this.nameText.position.set(nameLabelBackground.width / 2, nameLabelBackground.height / 2);

        this.dialogText = new Text({
            text: "",
            style: dialogStyle
        });
        this.dialogBox.addChild(this.dialogText);
        this.dialogText.y = 30;

        this.dialogBox.addChild(nameLabel);
        this.dialogContainer.addChild(this.dialogBox);
    }

    generateDialogButton(){
        this.dialogButton = new MenuButton(this.dialogContainer, 'Continue');
        this.dialogButton.setMouseDown(() => this.dialogButtonClick());
        this.dialogButton.setTouchStart(() => this.dialogButtonClick());
    }

    generateBackButton(){
        this.backButton = new MenuButton(this.dialogContainer, 'Back');
        this.backButton.setMouseDown(() => this.backButtonClick());
        this.backButton.setTouchStart(() => this.backButtonClick());
    }

    dialogButtonClick(event){
        console.log('dialog button clicked');
        this.currentLine++;

        if (this.currentLine >= this.dialogData.dialog.length){
            this.backButtonClick(true);
        }
        else{
            if (this.currentLine === this.dialogData.dialog.length - 1){
                this.dialogButton.setText("Leave");
                this.backButton.hide();
            }
            this.dialogText.text = this.dialogData.dialog[this.currentLine];
        }
    }

    backButtonClick(complete){
        this.dialogContainer.visible = false;
        if (complete && this.closedEvent !== null){
            this.closedEvent();
        }
    }

    reset(){
        this.currentLine = 0;
        this.backButton.show();
    }

    show(){
        this.dialogContainer.visible = true;
        this.floatAnimator.reset();
        this.fadeAnimator.reset();
    }

    update(deltaTime){
        if (!this.floatAnimator.isDone()){
            this.floatAnimator.play(deltaTime);
        }
        if (!this.fadeAnimator.isDone()){
            this.fadeAnimator.play(deltaTime);
        }
    }
}

export {DialogTemplate}