import * as PIXI from 'pixi.js';
import { PlayerController } from './player-controller';
import { DeviceSizeFinderService } from 'src/app/device-size-finder.service';

export class LaserController{
  private readonly app: PIXI.Application;
  private laserImage: PIXI.Texture;
  private laserShots: PIXI.Sprite[] = [];

  constructor(app: PIXI.Application, public deviceSize: DeviceSizeFinderService){
    this.app = app;
  }

  async create(){
    this.laserImage = await PIXI.Assets.load('../../assets/white-square.png');
  }

  public createInstance(player: PlayerController){
    let laserBar = new PIXI.Sprite(this.laserImage);
    if (this.deviceSize.getIsPhonePortrait()){
      laserBar.height = this.app.screen.width * 0.04;
      laserBar.width = this.app.screen.width * 0.01;  
    }
    else{
      laserBar.height = this.app.screen.width * 0.03;
      laserBar.width = this.app.screen.width * 0.005;  
    }
    laserBar.anchor.set(0.5);
    laserBar.x = player.GetXCoordinate();
    laserBar.y = player.GetYCoordinate() - (player.GetHeight() / 2);
    this.app.stage.addChild(laserBar);
    this.laserShots.push(laserBar);
  }

  public getInstance(index: number): PIXI.Sprite{

    return this.laserShots[index];
  }

  public destroyInstance(index: number){
      this.laserShots[index].destroy();
      this.laserShots.splice(index, 1);
  }

  public update(time){
    for (let i = this.getTotalShots() - 1; i >= 0; i--){
      this.laserShots[i].y -= 0.1 * time.deltaTime * 20;
      if (this.getInstance(i)?.y < (-1 * this.getInstance(i)?.height)){
        this.destroyInstance(i);
      }
    }
  }

  public getTotalShots(): number{
    return this.laserShots.length;
  }
}