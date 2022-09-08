import { Component, OnInit } from '@angular/core';
import { ScoreHandler } from 'src/app/utils/handlers/score-handler';
import { WordsPerMinuteHandler } from 'src/app/utils/handlers/words-per-minute-handler';
import { Colors } from "../../utils/enums/colors";
import { Settings } from "../../utils/enums/settings";
import { TimerHandler } from "../../utils/handlers/timer-handler";
import { WordsGenerator } from "../../utils/handlers/words-generator";

@Component({
  selector: 'app-type-box',
  templateUrl: './type-box.component.html',
  styleUrls: ['./type-box.component.scss']
})
export class TypeBoxComponent implements OnInit {
  input: string = ''
  index: number = 0
  correctWords: number = 0
  combo: number = 0
  maxCombo: number = 0
  timerState: boolean = false
  timerEnded: boolean = false

  constructor(
    private wordsGenerator: WordsGenerator,
    private timerHandler: TimerHandler,
    private wordsPerMinuteHandler: WordsPerMinuteHandler,
    private scoreHandler: ScoreHandler
  ) {
  }

  ngOnInit(): void {
    this.timerHandler.timerState.subscribe(state => this.timerState = state)
    this.timerHandler.timerEnded.subscribe(ended => this.timerEnded = ended)
  }

  OnKeyPressed(event: any) {
    if (event.key === ' ' || event.key === 'Enter') {
      this.startTimerIfNeeded()

      if (event.key === ' ') {
        this.input = this.input.trim()
      }

      this.gradeWords()
      this.index++
      this.input = ''

      if (this.index === Settings.NUMBER_OF_WORDS) {
        this.reset()
      } else {
        this.colorWord(this.index, Colors.BLUE)
      }
    }
  }

  onResetButtonCLick() {
    this.reset()
    this.timerHandler.setTimerState(false)
    this.timerHandler.setTimeEnded(false)
    this.timerHandler.setTimer(Settings.TIME_LIMIT)
    this.wordsPerMinuteHandler.setWordsPerMinute(0)
    this.wordsPerMinuteHandler.setCorrectWords(0)
    this.scoreHandler.setCurrentCombo(0)
    this.scoreHandler.setMaxCombo(0)
  }

  private colorWord(index: number, color: Colors) {
    document.getElementById("id" + String(index))!.classList.add(color)
    if (color != Colors.BLUE) {
      document.getElementById("id" + String(index))!.classList.remove(Colors.BLUE)
    }
  }

  private removeColor(index: number) {
    document.getElementById("id" + String(index))!.classList.remove(Colors.BLUE, Colors.WRONG, Colors.CORRECT)
  }

  private getWord(index: number): string {
    return document.getElementById("id" + String(index))!.innerText
  }

  private reset() {
    this.wordsGenerator.generateWords()
    this.index = 0
    let counter = 0
    this.wordsGenerator.wordsObservable.subscribe(() => {
      while (!(counter == Settings.NUMBER_OF_WORDS)) {
        this.removeColor(counter)
        counter++
      }
    }
    ).unsubscribe()
  }

  private startTimerIfNeeded() {
    if (!this.timerState) {
      this.timerHandler.startTimer()
      this.timerHandler.setTimerState(true)
      this.wordsPerMinuteHandler.calculateWordsPerMinute()
    }
  }

  private gradeWords() {

    if (this.getWord(this.index) === this.input) {
      this.colorWord(this.index, Colors.CORRECT)
      this.wordsPerMinuteHandler.setCorrectWords(++this.correctWords)
      this.scoreHandler.setCurrentCombo(++this.combo)
    } else {
      this.colorWord(this.index, Colors.WRONG)
      this.scoreHandler.setCurrentCombo(this.combo = 0)
    }
    this.calculateMaxCombo()
  }

  private calculateMaxCombo() {
    if (this.combo > this.maxCombo || this.combo == this.maxCombo) {
      this.scoreHandler.setMaxCombo(this.maxCombo = this.combo)
    }
  }
}
