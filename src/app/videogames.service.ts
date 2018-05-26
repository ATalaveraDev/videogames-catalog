import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Videogame } from './videogame';
import { environment } from '../environments/environment';

@Injectable()
export class VideogamesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.endPoint}/videogames`;
  }

  createVideogame(videogame: Videogame): Observable<Videogame> {
    return this.http.post<Videogame>(`${this.url}`, { name: videogame.name, status: videogame.status, platform: videogame.platform });
  }

  getVideogames(status: string): Observable<Array<Videogame>> {
    return this.http.get<Array<Videogame>>(`${this.url}/${status}`);
  }

  updateGameStatus(id: string, status: string): Observable<Videogame> {
    return this.http.put<Videogame>(`${this.url}/${id}/status`, { status: status });
  }
}
