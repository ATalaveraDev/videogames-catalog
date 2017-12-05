import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideogamesService } from '../videogames.service';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  gameForm: FormGroup;
  showAdd: boolean;

  constructor(private service: VideogamesService) {
    this.showAdd = true;
  }

  ngOnInit() {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('pending', Validators.required),
      platform: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.service.createVideogame(this.gameForm.value);
    this.gameForm.reset({status: 'pending'});
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
  }
}
