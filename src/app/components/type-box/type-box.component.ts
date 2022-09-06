import {Component, OnInit} from '@angular/core';
import {Colors} from "../../utils/enums/colors";
import {WordsGenerator} from "../../utils/handlers/words-generator";
import {Settings} from "../../utils/enums/settings";
import {TimerHandler} from "../../utils/handlers/timer-handler";
import { WordsPerMinuteHandler } from 'src/app/utils/handlers/words-per-minute-handler';

@Component({
  selector: 'app-type-box',
  templateUrl: './type-box.component.html',
  styleUrls: ['./type-box.component.scss']
})
export class TypeBoxComponent implements OnInit {
  input: string = ''
  index: number = 0
  correctWords: number = 0
  timerState: boolean = false
  timerEnded: boolean = false

  constructor(
    private wordsGenerator: WordsGenerator,
    private timerHandler: TimerHandler,
    private wordsPerMinuteHandler: WordsPerMinuteHandler,
  ) {
    timerHandler.timerState.subscribe(state => this.timerState = state)
    timerHandler.timerEnded.subscribe(ended => this.timerEnded = ended)
  }

  ngOnInit(): void {
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
        this.colorWord(this.index, Colors.AMBER)
      }
    }
  }

  onResetButtonCLick(){
    this.reset()
    this.timerHandler.setTimerState(false)
    this.timerHandler.setTimeEnded(false)
    this.timerHandler.setTimer(Settings.TIME_LIMIT)
  }

  private colorWord(index: number, color: Colors) {
    document.getElementById("id" + String(index))!.classList.add(color)
    if (color != Colors.AMBER) {
      document.getElementById("id" + String(index))!.classList.remove(Colors.AMBER)
    }
  }

  private removeColor(index: number) {
    document.getElementById("id" + String(index))!.classList.remove(Colors.AMBER, Colors.WRONG, Colors.CORRECT)
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
    } else {
      this.colorWord(this.index, Colors.WRONG)
    }

  }
}
