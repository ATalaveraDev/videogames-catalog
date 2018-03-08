import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-input',
  template: '<input type="text" #search class="form-control">'
})
export class InputComponent implements AfterViewInit {
  @ViewChild('search') searcher: ElementRef;

  constructor(private ngZone: NgZone, private searchSrv: SearchService) { }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      Observable.fromEvent(this.searcher.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((event: KeyboardEvent) => {
          if ((<HTMLInputElement>event.target).value.length > 2) {
            this.searchSrv.searchByTitle((<HTMLInputElement>event.target).value);
          }
        });
    });
  }
}
