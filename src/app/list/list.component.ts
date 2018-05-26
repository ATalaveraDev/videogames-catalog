import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Videogame } from '../videogame';
import { VideogamesService } from '../videogames.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() elements: Array<Videogame>;
  @Output() removeFromOtherList: EventEmitter<Videogame>;

  constructor(private gamesService: VideogamesService) {
    this.removeFromOtherList = new EventEmitter<Videogame>();
  }

  gamesTracker(index, item): string {
    return item.name;
  }

  onDrop(event): void {
    event.preventDefault();

    if (!this.elementIsPresent(event.dataTransfer.getData('id'))) {
      this.gamesService.updateGameStatus(event.dataTransfer.getData('id'), event.dataTransfer.getData('status'))
        .subscribe((game: Videogame) => this.updateLists(game));
    }
  }

  private elementIsPresent(id: string): boolean {
    return this.elements.filter((element: Videogame) => element._id === id).length === 1;
  }

  private updateLists(game: Videogame): void {
    this.elements.push({ _id: game._id, name: game.name, status: game.status, platform: '' });
    this.removeFromOtherList.emit(game);
  }

  onDragOver(event): void {
    event.preventDefault();
  }

  onDragStart(event): void {
    this.elements.map((element: Videogame) => {
      if (element.name === event.target.innerText) {
        event.dataTransfer.setData('id', element._id);
        event.dataTransfer.setData('status', this.setStatus(element.status));
      }
    });
  }

  private setStatus(status: string): string {
    return status === 'pending' ? 'finished' : 'pending';
  }
}
