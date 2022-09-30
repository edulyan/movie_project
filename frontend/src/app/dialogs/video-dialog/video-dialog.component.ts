import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, switchMap } from 'rxjs';
import { IMovie } from 'src/app/models/movie/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'video-dialog',
  styleUrls: ['./video-dialog.component.scss'],
  template: `
    <div class="main-dialog" *ngIf="movie$ | async as movie">
      <video class="dialog-video" controls width="1010px" height="430px">
        <source
          [src]="'http://localhost:3000/' + movie.video"
          type="video/mp4"
        />
      </video>
    </div>
  `,
})
export class VideoDialogComponent implements OnInit {
  @Input()
  movie$: Observable<IMovie>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.movie$ = this.movieService.getById(this.data);
    // this.movie$ = this.activatedRoute.params.pipe(
    //   pluck('id'),
    //   switchMap((id) => this.movieService.getById(id))
    // );

    console.log(this.movie$);
  }
}
