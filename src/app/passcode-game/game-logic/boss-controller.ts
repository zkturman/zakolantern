import * as PIXI from 'pixi.js';
import { EnemyData } from './enemy-data';

export class BossController{
  private health: number = 3;
  public data: EnemyData;
  private app: PIXI.Application;
  private isHit: boolean = false;
  private hitTimer: number = 0;
  private bossImage: PIXI.Texture;

  constructor(){
    this.data = new EnemyData();
  }

  public async create(){
    this.bossImage = await PIXI.Assets.load('../../../assets/boss-icon.png');
  }

  public createInstance(app: PIXI.Application){
    this.app = app;
    this.data.sprite = new PIXI.Sprite(this.bossImage);
    this.data.sprite.x = app.canvas.width / 2;
    this.data.sprite.y = app.canvas.height / 2;
    this.data.sprite.anchor = 0.5;
    this.data.moveDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    app.stage.addChild(this.data.sprite);
  }

  public destroyInstance(){
    this.data.sprite.destroy();
  }

  public update(time){
    if (!this.isDead() && !this.isHit){
      this.data.sprite.x += (this.data.moveDirection * 1 * time.deltaTime);
      if (this.data.sprite.x < (this.data.sprite.width / 2)
        || this.data.sprite.x > (this.app.canvas.width - (this.data.sprite.width / 2))){
          this.data.moveDirection *= -1;
      }
    }
    if (!this.isDead() && this.isHit){
      this.hitTimer += time.deltaTime;
      if (this.hitTimer >= 2){
        this.isHit = false;
        this.data.sprite.visible = true;
        this.hitTimer = 0;
        this.health--;
      }
      else if (this.hitTimer > 1.6){
        this.data.sprite.visible = false;
      }
      else if (this.hitTimer > 1.2){
        this.data.sprite.visible = true;
      }
      else if (this.hitTimer > 0.8){
        this.data.sprite.visible = false;
      }
      else if (this.hitTimer > 0.3){
        this.data.sprite.visible = true;
      }
      else{
        this.data.sprite.visible = false;
      }
    }
  }

  public isDead(): boolean{
    return this.health <= 0;
  }

  public reduceHealth(){
    if (!this.isHit){
      this.isHit = true;
    }
  }
}