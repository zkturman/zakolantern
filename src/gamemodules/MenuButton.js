import { Container, Graphics, Text, TextStyle } from "pixi.js";

const buttonStyle = new TextStyle({
    fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
    fontSize: 36,
    fill: 'white',
});

class MenuButton{
    constructor(parent, text){
        this.parent = parent;
        this.width = 250;
        this.height = 75;
        this.buttonContainer = new Container();
        let buttonImage = new Graphics();
        buttonImage.rect(0, 0, this.width, this.height);
        buttonImage.fill('black');
        this.buttonContainer.addChild(buttonImage);
        parent.addChild(this.buttonContainer);
        this.buttonContainer.eventMode = 'static';

        this.buttonText = new Text({
            text: text,
            style: buttonStyle
        });
        this.buttonContainer.addChild(this.buttonText);
        this.buttonText.anchor.set(0.5, 0.5);
        this.buttonText.position.set(buttonImage.width / 2, buttonImage.height / 2);
        this.x = this.buttonContainer.position.x;
        this.y = this.buttonContainer.position.y;
    }

    setPosition(x, y){
        this.buttonContainer.position.set(x, y);
        this.x = x;
        this.y = y;
    }

    setText(text){
        this.buttonText.text = text;
    }

    setMouseDown(mousedown){
        this.buttonContainer.on('mousedown', () => mousedown());
    }

    setTouchStart(touchstart){
        this.buttonContainer.on('touchstart', () => touchstart());
    }

    show(){
        this.buttonContainer.visible = true;
    }

    hide(){
        this.buttonContainer.visible = false;
    }
}

export {MenuButton}