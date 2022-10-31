import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, pluck, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { VideoDialogComponent } from 'src/app/dialogs/video-dialog/video-dialog.component';
import { PersonService } from 'src/app/services/person.service';
import { IUser } from 'src/app/models/user/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserMovieIds } from '../../models/user/changesUser.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie$: Observable<IMovie>;
  user: IUser = {} as IUser;
  actors$: Observable<string[]>;
  actors: string[] = [];
  errorMessage: string;
  isSelected: boolean = false;
  userMovieIds: IUserMovieIds = {} as IUserMovieIds;
  authenticated = false;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id) => this.movieService.getById(id))
    );

    this.activatedRoute.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.movieService.getMovieActors(id))
      )
      .subscribe({ next: (data: string[]) => (this.actors = data) });

    this.authService.getUserCookie().subscribe(
      (data: any) => (this.user = data),
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  playVideo(id: string) {
    const ref = this.matDialog.open(VideoDialogComponent, {
      data: id,
      panelClass: 'video-dialog-div',
    });

    ref.afterClosed().subscribe();

    console.log(this.actors);
  }

  addFavorites(movieId: string) {
    this.userMovieIds.userId = this.user.id;
    this.userMovieIds.movieId = movieId;

    // console.log(this.user.favorites.find((x) => x.id == movieId));

    const findMovie = this.user.favorites.find((x) => x.id == movieId);

    this.isSelected = findMovie ? true : false;

    console.log(this.isSelected);

    if (!this.isSelected) {
      this.userService.addMovieToFav(this.userMovieIds).subscribe();
      console.log('Добавлено');

      this.isSelected = true;
    } else {
      this.userService.removeMovieFromFav(this.userMovieIds).subscribe();
      console.log('Удалено');

      this.isSelected = false;
    }
    // this.isSelected = !this.isSelected ? true : false;
  }

  logout() {
    return this.authService
      .logout()
      .subscribe(() => (this.authenticated = false));
  }
}
