import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieComponent } from './movie.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { VideoDialogModule } from 'src/app/dialogs/video-dialog/video-dialog.module';

@NgModule({
  exports: [MovieComponent],
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    VideoDialogModule,
  ],
})
export class MovieModule {}
