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
    this.http.put('http://localhost:8080/api/videogames/' + game._id + '/status', {status: 'pending'})
      .subscribe((updatedGame: Videogame) => {
        this.pending$.subscribe((list: Array<Videogame>) => list.push(updatedGame));
      });
  }

  addFinished(game) {
    this.http.put('http://localhost:8080/api/videogames/' + game._id + '/status', {status: 'finished'})
      .subscribe((updatedGame: Videogame) => {
        this.finished$.subscribe((list: Array<Videogame>) => list.push(updatedGame));
      });
  }

  removePending(id) {
    this.pending$.subscribe((list: Array<Videogame>) => {
      list.forEach((game, index) => {
        if (game._id === id) {
          list.splice(index, 1);
        }
      });
    });
  }

  removeFinished(id) {
    this.finished$.subscribe((list: Array<Videogame>) => {
      list.forEach((game, index) => {
        if (game._id === id) {
          list.splice(index, 1);
        }
      });
    });
  }
}
