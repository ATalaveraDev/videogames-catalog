import { ChangeDetectorRef, Component } from '@angular/core';

import { SearchService } from '../search.service';
import { SearchStore } from '../search.store';

@Component({
  selector: 'app-search-results',
  styleUrls: ['./results.component.less'],
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  results: Array<any>;

  constructor(public searchSrv: SearchService, private changeDetector: ChangeDetectorRef, private searchStore: SearchStore) {
    this.searchSrv.results$.subscribe((games) => {
      this.results = games;
      this.changeDetector.detectChanges();
    });
  }
}
