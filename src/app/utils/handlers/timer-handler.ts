import {BehaviorSubject, Observable, timer} from "rxjs";
import {Settings} from "../enums/settings";

export class TimerHandler {
  private timerBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(Settings.TIME_LIMIT)
  timerObservable: Observable<number> = this.timerBehaviorSubject.asObservable()

  private timerStateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timerStateObservable: Observable<boolean> = this.timerStateBehaviorSubject.asObservable()

  private timerEndedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timerEndedObservable: Observable<boolean> = this.timerStateBehaviorSubject.asObservable()

  timeLimit: number = Settings.TIME_LIMIT

  startTimer() {
    let timerSubscription = timer(0, 1000).subscribe(time => {
      this.setTimer(this.timeLimit - time)
    })
    this.timerObservable.subscribe(time => {
      console.log(time)
      if (time === 0) {
        console.log("cock")
        this.setTimeEnded(true)
        timerSubscription.unsubscribe()
      }
    })
  }

  private setTimer(value: number) {
    this.timerBehaviorSubject.next(value)
  }

  setTimerState(bool: boolean){
    this.timerStateBehaviorSubject.next(bool)
  }

  setTimeEnded(bool: boolean){
    this.timerEndedBehaviorSubject.next(bool)
  }
}
