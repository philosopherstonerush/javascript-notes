import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {FunnyPipe} from "./funny.pipe";
import { FilterPipe } from './filter.pipe';
import { ReversePipe } from './reverse.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ReversePipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FunnyPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
