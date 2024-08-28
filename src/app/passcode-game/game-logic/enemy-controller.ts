import * as PIXI from 'pixi.js'
import { EnemyData } from './enemy-data';

export class EnemyController{
  private readonly app: PIXI.Application;
  private enemyImage: PIXI.Texture;
  private enemyData: EnemyData[] = [];

  constructor(app: PIXI.Application){
    this.app = app;
  }

  public async create(){
    this.enemyImage = await PIXI.Assets.load('../../../assets/enemy-icon.png');
  }

  public createInstance(x: number, y: number){
    let newEnemy = new EnemyData();
    newEnemy.id = this.enemyData.length;
    newEnemy.sprite = new PIXI.Sprite(this.enemyImage);
    newEnemy.sprite.x = x;
    newEnemy.sprite.y = y;
    newEnemy.startingX = newEnemy.sprite.x;
    newEnemy.startingY = newEnemy.sprite.y;
    newEnemy.sprite.height = this.app.screen.width * 0.05;
    newEnemy.sprite.width = this.app.screen.width * 0.05;
    newEnemy.sprite.anchor.set(0.5);
    newEnemy.moveDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    this.enemyData.push(newEnemy);
    this.app.stage.addChild(newEnemy.sprite);
  }

  public getInstance(index: number): EnemyData{
    return this.enemyData[index];
  }

  public async destroyInstance(index: number){
    let arrowImage = await this.getArrowSprite(this.enemyData[index].arrowKey);
    let arrow = new PIXI.Sprite(arrowImage);
    arrow.anchor.set(0.5);
    arrow.x = this.enemyData[index].sprite.x;
    arrow.y = this.enemyData[index].sprite.y;
    arrow.width = this.enemyData[index].sprite.width;
    arrow.height = arrow.width;
    this.enemyData[index].sprite.destroy();
    this.enemyData.splice(index, 1);
    this.app.stage.addChild(arrow);
  }

  public totalEnemies(): number{
    return this.enemyData.length;
  }

  public update(time){
    for (let i = 0; i < this.totalEnemies(); i++){
      let enemy = this.enemyData[i].sprite;
      let originalX = this.enemyData[i].startingX;
      let maxMovement = 10;
      let currentDirection = this.enemyData[i].moveDirection;
      let currentRelativeX = enemy.x - originalX;
      if (currentDirection === 1 && currentRelativeX > maxMovement){
        this.enemyData[i].moveDirection = Math.round(Math.random()) - 1;
      }
      else if (currentDirection === -1 && currentRelativeX < (maxMovement * -1)){
        this.enemyData[i].moveDirection = Math.round(Math.random());
      }
      else if (currentDirection === 0){
        this.enemyData[i].moveDirection = Math.round((Math.random() * 2) - 1);
      }
      enemy.x += 0.1 * time.deltaTime * currentDirection * 3;
    }
  }

    
  private async getArrowSprite(arrowKeyword): Promise<PIXI.Texture>{
    switch(arrowKeyword.toLowerCase()){
    case 'up':
      return PIXI.Assets.load('../../assets/arrow-up-icon.png');
    case 'left':
      return PIXI.Assets.load('../../assets/arrow-left-icon.png');
    case 'right':
      return PIXI.Assets.load('../../assets/arrow-right-icon.png');
    case 'down':
      return PIXI.Assets.load('../../assets/arrow-down-icon.png');
    default:
      return null;
    }
}
}