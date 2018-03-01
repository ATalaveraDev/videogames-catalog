import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { VideogamesService } from './videogames.service';
import { AddFormComponent } from './add-form/add-form.component';
import { SearchComponent } from './search/search.component';
import { InputComponent } from './search/input/input.component';
import { ResultsComponent } from './search/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddFormComponent,
    SearchComponent,
    InputComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [VideogamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
