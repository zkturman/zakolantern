import { AnimatedSprite, Container, Graphics } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { MenuButton } from "./MenuButton";
import { CreateDanceTile } from "./ColorDanceTile";
import { ShakeAnimator } from "./MenuAnimator";
import { GetTexture } from "../gamecore/AssetStore";
import { CodesMatch } from "./CodeGenerator";

class PasscodeScreen extends GameObject{
    danceMoveMap = {
        "pink": "up",
        "blue": "left",
        "yellow": "right"
    }
    changedTiles = [];
    submitReady = true;

    constructor(context, eyeData, tileData, hagathaData){
        super(context, new Vector2D(0, 0,), new Vector2D(0, 0));
        this.eyeData = eyeData;
        this.hagathaData = hagathaData;
        this.passcodeContainer = new Container();
        let background = new Graphics();
        background.rect(0, 0, this.context.app.canvas.width, this.context.app.canvas.height);
        background.fill('black');
        this.passcodeContainer.addChild(background);

        this.hagathaEyeTexture = GetTexture(this.eyeData.sprite);
        this.hagathaEye = new AnimatedSprite(this.hagathaEyeTexture.animations[this.eyeData.default]);
        this.hagathaEye.loop = this.eyeData.loop;
        this.hagathaEye.animationSpeed = this.eyeData.speed;
        this.hagathaEye.scale = 2;
        this.hagathaEye.onComplete = () =>{
            console.log('stopped the loop');
            this.hagathaEye.gotoAndPlay(0);
        }
        this.hagathaEye.play();
        this.passcodeContainer.addChild(this.hagathaEye);

        this.danceTexture = GetTexture(this.hagathaData.sprite);
        this.hagathaDance = new AnimatedSprite(this.danceTexture.animations[this.hagathaData.default]);
        this.hagathaDance.scale = 6;
        this.hagathaDance.visible = false;
        this.passcodeContainer.addChild(this.hagathaDance);

        this.danceTileCollections = [];
        this.danceTileContainer = new Container();
        for (let i = 0; i < this.context.code.length; i++){
            let danceTile = CreateDanceTile(tileData);
            danceTile.event = () => this.danceTileChange(i);
            this.danceTileCollections.push(danceTile);
            danceTile.x = i * danceTile.width + i * 10;
            this.danceTileContainer.addChild(danceTile);
            this.passcodeContainer.addChild(this.danceTileContainer);
        }
        this.shakeAnimator = null;

        this.buttonColor = Math.floor(Math.random() * 3);
        this.generateSubmitButton();
        this.generateBackButton();

        this.hagathaEye.position.set((this.context.app.canvas.width / 2) - (this.hagathaEye.width / 2),
            20);

        this.backButton.setPosition((this.context.app.canvas.width / 2) - (this.backButton.width / 2), 
            this.context.app.canvas.height - this.backButton.height);
        this.submitButton.setPosition((this.context.app.canvas.width / 2) - (this.submitButton.width / 2), 
            this.backButton.y - this.submitButton.height);
        this.danceTileContainer.position.set((this.context.app.canvas.width / 2) - (this.danceTileContainer.width / 2),
            this.submitButton.y - this.danceTileContainer.height);

        let hagathaEyeBottom = this.hagathaEye.y + this.hagathaEye.height;
        this.hagathaDance.position.set((this.context.app.canvas.width / 2) - (this.hagathaDance.width / 2),
            (hagathaEyeBottom) + ((this.danceTileContainer.y - hagathaEyeBottom) / 2) - this.hagathaDance.height / 2);
        
        this.passcodeContainer.visible = false;
        this.context.app.stage.addChild(this.passcodeContainer);
    }

    danceTileChange(index){
        if (!this.changedTiles.some((x) => x == index)){
            this.changedTiles.push(index);
        }
        if (this.changedTiles.length <= 3){
            this.hagathaEye.animationSpeed *= 1.5;
        }
        else {
            this.hagathaEye.loop = false;
            this.hagathaEye.removeAllListeners();
            this.hagathaEye.onComplete = () => {
                this.hagathaEye.animationSpeed = this.eyeData.speed;
                this.hagathaEye.textures = this.hagathaEyeTexture.animations['focus'];
                this.hagathaEye.play();
                this.hagathaEye.onComplete = null;
            }
        }
    }

    generateSubmitButton(){
        this.submitButton = new MenuButton(this.passcodeContainer, 'Dance!', this.buttonColor);
        this.submitButton.setMouseDown(() => this.submitButtonClick());
        this.submitButton.setTouchStart(() => this.submitButtonClick());
    }

    playHagathaDance(isCorrect){
        let moves = [];
        for (let i = 0; i < this.danceTileCollections.length; i++){
            let color = this.danceTileCollections[i].GetColorValue();
            if (color === "white"){
                return;
            }
            let duration = 500;
            if (i === this.danceTileCollections.length - 1){
                duration = 1000;
            }
            moves.push({
                texture: this.danceTexture.animations[this.danceMoveMap[color]][0],
                time: duration
            });

            if (i !== this.danceTileCollections.length - 1) {
                moves.push({
                    texture: null,
                    time: duration / 2
                });
            }
        }
        this.hagathaDance.textures = moves;
        this.hagathaDance.animationSpeed = 1;
        this.hagathaDance.visible = true;
        this.hagathaDance.loop = false;
        this.hagathaDance.play();
        this.hagathaDance.onComplete = () => {
            if (!isCorrect){
                this.shakeAnimator = new ShakeAnimator(this.danceTileContainer, 0.1);
                this.hagathaDance.visible = false;
                this.hagathaEye.textures = this.hagathaEyeTexture.animations['relax'];
                this.hagathaEye.play();
                this.hagathaEye.onComplete = () => {
                    this.hagathaEye.textures = this.hagathaEyeTexture.animations[this.eyeData.default];
                    this.hagathaEye.loop = this.eyeData.loop;
                    this.hagathaEye.animationSpeed = this.eyeData.speed * 3.375;
                    this.hagathaEye.onComplete = null;
                    this.hagathaEye.play();
                }
            }
            else{
                this.hagathaDance.textures = this.danceTexture.animations[this.hagathaData.default];
                this.hagathaDance.loop = false;
                this.hagathaDance.animationSpeed = this.hagathaData.speed;
                this.hagathaDance.play();
                this.hagathaDance.onComplete = () => {
                    this.hagathaDance.onComplete = () => {
                        this.context.endGameEvent();
                    }
                    this.hagathaDance.gotoAndPlay(0);
                }
            }
        }
    }

    submitButtonClick(){
        let currentCode = [];
        for (let i = 0; i < this.danceTileCollections.length; i++){
            currentCode.push(this.danceTileCollections[i].GetColorValue());
        }

        if (CodesMatch(this.context.code, currentCode)){
            this.playHagathaDance(true)
        }
        else {
            if (this.changedTiles.length == 4) {
                this.playHagathaDance(false);

            }
        }
    }

    generateBackButton(){
        let color = this.buttonColor == 2 ? 0 : this.buttonColor + 1;
        this.backButton = new MenuButton(this.passcodeContainer, 'Back', color);
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