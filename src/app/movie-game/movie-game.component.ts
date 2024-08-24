import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-movie-game',
  templateUrl: './movie-game.component.html',
  styleUrls: ['./movie-game.component.css']
})
export class MovieGameComponent implements OnInit, AfterViewInit {

  private app: PIXI.Application;
  
  constructor() { 
    this.app = new PIXI.Application();
    const app2 = new PIXI.Application();

  }

  async ngOnInit(): Promise<void> {
    let x = document.getElementsByClassName("game-container")[0];
    await this.app.init({
        width: x.clientWidth,
        height: x.clientHeight,
        background: '#1099bb'
    });
    x.appendChild(this.app.canvas);
    const texture = await PIXI.Assets.load('../../assets/skull-skeleton-icon.png');
    const skull = new PIXI.Sprite(texture);
    skull.anchor.set(0.5);
    skull.x = this.app.screen.width / 2;
    skull.y = this.app.screen.height / 2;

    this.app.stage.addChild(skull);
    this.app.ticker.add((time) =>{
      skull.rotation += 0.1 * time.deltaTime;
    })
  }

  ngAfterViewInit(): void {
  }

}
