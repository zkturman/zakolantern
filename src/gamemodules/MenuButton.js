import { Container, FillGradient, Graphics, Text, TextStyle } from "pixi.js";

const buttonStyle = new TextStyle({
    fontFamily: ['Chunky Heart'],
    fontSize: 36,
    fill: 'white',
});

class MenuButton{
    constructor(parent, text, colorCode){
        this.parent = parent;
        this.width = 250;
        this.height = 75;
        this.color;
        if (colorCode == 0){
            this.color = 'magenta'
        }
        else if (colorCode == 1){
            this.color = 'cyan'
        }
        else{
            this.color = 'yellow'
        }

        this.buttonContainer = new Container();
        let buttonBackground = new Graphics();
        buttonBackground.rect(0, 0, this.width, this.height);
        buttonBackground.fill('transparent');
        this.buttonContainer.addChild(buttonBackground);
        let buttonImage = new Graphics();
        buttonImage.poly([
            {x: 0, y: 0},
            {x: this.width - 20, y: 0},
            {x: this.width - 10, y: 10},
            {x: this.width - 10, y: this.height - 10},
            {x: 10, y: this.height - 10},
            {x: 0, y: this.height - 20},
        ]);
        let fillGradient = new FillGradient({
                        end: { x: 0, y: 1 },
                        colorStops: [
                            { offset: 1, color: this.color},
                            { offset: 0.85, color: 'black' },
                            { offset: 0, color: 'transparent' },
                        ]
                    });
        buttonImage.fill({
            fill: fillGradient,
            alpha: 0.5
        }
        );
        buttonImage.stroke({width: 2, color: this.color})
        this.buttonContainer.addChild(buttonImage);
        parent.addChild(this.buttonContainer);
        this.buttonContainer.eventMode = 'static';

        this.buttonText = new Text({
            text: text,
            style: buttonStyle
        });
        this.buttonText.tint = this.color;
        this.buttonContainer.addChild(this.buttonText);

        buttonBackground.position.set(0, 0);
        this.buttonText.anchor.set(0.5, 0.5);
        buttonImage.position.set(buttonBackground.width / 2 - buttonImage.width / 2, 
            buttonBackground.height / 2 - buttonImage.height / 2);
        this.buttonText.position.set(buttonBackground.width / 2, buttonBackground.height / 2);
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