import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { Container, Graphics, TextStyle, Text, styleAttributes, Sprite } from "pixi.js";
import { MenuButton } from "./MenuButton";
import { FadeAnimator, FloatAnimator } from "./MenuAnimator";
import { GetTexture } from "../gamecore/AssetStore";
import { BaseParagraphStyle, BaseTitleStyle } from "./TextStyling";

const dialogStyle = BaseParagraphStyle();
dialogStyle.fontSize = 20;
dialogStyle.fill = 'white';

const labelStyle = BaseTitleStyle();
labelStyle.fontSize = 20;
labelStyle.fill = 'black';

class DialogTemplate extends GameObject {
    closedEvent = null;
    floatAnimator = null;
    
    constructor(context, dialogData) {
        super(context, new Vector2D(0, 0), new Vector2D(0, 0));
        this.buttonColor = Math.floor(Math.random() * 3);
        this.generateDialogScene();
    }

    injectDialogData(dialogData){
        this.reset();
        this.dialogData = dialogData
        if (!this.dialogData){
            this.dialogData = {
                name: "empty",
                dialog: ["no dialog found"],
                sprites: []
            }
        }

        this.nameText.text = this.dialogData.name;
        this.dialogText.text = this.dialogData.dialog[0];
        this.dialogSprite.removeChildren();
        this.generateDialogSprite();
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
        this.dialogContainer.addChild(this.dialogSprite);
        this.generateDialogBox()
        this.generateDialogButton();
        this.generateBackButton();

        this.backButton.setPosition((this.dialogContainer.width / 2) - this.backButton.width / 2,
            this.context.app.canvas.height - this.backButton.height + (this.dialogContainer.height - this.context.app.canvas.height) / 2);
        this.dialogButton.setPosition((this.dialogContainer.width / 2) - this.dialogButton.width / 2,
            this.backButton.y - this.dialogButton.height);
        this.dialogBox.position.set((this.dialogContainer.width / 2) - this.dialogBox.width / 2,
            this.dialogButton.y - this.dialogBox.height);
        this.dialogSprite.position.set((this.dialogContainer.width / 2) - (this.dialogSprite.width / 2),
            this.dialogBox.y - this.dialogSprite.height + 50);
        this.dialogContainer.position.set(this.context.app.canvas.width / 2 - this.dialogContainer.width / 2,
            this.context.app.canvas.height / 2 - this.dialogContainer.height / 2);
        this.dialogContainer.visible = false;

        this.floatAnimator = new FloatAnimator(this.dialogSprite, 1);
        this.fadeAnimator = new FadeAnimator(this.dialogSprite, 1);
    }

    generateDialogBackground(){
        let background = new Sprite(GetTexture('/assets/Dialog_Background.png'));
        background.eventMode = 'static'; 
        this.dialogContainer.addChild(background);
    }

    generateDialogSprite(){
        if (!this.dialogData || !this.dialogData.sprites || this.dialogData.sprites.length == 0){
            this.dialogSprite = new Container();
            let placeholder = new Graphics();
            placeholder.rect(0, 0, 300, 400);
            placeholder.fill('green');
            this.dialogSprite.addChild(placeholder);
        }
        else{
            let image = new Sprite(GetTexture(this.dialogData.sprites[0]));
            this.dialogSprite.addChild(image);
        }
    }

    generateDialogBox(){
        this.dialogBox = new Container();
        let dialogOutline = new Graphics();
        dialogOutline.setStrokeStyle({
            width: 2,
            color: 'white'
        });
        dialogOutline.rect(0, 0, this.context.app.canvas.width - 20, 120);
        dialogOutline.fill({
            color: 'black',
            alpha: 0.7
        });
        dialogOutline.stroke();
        this.dialogBox.addChild(dialogOutline);

        let nameLabel = new Container();
        let nameLabelBackground = new Graphics();
        nameLabelBackground.poly([
            {x: 0, y: 0}, 
            {x: 70, y: 0},
            {x: 70, y: 25},
            {x: 65, y: 30},
            {x: 0, y: 30}
        ]);
        nameLabelBackground.fill('white');
        nameLabel.addChild(nameLabelBackground);
        
        this.nameText = new Text({
            text: "",
            style: labelStyle
        });
        nameLabel.addChild(this.nameText);
        this.nameText.anchor.set(0.5, 0.5);
        this.nameText.position.set(nameLabelBackground.width / 2, nameLabelBackground.height / 2);

        dialogStyle.wordWrapWidth = dialogOutline.width * 0.9;
        this.dialogText = new Text({
            text: "",
            style: dialogStyle
        });
        this.dialogBox.addChild(this.dialogText);
        this.dialogText.y = 30;
        this.dialogText.x = (dialogOutline.width - dialogOutline.width * 0.9) / 2;

        this.dialogBox.addChild(nameLabel);
        this.dialogContainer.addChild(this.dialogBox);
    }

    generateDialogButton(){
        this.dialogButton = new MenuButton(this.dialogContainer, 'Continue', this.buttonColor);
        this.dialogButton.setMouseDown(() => this.dialogButtonClick());
        this.dialogButton.setTouchStart(() => this.dialogButtonClick());
    }

    generateBackButton(){
        let color = this.buttonColor == 2 ? 0 : this.buttonColor + 1;
        this.backButton = new MenuButton(this.dialogContainer, 'Back', color);
        this.backButton.setMouseDown(() => this.backButtonClick());
        this.backButton.setTouchStart(() => this.backButtonClick());
    }

    dialogButtonClick(event){
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