import { Component, OnInit } from '@angular/core';
import { ScoreHandler } from 'src/app/utils/handlers/score-handler';
import { WordsPerMinuteHandler } from 'src/app/utils/handlers/words-per-minute-handler';
import { TimerHandler } from "../../utils/handlers/timer-handler";

@Component({
  selector: 'app-state',
  templateUrl: './state-box.component.html',
  styleUrls: ['./state-box.component.scss']
})
export class StateBoxComponent implements OnInit {

  timer = 0
  wordsPerMinute = 0
  combo = 0
  maxCombo = 0
  totalCorrectWords = 0
  score = 0

  comboSum = 0

  constructor(
    private timerHandler: TimerHandler,
    private wordsPerMinuteHandler: WordsPerMinuteHandler,
    private scoreHandler: ScoreHandler
  ) {
  }

  ngOnInit(): void {
    this.timerHandler.timerValue.subscribe(time => this.timer = time)
    this.wordsPerMinuteHandler.wordsPerMinute.subscribe(wordsPerMinute => this.wordsPerMinute = wordsPerMinute)
    this.scoreHandler.combo.subscribe(combo => this.combo = combo)
    this.scoreHandler.maxCombo.subscribe(maxCombo => this.maxCombo = maxCombo)
    this.wordsPerMinuteHandler.totalCorrectWords.subscribe(totalCorrectWords => this.totalCorrectWords = totalCorrectWords)
    this.scoreHandler.score.subscribe(score => this.score = score)

    this.score = (this.wordsPerMinute * 100) + this.combo + this.totalCorrectWords

    this.scoreHandler.combo.subscribe(combo => {
      this.comboSum = this.comboSum + combo
      this.wordsPerMinuteHandler.totalCorrectWords.subscribe(correctWords => {
        this.scoreHandler.combo.subscribe(score => {
          this.wordsPerMinuteHandler.wordsPerMinute.subscribe(wordsPerMinute => {
            this.scoreHandler.setScore(this.score = (this.wordsPerMinute * 100) + this.comboSum + this.totalCorrectWords)
          }).unsubscribe
        }).unsubscribe
      }).unsubscribe
    }).unsubscribe
  }

}
