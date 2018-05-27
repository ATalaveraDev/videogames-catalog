import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Videogame } from '../videogame';
import { GamesStore } from '../games.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public gamesStore: GamesStore) {
    // this.pending = this.activatedRoute.snapshot.data.lists[0];
    // this.finished = this.activatedRoute.snapshot.data.lists[1];
  }

  addToList(game: Videogame): void {
    // game.status === 'pending' ? this.pending.push(game) : this.finished.push(game);
  }

  remove(game: Videogame): void {
    /*if (game.status === 'pending') {
      this.finished = this.finished.filter((element) => game.name !== element.name);
    } else {
      this.pending = this.pending.filter((element) => game.name !== element.name);
    }*/
  }
}
