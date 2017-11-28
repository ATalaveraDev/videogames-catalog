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
      this.service.addFinished({_id: event._id, name: '', platform: 'ps3', status: 'finished'});
      this.service.removePending(event._id);
    } else {
      this.service.addPending({_id: event._id, name: '', platform: 'ps3', status: 'pending'});
      this.service.removeFinished(event._id);
    }
  }
}
