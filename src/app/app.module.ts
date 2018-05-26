import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { VideogamesService } from './videogames.service';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from './app.resolver.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      lists: AppResolver
    },
    component: HomeComponent
  }];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    AppResolver,
    VideogamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
