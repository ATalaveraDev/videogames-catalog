import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Videogame } from '../videogame';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() elements: Array<Videogame>;
  @Input() id: string;
  @Output() gameDropped = new EventEmitter<any>();

  gamesTracker(index, item): string {
    return item.name;
  }

  onDrop(event): void {
    event.preventDefault();

    if (!this.elementIsPresent(event.dataTransfer.getData('text'))) {
      this.gameDropped.emit({gameName: event.dataTransfer.getData('text'), destinationList: this.id});
    }
  }

  elementIsPresent(gameName) {
    let isPresent = false;

    this.elements.forEach((element) => {
      if (element.name === gameName) {
        isPresent = true;
      }
    });

    return isPresent;
  }

  onDragOver(event): void {
    event.preventDefault();
  }

  onDragStart(event) {
    event.dataTransfer.setData('text', event.target.innerText);
  }
}
