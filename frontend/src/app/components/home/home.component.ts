import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movieData = new BehaviorSubject<IMovie[]>([]);
  movie: IMovie = {} as IMovie;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getAll()
      .subscribe((movieListItem) => this.movieData.next(movieListItem));
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
}
