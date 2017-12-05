import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Videogame } from './videogame';

@Injectable()
export class VideogamesService {
  private pendingSubject = new ReplaySubject<Array<Videogame>>();
  private finishedSubject = new ReplaySubject<Array<Videogame>>();

  pending$ = this.pendingSubject.asObservable();
  finished$ = this.finishedSubject.asObservable();

  constructor(private http: HttpClient) { }

  createVideogame(videogame: Videogame): void {
    this.http.post('http://localhost:8080/api/videogames', {name: videogame.name, status: videogame.status, platform: videogame.platform})
      .subscribe((newGame: Videogame) => {
        if (newGame.status === 'pending') {
          this.pending$.subscribe((list: Array<Videogame>) => list.push(newGame));
        } else if (newGame.status === 'finished') {
          this.finished$.subscribe((list: Array<Videogame>) => list.push(newGame));
        }
      });
  }

  getVideogames(status: string) {
    this.http.get('http://localhost:8080/api/videogames/' + status)
      .subscribe((response: Array<Videogame>) => {
        status === 'pending' ? this.pendingSubject.next(response) : this.finishedSubject.next(response);
      });
  }

  addPending(game: Videogame): void {
    this.http.put('http://localhost:8080/api/videogames/' + game._id + '/status', {status: 'pending'})
      .subscribe((updatedGame: Videogame) => {
        this.pending$.subscribe((list: Array<Videogame>) => list.push(updatedGame));
      });
  }

  addFinished(game: Videogame): void {
    this.http.put('http://localhost:8080/api/videogames/' + game._id + '/status', {status: 'finished'})
      .subscribe((updatedGame: Videogame) => {
        this.finished$.subscribe((list: Array<Videogame>) => list.push(updatedGame));
      });
  }

  removePending(id: string): void {
    this.pending$.subscribe((list: Array<Videogame>) => this.removeFromList(list, id));
  }

  removeFinished(id: string): void {
    this.finished$.subscribe((list: Array<Videogame>) => this.removeFromList(list, id));
  }

  private removeFromList(list: Array<Videogame>, id: string): void {
    list.forEach((game, index) => {
      if (game._id === id) {
        list.splice(index, 1);
      }
    });
  }
}
