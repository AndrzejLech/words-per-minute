import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { StateBoxComponent } from './components/state-box/state-box.component';
import { TypeBoxComponent } from './components/type-box/type-box.component';
import { WordContainerComponent } from './components/word-container/word-container.component';
import { MaterialModule } from "./material.module";
import { ScoreHandler } from './utils/handlers/score-handler';
import { TimerHandler } from "./utils/handlers/timer-handler";
import { WordsGenerator } from "./utils/handlers/words-generator";
import { WordsPerMinuteHandler } from './utils/handlers/words-per-minute-handler';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    WordContainerComponent,
    TypeBoxComponent,
    StateBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    WordsGenerator,
    TimerHandler,
    WordsPerMinuteHandler,
    ScoreHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
