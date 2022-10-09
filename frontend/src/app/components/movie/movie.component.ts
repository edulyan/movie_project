import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, pluck, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { VideoDialogComponent } from 'src/app/dialogs/video-dialog/video-dialog.component';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie$: Observable<IMovie>;
  actors$: Observable<string[]>;

  constructor(
    private movieService: MovieService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id) => this.movieService.getById(id))
    );

    this.actors$ = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id) => this.movieService.getMovieActors(id))
    );
  }

  playVideo(id: string) {
    const ref = this.matDialog.open(VideoDialogComponent, {
      data: id,
      panelClass: 'video-dialog-div',
    });

    ref.afterClosed().subscribe();
  }
}
