import { ChangeDetectorRef, Component } from '@angular/core';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  results: Array<any>;

  constructor(public searchSrv: SearchService, private changeDetector: ChangeDetectorRef) {
    this.searchSrv.results$.subscribe((games) => {
      this.results = games;
      this.changeDetector.detectChanges();
    });
  }
}
