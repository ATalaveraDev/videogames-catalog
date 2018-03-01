import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  template: 'Results for {{ searchTerm }}'
})
export class ResultsComponent {
  constructor() { }
}
