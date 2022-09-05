import {Component, OnInit} from '@angular/core';
import {WordsGenerator} from "../../utils/handlers/words-generator";

@Component({
  selector: 'app-word-container',
  templateUrl: './word-container.component.html',
  styleUrls: ['./word-container.component.scss']
})
export class WordContainerComponent implements OnInit {

  words: string[] = []

  constructor(
    private wordsGenerator: WordsGenerator
  ) {
    this.wordsGenerator.wordsObservable.subscribe(words =>
      this.words = words

    )
  }

  ngOnInit(): void {
    this.wordsGenerator.generateWords()
  }

}
