import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { VideogamesService } from './videogames.service';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from './app.resolver.service';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { InputComponent } from './search/input/input.component';
import { ResultsComponent } from './search/results/results.component';
import { SearchService } from './search/search.service';
import { GamesStore } from './games.store';
import { SearchStore } from './search/search.store';
import { FormComponent } from './form/form.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    resolve: {
      lists: AppResolver
    },
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddFormComponent,
    HomeComponent,
    SearchComponent,
    InputComponent,
    ResultsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    GamesStore,
    SearchStore,
    AppResolver,
    VideogamesService,
    SearchService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
