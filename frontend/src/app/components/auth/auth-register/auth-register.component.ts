import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  formGroup: FormGroup | any;
  hide = true;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
  }
}
