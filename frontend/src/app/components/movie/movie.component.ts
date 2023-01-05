import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { UserFavMoviesService } from 'src/app/services/user-fav-movies.service';
import { IUserFavMovie } from 'src/app/models/user-fav-movie/userFavMovie.interface';

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
  userMovieIds: IUserMovieIds = {} as IUserMovieIds;
  authenticated = false;
  isSelected: IUserFavMovie | undefined | boolean;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private personService: PersonService,
    private userFavMoviesService: UserFavMoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserCookie().subscribe({
      next: (data: IUser) => {
        (this.user = data),
          this.activatedRoute.params
            .pipe(
              pluck('id'),
              switchMap(async (movieId) => {
                this.log(movieId);
                this.isSelected = data.userFavorites.find(
                  (x) => x.movieId === movieId
                );
              })
            )
            .subscribe();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err);
      },
    });

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

    // this.authService.getUserCookie().subscribe({
    //   next: (data: IUser) => {
    //     this.isSelected = data.userFavorites.find(
    //       (x) => x.movieId == '2eafe0f2-a0e4-4672-8641-eeb58a8fea7f'
    //     );
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.message;
    //     console.log(err);
    //   },
    // });

    // this.activatedRoute.params
    //   .pipe(
    //     pluck('id'),
    //     switchMap((movieId): any => {
    //       console.log(this.user),
    //         this.user.userFavorites.find((x) => x.movieId == movieId);
    //     })
    //   )
    //   .subscribe({ next: (data: any) => (this.isSelected = data) });
  }

  private log(msg: string) {
    console.log(msg);
  }

  playVideo(id: string) {
    const ref = this.matDialog.open(VideoDialogComponent, {
      data: id,
      panelClass: 'video-dialog-div',
    });

    ref.afterClosed().subscribe();

    console.log(this.actors);
  }

  // addRemFavorites(movieId: string) {
  //   this.userMovieIds.userId = this.user.id;
  //   this.userMovieIds.movieId = movieId;

  //   // console.log(this.user.favorites.find((x) => x.id == movieId));

  //   const findMovie = this.user.userFavorites.find((x) => x.movieId == movieId);

  //   // const boolRes = findMovie ? true : false;

  //   // console.log(findMovie?.id);

  //   if (!findMovie?.isSelected) {
  //     this.userFavMoviesService.addUserFavMovie(this.userMovieIds).subscribe();
  //     console.log('Добавлено');

  //     const findMovie2 = this.user.userFavorites.find(
  //       (x) => x.movieId == movieId
  //     );

  //     console.log(findMovie2);

  //     this.userFavMoviesService
  //       .updateUserFavMovie(findMovie2!.id, {
  //         isSelected: true,
  //       })
  //       .subscribe();

  //     console.log(findMovie?.isSelected);
  //   } else {
  //     this.userFavMoviesService
  //       .removeUserFavMovie(this.userMovieIds)
  //       .subscribe();
  //     console.log('Удалено');

  //     this.userFavMoviesService
  //       .updateUserFavMovie(findMovie!.id, {
  //         isSelected: false,
  //       })
  //       .subscribe();
  //   }

  //   this.isSelected = findMovie?.isSelected;

  //   console.log(this.isSelected);
  // }

  favAddRem(movieId: string) {
    console.log('START - ', this.isSelected);
    console.log('START - ', this.user);

    this.userMovieIds.userId = this.user.id;
    this.userMovieIds.movieId = movieId;

    if (!this.isSelected) {
      this.userFavMoviesService.addUserFavMovie(this.userMovieIds).subscribe({
        complete: () => console.info('Добавлено'),
      });

      this.isSelected = true;
    } else {
      this.userFavMoviesService
        .removeUserFavMovie(this.userMovieIds)
        .subscribe({ complete: () => console.info('Удалено') });
      this.isSelected = false;
    }

    console.log('END - ', this.isSelected);
  }

  logout() {
    return this.authService
      .logout()
      .subscribe(() => (this.authenticated = false));
  }
}
