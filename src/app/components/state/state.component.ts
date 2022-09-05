import {Component, OnInit} from '@angular/core';
import {TimerHandler} from "../../utils/handlers/timer-handler";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  timer = 0

  constructor(
    private timerHandler: TimerHandler
  ) {
  }

  ngOnInit(): void {
    this.timerHandler.timerObservable.subscribe(time => {
      this.timer = time
    })
  }

}
