import { Sprite } from "pixi.js";

export class EnemyData{
  public startingX: number;
  public startingY: number;
  public moveDirection: number = 0;
  public id: number;
  public sprite: Sprite;
  public arrowKey: string;
  public arrowSprite: Sprite;
  public arrowInitialX: number;
  public arrowInitialY: number;
  public arrowDestinationX: number;
  public arrowDestinationY: number;

  constructor(){}
}