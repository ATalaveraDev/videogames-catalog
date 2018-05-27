import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { GamesStore } from './games.store';

@Injectable()
export class AppResolver implements Resolve<void> {
  constructor(public gamesStore: GamesStore) { }

  resolve(): void {
    this.gamesStore.loadInitialData();
  }
}