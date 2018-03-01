import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {
  resultsSubject: ReplaySubject<any>;
  results$: Observable<any>;

  constructor(private http: HttpClient) {
    this.resultsSubject = new ReplaySubject<any>();
    this.results$ = this.resultsSubject.asObservable();
  }

  searchByTitle(title: string): void { }
}
