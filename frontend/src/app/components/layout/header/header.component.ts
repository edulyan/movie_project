import { Component, OnInit } from '@angular/core';
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
  ];

  constructor() {}

  ngOnInit(): void {}
}
