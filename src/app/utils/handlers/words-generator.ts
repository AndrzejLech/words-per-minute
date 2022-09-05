import {HttpClient} from "@angular/common/http";export class WordPerMinuteHandler {

}

import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Settings} from "../enums/settings";

@Injectable()
export class WordsGenerator {

  constructor(
    private http: HttpClient
  ) {
  }

  private wordsJSONURL = 'assets/words.json'
  private wordsBehaviourSubject: BehaviorSubject<string[]> = new BehaviorSubject([] as string[])
  wordsObservable: Observable<string[]> = this.wordsBehaviourSubject.asObservable()

  generateWords(): void {
    this.getWordsJson().subscribe(
      words => {
        this.setWordsBehaviourSubject(this.getRandomFromArray(words, Settings.NUMBER_OF_WORDS))
      }
    )
  }

  private setWordsBehaviourSubject(value: string[]) {
    this.wordsBehaviourSubject.next(value)
  }

  private getWordsJson(): Observable<any> {
    return this.http.get(this.wordsJSONURL)
  }

  private getRandomFromArray(array: any[], number: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, number)
  }
}
