import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Videogame } from './videogame';

@Injectable()
export class VideogamesService {
  pendingSubject = new ReplaySubject<Array<Videogame>>();
  finishedSubject = new ReplaySubject<Array<Videogame>>();

  pending$ = this.pendingSubject.asObservable();
  finished$ = this.finishedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getVideogames(status) {
    this.http.get('http://localhost:8080/api/videogames/' + status)
      .subscribe((response: Array<Videogame>) => {
        if (status === 'pending') {
          this.pendingSubject.next(response);
        } else {
          this.finishedSubject.next(response);
        }
      });
  }

  addPending(game) {
    this.pending$.subscribe((list: Array<Videogame>) => list.push(game));
  }

  addFinished(game) {
    this.finished$.subscribe((list: Array<Videogame>) => list.push(game));
  }

  removePending(gameName) {
    this.pending$.subscribe((list: Array<Videogame>) => {
      list.forEach((game, index) => {
        if (game.name === gameName) {
          list.splice(index, 1);
        }
      });
    });
  }

  removeFinished(gameName) {
    this.finished$.subscribe((list: Array<Videogame>) => {
      list.forEach((game, index) => {
        if (game.name === gameName) {
          list.splice(index, 1);
        }
      });
    });
  }
}
