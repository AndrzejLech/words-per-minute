import {BehaviorSubject, Observable, timer} from "rxjs";
import {Settings} from "../enums/settings";

export class TimerHandler {
  private _timerValue: BehaviorSubject<number> = new BehaviorSubject(Settings.TIME_LIMIT)
  timerValue: Observable<number> = this._timerValue.asObservable()

  private _timerState: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timerState: Observable<boolean> = this._timerState.asObservable()

  private _timerEnded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timerEnded: Observable<boolean> = this._timerEnded.asObservable()

  timeLimit: number = Settings.TIME_LIMIT

  startTimer() {
    let timerSubscription = timer(0, 1000).subscribe(time => {
      this.setTimer(this.timeLimit - time)
    })
    this.timerValue.subscribe(time => {
      if (time === 0) {
        this.setTimeEnded(true)
        timerSubscription.unsubscribe()
      }
    })
  }

  setTimer(value: number) {
    this._timerValue.next(value)
  }

  setTimerState(bool: boolean){
    this._timerState.next(bool)
  }

  setTimeEnded(bool: boolean){
    this._timerEnded.next(bool)
  }
}
