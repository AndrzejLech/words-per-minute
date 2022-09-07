import { BehaviorSubject, Observable } from "rxjs"

export class ScoreHandler{
    private _combo: BehaviorSubject<number> = new BehaviorSubject(0)
    combo: Observable<number> = this._combo.asObservable()

    private _maxCombo: BehaviorSubject<number> = new BehaviorSubject(0)
    maxCombo: Observable<number> = this._maxCombo.asObservable()

    private _score: BehaviorSubject<number> = new BehaviorSubject(0)
    score: Observable<number> = this._score.asObservable()

    setCurrentCombo(value: number){
        this._combo.next(value)
    }

    setMaxCombo(value: number){
        this._maxCombo.next(value)
    }

    setScore(value: number){
        this._score.next(value)
    }

}