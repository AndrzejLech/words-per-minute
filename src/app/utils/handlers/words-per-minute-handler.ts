import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Settings } from "../enums/settings";
import { TimerHandler } from "./timer-handler";

@Injectable()
export class WordsPerMinuteHandler {
  private _correctWordsNumber: BehaviorSubject<number> = new BehaviorSubject(0)
  totalCorrectWords: Observable<number> = this._correctWordsNumber.asObservable()

  private _wordsPerMinute: BehaviorSubject<number> = new BehaviorSubject(0)
  wordsPerMinute: Observable<number> = this._wordsPerMinute.asObservable()

  constructor(
    private timerHandler: TimerHandler
  ) {
  }

  calculateWordsPerMinute(): void {
    this.timerHandler.timerValue.subscribe(time => {
      this.totalCorrectWords.subscribe(words => {
        let timeElapsed = (Settings.TIME_LIMIT - time)
        let wordPerMinute = (words / (timeElapsed / 60))
  
        if (timeElapsed != 0) {
          this.setWordsPerMinute(wordPerMinute)
        }
      })

    })
  }

  setWordsPerMinute(value: number) {
    this._wordsPerMinute.next(value)
  }

  setCorrectWords(value: number) {
    this._correctWordsNumber.next(value)
  }
}
