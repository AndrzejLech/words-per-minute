import {Component, OnInit} from '@angular/core';
import {Colors} from "../../utils/enums/colors";
import {WordsGenerator} from "../../utils/handlers/words-generator";
import {Settings} from "../../utils/enums/settings";

@Component({
  selector: 'app-type-box',
  templateUrl: './type-box.component.html',
  styleUrls: ['./type-box.component.scss']
})
export class TypeBoxComponent implements OnInit {
  input: string = ''
  index = 0


  constructor(
    private wordsGenerator: WordsGenerator
  ) {
  }

  ngOnInit(): void {
  }

  onClick(event: any) {
    if (event.key === ' ' || event.key === 'Enter') {
      if (this.index === Settings.NUMBER_OF_WORDS ) {
        // TODO: show popup with score
        this.reset()
      }

      if (this.getWord(this.index) === this.input) {
        this.colorWord(this.index, Colors.GOOD)
      } else {
        this.colorWord(this.index, Colors.BAD)
      }

      console.log(this.index)
      this.index++
      this.input = ''
    }
  }

  private colorWord(index: number, color: Colors) {
    document.getElementById("id" + String(index))!.style.color = color
  }

  private getWord(index: number): string {
    return document.getElementById("id" + String(index))!.innerText
  }

  private reset() {
    this.wordsGenerator.generateWords()
    this.index = 0
    this.input = ''
    let counter = 0
    while (counter == Settings.NUMBER_OF_WORDS)
      this.colorWord(counter, Colors.BLANK)
      counter++
  }
}
