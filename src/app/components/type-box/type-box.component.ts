import {Component, OnInit} from '@angular/core';
import {Colors} from "../../utils/enums/colors";
import {WordsGenerator} from "../../utils/handlers/words-generator";
import {Settings} from "../../utils/enums/settings";
import {TimerHandler} from "../../utils/handlers/timer-handler";

@Component({
  selector: 'app-type-box',
  templateUrl: './type-box.component.html',
  styleUrls: ['./type-box.component.scss']
})
export class TypeBoxComponent implements OnInit {
  input: string = ''
  index: number = 0
  goodWords: number = 0
  timerState: boolean = false
  timerEnded: boolean = false

  constructor(
    private wordsGenerator: WordsGenerator,
    private timerHandler: TimerHandler
  ) {
    timerHandler.timerStateObservable.subscribe(state => this.timerState = state)
    timerHandler.timerEndedObservable.subscribe(ended => {
      console.log(ended)
        this.timerEnded = ended
      }
    )
  }

  ngOnInit(): void {
  }

  onClick(event: any) {
    if (event.key === ' ' || event.key === 'Enter') {
      if (!this.timerState) {
        this.timerHandler.startTimer()
        this.timerHandler.setTimerState(true)
      }

      if (event.key === ' ') {
        this.input = this.input.trim()
      }

      if (this.getWord(this.index) === this.input) {
        this.colorWord(this.index, Colors.CORRECT)
        this.goodWords++
      } else {
        this.colorWord(this.index, Colors.WRONG)
      }

      this.index++
      this.input = ''


      if (this.index === Settings.NUMBER_OF_WORDS) {
        this.reset()
      } else {
        this.colorWord(this.index, Colors.AMBER)
      }
    }
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
}
