import { Component, EventEmitter, Input, Output } from '@angular/core';

import { List } from 'immutable';

import { Videogame } from '../videogame';
import { VideogamesService } from '../videogames.service';
import { GamesStore } from '../games.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() elements: List<Videogame>;
  selectedGame: string;

  constructor(private gamesService: VideogamesService, private gamesStore: GamesStore) { }

  gamesTracker(index, item): string {
    return item.name;
  }

  onDrop(event): void {
    event.preventDefault();

    this.gamesStore.addElement(event.dataTransfer.getData('id'), event.dataTransfer.getData('status'));
  }

  onDragOver(event): void {
    event.preventDefault();
  }

  onDragStart(event): void {
    event.dataTransfer.setData('name', event.target.innerText);
    event.dataTransfer.setData('id', this.findGame(event.target.innerText)._id);
    event.dataTransfer.setData('status', this.setStatus(this.findGame(event.target.innerText).status));
  }

  private findGame(name: string): Videogame {
    return this.elements.filter((element: Videogame) => {
      return element.name === name;
    }).get(0);
  }

  private setStatus(status: string): string {
    return status === 'pending' ? 'finished' : 'pending';
  }
}
