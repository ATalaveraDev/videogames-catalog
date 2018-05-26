import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Videogame } from '../videogame';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pending: Array<Videogame>;
  finished: Array<Videogame>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.pending = this.activatedRoute.snapshot.data.lists[0];
    this.finished = this.activatedRoute.snapshot.data.lists[1];
  }

  updateLists(game: Videogame): void {
    game.status === 'pending' ? this.pending.push(game) : this.finished.push(game);
  }
}
