import { Sprite } from "pixi.js";

export class EnemyData{
  public startingX: number;
  public startingY: number;
  public moveDirection: number = 0;
  public id: number;
  public sprite: Sprite;
  public arrowKey: string;

  constructor(){}
}