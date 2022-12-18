import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/enums/enums';
import { IUser } from 'src/app/models/user/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  user: IUser = {} as IUser;
  authenticated = false;
  errorMessage: string;
  genreList: string[] = [
    'боевики',
    'комедии',
    'драмы',
    'фэнтэзи',
    'ужасы',
    'мелодрамы',
    'триллеры',
    'фантастика',
    'военные',
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserCookie().subscribe(
      (data: any) => (this.user = data),
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  logout() {
    return this.authService
      .logout()
      .subscribe(() => (this.authenticated = false));
  }
}
