import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { IUser } from 'src/app/models/user/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movieData = new BehaviorSubject<IMovie[]>([]);
  movie: IMovie = {} as IMovie;
  user: IUser = {} as IUser;
  authenticated = false;
  errorMessage: string;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieService.getAll().subscribe({
      next: (movieListItem) => this.movieData.next(movieListItem),
      error: (err) => console.log(err),
      complete: () => console.info('complete'),
    });

    this.authService.getUserCookie().subscribe({
      next: (data: IUser) => (this.user = data),
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err);
      },
    });
  }

  getMovies(): Observable<IMovie[]> {
    return this.movieData.asObservable();
  }

  searchMovie(title: string) {
    if (!title) {
      this.movieService
        .getAll()
        .subscribe((trackListItem) => this.movieData.next(trackListItem));
    } else {
      this.movieService
        .search(title)
        .subscribe((trackListItem) => this.movieData.next(trackListItem));
    }
  }

  logout() {
    return this.authService
      .logout()
      .subscribe(() => (this.authenticated = false));
  }
}
