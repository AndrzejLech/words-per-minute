import { Component, OnInit } from '@angular/core';
import { TimerHandler } from "../../utils/handlers/timer-handler";
import { WordsPerMinuteHandler } from 'src/app/utils/handlers/words-per-minute-handler';

@Component({
  selector: 'app-state',
  templateUrl: './state-box.component.html',
  styleUrls: ['./state-box.component.scss']
})
export class StateBoxComponent implements OnInit {

  timer = 0
  wordsPerMinute = 0

  constructor(
    private timerHandler: TimerHandler,
    private wordsPerMinuteHandler: WordsPerMinuteHandler
  ) {
  }

  ngOnInit(): void {
    this.timerHandler.timerValue.subscribe(time => this.timer = time)
    this.wordsPerMinuteHandler.wordsPerMinute.subscribe(wordsPerMinute => this.wordsPerMinute = wordsPerMinute)
  }

}
