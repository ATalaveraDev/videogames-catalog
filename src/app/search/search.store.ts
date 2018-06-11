import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { SearchService } from './search.service';

@Injectable()
export class SearchStore {
  termSubject: ReplaySubject<string>;
  term$: Observable<string>;

  constructor(private searchService: SearchService) {
    this.termSubject = new ReplaySubject<string>();
    this.term$ = this.termSubject.asObservable();
  }

  searchByTitle(title: string): void {
    this.termSubject.next(title);
    this.searchService.searchByTitle(title);
  }
}