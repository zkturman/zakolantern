import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-game',
  templateUrl: './movie-game.component.html',
  styleUrls: ['./movie-game.component.css']
})
export class MovieGameComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var element = document.getElementsByClassName("movie-game")[0] as HTMLElement;
    element.focus();
  }
}