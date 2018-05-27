import { Injectable } from '@angular/core';

import { VideogamesService } from './videogames.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Videogame } from './videogame';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamesStore {
  pending: BehaviorSubject<Array<Videogame>>;
  pending$: Observable<Array<Videogame>>;
  finished: BehaviorSubject<Array<Videogame>>;
  finished$: Observable<Array<Videogame>>;

  constructor(private gamesService: VideogamesService) {
    this.pending = new BehaviorSubject<Array<Videogame>>([]);
    this.pending$ = this.pending.asObservable();
    this.finished = new BehaviorSubject<Array<Videogame>>([]);
    this.finished$ = this.finished.asObservable();
    this.loadInitialData();
  }

  private loadInitialData() {
    this.gamesService.getVideogames('pending').subscribe((response: Array<Videogame>) => this.pending.next(response));
    this.gamesService.getVideogames('finished').subscribe((response: Array<Videogame>) => this.finished.next(response));
  }
}