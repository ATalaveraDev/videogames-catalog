import { Component } from '@angular/core';

import { GamesStore } from '../games.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public gamesStore: GamesStore) { }
}
