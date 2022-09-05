import {BehaviorSubject, Observable, timer} from "rxjs";

export class TimerHandler {
  private timerBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(60)
  timerObservable: Observable<number> = this.timerBehaviorSubject.asObservable()

  private timerStateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timerStateObservable: Observable<boolean> = this.timerStateBehaviorSubject.asObservable()

  timeLimit: number = 60

  startTimer() {
    let timerSubscription = timer(0, 1000).subscribe(time => {
      this.setWords(this.timeLimit - time)
    })
    this.timerObservable.subscribe(time => {
      if (time == 0) {
        timerSubscription.unsubscribe()
      }
    })
  }

  private setWords(value: number) {
    this.timerBehaviorSubject.next(value)
  }

  setTimerState(bool: boolean){
    this.timerStateBehaviorSubject.next(bool)
  }
}
