import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideogamesService } from '../videogames.service';
import { Videogame } from '../videogame';
import { GamesStore } from '../games.store';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  gameForm: FormGroup;
  showAdd: boolean;

  constructor(private service: VideogamesService, private gamesStore: GamesStore) {
    this.showAdd = true;
  }

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('pending', Validators.required),
      platform: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.gamesStore.create(this.gameForm.value);
    this.gameForm.reset({status: 'pending'});
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
  }
}
