import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { VideogamesService } from './videogames.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppResolver implements Resolve<Observable<any>> {
  constructor(private gamesService: VideogamesService) { }

  resolve(): Observable<any> {
    const apiRequests = [
      this.gamesService.getVideogames('pending'),
      this.gamesService.getVideogames('finished')
    ];

    return forkJoin(apiRequests);
  }
}