import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideogamesService } from '../videogames.service';
import { Videogame } from '../videogame';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  gameForm: FormGroup;
  showAdd: boolean;
  @Output() gameAdded: EventEmitter<Videogame>;

  constructor(private service: VideogamesService) {
    this.showAdd = true;
    this.gameAdded = new EventEmitter<Videogame>();
  }

  ngOnInit() {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('pending', Validators.required),
      platform: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.service.createVideogame(this.gameForm.value)
      .subscribe((game: Videogame) => this.gameAdded.emit(game));
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
  }
}
