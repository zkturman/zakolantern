import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-buttons',
  standalone: true,
  imports: [],
  templateUrl: './game-buttons.component.html',
  styleUrl: './game-buttons.component.css'
})
export class GameButtonsComponent implements OnInit {
  @Output() fireActionEvent = new EventEmitter();
  @Output() moveActionEvent = new EventEmitter<number>();

  ngOnInit(): void{
    let leftArrow = document.getElementById('left-move-arrow');
    let rightArrow = document.getElementById('right-move-arrow');
    let fireButton = document.getElementById('fire-button');
    
    document.getElementsByClassName('button-container')[0].addEventListener('contextmenu', (event) => {event.preventDefault(); return false;})
    leftArrow.addEventListener('mousedown', () => this.leftButtonDown());
    leftArrow.addEventListener('mouseup', () => this.moveButtonUp());
    leftArrow.addEventListener('touchstart', (event) => {this.leftButtonDown(event);});
    leftArrow.addEventListener('touchend', (event) => {this.moveButtonUp(event);});
    rightArrow.addEventListener('mousedown', () => this.rightButtonDown());
    rightArrow.addEventListener('mouseup', () => this.moveButtonUp());
    rightArrow.addEventListener('touchstart', (event) => {this.rightButtonDown(event);});
    rightArrow.addEventListener('touchend', (event) => {this.moveButtonUp(event);});
    fireButton.addEventListener('mousedown', () => this.fireButtonDown());
    fireButton.addEventListener('touchstart', (event) => {this.fireButtonDown(event);});
    fireButton.addEventListener('touchend', (event) => {this.fireButtonUp(event);});
  }

  fireButtonDown(event?){
    event?.preventDefault();
    event?.target.classList.add('active');
    this.fireActionEvent?.emit();
  }

  fireButtonUp(event?){
    event?.preventDefault();
    event?.target.classList.remove('active');
  }

  leftButtonDown(event?){
    event?.preventDefault();
    event?.target.classList.add('active');
    this.moveActionEvent?.emit(-1);
  }

  rightButtonDown(event?){
    event?.preventDefault();
    event?.target.classList.add('active');
    this.moveActionEvent?.emit(1);
  }

  moveButtonUp(event?){
    event?.preventDefault();
    event?.target.classList.remove('active');
    this.moveActionEvent?.emit(0);
  }
}
