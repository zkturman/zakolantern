import * as PIXI from 'pixi.js'
import { EnemyData } from './enemy-data';
import { BossController } from './boss-controller';
import { DeviceSizeFinderService } from 'src/app/device-size-finder.service';

export class EnemyController{
  private readonly app: PIXI.Application;
  private enemyImage: PIXI.Texture;
  private enemyData: EnemyData[] = [];
  private initialArrowData: EnemyData[] = [];
  private finalBoss: BossController;
  private bossRemainingCount: number = 1;
  public ArrowY: number;
  public BossY: number;
  constructor(app: PIXI.Application, public deviceSize: DeviceSizeFinderService){
    this.app = app;
  }

  public async create(){
    this.enemyImage = await PIXI.Assets.load('../../../assets/enemy-icon.png');
    this.finalBoss = new BossController();
    await this.finalBoss.create();
  }

  public createInstance(x: number, y: number){
    let newEnemy = new EnemyData();
    newEnemy.id = this.enemyData.length + 1;
    newEnemy.sprite = new PIXI.Sprite(this.enemyImage);
    newEnemy.sprite.x = x;
    newEnemy.sprite.y = y;
    newEnemy.startingX = newEnemy.sprite.x;
    newEnemy.startingY = newEnemy.sprite.y;
    if (this.deviceSize.getIsPhonePortrait()){
    newEnemy.sprite.height = this.app.screen.width * 0.07;
    newEnemy.sprite.width = this.app.screen.width * 0.07;
    }
    else{
      newEnemy.sprite.height = this.app.screen.width * 0.05;
      newEnemy.sprite.width = this.app.screen.width * 0.05;  
    }
    newEnemy.sprite.anchor.set(0.5);
    newEnemy.moveDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    this.enemyData.push(newEnemy);
    this.app.stage.addChild(newEnemy.sprite);
  }

  public getInstance(index: number): EnemyData{
    return this.enemyData[index];
  }

  public getFinalBoss(): BossController{
    return this.finalBoss;
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
    this.enemyData[index].arrowSprite = arrow;
    this.enemyData[index].arrowInitialX = arrow.x;
    this.enemyData[index].arrowInitialY = arrow.y;
    this.initialArrowData.push(this.enemyData[index]);
    this.enemyData.splice(index, 1);
    this.app.stage.addChild(arrow);
  }

  public totalEnemies(): number{
    return this.enemyData.length;
  }

  public update(time){
    this.updateEnemies(time);
    this.updateArrows(time, this.initialArrowData);
    if (this.enemyData.length == 0){
      if (this.bossRemainingCount > 0 && this.enemyData.length == 0){
        this.finalBoss.createInstance(this.app);
        this.finalBoss.data.sprite.y = this.BossY;
        if (this.deviceSize.getIsPhonePortrait()){
          this.finalBoss.data.sprite.width = this.app.screen.width * 0.2;
          this.finalBoss.data.sprite.height = this.app.screen.width * 0.2;
        }
        else{
          this.finalBoss.data.sprite.width = this.app.screen.width * 0.15;
          this.finalBoss.data.sprite.height = this.app.screen.width * 0.15;
        }
        this.bossRemainingCount--;
      }
      else{
        this.finalBoss?.update(time);
        if (this.finalBoss?.isDead()){
          this.finalBoss.destroyInstance();
          this.finalBoss = null;
        }
      }
    }
  }

  private updateEnemies(time){
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

  private updateArrows(time, arrowsToMove: EnemyData[]){
    let xInterval = this.app.canvas.width / 8;
    let unitsPerSecond = 1;
    for (let i = 0; i < arrowsToMove.length; i++){
      let arrowIndex = arrowsToMove[i].id;
      let destinationX = (xInterval * arrowIndex) - (arrowsToMove[i].arrowSprite.width);
      let destinationY = this.ArrowY - arrowsToMove[i].arrowSprite.height;
      let directionX = destinationX - arrowsToMove[i].arrowSprite.x;
      let directionY = destinationY - arrowsToMove[i].arrowSprite.y;
      let magnitude = Math.sqrt((directionX * directionX) + (directionY * directionY));
      if (magnitude <= 0.01){
        arrowsToMove.splice(i, 1);
        i--;
      }
      else{
        let unitX = directionX / magnitude;
        let unitY = directionY / magnitude;
        let changeX = unitX * unitsPerSecond * time.deltaTime;
        let changeY = unitY * unitsPerSecond * time.deltaTime;
        arrowsToMove[i].arrowSprite.x += changeX;
        arrowsToMove[i].arrowSprite.y += changeY;
      }
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