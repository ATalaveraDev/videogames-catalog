import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Videogame } from './videogame';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideogamesService {
  private pendingSubject = new ReplaySubject<Array<Videogame>>();
  private finishedSubject = new ReplaySubject<Array<Videogame>>();

  pending$ = this.pendingSubject.asObservable();
  finished$ = this.finishedSubject.asObservable();

  constructor(private http: HttpClient) { }

  createVideogame(videogame: Videogame): Observable<Videogame> {
    return this.http.post<Videogame>('http://localhost:8080/api/videogames', {name: videogame.name, status: videogame.status, platform: videogame.platform});
  }

  getVideogames(status: string): Observable<Array<Videogame>> {
    return this.http.get<Array<Videogame>>(`http://localhost:8080/api/videogames/${status}`);
  }

  updateGameStatus(id: string, status: string): Observable<Videogame> {
    return this.http.put<Videogame>(`http://localhost:8080/api/videogames/${id}/status`, { status: status });
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
