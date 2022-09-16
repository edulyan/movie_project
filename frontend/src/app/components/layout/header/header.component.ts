import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItems } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems: IMenuItems[] = [
    {
      path: '/home',
      icon: 'home',
    },
    {
      path: ':id/favorites',
      icon: 'favorite',
    },
    {
      path: ':id/user',
      icon: 'Account Circle',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
