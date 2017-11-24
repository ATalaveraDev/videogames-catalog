import { Component } from '@angular/core';

import { Videogame } from './videogame';
import { VideogamesService } from './videogames.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pending: Array<Videogame>;
  finished: Array<Videogame>;

  constructor(private service: VideogamesService) {
    this.service.getVideogames('pending');
    this.service.getVideogames('finished');
  }

  updateLists(event): void {
    if (event.destinationList === 'finished') {
      this.service.addFinished({name: event.gameName, platform: 'ps3', status: 'finished'});
      this.service.removePending(event.gameName);
    } else {
      this.service.addPending({name: event.gameName, platform: 'ps3', status: 'pending'});
      this.service.removeFinished(event.gameName);
    }
  }
}
