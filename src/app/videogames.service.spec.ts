import { TestBed, inject } from '@angular/core/testing';

import { VideogamesService } from './videogames.service';

describe('VideogamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideogamesService]
    });
  });

  it('should be created', inject([VideogamesService], (service: VideogamesService) => {
    expect(service).toBeTruthy();
  }));
});
