import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameComponent} from './components/game/game.component';
import {MaterialModule} from "./material.module";
import {FlexModule} from "@angular/flex-layout";
import {WordContainerComponent} from './components/word-container/word-container.component';
import {WordsGenerator} from "./utils/handlers/words-generator";
import {HttpClientModule} from "@angular/common/http";
import {TypeBoxComponent} from './components/type-box/type-box.component';
import {FormsModule} from "@angular/forms";
import {StateComponent} from './components/state/state.component';
import {TimerHandler} from "./utils/handlers/timer-handler";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    WordContainerComponent,
    TypeBoxComponent,
    StateComponent
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
    TimerHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}