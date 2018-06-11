import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import { SearchService } from '../search.service';
import { SearchStore } from '../search.store';

@Component({
  selector: 'app-search-input',
  template: '<input type="text" #search class="form-control"><i class="glyphicon glyphicon-remove pull-right" (click)="clearSearch()"></i>'
})
export class InputComponent implements AfterViewInit {
  @ViewChild('search') searcher: ElementRef;

  constructor(private ngZone: NgZone, private searchSrv: SearchService, private searchStore: SearchStore) { }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      Observable.fromEvent(this.searcher.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((event: KeyboardEvent) => {
          if ((<HTMLInputElement>event.target).value.length > 2) {
            this.searchStore.searchByTitle((<HTMLInputElement>event.target).value);
          }
        });
    });
  }

  clearSearch(): void {
    // this.results.length = 0;
    this.searchStore.termSubject.next('');
    // this.changeDetector.detectChanges();
  }
}
