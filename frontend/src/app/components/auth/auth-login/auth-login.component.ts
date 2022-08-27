import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  formGroup: FormGroup | any;
  hide = true;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
  }
}
