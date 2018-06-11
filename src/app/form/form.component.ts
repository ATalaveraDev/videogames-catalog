import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements CanComponentDeactivate {
  myForm: FormGroup;

  constructor(private router: Router) {
    this.myForm = new FormGroup({
      name: new FormControl('')
    });
  }

  onSubmit(): void {
    console.log(this.myForm);
  }

  run() {
    this.router.navigate(['/']);
  }

  @HostListener('window:popstate', ['$event'])
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('Exit?');
  }
}