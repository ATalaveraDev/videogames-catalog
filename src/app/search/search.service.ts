import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  resultsSubject: ReplaySubject<any>;
  results$: Observable<any>;

  constructor(private http: HttpClient) {
    this.resultsSubject = new ReplaySubject<any>();
    this.results$ = this.resultsSubject.asObservable();
  }

  searchByTitle(title: string): void {
    this.http.post(environment.endpoint + '/api/games/search', { title: title })
      .subscribe((result: Array<any>) => {
        this.resultsSubject.next(result);
      });
  }
}
