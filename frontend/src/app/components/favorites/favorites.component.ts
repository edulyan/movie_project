import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, pluck, switchMap } from 'rxjs';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoritesMovies = new BehaviorSubject<IMovie[]>([]);
  favMovie: IMovie = {} as IMovie;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.userService.getFavorites(id))
      )
      .subscribe((movies) => this.favoritesMovies.next(movies));
  }

  getFavoritesMovies(): Observable<IMovie[]> {
    return this.favoritesMovies.asObservable();
  }
}
