import { Injectable } from '@angular/core';

import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

import { VideogamesService } from './videogames.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Videogame } from './videogame';

@Injectable()
export class GamesStore {
  pending: BehaviorSubject<List<Videogame>>;
  pending$: Observable<List<Videogame>>;
  finished: BehaviorSubject<List<Videogame>>;
  finished$: Observable<List<Videogame>>;

  constructor(private gamesService: VideogamesService) {
    this.pending = new BehaviorSubject<List<Videogame>>(List());
    this.pending$ = this.pending.asObservable();
    this.finished = new BehaviorSubject<List<Videogame>>(List());
    this.finished$ = this.finished.asObservable();
  }

  loadInitialData(): void {
    this.gamesService.getVideogames('pending')
      .subscribe((games: Array<Videogame>) => this.pending.next(List(games)));
    this.gamesService.getVideogames('finished')
      .subscribe((games: Array<Videogame>) => this.finished.next(List(games)));
  }

  addElement(id: string, status: string): void {
    this.gamesService.updateGameStatus(id, status).subscribe((game: Videogame) => {
      if (game.status === 'pending') {
        this.pending.next(this.pending.getValue().push(game));
        this.finished.next(this.finished.getValue().delete(this.finished.getValue().findIndex((element) => element.name === game.name)));
      } else {
        this.finished.next(this.finished.getValue().push(game));
        this.pending.next(this.pending.getValue().delete(this.pending.getValue().findIndex((element) => element.name === game.name)));
      }
    });
  }
}