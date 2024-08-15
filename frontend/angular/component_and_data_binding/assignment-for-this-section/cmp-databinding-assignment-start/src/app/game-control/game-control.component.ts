import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {

  @Output("digit") digitEvent: EventEmitter<any> = new EventEmitter<number>();

  intervalId
  i : number = 0;

  startGame() {
    this.intervalId = setInterval(this.sendDigit.bind(this), 1000)
  }

  stopGame() {
    clearInterval(this.intervalId);
  }

  sendDigit() {
    this.i = this.i + 1;
    this.digitEvent.emit(this.i)
  }

}
