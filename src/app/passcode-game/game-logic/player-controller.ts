import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import * as PIXI from 'pixi.js';
import { DeviceSizeFinderService } from 'src/app/device-size-finder.service';

export class PlayerController{
  private readonly app: PIXI.Application;
  private playerImage: PIXI.Texture;
  private player: PIXI.Sprite;
  private playerDirection: number = 0;

  constructor(app: PIXI.Application, public deviceSize: DeviceSizeFinderService){
    this.app = app;
  }

  public async create(){
    this.playerImage = await PIXI.Assets.load('../../assets/ship-icon.png');
    this.player = new PIXI.Sprite(this.playerImage);
    if (this.deviceSize.getIsPhonePortrait()){
      this.player.height = this.app.screen.width * 0.07;
      this.player.width = this.app.screen.width * 0.07;
    }
    else{
      this.player.height = this.app.screen.width * 0.05;
      this.player.width = this.app.screen.width * 0.05;      
    }
    this.player.anchor.set(0.5);
    this.player.x = this.app.screen.width / 2;
    this.player.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.player);
  }

  public setPosition(x: number, y: number){
    this.player.x = x;
    this.player.y = y;
  } 

  public update(time){
    if (!this.playerWithinBound()){
      this.playerDirection = 0;
      }
      this.player.x += 0.1 * time.deltaTime * this.playerDirection * 15;
  }

  public move(value){
    this.playerDirection = value;
    if (!this.playerWithinBound()){
    this.playerDirection = 0;
    }
  }

  private playerWithinBound(): boolean{
    if (this.playerDirection > 0){
    if (this.player.x + (this.player.width / 2) >= this.app.canvas.width){
      return false;
    }
    }
    else if (this.playerDirection < 0){
    if (this.player.x - (this.player.width / 2) <= 0){
      return false;
    }
    }
    return true;
  }

  public GetXCoordinate(): number{
    return this.player.x;
  }

  public GetYCoordinate(): number{
    return this.player.y;
  }

  public GetWidth(): number{
    return this.player.width;
  }

  public GetHeight(): number{
    return this.player.height;
  }
}